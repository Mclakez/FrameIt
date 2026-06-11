import './App.css'


import { useState, useRef, useEffect, useCallback} from "react";
import { Routes, Route } from "react-router-dom";
import BrandKit from './Brandkit/Brandkit';
import MainApp from './MainApp/MainApp';
import Signup from './Signup'
import Login from './Login'
import LandingPage from './Landingpage';
import AuthSuccess from './AuthSuccess';
import fetchWithClient from './lib/fetchClient';


export type Uploads = {
  id: number;
  img: HTMLImageElement;
  src: string;
  processedImage: string | null;
  name: string;
  status?: 'Pending' | 'Processing' | 'Done';
}

export type BrandCards = {
  _id: string;
  user: string;
  brandName: string;
  logoUrl: string;
  cloudinaryId: string;
};

function App() {
  const [uploadedImage, setUploadedImage] = useState<Uploads [] | [] >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImage,setLogoImage] = useState<HTMLImageElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<Uploads | null>(null)
  const [overlayPosition, setOverlayPosition] = useState<string>("top")
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandCards, setBrandCards] = useState<BrandCards []>([])
  const [userName, setUserName] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(8);
  const [logoPadding, setLogoPadding] = useState<number>(2)

  const drawCanvas = useCallback((img: HTMLImageElement) => {
    if (!img || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    if (logoImage) {
        const logoH = canvas.height * (logoSize / 100);
        const logoW = (logoImage.width / logoImage.height) * logoH;
        const x = (canvas.width - logoW) / 2;
        const y = canvas.height * (logoPadding / 100);

        ctx.globalAlpha = 0.9;

        if (overlayPosition === "top") {
            ctx.drawImage(logoImage, x, y, logoW, logoH);
        } else if (overlayPosition === "bottom") {
            ctx.drawImage(logoImage, x, canvas.height - logoH - y, logoW, logoH);
        }

        ctx.globalAlpha = 1;
    }

    return canvas.toDataURL();
}, [logoImage, overlayPosition, logoSize, logoPadding]);



useEffect(() => {
  const timer = setTimeout(() => {
    if (!selectedImage || !logoImage) return;

    const previewUrl = drawCanvas(selectedImage.img);
    if (!previewUrl) return;

    setSelectedImage((prev) =>
      prev && prev.id === selectedImage.id
        ? { ...prev, processedImage: previewUrl }
        : prev
    );
  }, 120);

  return () => clearTimeout(timer);
}, [selectedImage?.id, logoImage, drawCanvas, logoSize, logoPadding, overlayPosition]);

useEffect(() => {
  const restoreUser = async () => {
    try {
      const res = await fetchWithClient('/api/auth/me', {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserName(data.user.username);
      }
    } catch (error) {
      console.error("Error restoring user:", error);
    }
  };

  restoreUser();
}, []);




  return (
    <>
      
      <Routes>
        <Route path="/app" element={<MainApp uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} logoImage={logoImage} setLogoImage={setLogoImage} drawCanvas={drawCanvas} canvasRef={canvasRef} setOverlayPosition={setOverlayPosition} overlayPosition={overlayPosition} selectedImage={selectedImage} setSelectedImage={setSelectedImage} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} userName={userName} logoSize={logoSize} setLogoSize={setLogoSize} logoPadding={logoPadding} setLogoPadding={setLogoPadding} />} />
        <Route path="/brandkit" element={<BrandKit userName={userName} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login setUserName={setUserName} />} />
        <Route path="/auth-success" element={<AuthSuccess setUserName={setUserName} />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    
    </>
  )
}

export default App
