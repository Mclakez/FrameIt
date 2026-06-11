import Aside from './Aside'
import Preview from './Preview'
import ImageScreen from './ImageScreen'
import Header from '../Header'
import type { Uploads, BrandCards } from "../App";
import {RefObject, useState} from 'react'


type MainAppProps = {
  uploadedImage: Uploads[];
  setUploadedImage: (value: Uploads[] | []) => void;
  logoImage: HTMLImageElement | null;
  setLogoImage: (value: HTMLImageElement | null) => void;
  drawCanvas: (img: HTMLImageElement) => string | undefined;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  setOverlayPosition: (value: string) => void;
  overlayPosition: string;
  selectedImage: Uploads | null;
  setSelectedImage: (value: Uploads | null) => void;
  showBrandModal: boolean;
  setShowBrandModal: (value: boolean) => void;
  brandCards: BrandCards[];
  setBrandCards: (value: BrandCards[]) => void;
  userName: string | null;
  logoSize: number
  setLogoSize: (value: number) => void
  logoPadding: number
  setLogoPadding: (value: number) => void
};

export default function MainApp({uploadedImage, setUploadedImage, logoImage, setLogoImage, drawCanvas, canvasRef, setOverlayPosition, overlayPosition, selectedImage, setSelectedImage, showBrandModal, setShowBrandModal, brandCards, setBrandCards, userName, logoSize, setLogoSize , logoPadding, setLogoPadding}: MainAppProps) {

  const [previewImage, setPreviewImage] = useState<string | null>(null) 
    return (
        <>
        <Header userName={userName}/>
        <div className='md:grid md:grid-cols-4 bg-black'>
        <aside className='h-full md:min-h-screen border border-r-(--border-color) border-l-(--border-color) bg-(--light-black) p-8  scrollbar-default scrollbar-thumb-purple-500 scrollbar-track-transparent'>
          <Aside uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} logoImage={logoImage} setLogoImage={setLogoImage} drawCanvas={drawCanvas} canvasRef={canvasRef} setOverlayPosition={setOverlayPosition} overlayPosition={overlayPosition} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} previewImage={previewImage} setPreviewImage={setPreviewImage} logoSize={logoSize} setLogoSize={setLogoSize} logoPadding={logoPadding} setLogoPadding={setLogoPadding}/>
        </aside>
        <main className='col-span-2'>
          <ImageScreen canvasRef={canvasRef} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} selectedImage={selectedImage} setSelectedImage={setSelectedImage} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} setLogoImage={setLogoImage} setPreviewImage={setPreviewImage}/>
        </main>

        <aside className='hidden md:block h-full border border-r-(--border-color) border-l-(--border-color) bg-(--light-black)'>
          <Preview selectedImage={selectedImage}/>
        </aside>
      </div>
        </>
    )
}