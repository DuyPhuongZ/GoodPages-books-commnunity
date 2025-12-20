import cloudinary from "../configs/cloudinary.config";


const uploadSingleImage = async (localPath: string, cloudPath: string) => {
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
            folder: cloudPath
        });
        console.log(">>> result:", result);
        return {
            url: result.secure_url || result.url,
            publicId: result.public_id
        }
    } catch (error) {
        throw error;
    }
}

export {
    uploadSingleImage
}