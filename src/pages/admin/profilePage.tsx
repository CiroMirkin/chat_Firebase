import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "reactfire"
import EditProfile from "@/components/EditProfile"
import { Link } from "react-router"
import { HomeIcon } from "lucide-react"

function ProfilePage() {
    const { data: user } = useUser()

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <header className="p-4 flex items-center">
                <Link to="/admin/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <HomeIcon/>
                </Link>
            </header>

            <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Avatar className="size-24">
                                <AvatarImage src={user?.photoURL || undefined} />
                                <AvatarFallback className="text-2xl">{user?.displayName?.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle>{user?.displayName || "Usuario"}</CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                    </CardHeader>
                </Card>

                {user && <EditProfile user={user} />}
            </div>
        </div>
    )
}

export default ProfilePage
