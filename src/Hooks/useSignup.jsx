import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { auth } from "../Firebase/Config";
import useUpdateInfo from "./useUpdateInfo";


const useSignup = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {updateName} = useUpdateInfo();

    const signup = ({ email, pass, username }) => {
        console.log(email,pass);
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, pass).then((user) => {
            updateName(username);
            console.log(user);
            setLoading(false)
        })
        .catch((err)=>{
            setError(err.message)
            console.log(err.message);
            setLoading(false)
        })
    }

    return {signup, error, loading};
}
export default useSignup;