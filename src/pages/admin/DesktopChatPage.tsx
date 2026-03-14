import Chat from "@/components/Chat"
import EmptyChat from "@/components/EmptyChat"
import ListContact from "@/components/ListContact"
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable"
import { Suspense, useContext } from "react"
import ContactsHeader from "@/components/ContactsHeader"
import ChatHeader from "@/components/ChatHeader"
import FindUser from "@/components/FindUser"
import { ChatContext } from "@/contexts/ChatContext"
import SuspenseFallback from "@/components/ui/suspense-fallback"

function DesktopChatPage(){
    const { chatId: actualChatId, setChatId } = useContext(ChatContext)

    return (
        <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize="30%" minSize="11%">
                <div className="bg-secondary/10 flex flex-col h-full">
                    <ContactsHeader />
                    <FindUser setChatId={setChatId}/>
                    <Suspense fallback={<SuspenseFallback text="Cargando Contactos..." />}>
                        <ListContact chatId={actualChatId} setChatId={setChatId} />
                    </Suspense>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:bg-primary transition-colors" />
            <ResizablePanel defaultSize="70%" minSize="30%">
                <div className="bg-secondary/10 flex flex-col h-full">
                    <ChatHeader selectedChatId={actualChatId} />
                    <div className="flex-1 min-h-0">
                        <Suspense fallback={<SuspenseFallback text="Cargando Chat..." />}>
                            {!actualChatId && <EmptyChat />}
                            {actualChatId && <Chat chatId={actualChatId} />}
                        </Suspense>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default DesktopChatPage
