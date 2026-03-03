import { Navbar } from "@/components/navbar"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"

function AdminLayout() {
  const { status, data: singInCheckResult, hasEmitted } = useSigninCheck()
  
  if(status == 'loading' || !hasEmitted) {
    return <p>....</p>
  }

  if(!singInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />
  }
  
  return (
    <Suspense fallback={<Spinner/>}>
      <AuthenticatedLayout />
    </Suspense>
  )
}

function AuthenticatedLayout() {
  useUser({
    suspense: true
  })

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default AdminLayout