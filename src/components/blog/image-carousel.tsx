"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

interface CarouselItem {
  src: string;
  caption: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
}

export function createImageCarouselComponent(slug: string) {
  return function ImageCarousel({ items }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const currentItem = items[currentIndex];


    let imageSrc = currentItem.src;
    if (!imageSrc.startsWith("http")) {
      if (imageSrc.startsWith("@")) {
        imageSrc = imageSrc.slice(1);
      }
      imageSrc = `/blog/${slug}/${imageSrc}`;
    } else {
      imageSrc = currentItem.src;
    }

    return (
      <div className="my-8 flex flex-col items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="relative w-full overflow-hidden rounded-lg bg-muted/20 border group">
            <DialogTrigger asChild>
              <button
                className="aspect-video relative flex flex-col items-center justify-center w-full bg-transparent border-none p-0 cursor-zoom-in"
                type="button"
              >
                <img
                  src={imageSrc}
                  alt={currentItem.caption}
                  className="max-h-full max-w-full object-contain w-full h-full"
                  loading="lazy"
                />
              </button>
            </DialogTrigger>

            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={next}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <DialogContent
            className="!fixed !inset-0 !w-screen !h-screen !transform-none !translate-x-0 !translate-y-0 !max-w-none !top-0 !left-0 !bg-transparent !border-none !shadow-none !flex !items-center !justify-center !z-50 !p-0 !gap-0"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">
              {currentItem.caption || "Image preview"}
            </DialogTitle>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 z-50 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              type="button"
              aria-label="Close"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <div 
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={() => setOpen(false)}
            >
              <img
                src={imageSrc}
                alt={currentItem.caption}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {items.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 w-fit bg-background/50 backdrop-blur-sm rounded-full p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-white px-4 py-2">
                {currentItem.caption}
              </p>
              {items.length > 1 && (
                <div className="flex justify-center gap-1.5">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white",
                        idx === currentIndex
                          ? "bg-primary"
                          : "bg-primary/40 hover:bg-primary/60"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="text-center w-full pb-4">
          <p className="text-sm text-muted-foreground">{currentItem.caption}</p>
          {items.length > 1 && (
            <div className="flex justify-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                    idx === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
}
