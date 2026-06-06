import './App.css'


import { useState, useRef, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import BrandKit from './Brandkit/Brandkit';
import MainApp from './MainApp/MainApp';
import Signup from './Signup'
import Login from './Login'
import LandingPage from './Landingpage';
import AuthSuccess from './AuthSuccess';

export type Uploads = {
  id: number;
  img: HTMLImageElement;
  src: string;
  processedImage: string | null;
  name: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<Uploads [] >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImage,setLogoImage] = useState<HTMLImageElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<Uploads | null>(null)
  const [overlayPosition, setOverlayPosition] = useState<string>("top")
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandCards, setBrandCards] = useState<any []>([])
  
  function drawCanvas(img: HTMLImageElement) {
    if (!img || !canvasRef.current) return;

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Canvas size matching image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw photo
    ctx.drawImage(img, 0, 0);
    // const pad = canvas.height * 0.02; // small gap from the bottom edge

if (logoImage) {
    const logoH = canvas.height * 0.08; // 8% of image height, small and clean
    const logoW = (logoImage.width / logoImage.height) * logoH;

    const x = (canvas.width - logoW) / 2;

    if (overlayPosition === "top") {
      const y = canvas.height * 0.02; // 2% gap from top
       ctx.globalAlpha = 0.9;
    ctx.drawImage(logoImage, x, y, logoW, logoH);
    ctx.globalAlpha = 1;
    } else if (overlayPosition === "bottom") {
      const y = canvas.height - logoH - (canvas.height * 0.02); // 2% gap from bottom
       ctx.globalAlpha = 0.9;
    ctx.drawImage(logoImage, x, y, logoW, logoH);
    ctx.globalAlpha = 1;
    }
    
   
}
    return canvas.toDataURL()
  }

  useEffect(() => {
  if (uploadedImage && uploadedImage.length > 0 && canvasRef.current) {
    uploadedImage.forEach((entry) => {
      const processedUrl = drawCanvas(entry.img);
      entry.processedImage = processedUrl;
    });
  }
}, [uploadedImage, logoImage]);




  return (
    <>
      
      <Routes>
        <Route path="/app" element={<MainApp uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} logoImage={logoImage} setLogoImage={setLogoImage} drawCanvas={drawCanvas} canvasRef={canvasRef} setOverlayPosition={setOverlayPosition} overlayPosition={overlayPosition} selectedImage={selectedImage} setSelectedImage={setSelectedImage} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards}/>} />
        <Route path="/brandkit" element={<BrandKit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    
    </>
  )
}

export default App
