import type { Chat } from "@/schemas/chatSchema"
import type { UserSaved } from "@/schemas/userSchema"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useChatActions = () => {
    
    const { data: user } = useUser()
    if(!user) throw new Error('User not found')
    const userId = user?.uid
    
    const db = useFirestore()
    const chatsRef = collection(db, "rooms")
    const chatsQuery = query(
        chatsRef, 
        where('participants', 'array-contains', userId)
    )

    const { data: chats } = useFirestoreCollectionData(chatsQuery, {
        suspense: true,
        idField: 'id'
    })

    const findUserByEmail = async (email: string) => {
        const userRef = collection(db, "users")
        const findUserQuery = query(userRef, where(
            "email", "==", email
        ))
        const findUserQuerySnapshot = await getDocs(findUserQuery)
        if(findUserQuerySnapshot.empty) {
            return null
        }
        const userDoc = findUserQuerySnapshot.docs[0]
        return userDoc.data() as UserSaved
    }

    const createOrFindChat = async (friendEmail: string) => {
        if(!user) return {
            success: false,
            message: "401",
            chatId: null,
        }

        if(user.email === friendEmail) {
            return {
                success: false,
                message: "400",
                chatId: null,
            }
        }

        const friend = await findUserByEmail(friendEmail)
        if(!friend) return {
            success: false,
            message: "404",
            chatId: null,
        }
        
        const existChat = chats.find(chat => (
            chat.participants.find((id: string) => id == friend.id)
        ))
        
        if(existChat) return {
            success: true,
            message: "200",
            chatId: existChat.id
        }
        
        const newChat: Omit<Chat, 'id'> =  {
            createdAt: serverTimestamp(),
            lastMessage: null,
            participants: [friend.id, user.uid]
        }
        const newChatDoc = await addDoc(chatsRef, newChat)
        return {
            success: true,
            message: "200",
            chatId: newChatDoc.id
        }
    }

    return {
        chats: chats as Chat[],
        createOrFindChat,
    }
}