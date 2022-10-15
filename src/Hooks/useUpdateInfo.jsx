import { updateProfile } from "firebase/auth"
import { auth } from "../Firebase/Config"

const useUpdateInfo = () => {
    const updateDP = async (url) => {
        await updateProfile(auth.currentUser, {
            photoURL: url
        })
        // console.log("updated to ",url);
    }
    const updateName = async (name) => {
        await updateProfile(auth.currentUser, { displayName: name })
    }
    return { updateDP, updateName }
}

export default useUpdateInfo;