import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import fs from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Params }) {
  const imagePath = join(process.cwd(), "public", "CardImage.jpg");
  const imageData = fs.readFileSync(imagePath);
  const imageToBase64 = Buffer.from(imageData).toString("base64");
  const session = await getServerSession(authOptions);

  const response = await fetch(`https://api.spotify.com/v1/playlists/${params.id}/images`, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: imageToBase64,
  });
  const data = await response;
  return NextResponse.json({ status: data.status, success: data.ok });
}
