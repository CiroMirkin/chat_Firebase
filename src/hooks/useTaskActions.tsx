import type { Task } from "@/schemas/taskSchema"
import { addDoc, collection, query, where } from "firebase/firestore"
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

    return {
        tasks: tasks as Task[],
        createTask,
    }
}