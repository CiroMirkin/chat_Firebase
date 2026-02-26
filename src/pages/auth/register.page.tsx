import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useAuth } from "reactfire"

function RegisterPage() {
    
    const auth = useAuth()
    const handleGoogleRegister = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        }
        catch(e) {
            console.error(e)
        }
    }

    return (
        <>
            <button onClick={handleGoogleRegister}>Registrarme con Google</button>
        </>
    )
}

export default RegisterPage