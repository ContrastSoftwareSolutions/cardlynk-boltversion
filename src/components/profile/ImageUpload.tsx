import React from 'react';
import { Image, Upload } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server here
      const fakeUrl = URL.createObjectURL(file);
      onChange(fakeUrl);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Profile Picture or Logo
      </label>
      <div className="flex items-center space-x-4">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100">
          {value ? (
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="image-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </label>
          <input
            id="image-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
    </div>
  );
}