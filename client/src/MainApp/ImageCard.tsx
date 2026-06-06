type ImageCardProps = {
  src: string
  name: string
  status?: string
  onCancel?: () => void
  onClick?: () => void
}

export default function ImageCard({ src, name, status = 'Active', onCancel , onClick}: ImageCardProps) {
  return (
    <div className="relative  overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.25)]" >
      <div className="relative overflow-hidden" onClick={onClick}>
        <img
          src={src}
          alt={name}
          className="h-60 w-full object-cover"
        />
        <div className="absolute top-3 right-3 rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
          {status}
        </div>
      </div>

      <div className="bg-(--light-black) px-3 py-3 flex items-center">
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white truncate">
              {name}
            </p>
          </div>
          <button
              type="button"
              onClick={onCancel}
              className="shrink-0 h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-red-600/25"
              aria-label={`Remove ${name}`}
            >
              ✕
            </button>
          {/* {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              aria-label={`Remove ${name}`}
            >
              +
            </button>
          ) : null} */}
        
      </div>
    </div>
  )
}
