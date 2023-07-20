// Function to convert image to WebP format
// PS: Thank you sooo much Chatgpt
export function convertToWebP(fileList: FileList): Promise<string[]> {
  const files = Array.from(fileList);
  const conversionPromises = files.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          context?.drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (typeof reader.result === "string") {
                  resolve(reader.result);
                } else {
                  reject(new Error("Failed to convert image to WebP format."));
                }
              };
              reader.readAsDataURL(blob);
            } else {
              reject(new Error("Failed to convert image to WebP format."));
            }
          }, "image/webp", 1);
        };

        img.onerror = () => {
          reject(new Error("Failed to load image."));
        };

        img.src = reader.result as string;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file."));
      };

      reader.readAsDataURL(file);
    });
  });

  return Promise.all(conversionPromises);
}

export function base64ToBlob(base64Data: string, contentType: string): File {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new File(byteArrays, `${Date.now()}`, { type: contentType });
}
