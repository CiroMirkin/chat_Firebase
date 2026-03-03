import { cn } from "@/lib/utils"
import type { Message } from "@/schemas/chatSchema"

export interface MessageBubbleProps {
    message: Message
    isOwn: boolean
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    return (
        <div className={cn(
            "flex",
            isOwn ? "justify-end" : "justify-start"
        )}>
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2",
                    isOwn ? "bg-primary text-primary-foreground" : "bg-teal-200"
                )}
            >
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
        </div>
    )
}
