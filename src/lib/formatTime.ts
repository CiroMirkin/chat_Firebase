export function formatTime(timestamp: unknown): string {
    if (!timestamp) return ""
    
    const ts = timestamp as { 
        seconds?: number, 
        toDate?: () => Date 
    }
    let date: Date
    
    if (ts.toDate) {
        date = ts.toDate()
    } 
    else if (ts.seconds) {
        date = new Date(ts.seconds * 1000)
    } 
    else return ""
    
    return date.toLocaleTimeString("es-ES", { 
        hour: "2-digit", 
        minute: "2-digit" 
    })
}
