import { useCanvasContext } from "../contexts/CanvasContext"
export default function Preview() {
    const { selectedImage } = useCanvasContext()
    
    return (
        <div className="flex p-8 sticky top-16">
            {selectedImage ? <img src={selectedImage?.processedImage ||
                    selectedImage?.src} alt="preview" className="max-w-full object-contain"/> : <div className="w-full h-screen rounded flex items-center justify-center">
                <span className="text-(--border-color) text-center">Select an image to preview</span>
            </div>}
            
        </div>
    )
} 
