import { useChatActions } from "@/hooks/useChatActions"
import type { Chat } from "@/schemas/chatSchema"
import { MessageCircleIcon } from "lucide-react"
import Contact from "./Contact"

interface Props {
    setChatId: (chatId: string) => void
    selectedChatId: string | null
}

function ListContact({ setChatId, selectedChatId }: Props) {
    const { chats } = useChatActions()

    if (!chats || chats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <MessageCircleIcon className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No hay conversaciones</p>
                <p className="text-sm text-muted-foreground mt-1">Inicia una nueva conversación</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {chats.map((room: Chat) => (
                <Contact 
                    key={room.id}
                    chat={room}
                    setChatId={setChatId}
                    isSelected={selectedChatId === room.id}
                />
            ))}
        </div>
    )
}

export default ListContact
