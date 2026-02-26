import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuthAction } from "../../hooks/useAuthAction"
import { toast } from "sonner"

function LoginPage() {
    const navigate = useNavigate()
    const auth = useAuthAction()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleGoogleLogin = async () => {
        const { success, error } = await auth.loginWithGoogle()
        if (success) {
            toast.success("Sesión iniciada")
            navigate("/admin/dashboard")
        } else {
            toast.error(error?.message || "Error al iniciar sesión")
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email || !password) {
            toast.error("Completa todos los campos")
            return
        }

        const { success, error } = await auth.login({ email, password })
        if (success) {
            toast.success("Sesión iniciada")
            navigate("/admin/dashboard")
        } else {
            toast.error(error?.message || "Credenciales inválidas")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>Bienvenido</CardTitle>
                    <CardDescription>Inicia sesión con tu cuenta</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={auth.loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={auth.loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={auth.loading}>
                            {auth.loading ? <Spinner className="size-4 mr-2" /> : null}
                            Iniciar Sesión
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    O
                                </span>
                            </div>
                        </div>
                        <Button type="button" variant="outline" onClick={handleGoogleLogin} disabled={auth.loading}>
                            Continuar con Google
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        ¿No tienes cuenta?{" "}
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/register")}>
                            Regístrate
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
