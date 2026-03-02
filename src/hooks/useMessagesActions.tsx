import type { LastMessage, Message } from "@/schemas/roomSchema"
import { addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useMessagesActions = (roomId: string) => {
    const db = useFirestore()
    const messagesRef = collection(db, "rooms", roomId, "messages")
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
        }
        
        const roomRef = doc(db, "rooms", roomId)
        const lastMessage: LastMessage = {
            ...newMessage
        }

        await Promise.all([
            addDoc(messagesRef, newMessage),
            updateDoc(roomRef, {
                lastMessage,
            }),
        ])
    }

    return {
        messages: messages as Message[],
        sendMessage,
    }
}