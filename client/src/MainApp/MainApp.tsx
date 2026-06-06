import Aside from './Aside'
import Preview from './Preview'
import ImageScreen from './ImageScreen'
import Header from '../Header'

export default function MainApp({uploadedImage, setUploadedImage, logoImage, setLogoImage, drawCanvas, canvasRef, setOverlayPosition, overlayPosition, selectedImage, setSelectedImage, showBrandModal, setShowBrandModal, brandCards, setBrandCards}: any) {
    return (
        <>
        <Header/>
        <div className='grid grid-cols-4 bg-black'>
        <aside className='min-h-screen border border-r-(--border-color) border-l-(--border-color) bg-(--light-black) p-8  scrollbar-default scrollbar-thumb-purple-500 scrollbar-track-transparent'>
          <Aside uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} logoImage={logoImage} setLogoImage={setLogoImage} drawCanvas={drawCanvas} canvasRef={canvasRef} setOverlayPosition={setOverlayPosition} overlayPosition={overlayPosition} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards}/>
        </aside>
        <main className='col-span-2'>
          <ImageScreen canvasRef={canvasRef} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} setSelectedImage={setSelectedImage} showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} setLogoImage={setLogoImage}/>
        </main>

        <aside className='h-full border border-r-(--border-color) border-l-(--border-color) bg-(--light-black)'>
          <Preview selectedImage={selectedImage}/>
        </aside>
      </div>
        </>
    )
}