const { BlobServiceClient, StorageSharedKeyCredential, BlobClient } = require("@azure/storage-blob");

// Enter your storage account name and shared key
const account = "frysjadevstore2";
const accountKey = "G8M+FpQqjksFHNkIcdBDmZrqHmvvhqMJQxZsP8NZSb+qdgrfPGLe1QiHBFSlSYbOkr61FhO+KFEesNqKqBZ9+A==";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = "inbox";
const blobName = "a7e11fda20608752490664eba51c2b98.jpg";

async function main() {
  const containerClient = blobServiceClient.getContainerClient(containerName);
/*
  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
    console.log(blob.properties)
  }
  */
    let blob = containerClient.getBlobClient(blobName);
    let metadata = await blob.getProperties();
    console.log(blob.url);
    console.log(blob.name);
    console.log(metadata.contentType);
}


main();