import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Config";
import useAuthContext from "./ContextHooks/useAuthContext";
import useCollection from "./useCollection";

const useLogout = ()=>{
    const {updateUser} = useCollection();
    const {user} = useAuthContext();

    const logout = ()=>{
        updateUser(user.uid, {online:false});
        signOut(auth);
    }
    return {logout}
}
export default useLogout;