import { useChatActions } from "@/hooks/useChatActions"
import type { Chat } from "@/schemas/chatSchema"
import { MessageCircleIcon, Search } from "lucide-react"
import Contact from "./Contact"

interface Props { 
    chatId: string | null, 
    setChatId: (chatId: string) => void 
}

function ListContact({ chatId, setChatId }: Props) {
    const { chats } = useChatActions()

    return (
        <div className="w-full flex flex-col bg-[#1E1E1E]/[0.02] h-full">
            {/* Search */}
            <div className="p-4 border-b border-black/5 bg-white">
                <div className="relative flex items-center group">
                    <Search className="absolute left-3 text-black/40 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar mensajes..." 
                        className="w-full pl-10 pr-4 py-2 bg-[#1E1E1E]/[0.02] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                </div>
            </div>

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
