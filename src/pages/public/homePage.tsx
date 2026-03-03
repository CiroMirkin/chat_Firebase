import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function HomePage() {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Firebase Chat</h1>
                    <p className="text-muted-foreground text-lg">
                        Chatea en tiempo real con otros usuarios
                    </p>
                </section>

                <div className="flex justify-center gap-4">
                    <Button asChild>
                        <Link to="/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/auth/register">Registrarse</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
