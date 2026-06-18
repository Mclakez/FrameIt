import { createContext, useContext, useState, useRef, useCallback} from "react"
import type { Uploads } from "../App"

type CanvasContextType = {
  uploadedImage: Uploads[]
  setUploadedImage: (value: Uploads[]) => void
  selectedImage: Uploads | null
  setSelectedImage: React.Dispatch<React.SetStateAction<Uploads | null>>
  logoImage: HTMLImageElement | null;
  setLogoImage: (value: HTMLImageElement | null) => void;
  overlayPosition: string
  setOverlayPosition: (value: string) => void
  logoSize: number
  setLogoSize: (value: number) => void
  logoPadding: number
  setLogoPadding: (value: number) => void
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  drawCanvas: (img: HTMLImageElement) => string | undefined
}

const CanvasContext = createContext<CanvasContextType | null>(null)

export const CanvasProvider = ({children}: {children:React.ReactNode}) => {
      const [uploadedImage, setUploadedImage] = useState<Uploads [] | [] >([]);
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const [logoImage,setLogoImage] = useState<HTMLImageElement | null>(null);
      const [selectedImage, setSelectedImage] = useState<Uploads | null>(null)
      const [overlayPosition, setOverlayPosition] = useState<string>("top")
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

return (
    <CanvasContext.Provider value={{
      uploadedImage, setUploadedImage,
      selectedImage, setSelectedImage,
      overlayPosition, setOverlayPosition,
      logoSize, setLogoSize,
      logoPadding, setLogoPadding,
      canvasRef, drawCanvas,logoImage,setLogoImage
    }}>
      {children}
    </CanvasContext.Provider>
)
}

export const useCanvasContext = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvasContext must be used within a CanvasProvider')
  }
  return context
}