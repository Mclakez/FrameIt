type uploadBrandKitProps = {
    logoImage: HTMLImageElement | null;
    setLogoImage: (value: HTMLImageElement | null) => void;  
    drawCanvas: () => void
}

export default function UploadBrandKit({logoImage, setLogoImage, drawCanvas}: uploadBrandKitProps) {
    function handleBrandChange(e:React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files[0]) {
            
            
            const reader = new FileReader()
            reader.onload = ev => {
                const img = new Image()
                img.onload = () => {
                    setLogoImage(img)
                }
                img.src = ev.target.result
                
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }
    
    return(
        <label className="text-white w-full">
            <div>Upload BrandKit</div>
            <div className="border border-dashed border-(--border-color) rounded h-28 grid place-items-center" id="uploadZone">
                <input type="file" id="photoInput" accept="image/*" className="hidden" onChange={handleBrandChange} />
                <strong>Click or drag brand kit here</strong>
        </div>
      </label>
    )
}