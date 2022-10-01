import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react"
import { firestore } from "../Firebase/Config";
import useAuthContext from "./ContextHooks/useAuthContext";

const useCurrentUser = () => {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
                setUserData(doc.data());
            });
            () => unsub();
        }
    }, [user]);
    return { userData };
}
export default useCurrentUser