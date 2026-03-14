import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useFriendInfo } from "@/hooks/useFriendInfo"
import { MoreVertical } from "lucide-react"
import { Suspense } from "react"
import SuspenseFallback from "./ui/suspense-fallback"

function Friend({ friendId }: { friendId: string }) {
    const { friend } = useFriendInfo(friendId)

    return (
        <div className="w-full flex justify-between items-center ">
            <div className="flex items-center gap-3">
                <Suspense fallback={<SuspenseFallback spinnerSize="size-6" />}>
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={friend?.photoURL || undefined} />
                        <AvatarFallback>{friend?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                </Suspense>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-tight">{friend?.name || friend?.email || "Chat"}</span>
                    <span className="text-xs text-black/40">En línea</span>
                </div>
            </div>
            <div className="flex items-center gap-0.5 text-black/40 ml-2">
                <button className="p-2 hover:bg-secondary/50 hover:text-primary rounded-lg transition-colors" aria-label="Más opciones">
                    <MoreVertical className="size-5" />
                </button>
            </div>
        </div>
    )
}

export default Friend
