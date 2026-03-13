import { useMediaQuery } from "react-responsive"
import DesktopChatPage from "./DesktopChatPage"

function ChatPage() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 750px)'
    })

    if(isDesktopOrLaptop) {
        return <DesktopChatPage />
    }

    return (
         <div className="h-screen grid place-items-center gap-2 p-4">
            <div>
                <h1 className="text-lg font-semibold">Lo siento, actualmente no el chat no esta disponible para moviles.</h1>
                <p className="opacity-80 text-base">Muy pronto lo estará.</p>
            </div>
         </div>
    )
}

export default ChatPage
