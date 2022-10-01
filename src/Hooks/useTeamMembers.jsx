import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { firestore } from "../Firebase/Config";

const useTeamMembers = () => {
    const [teamdata,setTeamData] = useState(null);
    useEffect(() => {
        const unsub = onSnapshot(collection(firestore,"users"), (doc) => {
            let data = []
            doc.forEach((each)=>{
                data.push(each.data());
            })
            setTeamData([...data]);
            data = [];
        });
        () => unsub();
    }, []);
    return teamdata;
}
export default useTeamMembers;