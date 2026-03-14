import SuspenseFallback from "@/components/ui/suspense-fallback"
import { Suspense, useState } from "react"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"
import { ChatContext, type ChatContextType } from "../contexts/ChatContext"

function AdminLayout() {
  const { status, data: singInCheckResult, hasEmitted } = useSigninCheck()
  
  if(status == 'loading' || !hasEmitted) {
    return <SuspenseFallback spinnerSize="size-8" className="h-screen" />
  }

  if(!singInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />
  }
  
  return (
    <Suspense fallback={<SuspenseFallback spinnerSize="size-8" className="h-screen" />}>
      <AuthenticatedLayout />
    </Suspense>
  )
}

function AuthenticatedLayout() {
  useUser({ suspense: true })

  const [chatId, setChatId] = useState<string | null>(null)

  const chatContextValue: ChatContextType = {
    chatId,
    setChatId
  }

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className="h-screen">
        <Outlet />
      </div>
    </ChatContext.Provider>
  )
}

export default AdminLayout