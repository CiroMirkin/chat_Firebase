import { useAuth, useUser } from "reactfire"

function DashboardPage() {
    const { data: user } = useUser()
    
    const auth = useAuth()
    const handleSignOut = () => {
        auth.signOut()
    }

    return (
        <>
            <h1>Welcome, {user?.displayName || "..."}</h1>
            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </>
    )
}

export default DashboardPage