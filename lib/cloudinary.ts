
/**
 * Configuration for Cloudinary.
 */
const CLOUDINARY_CONFIG = {
  cloudName: "ds2mbrzcn",
  uploadPreset: "real_unsigned"
};

/**
 * Uploads a file to Cloudinary using an unsigned preset.
 * Supports images and video.
 * 
 * @param file The file object from an input field
 * @returns Promise with the secure URL of the uploaded asset
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
}
