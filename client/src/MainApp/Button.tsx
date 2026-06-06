type Variant = "select" | "download" | "brand"

type ButtonProps = {
    text: string;
    variant: Variant
    onClick?: () => void
}

export default function Button({text, variant, onClick}: ButtonProps) {
const styles = {
    select: "bg-(--frameit-purple)",
    download: "bg-(--frameit-green)",
    brand: "bg-(--frameit-purple)"
}

    return(
        <>
            <button className={`w-full py-3 ${styles[variant]} text-white rounded` } onClick={onClick}>{text}</button>
        </>
    )
}