import { uploadMedia } from "@/lib/cloudinary";
import { catchAsyncError, CustomError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
export const POST = catchAsyncError(async (req: NextRequest) => {
  const data = await req.formData();
  const image = data.get("image") as File;
  if (!image) {
    throw new CustomError("Image Must Be provided!", 401);
  }
  const imageUpload = await uploadMedia(image);

  return NextResponse.json({ success: "ok", url: imageUpload.url });
});
