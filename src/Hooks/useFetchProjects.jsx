import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../Firebase/Config";

const useFetchProjects = (filter) => {
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setLoading(true);
        let unsub;
        if (filter) {
            console.log("fetch all");
            unsub = onSnapshot(collection(firestore, "projects"),filter, (doc) => {
                let data = [];
                doc.forEach((each) => {
                    data.push({ ...each.data(), uid: each.id });
                });
                setProjects([...data]);
                setLoading(false);
                data = [];
            });
        }
        else{
            console.log("fetch selected");
            unsub = onSnapshot(collection(firestore, "projects"), (doc) => {
                let data = [];
                doc.forEach((each) => {
                    data.push({ ...each.data(), uid: each.id });
                });
                setProjects([...data]);
                setLoading(false);
                data = [];
            });
        }
        return () => unsub();
    }, [filter]);

    return { projects, loading }
}
export default useFetchProjects