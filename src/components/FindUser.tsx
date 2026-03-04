import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface Props {
    isHide: boolean
}

function FindUser({ isHide = false }: Props) {
    return (
        <div className={cn(
            "p-4 pb-2 border-black/5",
            isHide ? "block" : "hidden"
        )}>
            <div className="relative flex items-center group">
                <Search className="absolute left-3 text-black/40 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar mensajes..." 
                    className="w-full pl-10 pr-4 py-2 bg-[#1E1E1E]/[0.02] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
            </div>
        </div>
    )
}

export default FindUser