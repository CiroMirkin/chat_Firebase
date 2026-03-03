import type { UserSaved } from "@/schemas/userSchema"
import { doc } from "firebase/firestore"
import { useFirestore, useFirestoreDocData } from "reactfire"

export const useFriendInfo = (friendId: string) => {
    const db = useFirestore()
    const friendRef = doc(db, "users", friendId)
    const { data: friend } = useFirestoreDocData(friendRef, {
        suspense: true,
    })

    return {
        friend: friend as UserSaved,
    }
}