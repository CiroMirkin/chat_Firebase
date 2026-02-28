import { updateProfile } from "firebase/auth"
import { useState } from "react"
import { useUser } from "reactfire"

interface UserProfile {
    name?: string
    photoURL?: string
}

export const useProfileAction = () => {
    const [loading, setLoading] = useState(false)
    const { data: user } = useUser()

    const updateUserProfile = async ({ name, photoURL }: UserProfile) => {
        if(!user) {
            throw new Error('User is not authenticated :(')
        }
         
        setLoading(true)
        try {
            await updateProfile(user, {
                displayName: name || user.displayName,
                photoURL: photoURL || user.photoURL,
            })
            await user.reload()
            return { success: true }
        }
        catch (e) {
            console.error(e)
            throw e
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        updateUserProfile,

    }
}