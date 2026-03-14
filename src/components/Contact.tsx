import type { Chat } from "@/schemas/chatSchema"
import { useUser } from "reactfire"
import { useFriendInfo } from "@/hooks/useFriendInfo"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { formatTime } from "@/lib/formatTime"
import { Asterisk } from "lucide-react"


interface Props {
    chat: Chat
    setChatId: (chatId: string) => void
    isSelected: boolean
}

function Contact({ chat, setChatId, isSelected }: Props) {
    const { data: user } = useUser()
    const friendId = chat.participants.find(p => p !== user?.uid) || ""
    const { friend } = useFriendInfo(friendId)
    
    return (
        <div
            className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors
                ${isSelected 
                    ? "bg-secondary/40 shadow-[0_2px_8px_rgb(30,30,30,0.02)] border border-primary/50" 
                    : "hover:bg-secondary/20"
                }
            `}
            onClick={() => setChatId(chat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    setChatId(chat.id)
                }
            }}
        >
            <Avatar className="size-10 ml-1">
                <AvatarImage src={friend?.photoURL || undefined} />
                <AvatarFallback>{friend?.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <p className={`text-sm font-semibold truncate ${isSelected ? "" : "text-black/80"}`}>
                        {friend.name || friend.email}
                    </p>
                    {chat.lastMessage && (
                        <p className="text-[10px] text-black/70 font-medium">
                            {formatTime(chat.lastMessage.timestamp)}
                        </p>
                    )}
                </div>
                {chat.lastMessage && (
                    <p className="flex justify-between text-xs text-black/50">
                        <span className="pr-10 truncate">{chat.lastMessage.text}</span>
                        {(!chat.lastMessage?.wasRead && chat.lastMessage.senderId !== user?.uid) && (
                            <Asterisk size={15} className="p-px text-green-900 bg-green-200 rounded-full" />
                        ) }
                    </p>
                )}
                
            </div>
        </div>
    )
}

export default Contact
