import { useUser } from "reactfire"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useFriendInfo } from "@/hooks/useFriendInfo"
import { MoreVertical } from "lucide-react"
import { Suspense } from "react"
import { Spinner } from "./ui/spinner"

interface ChatHeaderRightProps {
    selectedChatId: string | null
    participants?: string[]
}

function ChatHeaderRight({ selectedChatId, participants }: ChatHeaderRightProps) {
    const { data: user } = useUser()

    const friendId = selectedChatId && participants
        ? participants.find(p => p !== user?.uid) || ""
        : ""

    return (
        <div className="p-4 flex items-center border-b border-black/5 bg-white">
            { selectedChatId && friendId && (
                <Suspense fallback={<Spinner />}>
                    <Friend friendId={friendId} />
                </Suspense>
            )} 
            { !selectedChatId && <div className="w-full h-9"></div> }
        </div>
    )
}

export default ChatHeaderRight

function Friend({ friendId }: { friendId: string }) {
    const { friend } = useFriendInfo(friendId)

    return (
        <div className="w-full flex justify-between items-center ">
            <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={friend?.photoURL || undefined} />
                    <AvatarFallback>{friend?.name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-tight">{friend?.name || friend?.email || "Chat"}</span>
                    <span className="text-xs text-black/40">En línea</span>
                </div>
            </div>
            <div className="flex items-center gap-0.5 text-black/40 ml-2">
                <button className="p-2 hover:bg-[#FAF7CC]/50 hover:text-[#FFA51E] rounded-lg transition-colors" aria-label="Más opciones">
                    <MoreVertical className="size-5" />
                </button>
            </div>
        </div>
    )
}