const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const { s3 } = require("../../config/aws-config");

const sanitizeFileName = (fileName) =>
  decodeURIComponent(fileName || "file").replace(/\s+/g, "-");

const getFileUrl = (key) =>
  `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

const uploadToS3 = async (folderName, body, fileName, contentType) => {
  const keyPath = `${folderName}/${Date.now()}-${sanitizeFileName(fileName)}`;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: keyPath,
    Body: body,
  };

  if (contentType) {
    params.ContentType = contentType;
  }

  try {
    const data = await s3.send(new PutObjectCommand(params));
    return {
      fileUrl: getFileUrl(params.Key),
      data,
    };
  } catch (err) {
    throw new Error(`Error uploading file: ${err}`);
  }
};

const uploadFileToS3 = async (folderName, file) => {
  const fileName = file.originalname || file.name || file.filename;

  if (file.buffer) {
    return uploadToS3(folderName, file.buffer, fileName, file.mimetype);
  }

  const filePath = file.path || file.tempFilePath;
  return uploadToS3(folderName, fs.readFileSync(filePath), fileName, file.mimetype);
};

const uploadNewFileToS3 = async (folderName, fileName) => {
  const outputDir = path.isAbsolute(fileName)
    ? fileName
    : path.join(__dirname, "../../public/thumbnails/", fileName);

  return uploadToS3(folderName, fs.readFileSync(outputDir), path.basename(fileName), "image/png");
};

module.exports = {
  uploadFileToS3,
  uploadNewFileToS3,
};

// import { PutObjectCommand } from "@aws-sdk/client-s3";

// import fs from "fs";
// import path from "path";
// import { s3 } from "../../config/aws-config";

// export const uploadFileToS3 = async (
//   folderName: string,
//   fileName: any
// ) => {

//   let temp_path = fileName.tempFilePath;

//   let image_name =
//     Date.now().toString() +
//     "-" +
//     fileName.name;

//   const keyPath =
//     `${folderName}/${image_name}`;

//   const fileContent =
//     fs.readFileSync(temp_path);

//   const params = {
//     Bucket: process.env?.bucketName,
//     Key: keyPath,
//     Body: fileContent,
//   };

//   try {

//     const command =
//       new PutObjectCommand(params);

//     const data =
//       await s3.send(command);

//     return {
//       fileUrl:
//         `https://${process.env?.bucketName}.s3.${process.env?.region}.amazonaws.com/${params.Key}`,
//       data,
//     };

//   } catch (err) {

//     throw new Error(
//       `Error uploading file: ${err}`
//     );
//   }
// };



// export const uploadNewFileToS3 = async (
//   folderName: string,
//   fileName: any
// ) => {

//   const outputDir = path.join(
//     __dirname,
//     "../../public/thumbnails/" +
//     fileName
//   );

//   const keyPath =
//     `${folderName}/${fileName}`;

//   const fileContent =
//     fs.readFileSync(outputDir);

//   const params = {
//     Bucket: process.env?.bucketName,
//     Key: keyPath,
//     Body: fileContent,
//   };

//   try {

//     const command =
//       new PutObjectCommand(params);

//     const data =
//       await s3.send(command);

//     return {
//       fileUrl:
//         `https://${process.env?.bucketName}.s3.${process.env?.region}.amazonaws.com/${params.Key}`,
//       data,
//     };

//   } catch (err) {

//     throw new Error(
//       `Error uploading file: ${err}`
//     );
//   }
// };
