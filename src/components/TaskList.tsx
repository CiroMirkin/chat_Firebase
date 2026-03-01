import { useTaskActions } from "@/hooks/useTaskActions"
import { useTransition } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { CheckCheck, ClipboardCheck, Trash2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

function TaskList(){
    const [ isPending, startTransition ] = useTransition()
    const { tasks, deleteTask, toggleTaskToComplete } = useTaskActions()
    
    const handleDelete = (taskId: string) => {
        startTransition(async () => {
            try {
                await deleteTask(taskId)
            }
            catch(e) {
                console.error(e)
                toast.error("Error al eliminar la tarea.")
            }
        })
    }

    const handleUpdate = (taskId: string) => {
        startTransition(async () => {
            try {
                await toggleTaskToComplete(taskId)
            }
            catch(e) {
                console.error(e)
                toast.error("Error al actualizar el estados de la tarea.")
            }
        })
    }


    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <ClipboardCheck className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No hay tareas aún</p>
                <p className="text-sm text-muted-foreground mt-1">Crea una tarea para comenzar</p>
            </div>
        )
    }

    return (
        <ul className="space-y-3">
            {tasks.map(task => (
                <li key={task.id}>
                    <Card className={cn("transition-all duration-200 hover:shadow-md", task.completed && "opacity-60")}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className={cn("text-base font-medium", task.completed && "line-through text-muted-foreground")}>{task.title}</CardTitle>
                                {task.completed && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completada</Badge>
                                )}
                            </div>
                        </CardHeader>

                        {task.description && (
                            <CardContent className="pb-2">
                                <p className="text-sm text-muted-foreground">
                                    {task.description}
                                </p>
                            </CardContent>
                        )}

                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isPending}
                                onClick={() => handleUpdate(task.id)}
                            >
                                <CheckCheck className="size-4" />
                                Completar
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={isPending}
                                onClick={() => handleDelete(task.id)}
                            >
                                <Trash2 className="size-4" />
                                Eliminar
                            </Button>
                        </CardFooter>
                    </Card>
                </li>
            ))}
        </ul>
    )
}

export default TaskList