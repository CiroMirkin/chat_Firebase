import { useMessagesActions } from "@/hooks/useMessagesActions"
import { useUser } from "reactfire"
import type { Message } from "@/schemas/chatSchema"
import { MessageBubble } from "./MessageBubble"
import NewMessageInput from "./NewMessageInput"
import { useFriendInfo } from "@/hooks/useFriendInfo"
import { useChatParticipants } from "@/hooks/useChatParticipants"
import { useEffect } from "react"

interface Props {
    chatId: string
}

function Chat({ chatId }: Props) {
    const { messages, markMessageAsRead } = useMessagesActions(chatId)
    const { data: user } = useUser()
    const currentUserId = user?.uid || ""
    
    const participants = useChatParticipants(chatId)
    const friendId = participants.find(p => p !== user?.uid) || ""
    const { friend } = useFriendInfo(friendId)

    useEffect(() => {
        if (!messages || !currentUserId) return

        messages.forEach(message => {
            if (message.senderId !== currentUserId && !message.wasRead) {
                markMessageAsRead(message.id)
            }
        })
    }, [messages, currentUserId, markMessageAsRead])

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-1.5 bg-secondary chat-scrollbar">
                {(!messages || messages.length === 0) ? (
                    <p className="text-center text-black/40 text-sm">No hay mensajes aún</p>
                ) : (
                    messages.map((message: Message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isOwn={message.senderId === currentUserId}
                            senderPhotoURL={message.senderId === currentUserId ? user?.photoURL || undefined : friend?.photoURL || undefined}
                            senderName={message.senderId === currentUserId ? user?.displayName || undefined : friend?.name || undefined}
                        />
                    ))
                )}
            </div>

            {/* Input */}
            <div className="shrink-0 p-4 bg-secondary/10 border-t border-black/5">
                <NewMessageInput chatId={chatId} />
            </div>
        </div>
    )
}

export default Chat
