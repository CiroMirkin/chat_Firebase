import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"

function AuthLayout() {
  const { status, data: singInCheckResult, hasEmitted } = useSigninCheck()
  
  if(status == 'loading' || !hasEmitted) {
    return <p>....</p>
  }

  if(status == 'success' && singInCheckResult.signedIn) {
    return <Navigate to="/admin/" replace />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout