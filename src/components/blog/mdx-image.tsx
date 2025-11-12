interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  slug?: string;
}

export function createMDXImageComponent(slug: string) {
  return function MDXImage({ src, alt, ...props }: MDXImageProps) {
    // Handle @ prefix - treat it as a relative path to the post's image directory
    if (src.startsWith("@")) {
      const filename = src.slice(1);
      return (
        <img
          src={`/api/blog/images/${slug}/${filename}`}
          alt={alt || ""}
          className="rounded-lg my-8 shadow-lg max-w-full h-auto"
          {...props}
        />
      );
    }

    // Handle regular image paths
    return (
      <img
        src={src}
        alt={alt || ""}
        className="rounded-lg my-8 shadow-lg max-w-full h-auto"
        {...props}
      />
    );
  };
}

