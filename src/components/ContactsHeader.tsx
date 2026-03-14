import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useUser } from "reactfire"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"
import { useAuthAction } from "@/hooks/useAuthAction"
import { Suspense } from "react"
import SuspenseFallback from "./ui/suspense-fallback"

function ContactsHeader() {
    const { data: user } = useUser()
    const { logout } = useAuthAction()

    const handleLogOut = async () => await logout()

    return (
        <div className="p-4 flex justify-between items-center border-b border-black/5">
            <Link to="/admin/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Suspense fallback={<SuspenseFallback spinnerSize="size-6" />}>
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.photoURL || undefined} />
                        <AvatarFallback>{user?.email?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                </Suspense>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-tight">{user?.displayName || user?.email?.split('@')[0] || "Usuario"}</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00AD38]"></span>
                        <span className="text-xs text-black/40">Online</span>
                    </div>
                </div>
            </Link>
            <Button variant="ghost" onClick={handleLogOut}>
                <LogInIcon />
            </Button>
        </div>
    )
}

export default ContactsHeader