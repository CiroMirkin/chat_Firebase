import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "reactfire"

function ProfilePage() {
    const { data: user } = useUser()

    return (
        <>
            <div className="p-6">
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
                </div>
            </div>
        </>
    )
}

export default ProfilePage
