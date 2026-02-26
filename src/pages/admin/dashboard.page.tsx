import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "reactfire"

function DashboardPage() {
    const { data: user } = useUser()

    return (
        <>
            <div className="p-6">
                <h1>Welcome</h1>
            </div>
        </>
    )
}

export default DashboardPage
