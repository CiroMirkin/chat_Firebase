import { createContext } from "react"

export interface ChatContextType {
  chatId: string | null
  setChatId: (id: string | null) => void
}

export const ChatContext = createContext<ChatContextType>({
  chatId: null,
  setChatId: () => { },
})
