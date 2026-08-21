export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const getImageValidationError = (file) => {
  if (!(file instanceof File)) return "Please choose an image file";
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPEG, PNG, or WebP images are allowed";
  }
  if (file.size > MAX_IMAGE_SIZE) return "Image size must not exceed 5 MB";
  return null;
};
