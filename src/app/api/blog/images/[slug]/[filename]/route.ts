import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  try {
    const { slug, filename } = await params;
    
    // Construct the path to the image in the content directory
    const imagePath = join(process.cwd(), "content", "posts", slug, filename);
    
    // Read the image file
    const imageBuffer = await readFile(imagePath);
    
    // Determine content type based on file extension
    const ext = filename.split(".").pop()?.toLowerCase();
    const contentType = 
      ext === "png" ? "image/png" :
      ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
      ext === "gif" ? "image/gif" :
      ext === "webp" ? "image/webp" :
      ext === "svg" ? "image/svg+xml" :
      "application/octet-stream";
    
    // Return the image with appropriate headers
    return new NextResponse(imageBuffer.toString("base64"), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}

