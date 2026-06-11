import { useState } from "react";

type LogoSizeSliderProps = {
  logoSize: number;
  setLogoSize: (value: number) => void;
};

export default function LogoSizeSlider({
  logoSize,
  setLogoSize,
}: LogoSizeSliderProps) {
  const [localSize, setLocalSize] = useState(logoSize);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalSize(value);
  };

  const handleCommit = (e: React.PointerEvent<HTMLInputElement>) => {
    setLogoSize(Number((e.target as HTMLInputElement).value));
  };

  return (
    <div className="w-full text-white flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span>Logo Size</span>
        <span className="text-sm text-(--frameit-purple)">{localSize}%</span>
      </div>

      <input
        type="range"
        min={5}
        max={50}
        value={localSize}
        onChange={handleChange}
        onPointerUp={handleCommit}
        className="w-full accent-(--frameit-purple)"
      />

      <div className="flex justify-between text-xs text-(--border-color)">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  );
}