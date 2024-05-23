"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

type EditableImageProps = {
  link: string | undefined;
  onChange: (link: string) => void;
  className?: ClassValue;
};

export default function EditableImage({
  link,
  onChange,
  className,
}: EditableImageProps) {
  const [file, setFile] = useState(link || null);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (!e.target?.files) return;
    formData.append("image", e.target.files[0]);
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/upload", formData)
        .then((res) => {
          if (res.data.url) {
            onChange(res.data.url);
            setFile(res.data.url);
            resolve(void 0);
          }
        })
        .catch((error) => {
          reject(error.response?.data);
        });
    });
    toast.promise(promise, {
      loading: "Saving new image...",
      success: "Image Saved Successfully!",
      error: (msg) => `Failed to save image. REASON: ${msg}`,
    });
  };
  return (
    <div className={cn("grid place-items-center overflow-hidden", className)}>
      {file && (
        <Image
          src={file}
          alt="Profile Image"
          width={200}
          height={200}
          className="rounded-md object-cover"
          priority={true}
        />
      )}
      <label
        htmlFor="image"
        className={cn({
          "block w-full text-center py-2 border rounded-md my-2 bg-gray-200 text-gray-600 cursor-pointer":
            file,
          "w-28 h-28 rounded-full bg-gray-200 text-gray-600 cursor-pointer flex items-center justify-center p-3 text-center mx-auto":
            !file,
        })}
      >
        {file ? "Change Image" : "Upload Image"}
      </label>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        maxLength={1}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
