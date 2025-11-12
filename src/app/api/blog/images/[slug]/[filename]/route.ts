import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";
import { stat } from "fs/promises";
import { Readable } from "stream";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  try {
    const { slug, filename } = await params;
    
    // Construct the path to the image in the content directory
    const imagePath = join(process.cwd(), "content", "posts", slug, filename);
    
    // Check if file exists and get its stats
    const stats = await stat(imagePath);
    
    // Determine content type based on file extension
    const ext = filename.split(".").pop()?.toLowerCase();
    const contentType = 
      ext === "png" ? "image/png" :
      ext === "jpg" || ext === "jpeg" ? "image/jpeg" :
      ext === "gif" ? "image/gif" :
      ext === "webp" ? "image/webp" :
      ext === "svg" ? "image/svg+xml" :
      "application/octet-stream";
    
    // Create a readable stream from the file and convert to Web Stream
    const fileStream = createReadStream(imagePath);
    const webStream = Readable.toWeb(fileStream) as ReadableStream<Uint8Array>;
    
    // Return the streamed image with appropriate headers
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}

