import React, { useState } from "react";

interface Props {
  imageUrl: string;
  maxWidth: number;
  maxHeight: number;
}

export default function RedimencionadorDeImagem(imageUrl: string, maxWidth: number, maxHeight: number) {
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const handleImageLoad = () => {
    const image = new Image();
    image.src = imageUrl;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      setResizedUrl(canvas.toDataURL());
    }
  };

  return (
    <img
      src={resizedUrl || imageUrl}
      alt=""
      onLoad={handleImageLoad}
      style={{ maxWidth, maxHeight }}
    />
  );
};
