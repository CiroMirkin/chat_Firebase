import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import  { type ContactSeachShemaType, contactSeachZodShema } from "@/lib/zodSchemas"
import { useChatActions } from "@/hooks/useChatActions"
import { useTransition } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface Props {
    setChatId: (chatId: string) => void
}

function SearchContact({ setChatId }: Props) {
    const { createOrFindChat } = useChatActions()
    const [isLoading, startTransition] = useTransition()
    const form = useForm<ContactSeachShemaType>({
        resolver: zodResolver(contactSeachZodShema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: ContactSeachShemaType) {
        startTransition(async () => {
            try {
                const { success, chatId } = await createOrFindChat(values.email)
                if(success) {
                    setChatId(chatId)
                    form.reset()
                    toast.success('Chat creado')
                    return
                } 
                toast.warning('Chat o contacto no encontrado')
            }
            catch(e) {
                console.error(e)
            }
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Buscar contacto</FieldLabel>
                        <Input
                            disabled={isLoading}
                            {...field}
                            type="email"
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Email..."
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar"}
            </Button>
        </form>
    )
}

export default SearchContact