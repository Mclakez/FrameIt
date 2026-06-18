import { Uploads } from "../App";


export const useImageUpload = (setUploadedImage: (value: Uploads[]) => void) => {
    let nextId = 0
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
    
    
    const processFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return
        const entries: Uploads[] = []
        setUploadedImage([])
        if (files) {
            for (const file of files) {
                const id = nextId++;
                const src = await readFile(file)
                const img = await loadImage(src)
                const entry: Uploads = {id, img,src, name: file.name, processedImage: null }
                entries.push(entry)
            }
            setUploadedImage(entries)
            console.log(files, entries)
        }
    }

            return {processFiles}
}