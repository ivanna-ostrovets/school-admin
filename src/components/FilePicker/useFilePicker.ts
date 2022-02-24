import React, { useEffect, useState } from 'react';
import { deleteFiles, uploadFiles } from '../../api/storageApi';

export function useFilePicker(urls: string[], multiple?: boolean) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [urlsToDelete, setUrlsToDelete] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newFileUrls, setNewFileUrls] = useState<string[]>([]);

  useEffect(() => {
    setUploadedUrls(urls);
  }, [urls]);

  function previewFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (multiple) {
      setNewFiles(prevFiles => [...prevFiles, ...files]);
    } else {
      if (uploadedUrls.length > 0) setUrlsToDelete(uploadedUrls);
      setNewFiles(files);
      setUploadedUrls([]);
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (multiple) {
        return setNewFileUrls(prevUrls => [
          ...prevUrls,
          reader.result as string,
        ]);
      }

      setNewFileUrls([reader.result as string]);
    };

    for (const file of files) {
      reader.readAsDataURL(file);
    }
  }

  async function saveFiles() {
    if (urlsToDelete) {
      await deleteFiles(urlsToDelete);
    }

    setNewFileUrls([]);
    setUrlsToDelete([]);

    if (newFiles) {
      const newUrls = await uploadFiles(newFiles);

      setNewFiles([]);

      return newUrls;
    }
  }

  function onUploadedFileDelete(url: string) {
    setUploadedUrls(prevUrls => prevUrls.filter(prevUrl => prevUrl !== url));
    setUrlsToDelete(prevUrls => [...prevUrls, url]);
  }

  function onNewFileDelete(url: string, index: number) {
    setNewFileUrls(prevUrls => prevUrls.filter(prevUrl => prevUrl !== url));
    setNewFiles(prevFiles => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1),
    ]);
  }

  return {
    previewFiles,
    onUploadedFileDelete,
    onNewFileDelete,
    saveFiles,
    uploadedUrls,
    newFileUrls,
    multiple,
  };
}
