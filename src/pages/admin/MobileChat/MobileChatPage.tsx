import { useParams } from "react-router"
import Chat from "@/components/Chat"

function MobileChatPage() {
  const { chatId } = useParams<{ chatId: string }>()

  if (!chatId) {
    return (
      <div className="h-screen grid place-items-center">
        <p>Selecciona un chat</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-secondary/5">
      <Chat chatId={chatId} />
    </div>
  )
}

export default MobileChatPage
