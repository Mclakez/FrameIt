import { useState } from "react";

type PositionRadioProps = {
    setOverlayPosition: (value: string) => void
    overlayPosition: string
    logoPadding: number
    setLogoPadding: (value: number) => void
}

export default function PositionRadio({setOverlayPosition, overlayPosition, logoPadding, setLogoPadding}: PositionRadioProps) {

    const [localPadding, setLocalPadding] = useState(logoPadding);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalPadding(value);
  };

  const handleCommit = (e: React.PointerEvent<HTMLInputElement>) => {
    setLogoPadding(Number((e.target as HTMLInputElement).value));
  };

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
            <div className="w-full text-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <span>Padding</span>
                <span className="text-sm text-(--frameit-purple)">{logoPadding}%</span>
            </div>
            <input
                type="range"
                min={1}
                max={15}
                value={localPadding}
                onChange={handleChange}
                onPointerUp={handleCommit}
                className="w-full accent-(--frameit-purple)"
            />
            </div>
        </>
    )
}