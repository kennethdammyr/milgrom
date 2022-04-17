module.exports = async function (context, myBlob) {
    context.log("************ BLOB CREATED ************");

    // Prepare variables
    var filename    = context.bindingData.filename;
    var ext         = context.bindingData.ext;
    var path        = context.bindingData.blobTrigger;

    // List metadata about the file
    context.log("Filename:", filename);
    context.log("Extension:", ext);
    context.log("blobTrigger:", path);
    context.log("URI:", context.bindingData.uri);
    context.log("Metadata:", context.bindingData.metadata);

    // Add metadata to Cosmos DB if the file is mxf-file
    if (ext == "mxf") {
        context.log("This file is mxf, we will add to CosmosDB");



        
    }

};