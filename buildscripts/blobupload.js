const mime = require('mime')
const blobService = require('azure-storage');
const fs = require('fs');
const path = require('path')
const upFolder = path.normalize(process.env.WORKSPACE + "\\public");

fs.readdirSync(upFolder).forEach(file => {
  console.log(file);
})