import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from '../firebaseService';

export async function uploadFiles(files: File[]) {
  const fileUrls = [];

  for (const file of files) {
    const fileRef = ref(storage, nanoid());

    await uploadBytes(fileRef, file);
    fileUrls.push(await getDownloadURL(fileRef));
  }

  return fileUrls;
}

export async function deleteFiles(urls: string[]) {
  for (const url of urls) {
    const fileName = new URL(url).pathname.split('/').pop();
    const fileRef = ref(storage, fileName);

    await deleteObject(fileRef);
  }
}
