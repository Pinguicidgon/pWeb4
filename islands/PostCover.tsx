import { JSX } from "preact";

interface PostCoverProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PostCover({ src, alt, width, height }: PostCoverProps) {
  const handleImageError = (e: JSX.TargetedEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='100%' height='100%' fill='%23e5e7eb'/%3E%3C/svg%3E";
  };

  return (
    <div className="post-cover">
      <img 
        src={src}
        alt={alt}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    </div>
  );
}
