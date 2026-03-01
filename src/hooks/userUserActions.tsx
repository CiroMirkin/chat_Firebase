import type { UserSaved } from "@/schemas/userSchema"
import type { User } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useFirestore } from "reactfire"

export const useUserActions = () => {
    const db = useFirestore()

    const createOrUpdateUser = async (user: User) => {
        if(!user) throw new Error("User not found")
        if(!user.email) throw new Error ("User has no email")

        const userDocRef = doc(db, "users", user.uid)
        const userData: UserSaved = {
            id: user.uid,
            email: user.email,
            name: user.displayName || "",
            photoURL: user.photoURL || "",
        }

        return await setDoc(userDocRef, userData, {
            merge: true,
        })
    }

    return {
        createOrUpdateUser,
    }
}
