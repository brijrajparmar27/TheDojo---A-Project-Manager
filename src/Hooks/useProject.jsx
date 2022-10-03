import { addDoc, collection, doc, getDoc } from "firebase/firestore"
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
    const updateProject = () => {

    }
    const deleteProject = () => {
        
    }
    const fetchProject = (id,setProjectDetails)=>{
        getDoc(doc(firestore, "projects", id)).then((doc)=>{
            if(doc.exists){
                console.log(doc.data());
                setProjectDetails(doc.data());
            }
        })
    }

    return { createProject, updateProject, deleteProject,fetchProject, loading, error };
}
export default useProject;