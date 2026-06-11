type LogoSizeSliderProps = {
  logoSize: number;
  setLogoSize: (value: number) => void;
}

export default function LogoSizeSlider({ logoSize, setLogoSize }: LogoSizeSliderProps) {
  return (
    <div className="w-full text-white flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span>Logo Size</span>
        <span className="text-sm text-(--frameit-purple)">{logoSize}%</span>
      </div>
      <input
        type="range"
        min={5}
        max={50}
        value={logoSize}
        onChange={(e) => setLogoSize(Number(e.target.value))}
        className="w-full accent-(--frameit-purple)"
      />
      <div className="flex justify-between text-xs text-(--border-color)">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  )
}