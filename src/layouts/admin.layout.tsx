import { Navbar } from "@/components/navbar"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"

function AdminLayout() {
  const { status, data: singInCheckResult, hasEmitted } = useSigninCheck()
  
  if(status == 'loading' || !hasEmitted) {
    return <p>....</p>
  }

  if(!singInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />
  }
  
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default AdminLayout