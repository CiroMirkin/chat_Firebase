import type { Room } from "@/schemas/roomSchema"
import { collection, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useChatActions = () => {
    
    const { data: user } = useUser()
    if(!user) throw new Error('User not found')
    const userId = user?.uid
    
    const db = useFirestore()
    const roomRef = collection(db, "rooms")
    const roomQuery = query(
        roomRef, 
        where('participants', 'array-contains', userId)
    )
    const { data: rooms } = useFirestoreCollectionData(roomQuery, {
        suspense: true,
        idField: 'id'
    })

    return {
        rooms: rooms as Room[]
    }
}