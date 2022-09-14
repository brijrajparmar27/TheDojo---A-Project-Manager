import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/Config";


const useSignup = () => {

    const signup = ({ email, pass }) => {
        console.log(email,pass);
        createUserWithEmailAndPassword(auth, email, pass).then((user) => {
            console.log(user);
        })
    }

    return {signup}
}
export default useSignup;