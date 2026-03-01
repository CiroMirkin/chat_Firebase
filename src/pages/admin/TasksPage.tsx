import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"

function TasksPage () {
    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
                <p className="text-muted-foreground mt-1">Gestiona tus tareas diarias</p>
            </header>
            
            <section>
                <TaskForm />
            </section>
            
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Lista de tareas</h2>
                <TaskList />
            </section>
        </div>
    )
}

export default TasksPage