import React, { useRef } from 'react';
import { showAlert } from "../utils/utils";

interface QRCodeImageProps {
  data: string;
}

const QRCodeImage: React.FC<QRCodeImageProps> = ({ data }) => {
  const qrCodeRef = useRef<HTMLImageElement>(null);

  const handleCopyClick = () => {
    if (qrCodeRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = qrCodeRef.current;

      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]);

            showAlert({
              msg: "QRcode copied",
              type: "success",
          });
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img ref={qrCodeRef} src={data} alt="QR Code" className="w-48 h-48 mb-4" />
      <button
        onClick={handleCopyClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Copy QR Code
      </button>
    </div>
  );
};

export default QRCodeImage;
