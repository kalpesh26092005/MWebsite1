import { v2 as cloudinary } from 'cloudinary';
import { config } from './env';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'minals-art-corner'
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
          { format: 'webp' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result!.secure_url,
          publicId: result!.public_id,
        });
      }
    ).end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const generateImageUrls = (publicId: string) => {
  return {
    thumbnail: cloudinary.url(publicId, { width: 300, height: 300, crop: 'fill', quality: 'auto', format: 'webp' }),
    medium: cloudinary.url(publicId, { width: 600, height: 600, crop: 'limit', quality: 'auto', format: 'webp' }),
    large: cloudinary.url(publicId, { width: 1200, height: 1200, crop: 'limit', quality: 'auto', format: 'webp' }),
  };
};

export default cloudinary;