import { cn } from "@/lib/utils"
import type { Message } from "@/schemas/chatSchema"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CheckCheck } from "lucide-react"
import { formatTime } from "@/lib/formatTime"

interface MessageBubbleProps {
    message: Message
    isOwn: boolean
    senderPhotoURL?: string
    senderName?: string
}

export function MessageBubble({ message, isOwn, senderPhotoURL, senderName }: MessageBubbleProps) {
    return (
        <div className={cn(
            "flex items-end gap-2.5",
            isOwn ? "self-end flex-row-reverse max-w-[80%]" : "max-w-[80%]",
            !isOwn && "mb-2",
        )}>
            {!isOwn && (
                <Avatar className="w-7 h-7 mb-1 shrink-0">
                    <AvatarImage src={senderPhotoURL} />
                    <AvatarFallback className="text-xs">
                        {senderName?.charAt(0) || "?"}
                    </AvatarFallback>
                </Avatar>
            )}
            <div className={cn(
                "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                isOwn 
                    ? "bg-primary text-primary-foreground rounded-br-sm shadow-sm" 
                    : "bg-white text-[#1E1E1E] rounded-bl-sm border border-black/5 shadow-sm"
            )}>
                <p className="whitespace-pre-wrap break-words">
                    {message.text}
                    <span className="inline-block w-16" aria-hidden="true" />
                </p>
                <div className="absolute bottom-2 right-3 flex items-center gap-1">
                    <span className={cn(
                        "text-[10px]",
                        isOwn ? "text-primary-foreground/60" : "text-black/40"
                    )}>
                        {formatTime(message.timestamp)}
                    </span>
                    {isOwn && (
                        <CheckCheck className="size-3.5 text-[#233A6C]" />
                    )}
                </div>
            </div>
        </div>
    )
}