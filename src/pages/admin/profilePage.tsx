import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "reactfire"
import EditProfile from "@/components/EditProfile"

function ProfilePage() {
    const { data: user } = useUser()

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
                <p className="text-muted-foreground mt-1">Gestiona tu información personal</p>
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
