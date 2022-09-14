import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Firebase/Config";
import useAuthContext from "./ContextHooks/useAuthContext";

const useAuthState = ()=>{
    const {setUser,setAuthIsReady} = useAuthContext();
    const AuthStateListener = ()=>{
        onAuthStateChanged(auth,(user)=>{
            console.log(user);
            setUser(user);
            setAuthIsReady(true);
        })
    }
    return {AuthStateListener};
}
export default useAuthState;