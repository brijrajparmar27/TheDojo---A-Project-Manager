import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/Config"

const useLogin = ()=>{
    const login = (email,pass)=>{
        signInWithEmailAndPassword(auth,email,pass).then((user)=>{
            console.log(user)
        })
    }
    return {login}
}
export default useLogin;