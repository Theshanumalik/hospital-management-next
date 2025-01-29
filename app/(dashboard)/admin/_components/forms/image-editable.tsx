"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Edit, Plus } from "lucide-react";

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
      {link && (
        <Image
          src={link}
          alt="Profile Image"
          width={200}
          height={200}
          className="rounded-md object-cover w-40 h-40"
        />
      )}
      <label
        htmlFor="image"
        className={cn(
          "border border-gray-500 p-2 text-sm rounded-xl my-2 flex items-center cursor-pointer hover:bg-gray-50"
        )}
      >
        {link ? <Edit size={16} /> : <Plus size={16} />}
        <span className="mr-2 ml-1">{link ? "Change Image" : "Image"}</span>
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
