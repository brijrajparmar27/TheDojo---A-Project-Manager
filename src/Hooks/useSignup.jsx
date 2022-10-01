import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { auth } from "../Firebase/Config";
import useCollection from "./useCollection";
import useUpdateInfo from "./useUpdateInfo";


const useSignup = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {updateName} = useUpdateInfo();
    const {registerUser,updateUser} = useCollection();

    const signup = ({ email, pass, username }) => {
        console.log(email,pass);
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, pass).then((user) => {
            updateName(username);
            updateUser(user.user.uid, {online:true});
            setLoading(false);
            registerUser(user.user.uid, {name:username, image:null, uid:user.user.uid, online:true});
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