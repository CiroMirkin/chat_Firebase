import type { Chat } from "@/schemas/chatSchema"
import type { User } from "firebase/auth"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { useFirestore } from "reactfire"

export const useAddDefaultFriend = () => {
    const db = useFirestore()

    const addDefaultFriend = async (user: User) => {
        if (!user) throw new Error('User not found')
        const chatsRef = collection(db, "rooms")
        const defaultFriendId = import.meta.env.VITE_DEFAULT_FRIEND_ID

        const existingChatQuery = query(
            chatsRef,
            where("participants", "array-contains", user.uid)
        )
        const existingChats = await getDocs(existingChatQuery)
        const defaultFriendChat = existingChats.docs.find(doc =>
            doc.data().participants.includes(defaultFriendId)
        )
        if (defaultFriendChat) {
            return {
                success: false,
                message: "409",
                chatId: defaultFriendChat.id,
            }
        }

        const newChat: Omit<Chat, 'id'> = {
            createdAt: serverTimestamp(),
            lastMessage: null,
            participants: [defaultFriendId, user.uid],
        }
        const newChatDoc = await addDoc(chatsRef, newChat)
        return {
            success: true,
            message: "200",
            chatId: newChatDoc.id,
        }
    }

    return {
        addDefaultFriend,
    }
}