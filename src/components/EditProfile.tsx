import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfileAction } from "@/hooks/useProfileAction"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ProfileFormValues, profileSchema } from "@/lib/zodSchemas"
import type { User } from "firebase/auth"
import { User as UserIcon } from "lucide-react"

interface Props { 
    user: User | null 
}

function EditProfile ({ user }: Props) {
    const { updateUserProfile, loading } = useProfileAction()

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user!.displayName || "",
            photoURL: user!.photoURL || "",
        },
    })

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            await updateUserProfile({
                name: data.name,
                photoURL: data.photoURL,
            })
            toast.success("Perfil actualizado correctamente")
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Error al actualizar el perfil")
        }
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <UserIcon className="size-5" />
                    Editar perfil
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Field data-invalid={!!errors.name}>
                        <FieldLabel htmlFor="name">Nombre de usuario</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nombre…"
                            disabled={loading}
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        {errors.name && (
                            <FieldDescription>{errors.name.message}</FieldDescription>
                        )}
                    </Field>
                    <Field data-invalid={!!errors.photoURL}>
                        <FieldLabel htmlFor="photoURL">URL de foto de perfil</FieldLabel>
                        <Input
                            id="photoURL"
                            type="url"
                            placeholder="https://…"
                            disabled={loading}
                            aria-invalid={!!errors.photoURL}
                            {...register("photoURL")}
                        />
                        {errors.photoURL && (
                            <FieldDescription>{errors.photoURL.message}</FieldDescription>
                        )}
                    </Field>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Spinner className="size-4 mr-2" /> : null}
                        {loading ? "Actualizando…" : "Actualizar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default EditProfile