import { useState } from "react"

type uploadBrandKitProps = {
    setLogoImage: (value: HTMLImageElement | null) => void;  
    previewImage: string | null;
    setPreviewImage: (value: string | null) => void;
}

export default function UploadBrandKit({setLogoImage, previewImage, setPreviewImage}: uploadBrandKitProps) {
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

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return

    const file = e.dataTransfer.files[0]
    const previewURL = URL.createObjectURL(file)
    setPreviewImage(previewURL)
    const reader = new FileReader()
                reader.onload = ev => {
                    const img = new Image()
                    img.onload = () => {
                        setLogoImage(img)
                    }
                    const result = ev.target?.result as string
                    img.src = result
                    setPreviewImage(result)
                }

                reader.readAsDataURL(file)
    
}


    function handleBrandChange(e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) {
            
            const reader = new FileReader()
            reader.onload = ev => {
                const img = new Image()
                img.onload = () => {
                    setLogoImage(img)
                }
                const result = ev.target?.result as string
                img.src = result
                setPreviewImage(result as string)
            }

            reader.readAsDataURL(e.target.files?.[0])
        }
    }
    
    return(
        <label className="text-white w-full">
            <div>Upload BrandKit</div>
            <div className={`border border-dashed border-(--border-color) hover:border-(--frameit-purple) rounded h-28 grid place-items-center overflow-hidden ${isDragging ? "border-(--frameit-purple) bg-white/5" : ""}`} 
            id="uploadZone"
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <input type="file" id="photoInput" accept="image/*" className="hidden" onChange={handleBrandChange} />
            {previewImage ? (
                <img src={previewImage}/>
            ) : (<strong className="text-center">Click or drag brand kit here</strong>)}
        </div>
      </label>
    )
}