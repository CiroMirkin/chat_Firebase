import ListContact from "@/components/ListContact"
import SuspenseFallback from "@/components/ui/suspense-fallback"
import { Suspense } from "react"

function MobileListContact() {
  return (
    <Suspense 
      fallback={<SuspenseFallback text="Cargando Contactos..." spinnerSize="size-6" className="h-95" />}
    >
      <ListContact 
        chatId={null} 
        setChatId={() => {}} 
        useLink={true} 
        />
    </Suspense>
  )
}

export default MobileListContact
