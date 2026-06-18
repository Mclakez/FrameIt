import UploadImage  from "./UploadImage";
import Button from "./Button";
import UploadBrandKit from "./UploadBrandKit";
import PositionRadio from "./PositionRadio";
import { useState} from "react";
import type { BrandCards } from "../App";
import LogoSizeSlider from "./LogoSizeSlider";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import fetchWithClient from "../lib/fetchClient";
import { useCanvasContext } from "../contexts/CanvasContext";
export type AsideProps = {
    showBrandModal?: boolean;
    setShowBrandModal: (value: boolean) => void;
    brandCards?: BrandCards[];
    setBrandCards: (value: BrandCards[]) => void;
    previewImage: string | null;
    setPreviewImage: (value: string | null) => void;
}

export default function Aside({setShowBrandModal, setBrandCards, previewImage, setPreviewImage}: AsideProps) {
  const {uploadedImage, canvasRef, drawCanvas, setUploadedImage, logoImage} = useCanvasContext()

    const [download, setDownload] = useState(false)
    
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
    if (!base64Data) return;
    zip.file(image.name || `frameit-${index + 1}.png`, base64Data, {
      base64: true,
    });
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "frameit-photos.zip");
       
    }

    
    function brandImages() {
      if (uploadedImage && uploadedImage.length > 0 && canvasRef.current) {

          setUploadedImage(uploadedImage.map((entry) => ({
              ...entry,
              status: 'Processing'
          })))

    uploadedImage.forEach((entry) => {
      const processedUrl = drawCanvas(entry.img);
      if (processedUrl) {
        entry.processedImage = processedUrl;
      }
      
      setTimeout(()=> {
        setUploadedImage(uploadedImage.map((entry) => ({
              ...entry,
              status: 'Done'
          })))


          setDownload(true)
    }, 800);
      })
  }
    }

const getCards = async () => {
      try {
        const response = await fetchWithClient('/api/brandkits',{
          credentials: 'include',
        })
        const data = await response.json()
        setBrandCards(data.brandKits)
      } catch (error) {
        console.log('Error:', error);
      }
    }

    
    return (
        <div className="w-full md:max-w-60 mx-auto flex flex-col gap-8 items-center md:sticky md:top-16">
            <UploadImage/>
            <Button text="Select brand kit"
                   variant="select" 
                   onClick={async () =>{
                    setShowBrandModal(true)
                    await getCards()
            }}/>
            <UploadBrandKit previewImage={previewImage} setPreviewImage={setPreviewImage} />
            <PositionRadio />
            <LogoSizeSlider/>
            <Button disabled={!uploadedImage?.length  || !logoImage} text="Brand all images" variant="brand" onClick={brandImages} />
            <Button disabled={!uploadedImage?.length || !logoImage || !download}  text="Download as ZIP" variant="download" onClick={downloadImage}/>
            
        </div>
    )
} 