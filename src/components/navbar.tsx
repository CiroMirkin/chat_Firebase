import { Link, useLocation } from "react-router"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "reactfire"
import { 
    MessageCircleIcon, 
    LayoutDashboardIcon,
    LogOutIcon,
    CheckSquareIcon 
} from "lucide-react"
import { useAuth } from "reactfire"

const navItems = [
    { path: "/admin/", label: "Dashboard", icon: LayoutDashboardIcon },
    { path: "/admin/tasks", label: "Tareas", icon: CheckSquareIcon },
    { path: "/admin/chat", label: "Chat", icon: MessageCircleIcon },
]
const profilePath = "/admin/profile"

function Navbar() {
    const location = useLocation()
    const { data: user } = useUser()
    const auth = useAuth()

    const handleSignOut = () => {
        auth.signOut()
    }

    return (
        <header className="border-b">
            <div className="flex h-14 items-center px-4 justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/admin/" className="font-semibold">
                        Firebase Chat
                    </Link>
                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path
                            const Icon = item.icon
                            return (
                                <Button
                                    key={item.path}
                                    variant={isActive ? "secondary" : "ghost"}
                                    asChild
                                >
                                    <Link to={item.path}>
                                        <Icon className="size-4 mr-2" />
                                        {item.label}
                                    </Link>
                                </Button>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        key={profilePath}
                        variant={location.pathname === profilePath ? "secondary" : "ghost"}
                        asChild
                    >
                        <Link to={profilePath}>
                            <div className="flex items-center gap-2">
                                <Avatar className="size-8">
                                    <AvatarImage src={user!.photoURL || undefined} />
                                    <AvatarFallback>{user!.displayName?.charAt(0) || "?"}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm hidden sm:inline">{user!.displayName}</span>
                            </div>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                        <LogOutIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}

export { Navbar }
