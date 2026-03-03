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
            isOwn ? "self-end flex-row-reverse max-w-[80%]" : "max-w-[80%]"
        )}>
            {!isOwn && (
                <Avatar className="w-7 h-7 mb-1 shrink-0">
                    <AvatarImage src={senderPhotoURL} />
                    <AvatarFallback className="text-xs">
                        {senderName?.charAt(0) || "?"}
                    </AvatarFallback>
                </Avatar>
            )}
            <div className={cn("flex flex-col gap-1", isOwn && "items-end")}>
                <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isOwn 
                        ? "bg-primary text-primary-foreground rounded-br-sm shadow-md" 
                        : "bg-white text-[#1E1E1E] rounded-bl-sm border border-black/5 shadow-sm"
                )}>
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                </div>
                <div className={cn("flex items-center gap-1 ml-1", isOwn && "mr-1")}>
                    <span className="text-[10px] text-black/40">
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

export function TypingIndicator() {
    return (
        <div className="flex items-end gap-2.5">
            <Avatar className="w-7 h-7 mb-1 shrink-0 opacity-50">
                <AvatarFallback className="text-xs">?</AvatarFallback>
            </Avatar>
            <div className="bg-[#FAF7CC]/30 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center border border-[#FAF7CC]">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
        </div>
    )
}
