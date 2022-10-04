import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { useState } from "react";
import { firestore } from "../Firebase/Config"

const useProject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProject = async (projectDetails, navigate) => {
        setLoading(true);
        try {
            await addDoc(collection(firestore, "projects"), projectDetails)
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    const updateProject = async (data,pid) => {
        const ref = doc(firestore, "projects", pid);
        await updateDoc(ref, data);
    }
    const deleteProject = async (pid) => {
        const ref = doc(firestore, "projects", pid);
        await deleteDoc(ref);
    }
    const fetchProject = (id,setProjectDetails)=>{
        setLoading(true);
        getDoc(doc(firestore, "projects", id)).then((doc)=>{
            if(doc.exists){
                console.log(doc.data());
                setProjectDetails(doc.data());
            }
        })
        setLoading(false);
    }

    return { createProject, updateProject, deleteProject,fetchProject, loading, error };
}
export default useProject;