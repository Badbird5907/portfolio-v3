import Image from "next/image";
import { XIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BlogImageProps extends Omit<React.ComponentProps<typeof Image>, "src" | "alt"> {
  src: string;
  alt?: string;
  slug?: string;

}

export function BlogImage({ slug, src, alt, className, width, height, priority, fill, ...props }: BlogImageProps) {
  const [open, setOpen] = useState(false);
  const containerClassName = `rounded-lg my-8 max-w-full overflow-hidden ${className || ""}`;
  
  let imageSrc = src;
  if (!imageSrc.startsWith("http") && !imageSrc.startsWith("/")) {
    if (imageSrc.startsWith("@")) {
      imageSrc = imageSrc.slice(1);
    }
    imageSrc = `/blog/${slug}/${imageSrc}`;
  } else {
    imageSrc = src;
  }


  // Use original dimensions for dialog (larger), constrained dimensions for thumbnail
  const thumbnailWidth = width || 1200;
  const thumbnailHeight = height || 800;
  const dialogWidth = 1920; // Always use larger dimensions for dialog
  const dialogHeight = 1280;
  
  const Thumbnail = () => {
    // If width is provided, use it for display; otherwise use w-full
    const widthClass = width ? "" : "w-full";
    const widthStyle = width ? { width: `${width}px` } : undefined;
    
    return (
      <Image
        src={imageSrc}
        alt={alt || ""}
        width={thumbnailWidth}
        height={thumbnailHeight}
        className={cn("cursor-zoom-in h-auto", widthClass, containerClassName, "shadow-lg")}
        style={widthStyle}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        {...props}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <button className={cn(width ? "inline-block" : "w-full", "bg-transparent border-none p-0 text-left")} type="button">
              <Thumbnail />
          </button>
      </DialogTrigger>
      <DialogContent 
          className="!fixed !inset-0 !w-screen !h-screen !transform-none !translate-x-0 !translate-y-0 !max-w-none !top-0 !left-0 !bg-transparent !border-none !shadow-none !flex !items-center !justify-center !z-50 !p-0 !gap-0"
          showCloseButton={false}
      >
         <DialogTitle className="sr-only">{alt || "Image preview"}</DialogTitle>
         
         <button 
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 z-50 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              type="button"
              aria-label="Close"
         >
              <XIcon className="w-6 h-6" />
         </button>
         
         <div 
              className="relative w-full h-full flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setOpen(false)}
         >
              <Image
                  src={imageSrc} 
                  alt={alt || ""} 
                  width={dialogWidth}
                  height={dialogHeight}
                  className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-md shadow-2xl cursor-default"
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()}
              />
         </div>
      </DialogContent>
    </Dialog>
  );
};
