import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadImage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `products/${file.name}-${Date.now()}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};