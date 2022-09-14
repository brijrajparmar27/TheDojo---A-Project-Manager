import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const useAuthContext = () => {
    const { user, setUser,AuthIsReady,setAuthIsReady } = useContext(AuthContext);
    return { user, setUser,AuthIsReady,setAuthIsReady };
}
export default useAuthContext;