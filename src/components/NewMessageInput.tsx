import { useMessagesActions } from "@/hooks/useMessagesActions"
import { messageZodSchema, type MessageSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Field, FieldError } from "./ui/field"
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"
import { useTransition } from "react"
import { Spinner } from "./ui/spinner"
import { Textarea } from "./ui/textarea"

interface Props {
    chatId: string
}

function NewMessageInput({ chatId }: Props) {
    const [isLoading, startTransition] = useTransition()
    const { sendMessage } = useMessagesActions(chatId)
    
    const form = useForm<MessageSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
            text: ''
        }
    })

    const handleSendMessage = form.handleSubmit(({ text }) => {
        if (!text.trim()) return
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
        <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-white rounded-2xl border border-black/10 p-1.5 focus-within:border-primary transition-all shadow-sm">
            <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                            placeholder="Escribe un mensaje..."
                            aria-label="Escribir mensaje"
                            className="bg-transparent border-none focus:ring-0 resize-none py-2.5 px-2 text-sm max-h-32 min-h-[40px] outline-none"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendMessage()
                                }
                            }}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !form.watch("text")?.trim()}
                className="bg-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#FF5200] hover:text-white transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
            >
                {isLoading ? <Spinner /> : <ArrowUpRight className="size-5" />}
            </Button>
        </form>
    )
}

export default NewMessageInput
