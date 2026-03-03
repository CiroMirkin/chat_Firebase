import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMessagesActions } from "@/hooks/useMessagesActions"
import { useUser } from "reactfire"
import type { Message } from "@/schemas/chatSchema"
import { MessageBubble } from "./MessageBubble"
import NewMessageInput from "./NewMessageInput"

interface Props {
    chatId: string
}

function Chat({ chatId }: Props) {
    const { messages } = useMessagesActions(chatId)
    const { data: user } = useUser()
    const currentUserId = user?.uid || ""

    return (
        <Card className="h-[calc(100vh-8rem)] max-w-4xl mx-auto flex flex-col">
            <CardHeader className="border-b py-3">
                <CardTitle>Mensajes</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 p-4">
                    {(!messages || messages.length === 0) ? (
                        <p className="text-center text-muted-foreground text-sm">No hay mensajes aún</p>
                    ) : (
                        messages.map((message: Message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                isOwn={message.senderId === currentUserId}
                            />
                        ))
                    )}
                </div>
                <div className="pt-4 border-t">
                    <NewMessageInput chatId={chatId} />
                </div>
            </CardContent>
        </Card>
    )
}

export default Chat