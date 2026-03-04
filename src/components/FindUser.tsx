import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type ContactSeachShemaType, contactSeachZodShema } from "@/lib/zodSchemas"
import { useChatActions } from "@/hooks/useChatActions"
import { useTransition } from "react"
import { toast } from "sonner"
import { Search } from "lucide-react"
import { Spinner } from "./ui/spinner"

interface Props {
    setChatId: (chatId: string) => void
}

function FindUser({ setChatId }: Props) {
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
                if (success) {
                    setChatId(chatId)
                    form.reset()
                    toast.success("Chat creado")
                    return
                }
                toast.warning("Chat o contacto no encontrado")
            } catch (e) {
                console.error(e)
            }
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 pb-2">
            <div className="flex gap-1 items-center">
                <div className="relative flex items-center flex-1 group">
                    { isLoading 
                        ? <Spinner /> 
                        : <Search className="absolute left-3 text-black/40 group-focus-within:text-primary transition-colors" size={18} />
                    }
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    disabled={isLoading}
                                    {...field}
                                    type="email"
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Buscar usuario por email..."
                                    autoComplete="off"
                                    className="pl-10"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </>
                        )}
                    />
                </div>
            </div>
        </form>
    )
}

export default FindUser