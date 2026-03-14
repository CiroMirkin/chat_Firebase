import { Route, Routes } from "react-router"
import RootLayout from "./layouts/rootLayout"
import PublicLayout from "./layouts/publicLayout"
import AdminLayout from "./layouts/adminLayout"
import AuthLayout from "./layouts/authLayout"
import HomePage from "./pages/public/homePage"
import ProfilePage from "./pages/admin/profilePage"
import ChatPage from "./pages/admin/chatPage"
import MobileChatLayout from "./layouts/MobileChatLayout"
import MobileListContact from "./pages/admin/MobileChat/MobileListContact"
import MobileChatPage from "./pages/admin/MobileChat/MobileChatPage"
import LoginPage from "./pages/auth/loginPage"
import RegisterPage from "./pages/auth/registerPage"
import NotFoundPage from "./pages/public/notFoundPage"

function App() {

  return (
    <Routes>
      <Route element={<RootLayout />} >
        {/* Public */}
        <Route element={<PublicLayout />} >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Private */}
        <Route path="admin" element={<AdminLayout />} >
          <Route index element={<ChatPage />} />
          <Route path="chat" element={<MobileChatLayout />}>
            <Route index element={<MobileListContact />} />
            <Route path=":chatId" element={<MobileChatPage />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        {/* Auth */}
        <Route path="auth" element={<AuthLayout />} >
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
