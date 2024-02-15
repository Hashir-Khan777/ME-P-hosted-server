import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
    shorten: true,
});

const uploadImage = async (file: any, width = 400, height = 400) => {
    try {
        const image = await cloudinary.v2.uploader.upload(file, {
            unique_filename: true,
            use_filename: true,
            faces: true,
            transformation: [
                {
                    crop: 'limit',
                    width,
                    height,
                },
            ],
        });
        return image.secure_url;
    } catch (err) {
        throw err;
    }
};

export { uploadImage };
