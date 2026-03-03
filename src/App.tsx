import { Route, Routes } from "react-router"
import RootLayout from "./layouts/rootLayout"
import PublicLayout from "./layouts/publicLayout"
import AdminLayout from "./layouts/adminLayout"
import AuthLayout from "./layouts/authLayout"
import HomePage from "./pages/public/homePage"
import DashboardPage from "./pages/admin/dashboardPage"
import ProfilePage from "./pages/admin/profilePage"
import ChatPage from "./pages/admin/chatPage"
import LoginPage from "./pages/auth/loginPage"
import RegisterPage from "./pages/auth/registerPage"
import NotFoundPage from "./pages/public/notFoundPage"

function App() {

  return (
    <Routes>
      <Route element={<RootLayout />} />

      {/* Public */}
      <Route element={<PublicLayout />} >
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Private */}
      <Route path="admin" element={<AdminLayout />} >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
      
      {/* Auth */}
      <Route path="auth" element={<AuthLayout />} >
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
