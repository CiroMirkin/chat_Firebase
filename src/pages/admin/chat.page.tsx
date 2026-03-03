import Chat from "@/components/Chat"
import EmptyChat from "@/components/EmptyChat"
import ListContact from "@/components/ListContact"
import SearchContact from "@/components/SearchContact"
import { Spinner } from "@/components/ui/spinner"
import { Suspense, useState } from "react"

function ChatPage() {
    const [ chatId, setChatId ] = useState('')

    const handleClickChat = (id: string) => {
        setChatId(id)
    }
    
    return (
        <>
            <div className="p-4 flex">
                <section>
                    <Suspense fallback={<Spinner />}>
                        <SearchContact setChatId={setChatId} />
                        <ListContact setChatId={handleClickChat} selectedChatId={chatId} />
                    </Suspense>
                </section>
                <section>
                    {!chatId && <EmptyChat /> }
                    {chatId && <Suspense fallback={<Spinner />}>
                        <Chat chatId={chatId} />
                    </Suspense> }
                </section>
            </div>
        </>
    )
}

export default ChatPage