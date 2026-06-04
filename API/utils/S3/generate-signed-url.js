const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require("../../config/aws-config");

const generatePresignedUrl = async (filePath) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
    });

    const signedUrl = await getSignedUrl(
      s3,
      command,
      {
        expiresIn: 60 * 5,
      }
    );

    return signedUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { generatePresignedUrl };


// import {
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";

// import { getSignedUrl } from
//   "@aws-sdk/s3-request-presigner";

// import { s3 } from "../../config/aws-config";


// export const generatePresignedUrl =
//   async (
//     filePath: string
//   ): Promise<string> => {

//     try {

//       const command =
//         new GetObjectCommand({
//           Bucket:
//             process.env.bucketName,
//           Key:
//             filePath,
//         });

//       const signedUrl =
//         await getSignedUrl(
//           s3,
//           command,
//           {
//             expiresIn:
//               60 * 5,
//           }
//         );

//       return signedUrl;

//     } catch (error) {

//       console.log(
//         "Presigned URL Error:",
//         error
//       );

//       throw error;
//     }
//   };
