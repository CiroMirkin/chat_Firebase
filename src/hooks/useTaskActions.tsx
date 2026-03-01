import type { Task } from "@/schemas/taskSchema"
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

interface NewTask {
    title: string
    description?: string
}

export const useTaskActions = () => {
    const db = useFirestore()
    const taskCollectionRef = collection(db, "tasks")

    const { data: user } = useUser()
    if(!user) throw new Error("User Not Authenticated")
    const userId = user!.uid
    
    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", userId)
    )

    const { data: tasks } = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true,
    })

    const createTask = async (data: NewTask) => {
        const NewTask = {
            ...data,
            completed: false,
            userId: userId
        }
        return await addDoc(taskCollectionRef, NewTask)
    }

    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId)
        return await deleteDoc(taskDoc)
    }

    const toggleTaskToComplete = async (taskId: string) => {
        const task = tasks.find(task => task.id === taskId)
        const taskDoc = doc(db, "tasks", taskId)

        if(!task) throw new Error("Task not found")
        
        return await updateDoc(taskDoc, {
            completed: !task.completed,
        })
    }

    return {
        tasks: tasks as Task[],
        createTask,
        deleteTask,
        toggleTaskToComplete,
    }
}