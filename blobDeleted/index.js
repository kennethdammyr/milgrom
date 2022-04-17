module.exports = async function (context, blobDeleted) {
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
        /* Query the database for all references of the file
        const { dbfiles } = await container.items
        .query("SELECT * from c WHERE c.path = ".file.path)
        .fetchAll();

    // Walk through and delete them all
      for (var file of dbfiles) {
        context.log("Found file:", file.filename);
        file.delete();
      }
      */
    }
    
    // Prepare file-object
    
    const file = {
        "filename": blobDeleted.subject,
        "path":     blobDeleted.data.url  
    };

    // List metadata about the file
    context.log("Subject:", file.filename);
    context.log("URL:", file.path);
    //context.log("URI:", context.bindingData.uri);
    //context.log("Metadata:", context.bindingData.metadata);
    context.log("Binding Data:", context.bindingData);
    context.log("blobDeleted:", blobDeleted);

    // Remove file from database
    /*
    removeFile(file).catch((error) => {
        context.error(error);
    });
    */
};