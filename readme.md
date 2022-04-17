#Project Milgrom

This project is intented to process professional video uploaded to an Azure Blob Storage.

Initially we will:
- Index all files in a database
- Catalog the files in their respective memory cards (XQD, SxS, GoPro etc.)
- Transcode to a proxy format

Further, we will present the database in a user friendly interface where the user will be given options like:
- Preview media
- Perform cognitive services on the media
- Prepare for video editing

#List of best practice for handling Blob Storage events:
https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-event-overview

MILGROM-COSMOS
- MediaIndex
-- Files
-- Cards

- ProjectIndex
-- Projects
-- Episodes

- MetaData
-- General
-- Transcript
-- 