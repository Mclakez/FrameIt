import { useCanvasContext } from "../contexts/CanvasContext";
import ImageCard from "./ImageCard";
import type {BrandCards } from "../App";
import BrandKitCard from "./BrandKitCard";

type ImageScreenProps = {
    showBrandModal: boolean;
    setShowBrandModal: (value: boolean) => void;
    brandCards: BrandCards[];
    setBrandCards?: (value: BrandCards[]) => void;
    setPreviewImage: (value: string | null) => void
}

export default function ImageScreen({showBrandModal, setShowBrandModal, brandCards, setPreviewImage}: ImageScreenProps) {
const {uploadedImage, setUploadedImage, setLogoImage, setSelectedImage, canvasRef, selectedImage} = useCanvasContext()

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
  img.crossOrigin = "anonymous";
  img.src = logoUrl;
  setPreviewImage(logoUrl)
  setShowBrandModal(false);
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
                status={upload.status}
                onClick={() => setSelectedImage(upload)}
                onCancel={() => handleDelete(upload.id)}
                />
            ))}
            
        </div>
        {showBrandModal && (
      <div className="fixed px-4 md:px-12 pt-4 pb-16 w-[calc(100%-4rem)] md:w-1/2 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--bg-black) text-white rounded ">
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
            {brandCards.map((card: BrandCards) => (
                <BrandKitCard key={card._id} logoUrl={card.logoUrl} name={card.brandName} onClick={() => selectBrandLogo(card.logoUrl)} />
            ))}
            
           </div>
            
            


      </div>
    )}

    {selectedImage && (
  <div className="fixed inset-0 z-50 bg-black/95 p-4 flex items-center justify-center md:hidden">
    <button
      type="button"
      onClick={() => setSelectedImage(null)}
      className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white"
    >
      ✕
    </button>

    <img
      src={selectedImage.processedImage || selectedImage.src}
      alt={selectedImage.name}
      className="max-h-full max-w-full object-contain"
    />
  </div>
)}
        </>
    )
}