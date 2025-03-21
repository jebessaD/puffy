import axios from "axios";
import { CloudinaryResponse, SignatureResponse } from "./types";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage({
  data,
  folder,
  type,
}: {
  data: File;
  folder: string;
  type: "image";
}): Promise<string> {
  try {
    // Input validation
    if (!data || !(data instanceof File)) {
      throw new Error("Invalid file provided");
    }

    if (!folder) {
      throw new Error("Folder is required");
    }

    // File validation
    if (data.size > MAX_SIZE) {
      throw new Error("File size exceeds 5MB limit");
    }

    if (type === "image" && !data.type.startsWith("image/")) {
      throw new Error("Invalid image file type");
    }

    // Create FormData and append the file and folder
    const formData = new FormData();
    formData.append("file", data);
    formData.append("folder", folder);

    // Get upload signature from your API
    const { timestamp, signature, api_key, cloud_name } = (
      await axios.get<SignatureResponse>("/api/signature", {
        params: { folder },
      })
    ).data;

    // Upload to Cloudinary with the signed parameters
    const cloudinaryResponse = (
      await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            api_key,
            timestamp,
            signature,
          },
        }
      )
    ).data;

    return cloudinaryResponse.secure_url;
  } catch (e: any) {
    // Improved error handling with fallback messages
    throw new Error(
      e?.response?.data?.error.message ||
        e.response?.data?.message ||
        e?.message ||
        "Something went wrong, Try again!"
    );
  }
}
