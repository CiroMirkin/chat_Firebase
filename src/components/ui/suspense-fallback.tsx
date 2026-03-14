import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface Props {
    text?: string
    spinnerSize?: "size-4" | "size-6" | "size-8"
    className?: string
}

function SuspenseFallback({ text, spinnerSize, className }: Props) {
    return (
        <div className={cn("w-full h-full grid place-items-center", className)}>
            <div className="flex gap-2 items-center">
                <Spinner className={cn(spinnerSize)} />
                { text && <span>{ text }</span> }
            </div>
        </div>
    )
}

export default SuspenseFallback
