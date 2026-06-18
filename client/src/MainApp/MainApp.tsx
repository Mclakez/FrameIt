import Aside from './Aside'
import Preview from './Preview'
import ImageScreen from './ImageScreen'
import Header from '../Header'
import type { BrandCards } from "../App";
import {useState} from 'react'


type MainAppProps = {
  showBrandModal: boolean;
  setShowBrandModal: (value: boolean) => void;
  brandCards: BrandCards[];
  setBrandCards: (value: BrandCards[]) => void;
  userName: string | null;
};

export default function MainApp({showBrandModal, setShowBrandModal, brandCards, setBrandCards, userName}: MainAppProps) {

  const [previewImage, setPreviewImage] = useState<string | null>(null) 
    return (
        <>
        <Header userName={userName}/>
        <div className='md:grid md:grid-cols-4 bg-black'>
        <aside className='h-full md:min-h-screen border border-r-(--border-color) border-l-(--border-color) bg-(--light-black) p-8  scrollbar-default scrollbar-thumb-purple-500 scrollbar-track-transparent'>
          <Aside showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} previewImage={previewImage} setPreviewImage={setPreviewImage}/>
        </aside>
        <main className='col-span-2'>
          <ImageScreen showBrandModal={showBrandModal} setShowBrandModal={setShowBrandModal} brandCards={brandCards} setBrandCards={setBrandCards} setPreviewImage={setPreviewImage}/>
        </main>

        <aside className='hidden md:block h-full border border-r-(--border-color) border-l-(--border-color) bg-(--light-black)'>
          <Preview/>
        </aside>
      </div>
        </>
    )
}