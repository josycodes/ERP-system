import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

interface UploadApiOptions {
    upload_preset?: string;
    public_id?: string;
    overwrite?: boolean;
}

class CloudinaryService {

    /**
     * File upload Function
     * @param path
     * @param options
     * @returns {Promise<string>}
     */
    async uploadFile(path: string, options: UploadApiOptions): Promise<string> {
        try {
            const result = await cloudinary.uploader.upload(path, options);
            return result.secure_url;
        } catch (error) {
            console.log(error);
            throw new Error('Error uploading file to Cloudinary');
        }
    }

    async uploadVideo(path: string, options: UploadApiOptions): Promise<string> {
        try {
            // Upload the Video
            const result = await cloudinary.uploader.upload(path, options);
            return result.secure_url;
        } catch (error) {
            console.log(error);
            throw new Error('Error uploading video to Cloudinary');
        }
    }
}

export default new CloudinaryService();
