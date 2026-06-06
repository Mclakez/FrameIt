import { RefObject } from "react";
import ImageCard from "./ImageCard";
import type { Uploads } from "../App";
import BrandKitCard from "./BrandKitCard";

type ImageScreenProps = {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    uploadedImage: Uploads[] | null;
    setSelectedImage: (value: Uploads | null) => void
    setUploadedImage: (value: Uploads[] | []) => void
    showBrandModal: boolean;
    setShowBrandModal: (value: boolean) => void;
    brandCards: any[];
    setBrandCards: (value: any[]) => void;
    setLogoImage: (value: HTMLImageElement | null) => void;
}

export default function ImageScreen({canvasRef, uploadedImage, setSelectedImage, setUploadedImage, showBrandModal, setShowBrandModal, brandCards, setBrandCards, setLogoImage}: ImageScreenProps) {
function handleDelete(id: number) {
    setUploadedImage(uploadedImage?.filter(img => img.id !== id) ?? [])
}

function clearAll() {
    setUploadedImage([])
    setSelectedImage(null)
}

function selectBrandLogo(logoUrl: string) {
  const img = new Image();
  img.onload = () => {
    setLogoImage(img);
  };
  img.onerror = () => {
    console.error("Failed to load brand logo", logoUrl);
  };
  img.crossOrigin = "anonymous"; // optional, useful for canvas drawing
  img.src = logoUrl;
}

    return(
        <>
        <div className="flex justify-between items-center text-(--frameit-purple) p-8 pb-12 bg-(--bg-black)">
            <span>{uploadedImage?.length || 0} image(s) added</span>
            <span className="cursor-pointer" onClick={clearAll}>Clear all</span>
        </div>
        <div className="shadow-md rounded relative grid grid-cols-2 gap-4 p-8">
            <canvas ref={canvasRef} className="max-h-80 max-w-full w-auto h-auto hidden">
            </canvas>

            {uploadedImage?.map((upload) => (
                <ImageCard 
                key={upload.id}
                src={upload.processedImage || upload.src}
                name={upload.name}
                onClick={() => setSelectedImage(upload)}
                onCancel={() => handleDelete(upload.id)}
                />
            ))}
            
        </div>
        {showBrandModal && (
      <div className="fixed px-12 pt-4 pb-16 w-1/2 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--light-black) text-white rounded ">
            <div className="flex justify-end">
              <button
              type="button"
              onClick={() => setShowBrandModal(false)}
              className="h-9 w-9"
            >
              ✕
            </button>
            </div>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {brandCards.map((card: any) => (
                <BrandKitCard key={card.id} logoUrl={card.logoUrl} name={card.brandName} onClick={() => selectBrandLogo(card.logoUrl)} />
            ))}
            
           </div>
            
            


      </div>
    )}
        </>
    )
}