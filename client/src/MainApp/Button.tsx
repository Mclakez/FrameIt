type Variant = "select" | "download" | "brand"

type ButtonProps = {
    text: string;
    variant: Variant
    onClick?: () => void
    disabled?: boolean;
}

export default function Button({text, variant, onClick, disabled}: ButtonProps) {
const styles = {
    select: "bg-(--frameit-purple)",
    download: "bg-(--frameit-green)",
    brand: "bg-(--frameit-purple)"
}

    return(
        <>
            <button className={`w-full py-3 ${styles[variant]} text-white rounded ${disabled ? 'opacity-50': ''} ` } onClick={onClick}>{text}</button>
        </>
    )
}