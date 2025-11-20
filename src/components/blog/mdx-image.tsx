import Image from "next/image";

interface MDXImageProps extends Omit<React.ComponentProps<typeof Image>, "src" | "alt"> {
  src: string;
  alt?: string;
  slug?: string;
}

export function createMDXImageComponent(slug: string) {
  return function MDXImage({ src, alt, className, width, height, ...props }: MDXImageProps) {
    const containerClassName = `rounded-lg my-8 max-w-full overflow-hidden ${className || ""}`;
    
    // Handle @ prefix - treat it as a relative path to the post's image directory
    if (src.startsWith("@")) {
      const filename = src.slice(1);
      const imageSrc = `/api/blog/images/${slug}/${filename}`;
      
      // If width/height provided, use them; otherwise use fill with container
      if (width && height) {
        return (
          <Image
            src={imageSrc}
            alt={alt || ""}
            width={width}
            height={height}
            className={`${containerClassName} shadow-lg`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            {...props}
          />
        );
      }
      
      return (
        <span className={`relative block w-full ${containerClassName}`} style={{ display: "block" }}>
          <img
            src={imageSrc}
            alt={alt || ""}
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            loading="lazy"
            {...props}
          />
        </span>
      );
    }

    // Handle regular image paths
    if (width && height) {
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={width}
          height={height}
          className={`${containerClassName} shadow-lg`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          {...props}
        />
      );
    }
    
    return (
      <span className={`relative block w-full ${containerClassName}`} style={{ display: "block" }}>
        <img
          src={src}
          alt={alt || ""}
          className="w-full h-auto object-contain rounded-lg shadow-lg"
          loading="lazy"
          {...props}
        />
      </span>
    );
  };
}

