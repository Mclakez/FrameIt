
import { useState } from "react";
import type { Uploads } from "../App"
import { useImageUpload } from "../hooks/useImageUpload";

type uploadedImageProps = {
    uploadedImage: Uploads[] | [];
    setUploadedImage: (value: Uploads[] | []) => void;  
}

export default function UploadImage({uploadedImage, setUploadedImage}: uploadedImageProps) {
    const [isDragging, setIsDragging] = useState(false)
    const {processFiles} = useImageUpload(setUploadedImage)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    await processFiles(files)
    
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement> ) {
                const files = e.target.files
                await processFiles(files)             
                    
    }
    

    return(
        <label className="text-white w-full">
            <div>Upload Photo</div>
            <div className={`border border-dashed border-(--border-color) rounded h-28 grid place-items-center ${isDragging ? "border-(--frameit-purple) bg-white/5" : ""}`} 
            id="uploadZone"
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <input type="file" id="photoInput" accept="image/*" multiple className="absolute opacity-0" 
            onChange={handleImageChange}
            />
            <strong className="text-center">Click or drag photo here</strong>
        </div>
      </label>
    )
}