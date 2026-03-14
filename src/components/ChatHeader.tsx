import { useUser } from "reactfire"
import { useChatParticipants } from "@/hooks/useChatParticipants"
import Friend from "./Friend"
import { Link } from "react-router"
import { ChevronLeft } from "lucide-react"

interface ChatHeaderProps {
    selectedChatId: string | null
    showBackButton?: boolean
}

function ChatHeader({ selectedChatId, showBackButton = false }: ChatHeaderProps) {
    const { data: user } = useUser()
    const participants = useChatParticipants(selectedChatId)
    const friendId = selectedChatId && participants
        ? participants.find(p => p !== user?.uid) || ""
        : ""

    return (
        <div className="p-4 flex items-center border-b border-black/5">
            {showBackButton && (
                <Link to="/admin/chat" className="p-2 mr-2 hover:bg-secondary/20 rounded-lg transition-colors">
                    <ChevronLeft className="size-5" />
                </Link>
            )}
            { selectedChatId && friendId && (
                <Friend friendId={friendId} />
            )} 
            { !selectedChatId && <div className="w-full h-9"></div> }
        </div>
    )
}

export default ChatHeader
