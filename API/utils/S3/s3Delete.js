const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../../config/aws-config");

const deleteFileS3 = async (fileName) => {
  try {
    let { pathname } = new URL(fileName);

    pathname = pathname.substring(1);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: pathname,
    };

    const command = new DeleteObjectCommand(params);

    await s3.send(command);

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { deleteFileS3 };
