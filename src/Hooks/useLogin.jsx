import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../Firebase/Config"
import useCollection from "./useCollection"

const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {updateUser} = useCollection();

    const login = (email, pass) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, pass)
            .then((user) => {
                updateUser(user.user.uid, {online:true});
                // console.log(user)
                setError(null);
                setLoading(false)
            })
            .catch((e)=>{
                setError(e.message)
                console.log(e.message);
                setLoading(false)
            })
    }
    return { login , error, loading };
}
export default useLogin;