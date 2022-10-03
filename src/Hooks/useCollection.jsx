import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Config";

const useCollection = () => {
    const registerUser = async (uid, data) => {
        await setDoc(doc(firestore, "users", uid), data);
    }

    const updateUser = async (uid, data) => {
        const ref = doc(firestore, "users", uid);
        await updateDoc(ref, data);
    }

    return { registerUser, updateUser };
}
export default useCollection;