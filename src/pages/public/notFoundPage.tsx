import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HomeIcon } from "lucide-react"
import { Link } from "react-router"

function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold">404</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Página no encontrada</p>
                    <p className="text-sm text-muted-foreground">
                        La página que buscas no existe o ha sido movida.
                    </p>
                    <Button asChild>
                        <Link to="/">
                            <HomeIcon className="size-4 mr-2" />
                            Volver al inicio
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotFoundPage
