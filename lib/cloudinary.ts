const cloudinary = require("cloudinary").v2;
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

async function uploadMedia(file: File): Promise<UploadApiResponse> {
  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {},
        function (err: UploadApiErrorResponse, result: UploadApiResponse) {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
}

export { cloudinary, uploadMedia };
