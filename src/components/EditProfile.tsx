import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useProfileAction } from "@/hooks/useProfileAction"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ProfileFormValues, profileSchema } from "@/lib/zodSchemas"
import type { User } from "firebase/auth"

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-2xl mx-auto space-y-6">
                <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Nombre de usuario</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Nombre ..."
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
                        placeholder="https://..."
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
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

export default EditProfile