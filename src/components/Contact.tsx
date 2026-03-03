import type { Chat } from "@/schemas/chatSchema"
import { Card, CardContent } from "./ui/card"
import { useUser } from "reactfire"
import { useFriendInfo } from "@/hooks/useFriendInfo"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Suspense } from "react"

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
        <Suspense fallback={"Cargando..."}>
            <Card
                key={chat.id}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                    isSelected ? "bg-accent border-primary" : ""
                }`}
                onClick={() => setChatId(chat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        setChatId(chat.id)
                    }
                }}
            >
                <CardContent className="p-4 flex items-center gap-3">
                    <Avatar className="size-8">
                        <AvatarImage src={friend!.photoURL || undefined} />
                        <AvatarFallback>{friend!.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-medium truncate">{friend.name || friend.email}</p>
                        </div>
                        {chat.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate">
                                {chat.lastMessage.text}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Suspense>
    )
}

export default Contact