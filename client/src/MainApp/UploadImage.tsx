
import { useState } from "react";
import type { Uploads } from "../App"

type uploadedImageProps = {
    uploadedImage: Uploads[] | [];
    setUploadedImage: (value: Uploads[] | []) => void;  
}

export default function UploadImage({uploadedImage, setUploadedImage}: uploadedImageProps) {
    let nextId = 0
    const [isDragging, setIsDragging] = useState(false)

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

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return

        const files = e.dataTransfer.files
        const entries: Uploads[] = []
        let loadedCount = 0
        setUploadedImage([])

        for (const file of files) {
            const id = nextId++;
            const src = await readFile(file)
            const img = await loadImage(src)
            const entry: Uploads = {id, img,src, name: file.name, processedImage: null }
            entries.push(entry)
            loadedCount++
            if (loadedCount === files.length) {
                    setUploadedImage(entries)
                    console.log(uploadedImage);
            }  
                    

        }
    
    }


    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement> ) {
                const files = e.target.files
                const entries: Uploads[] = []
                let loadedCount = 0
                
                if(!files) return
                setUploadedImage([])

                for (const file of files) {
                    const id = nextId++;
                    const src = await readFile(file)
                    const img = await loadImage(src)
                    const entry: Uploads = {id, img,src, name: file.name, processedImage: null }
                    entries.push(entry)
                    loadedCount++
                    if (loadedCount === files.length) {
                            setUploadedImage(entries)
                            console.log(uploadedImage);
                    }  
                             

                }
                    
                    
    }

    function loadImage(src : string) {
        return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image()
                img.onload = () => {
                    resolve(img)     
                }
                img.src = src
        })
    }

    function readFile(file : File): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader()
                    reader.onload = ev => {
                        resolve(ev.target?.result as string)
                        
                    }
                    reader.readAsDataURL(file)
        })
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