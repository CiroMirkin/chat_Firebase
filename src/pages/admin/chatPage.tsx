import Chat from "@/components/Chat"
import EmptyChat from "@/components/EmptyChat"
import ListContact from "@/components/ListContact"
import { Spinner } from "@/components/ui/spinner"
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable"
import { Suspense, useContext } from "react"
import { ChatContext } from "@/contexts/ChatContext"
import ChatHeaderLeft from "@/components/ChatHeaderLeft"
import ChatHeaderRight from "@/components/ChatHeaderRight"
import FindUser from "@/components/FindUser"

function ChatPage() {
    const { chatId: actualChatId, setChatId } = useContext(ChatContext)

    return (
        <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize="30%" minSize="11%">
                <div className="bg-secondary/10 flex flex-col h-full">
                    <ChatHeaderLeft />
                    <FindUser setChatId={setChatId}/>
                    <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner /></div>}>
                        <ListContact chatId={actualChatId} setChatId={setChatId} />
                    </Suspense>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:bg-primary transition-colors" />
            <ResizablePanel defaultSize="70%" minSize="30%">
                <div className="bg-secondary/10 flex flex-col h-full">
                    <ChatHeaderRight selectedChatId={actualChatId} />
                    <div className="flex-1 min-h-0">
                        <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner /></div>}>
                            {!actualChatId && <EmptyChat />}
                            {actualChatId && <Chat chatId={actualChatId} />}
                        </Suspense>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default ChatPage
