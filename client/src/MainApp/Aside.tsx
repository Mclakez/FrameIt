import UploadImage  from "./UploadImage";
import Button from "./Button";
import UploadBrandKit from "./UploadBrandKit";
import PositionRadio from "./PositionRadio";
import { RefObject, useState} from "react";
import type { Uploads } from "../App";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export type AsideProps = {
    uploadedImage: Uploads[] | null;
    setUploadedImage: (value: Uploads[] | []) => void;
    logoImage: HTMLImageElement | null;
    setLogoImage: (value: HTMLImageElement | null) => void;
    drawCanvas: (value: HTMLImageElement) => void;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    setOverlayPosition: (value: string) => void
    overlayPosition: string
    showBrandModal: boolean;
    setShowBrandModal: (value: boolean) => void;
    brandCards: any[];
    setBrandCards: (value: any[]) => void;
}

export default function Aside({uploadedImage, setUploadedImage,logoImage, setLogoImage, drawCanvas, canvasRef, setOverlayPosition, overlayPosition, showBrandModal, setShowBrandModal, brandCards, setBrandCards}: AsideProps) {

    
    
    async function downloadImage() {
        // if(!canvasRef.current || !uploadedImage) return
        // for (const entry of uploadedImage) {
        //      const link = document.createElement('a');
        //      if(!entry.processedImage) return
        //     link.href = entry.processedImage;
        //     link.download = `framed-event-photo-${entry.id}.png`;
        //     link.click();
        // }


        if (uploadedImage?.length === 0) return;

  const zip = new JSZip();

  uploadedImage?.forEach((image, index) => {
    const base64Data = image.processedImage?.split(",")[1];
    zip.file(image.name || `frameit-${index + 1}.png`, base64Data, {
      base64: true,
    });
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "frameit-photos.zip");
       
    }

    function brandImages() {
        if(!uploadedImage) return
        for (const entry of uploadedImage) {
            console.log(entry);
            
           const url = drawCanvas(entry.img)

           entry.processedImage = url
           console.log(url);
           
        }
    }

const getCards = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:3000/api/brandkits',{
          headers: {'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        setBrandCards(data.brandKits)
      } catch (error) {
        console.log('Error:', error);
      }
    }

    return (
        <div className="w-full max-w-60 mx-auto flex flex-col gap-8 items-center sticky top-16">
            <UploadImage uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}  drawCanvas={drawCanvas}/>
            <Button text="Select brand kit" variant="select" onClick={async () =>{
                 setShowBrandModal(true)
                 await getCards()
            }}/>
            <UploadBrandKit logoImage={logoImage} setLogoImage={setLogoImage} drawCanvas={drawCanvas} />
            <PositionRadio  setOverlayPosition={setOverlayPosition} overlayPosition={overlayPosition}/>
            <Button text="Brand all images" variant="brand" onClick={brandImages}/>
            <Button text="Download as ZIP" variant="download" onClick={downloadImage}/>
            
        </div>
    )
} 