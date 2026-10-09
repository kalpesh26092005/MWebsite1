import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2 } from 'lucide-react';
import { UploadImage } from '../../types';

interface ImageUploadProps {
  value: UploadImage[];
  onChange: (files: UploadImage[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  label?: string;
  accept?: string;
  className?: string;
  error?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  label = 'Upload Images',
  accept = 'image/*',
  className = '',
  error,
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > maxSizeMB * 1024 * 1024) return false;
      return true;
    });

    if (value.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);
    try {
      const newImages = await Promise.all(
        validFiles.map(async (file) => {
          const dataUrl = await fileToDataUrl(file);
          return {
            url: dataUrl,
            publicId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            file,
          };
        })
      );
      onChange([...value, ...newImages]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`border-2 border-dashed rounded-2xl p-6 transition-colors ${className} ${
      isDragOver 
        ? 'border-[#8B6508] dark:border-amber-500 bg-amber-500/5 dark:bg-amber-500/5' 
        : 'border-[#EAE2D7] dark:border-stone-800 hover:border-[#B8860B] dark:hover:border-amber-500'
    }`}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        id="image-upload-input"
        disabled={isUploading || value.length >= maxFiles}
      />

      {!isUploading && value.length < maxFiles && (
        <button
          type="button"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="w-full flex flex-col items-center justify-center gap-3 p-6 text-center"
          aria-label={label}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-full bg-amber-500/10 dark:bg-amber-500/10 flex items-center justify-center"
          >
            <Upload className="w-7 h-7 text-[#8B6508] dark:text-[#F3E5AB]" aria-hidden="true" />
          </motion.div>
          <div>
            <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">{label}</p>
            <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mt-1">
              Drag & drop or click to upload <br />
              <span className="text-xs">Max {maxFiles} files, {maxSizeMB}MB each</span>
            </p>
          </div>
        </button>
      )}

      {isUploading && (
        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-3 border-[#8B6508] border-t-transparent rounded-full"
          />
          <p className="text-[#57534E] dark:text-[#A8A29E]">Uploading images...</p>
        </div>
      )}

      <AnimatePresence>
        {value.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-[#57534E] dark:text-[#A8A29E] mb-3">
              Uploaded ({value.length}/{maxFiles})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {value.map((image, index) => (
                <motion.div
                  key={image.publicId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#19191E]"
                >
                  <img
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-xs text-white/80 truncate">Image {index + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}

      {value.length >= maxFiles && !isUploading && (
        <p className="mt-4 text-center text-sm text-[#57534E] dark:text-[#A8A29E]">
          Maximum number of images reached
        </p>
      )}
    </div>
  );
};