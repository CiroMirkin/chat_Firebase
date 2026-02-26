import type { ReactNode } from "react";
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from "./firebase.ts";
import FirebaseServices from "./FirebaseServices.tsx";

function Firebase({ children }: { children: ReactNode }) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <FirebaseServices>
                {children}
            </FirebaseServices>
        </FirebaseAppProvider>
    )
}

export default Firebase