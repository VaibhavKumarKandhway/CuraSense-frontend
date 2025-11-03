import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export const useFileUpload = (options = {}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFiles(acceptedFiles);
      toast.success('Files uploaded successfully!');
    } catch (error) {
      toast.error('Error uploading files');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options
  });

  return {
    files,
    loading,
    getRootProps,
    getInputProps,
    isDragActive
  };
};