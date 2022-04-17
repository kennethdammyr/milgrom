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
        "filename": context.bindingData.filename,
        "ext":      context.bindingData.ext,
        "path":     context.bindingData.blobTrigger  
    };

    // List metadata about the file
    context.log("Filename:", file.filename);
    context.log("Extension:", file.ext);
    context.log("blobTrigger:", file.path);
    context.log("URI:", context.bindingData.uri);
    context.log("Metadata:", context.bindingData.metadata);

    // Add metadata to Cosmos DB if the file is mxf-file
    if (file.ext == "pdf") {
        context.log("This file is mxf, we will add to CosmosDB");

        addFile(file).catch((error) => {
            context.error(error);
        });

    }

};