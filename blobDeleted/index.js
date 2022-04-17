module.exports = async function (context, blobDeleted, myBlob) {
    context.log("************ BLOB DELETED ************");
    
    // Require libraries
    const { CosmosClient } = require("@azure/cosmos");

    // Prepare Cosmos DB
    const key = process.env.COSMOS_KEY;
    const endpoint = process.env.COSMOS_ENDPOINT;
    const containerId = "files";
    const databaseId = "MediaIndex";
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });

    // Function to REMOVE file from database
    async function removeFile(file) {
        // Query the database for all references of the file
        context.log("Trying to delete" + file.uri);
        let query = "SELECT * from c WHERE c.uri = '" + file.uri + "'";
        const { dbfiles } = await container.items.query(query).fetchAll(); // Virker dette? Jeg tror spørringen er riktig...
    
        // Walk through and delete them all
        for (var dbfile of dbfiles) {
            context.log("Found file:", dbfile.uri);
            dbfile.delete();
        }
    }
    
    // Prepare file-object  
    const file = {
        "contentType"   : blobDeleted.data.contentType,
        "uri"           : blobDeleted.data.blobUrl
    };

    // List metadata about the file
    context.log("URI:", file.uri);
    context.log("Content Type:", file.contentType);

    // Remove file from database
    removeFile(file).catch((error) => {
        context.log(error);
    });
};