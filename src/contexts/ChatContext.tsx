import { createContext } from "react"

export interface ChatContextType {
  chatId: string | null
  setChatId: (id: string | null) => void
  participants: string[]
  setParticipants: (p: string[]) => void
}

export const ChatContext = createContext<ChatContextType>({
  chatId: null,
  setChatId: () => { },
  participants: [],
  setParticipants: () => { }
})
