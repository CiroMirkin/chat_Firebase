import { Outlet } from "react-router"
import { Toaster } from "sonner"

function RootLayout() {

  return (
    <>
      <Outlet />
        <Toaster 
          richColors
          position="bottom-right"
        />
    </>
  )
}

export default RootLayout