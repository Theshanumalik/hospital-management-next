"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImagePreviewProps = {
  imageFile: FileList | null;
  className?: ClassValue;
};

const ImagePreview = ({ imageFile, className }: ImagePreviewProps) => {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setImage(URL.createObjectURL(imageFile[0]));
    } else {
      setImage(null);
    }
  }, [imageFile]);
  return (
    <div className={cn("grid place-items-center", className)}>
      {image ? (
        <Image src={image} width={200} height={200} alt="Image Preview" />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

export default ImagePreview;
