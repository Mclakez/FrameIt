import './App.css'

import { useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import BrandKit from './Brandkit/Brandkit';
import MainApp from './MainApp/MainApp';
import Signup from './Signup'
import Login from './Login'
import LandingPage from './Landingpage';
import AuthSuccess from './AuthSuccess';
import fetchWithClient from './lib/fetchClient';
import { useCanvasContext } from './contexts/CanvasContext';


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
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandCards, setBrandCards] = useState<BrandCards []>([])
  const [userName, setUserName] = useState<string | null>(null);



 const { drawCanvas,selectedImage, logoImage, logoSize, logoPadding, overlayPosition, setSelectedImage } = useCanvasContext()



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
        <Route path="/app" element={<MainApp showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} userName={userName} />} />
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
