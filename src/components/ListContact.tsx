import { useChatActions } from "@/hooks/useChatActions"
import type { Chat } from "@/schemas/chatSchema"
import { MessageCircleIcon } from "lucide-react"
import Contact from "./Contact"

interface Props { 
    chatId: string | null, 
    setChatId: (chatId: string) => void 
}

function ListContact({ chatId, setChatId }: Props) {
    const { chats } = useChatActions()

    return (
        <div className="w-full flex flex-col h-full">
            {/* Contacts list */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 chat-scrollbar">
                <p className="text-xs font-medium text-black/40 uppercase tracking-widest px-2 mb-2 mt-1">Recientes</p>
                
                {(!chats || chats.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-black/5 p-4 mb-4">
                            <MessageCircleIcon className="text-black/40" />
                        </div>
                        <p className="text-black/60">No hay conversaciones</p>
                        <p className="text-sm text-black/40 mt-1">Inicia una nueva conversación</p>
                    </div>
                ) : (
                    chats.map((room: Chat) => (
                        <div key={room.id} className="relative">
                            <Contact 
                                chat={room}
                                setChatId={setChatId}
                                isSelected={chatId === room.id}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ListContact
