"use client";

import { UploadCloud, X } from "lucide-react";

import Image from "next/image";

import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { toast } from "sonner";

import { Button } from "./ui/button";
import fileApi, { FileUploadResponse } from "../services/file";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  description?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  description,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [, setImageError] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setIsUploading(true);
        setImageError(false);
        const response: FileUploadResponse = await fileApi.uploadFile(
          file,
          description
        );

        if (!response.id) {
          throw new Error("No file ID received from server");
        }

        onChange(response.id);
        toast.success("Gambar berhasil diunggah");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(
          error instanceof Error ? error.message : "Gagal mengunggah gambar"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, description]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading,
  });

  const imageUrl = value ? `${API_URL}/files/${value}/download` : undefined;

  return (
    <div className="space-y-4">
      {value ? (
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={imageUrl!}
              alt="Uploaded image"
              fill
              className="object-cover"
              onError={() => {
                setImageError(true);
                toast.error("Gagal memuat gambar");
              }}
              unoptimized
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6"
              onClick={onRemove}
              disabled={isUploading}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Gambar berhasil diunggah</p>
            <p className="text-xs text-muted-foreground">
              Klik untuk mengubah gambar
            </p>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-muted"
          } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mb-2 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isUploading
              ? "Mengunggah..."
              : isDragActive
              ? "Drop the image here"
              : "Drag & drop an image here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground">
            Max file size: 5MB. Supported formats: PNG, JPG, JPEG, GIF
          </p>
        </div>
      )}
    </div>
  );
}
