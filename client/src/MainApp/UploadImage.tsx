
import type { Uploads } from "../App"

type uploadedImageProps = {
    uploadedImage: Uploads[] | null;
    setUploadedImage: (value: Uploads[] | null) => void;  
    drawCanvas: () => void
}

export default function UploadImage({uploadedImage, setUploadedImage, drawCanvas}: uploadedImageProps) {
    let nextId = 0

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
            <div className="border border-dashed border-(--border-color) rounded h-28 grid place-items-center" id="uploadZone">
                <input type="file" id="photoInput" accept="image/*" multiple className="absolute opacity-0" 
                onChange={handleImageChange}
                />
                <strong>Click or drag photo here</strong>
        </div>
      </label>
    )
}