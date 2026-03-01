import type { Task } from "@/schemas/taskSchema"
import { collection, query, where } from "firebase/firestore"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useTaskActions = () => {
    const db = useFirestore()
    const taskCollectionRef = collection(db, "tasks")
    const { data: user } = useUser()
    
    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid)
    )

    const { data: tasks } = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true,
    })

    return {
        tasks: tasks as Task[]
    }
}