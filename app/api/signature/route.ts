import cloudinaryConfig from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import crypto from "crypto";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (
  publicId: string,
  apiSecret: string,
  timestamp: number
) => {
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const folder = url.searchParams.get("folder");
  const destroy = url.searchParams.get("destroy");
  const publicId = url.searchParams.get("publicId");

  /* It's just getting the current time in seconds. */
  // const timestamp = Math.round(new Date().getTime() / 1000);
  const timestamp = Math.round(new Date().getTime() / 1000);
  try {
    const params = {
      timestamp: timestamp,
      folder: folder || "response",
    };

    let signature;
    if (destroy) {
      if (!publicId) return;
      signature = generateSHA1(
        generateSignature(
          publicId,
          process.env.CLOUDINARY_SECRET as string,
          timestamp
        )
      );
    } else {
      signature = cloudinary.utils.api_sign_request(
        params,
        process.env.CLOUDINARY_SECRET as string
      );
    }

    return NextResponse.json({
      success: true,
      timestamp,
      signature,
      api_key: cloudinaryConfig.api_key,
      cloud_name: cloudinaryConfig.cloud_name,
    });
  } catch (e: any) {
    console.log(e?.message);

    return new Response(e?.message ?? "Internal server error!", {
      status: 500,
    });
  }
}
