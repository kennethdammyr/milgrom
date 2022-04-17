module.exports = async function (context, myBlob) {
    context.log("************ BLOB CREATED ************");

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

    // Function to add file to database
    async function addFile(file) {
        container.items.create(file);
    }
    
    // Prepare file-object    
    const file = {
        "contentType"   : myBlob.data.contentType,
        "uri"           : myBlob.data.url
    };

    // List metadata about the file
    context.log("Content Type:", file.contentType);
    context.log("URI:", file.uri);

    // Add metadata to Cosmos DB if the file is mxf-file
    if (file.contentType == "image/png") {
        context.log("This file is png, we will add to CosmosDB");

        addFile(file).catch((error) => {
            context.error(error);
        });

    }

};