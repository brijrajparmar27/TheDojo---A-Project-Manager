import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Config";

const useLogout = ()=>{
    const logout = ()=>{
        signOut(auth);
    }
    return {logout}
}
export default useLogout;