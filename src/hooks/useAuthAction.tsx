import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, type AuthError } from "firebase/auth"
import { useState } from "react"
import { useAuth } from "reactfire"

interface AuthActionResponse {
    success: boolean
    error: AuthError | null
}

interface Login { 
    email: string
    password: string
}

interface Register { 
    email: string
    password: string
}

interface AuthActions {
    loading: boolean
    register: (data: Register) => Promise<AuthActionResponse> 
    loginWithGoogle: () => Promise<AuthActionResponse>
    login: (data: Login ) => Promise<AuthActionResponse>
    logout: () => Promise<AuthActionResponse>
}

export const useAuthAction = (): AuthActions => {
    const [loading, setLoading] = useState(false)
    const auth = useAuth()

    const authPromise = async (promise: () => Promise<unknown>): Promise<AuthActionResponse> => {
        setLoading(true)
        try {
            await promise()
            return {
                success: true,
                error: null,
            }
        }
        catch(e) {
            console.error(e)
            const error = e as AuthError
            return {
                success: false,
                error: error,
            }
        }
        finally {
            setLoading(false)
        }
    }
    
    const login = (data: Login): Promise<AuthActionResponse> => {
        return authPromise(
            () => signInWithEmailAndPassword(
                auth, 
                data.email, 
                data.password
            )
        )
    }

    const register = (data: Register): Promise<AuthActionResponse> => {
        return authPromise(async () => {
            const currentUser = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            
            if(currentUser.user) {
                await updateProfile(currentUser.user, {
                    displayName: data.email.split('@')[0] || ''
                })
            }
        })
    }

    const loginWithGoogle = (): Promise<AuthActionResponse> => {
        return authPromise(async () => {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        })
    }

    const logout = (): Promise<AuthActionResponse> => {
        return authPromise(() => signOut(auth))
    }

    return {
        loading,
        register,
        loginWithGoogle,
        login,
        logout,
    }
}