import { useMediaQuery } from "react-responsive"
import DesktopChatPage from "./DesktopChatPage"
import { Navigate } from "react-router"

function ChatPage() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 750px)'
    })

    if(isDesktopOrLaptop) {
        return <DesktopChatPage />
    }

    return <Navigate to='/admin/chat' replace />
}

export default ChatPage
