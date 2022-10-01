import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/Config";

const useUploadImage = () => {

    const upload = async (path, file) => {

        const imgref = await ref(storage, path);

        const img = await uploadBytes(imgref, file)

        const url = await getDownloadURL(img.ref)

        return url;

    }


    return { upload }
}

export default useUploadImage;