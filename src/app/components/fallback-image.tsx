"use client";

import { useState } from "react";

type FallbackImageProps = {
  src: string | undefined;
  alt: string;
  placeholderClass: string;
};

export default function FallbackImage({ src, alt, placeholderClass }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={placeholderClass}>
        No image available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}