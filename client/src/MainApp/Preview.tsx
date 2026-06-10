import { Uploads } from "../App";


export type PreviewProps = {
    selectedImage: Uploads | null;
    
}

export default function Preview({selectedImage}: PreviewProps) {
    
    return (
        <div className="flex p-8 sticky top-16">
            {selectedImage ? <img src={selectedImage?.processedImage ||
                    selectedImage?.src} alt="preview" className="max-w-full object-contain"/> : <div className="w-full h-screen rounded flex items-center justify-center">
                <span className="text-(--border-color) text-center">Select an image to preview</span>
            </div>}
            
        </div>
    )
} 

{/* <img 
                src={
                    selectedImage?.processedImage ||
                    selectedImage?.src
                }
                className="w-full block max-w-full object-contain"
            /> */}