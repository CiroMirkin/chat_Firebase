import { Spinner } from "@/components/ui/spinner"
import { Suspense, useState } from "react"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"
import { ChatContext, type ChatContextType } from "../contexts/ChatContext"

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
  useUser({ suspense: true })

  const [chat, setChat] = useState<{ 
    chatId: string | null, 
    participants: string[],
  }>({
    chatId: null,
    participants: [],
  })

  const chatContextValue: ChatContextType = {
    chatId: chat.chatId,
    setChatId: (id: string | null) => {
      setChat({ chatId: id, participants: [] })
    },
    participants: chat.participants,
    setParticipants: (participants: string[]) => {
      setChat(prev => ({ ...prev, participants: [...participants] }))
    },
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