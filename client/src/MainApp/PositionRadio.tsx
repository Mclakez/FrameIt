type PositionRadioProps = {
    setOverlayPosition: (value: string) => void
    overlayPosition: string
}

export default function PositionRadio({setOverlayPosition, overlayPosition}: PositionRadioProps) {
    return(
        <>
            <div className="w-full flex gap-6 justify-start">
                <label className="flex items-center gap-2" onClick={() => setOverlayPosition("top")}>
                    <input type="radio" name="position" value="top" className="hidden"/>
                    <div className="w-5 h-5 rounded-full border border-(--frameit-purple) flex items-center justify-center">
                        {overlayPosition === "top" ? <div className="w-2.5 h-2.5 bg-(--frameit-purple) rounded-full"></div> : <div className="w-2.5 h-2.5 bg-(--frameit-purple) rounded-full hidden"></div>}
                    </div>
                    <span className="text-white" >Top</span>
                </label>

                <label className="flex items-center gap-2" onClick={() => setOverlayPosition("bottom")}>
                    <input type="radio" name="position" value="bottom" className="hidden"/>
                    <div className="w-5 h-5 rounded-full border border-(--frameit-purple) flex items-center justify-center">
                        {overlayPosition === "bottom" ? <div className="w-2.5 h-2.5 bg-(--frameit-purple) rounded-full"></div> : <div className="w-2.5 h-2.5 bg-(--frameit-purple) rounded-full hidden"></div>}
                    </div>
                    <span className="text-white">Bottom</span>
                </label>
            </div>
        </>
    )
}