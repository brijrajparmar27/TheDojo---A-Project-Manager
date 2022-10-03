import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { firestore } from "../Firebase/Config";

const useComments = (pid) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const ref = query(collection(firestore, "comments"), orderBy("time"));
        const unsub = onSnapshot(ref, where(pid, "==", "pid"), (doc) => {
            let data = [];
            doc.forEach((each) => {
                data.push({ ...each.data(), Cid: each.id });
            });
            setComments([...data]);
            console.log(data);
            setLoading(false);
            data = [];
        });
        return () => unsub();
    }, [])

    const addComment = async (comment) => {
        setLoading(true);
        try {
            await addDoc(collection(firestore, "comments"), comment)
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { comments, loading, addComment };

}
export default useComments;