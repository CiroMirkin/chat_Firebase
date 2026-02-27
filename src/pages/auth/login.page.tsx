import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuthAction } from "../../hooks/useAuthAction"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { loginZodSchemas, type LoginZodSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

function LoginPage() {
    const navigate = useNavigate()
    const auth = useAuthAction()
    
    const { register, handleSubmit, formState: { errors } } = useForm<LoginZodSchemaType>({
        resolver: zodResolver(loginZodSchemas),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleGoogleLogin = async () => {
        try {
            const { success, error } = await auth.loginWithGoogle()
            if (success) {
                toast.success("Sesión iniciada")
                navigate("/admin/dashboard")
                return
            }
            toast.error(error?.message || "Error al iniciar sesión")
        } catch {
            toast.error("Error al iniciar sesión")
        }
    }

    const handleLogin = async ({ email, password }: LoginZodSchemaType) => {
        try {
            const { success, error } = await auth.login({ email, password })
            if (success) {
                toast.success("Sesión iniciada")
                navigate("/admin/dashboard")
                return
            }
            toast.error(error?.message || "Credenciales inválidas")
        } catch {
            toast.error("Credenciales inválidas")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>Bienvenido</CardTitle>
                    <CardDescription>Inicia sesión con tu cuenta</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <CardContent className="grid gap-4">
                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">Correo</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                disabled={auth.loading}
                                aria-invalid={!!errors.email}
                                {...register("email")}
                            />
                            {errors.email && (
                                <FieldDescription>{errors.email.message}</FieldDescription>
                            )}
                        </Field>
                        <Field data-invalid={!!errors.password}>
                            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                disabled={auth.loading}
                                aria-invalid={!!errors.password}
                                {...register("password")}
                            />
                            {errors.password && (
                                <FieldDescription>{errors.password.message}</FieldDescription>
                            )}
                        </Field>
                        <Button type="submit" className="w-full" disabled={auth.loading}>
                            {auth.loading ? <Spinner className="size-4 mr-2" /> : null}
                            Iniciar Sesión
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">O</span>
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
