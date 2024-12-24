import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const uploadImageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloude_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
  );
  console.log(uploadResult);
};
