import { useMessagesActions } from "@/hooks/useMessagesActions"
import { useUser } from "reactfire"
import type { Message } from "@/schemas/chatSchema"
import { MessageBubble } from "./MessageBubble"
import NewMessageInput from "./NewMessageInput"
import { useFriendInfo } from "@/hooks/useFriendInfo"

interface Props {
    chatId: string
    participants: string[]
}

function Chat({ chatId, participants }: Props) {
    const { messages } = useMessagesActions(chatId)
    const { data: user } = useUser()
    const currentUserId = user?.uid || ""
    
    const friendId = participants.find(p => p !== user?.uid) || ""
    const { friend } = useFriendInfo(friendId)

    return (
        <div className="flex-1 flex flex-col bg-white h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#FCFBFA] chat-scrollbar">
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
            <div className="p-4 bg-white border-t border-black/5">
                <NewMessageInput chatId={chatId} />
            </div>
        </div>
    )
}

export default Chat
