import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function EmptyChat() {
    return (
        <Card className="h-[calc(100vh-8rem)] max-w-4xl mx-auto flex flex-col">
            <CardHeader className="border-b">
                <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Selecciona una conversación para comenzar</p>
            </CardContent>
        </Card>
    )
}

export default EmptyChat