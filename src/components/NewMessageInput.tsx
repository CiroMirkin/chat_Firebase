import { useMessagesActions } from "@/hooks/useMessagesActions"
import { messageZodSchema, type MessageSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Field, FieldError } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SendIcon } from "lucide-react"
import { useTransition } from "react"
import { Spinner } from "./ui/spinner"

interface Props {
    chatId: string
}

function NewMessageInput({ chatId }: Props) {
    const [ isLoading, startTransition ] = useTransition()
    const { sendMessage } = useMessagesActions(chatId)
    
    const form = useForm<MessageSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
            text: ''
        }
    })

    const handleSendMessage = form.handleSubmit(({ text }) => {
        startTransition(async () => {
            try {
                await sendMessage(text)
                form.reset()
            } catch (e) {
                toast.error('No fue posible enviar el mensaje :(')
                console.error(e)
            }
        })
    })
    
    return (
        <form onSubmit={handleSendMessage}>
            <div className="flex gap-2">
                <Controller
                    name="text"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Escribe un mensaje..."
                                aria-label="Escribir mensaje"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Button type="submit" size="icon" aria-label="Enviar mensaje" disabled={isLoading}>
                    {
                        isLoading ? <Spinner /> : <SendIcon className="size-4" />
                    }
                </Button>
            </div>
        </form>
    )
}

export default NewMessageInput