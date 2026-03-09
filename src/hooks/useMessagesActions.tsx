import type { LastMessage, Message } from "@/schemas/chatSchema"
import { addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useMessagesActions = (chatId: string) => {
    const db = useFirestore()
    const messagesRef = collection(db, "rooms", chatId, "messages")
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'))
    const { data: messages } = useFirestoreCollectionData(messagesQuery, {
        suspense: true, 
        idField: 'id',
    })

    const { data: user }= useUser()
    const sendMessage = async (messageText: string) => {
        if(!user) throw new Error('User not found')
        
        const timestamp = serverTimestamp()
        const newMessage: Omit<Message, 'id'> = {
            senderId: user!.uid,
            text: messageText,
            timestamp,
            wasRead: false,
        }
        
        const chatRef = doc(db, "rooms", chatId)
        const lastMessage: LastMessage = {
            ...newMessage
        }

        await Promise.all([
            addDoc(messagesRef, newMessage),
            updateDoc(chatRef, {
                lastMessage,
            }),
        ])
    }

    const markMessageAsRead = async (messageId: string) => {
        const chatRef = doc(db, "rooms", chatId)
        const messageRef = doc(db, "rooms", chatId, "messages", messageId)

        const message = messages.find(m => m.id === messageId)
        if (!message) return

        await Promise.all([
            updateDoc(messageRef, { wasRead: true }),
            updateDoc(chatRef, {
                "lastMessage.wasRead": true,
            })
        ])
    }

    return {
        messages: messages as Message[],
        sendMessage,
        markMessageAsRead,
    }
}