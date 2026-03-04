import type { Participant } from "@/schemas/chatSchema";
import { useChatActions } from "./useChatActions";

export const useChatParticipants = (chatId: string | null): Participant[] => {
    const { chats } = useChatActions()
    const participants =  chats?.find(c => c.id === chatId)?.participants || []
    return participants
}