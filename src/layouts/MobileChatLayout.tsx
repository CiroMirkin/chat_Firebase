import { Outlet, useParams } from "react-router"
import ChatHeader from "@/components/ChatHeader"
import ContactsHeader from "@/components/ContactsHeader"

function MobileChatLayout() {
  const params = useParams()
  const chatId = params.chatId

  return (
    <div className="h-screen flex flex-col bg-secondary/5">
      {!chatId && <ContactsHeader />}

      {chatId && <ChatHeader selectedChatId={chatId} showBackButton={true} />}
      
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default MobileChatLayout
