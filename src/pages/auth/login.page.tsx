import { useAuthAction } from "../../hooks/useAuthAction"

function LoginPage() {
    
    const auth = useAuthAction()
    const handleGoogleRegister = async () => {
        const { success } = await auth.loginWithGoogle()
        if(success) {
            console.info('good')
        }
    }

    return (
        <>
            <button onClick={handleGoogleRegister}>Registrarme con Google</button>
        </>
    )
}

export default LoginPage