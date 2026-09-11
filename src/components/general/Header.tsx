
interface HeaderProps {
    title:string,
    as?:"h1" | "h2",
}

export default function Header({title, as:Tag = "h1"}:HeaderProps) {
    const sizeClasses={
        h1:"text-3xl md:text-4xl",
        h2:"text-2xl md:text-3xl",
    }
    return (
        <div className="py-14 md:py-20 justify-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <span className="accent-divider"></span>
                <span className="w-1.5 h-1.5 rotate-45 bg-[#2dd4bf] shadow-[0_0_8px_2px_rgba(45,212,191,0.6)]"></span>
                <span className="accent-divider reverse"></span>
            </div>
            <Tag className={ `font-heading font-bold tracking-wide text-transparent bg-clip-text
           bg-linear-to-r from-[#2dd4bf] to-[#e6b94d] ${sizeClasses[Tag]} text-center`}>
                {title}
            </Tag>

        </div>
    )
}