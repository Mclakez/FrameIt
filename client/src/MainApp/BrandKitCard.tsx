type BrandKitCardProps = {
  logoUrl: string
  name: string
  status?: string
  onClick?: () => void
}

export default function BrandKitCard({ logoUrl, name, onClick}: BrandKitCardProps) {
  return (
    <div className="relative  overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.25)]" onClick={onClick}>
      <div className="relative overflow-hidden bg-(--light-black)" onClick={onClick}>
        <img
          src={logoUrl}
          alt={name}
          className="h-30 w-fit object-contain mx-auto bg-(--light-black) p-4"
        />
      </div>

      <div className="bg-black px-3 py-3 flex items-center">
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white truncate">
              {name}
            </p>
          </div>
          
        
      </div>
    </div>
  )
}
