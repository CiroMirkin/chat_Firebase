import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useUser } from "reactfire"

function ChatHeaderLeft() {
    const { data: user } = useUser()

    return (
        <div className="p-4 flex items-center border-b border-black/5 bg-white">
            <Link to="/admin/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback>{user?.email?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-tight">{user?.displayName || user?.email?.split('@')[0] || "Usuario"}</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00AD38]"></span>
                        <span className="text-xs text-black/40">Online</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatHeaderLeft