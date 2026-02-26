import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import type { ReactNode } from "react"
import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire"

function FirebaseServices({ children }: { children: ReactNode }) {
    const app = useFirebaseApp()
    const auth = getAuth(app)
    const fireStore = getFirestore(app)
    const storage = getStorage(app)

    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={fireStore}>
                <StorageProvider sdk={storage}>
                    { children }
                </StorageProvider>
            </FirestoreProvider>
        </AuthProvider>
    )
}

export default FirebaseServices