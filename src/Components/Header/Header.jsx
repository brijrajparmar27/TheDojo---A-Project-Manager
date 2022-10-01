import "./Header.css";
import logo from "../../assets/logo.svg";
import { IoSettingsOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import useLogout from "../../Hooks/useLogout";
import useUploadImage from "../../Hooks/useUploadImage";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import useUpdateInfo from "../../Hooks/useUpdateInfo";
import useCollection from "../../Hooks/useCollection";

const Header = () => {

    const [showPopup, setShowPopup] = useState(false);
    const { logout } = useLogout();
    const { upload } = useUploadImage();
    const { updateDP } = useUpdateInfo();
    const { user, setUser } = useAuthContext();
    const { updateUser } = useCollection();

    const inputFile = useRef(null);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const validImages = ["jpg", "jpeg", "png", "gif"];

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {

            let fileName = e.target.files[0].name;
            let extention = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

            if (validImages.includes(extention)) {
                console.log("valid image");
                let url = await upload("ProfilePictures/" + user.uid + ".jpeg", e.target.files[0]);
                updateDP(url);
                updateUser(user.uid, { image: url });
            }
            else {
                console.log("invalid format");
            }
        }
    }

    return <div className="header">
        <div className="branding_contain">
            <img src={logo} className="logo_img" />
            <h1 className="app_title">
                The Dojo
            </h1>
        </div>
        {showPopup && <div className="backdrop" onClick={() => { setShowPopup(false) }}></div>}

        <div className="settings">
            <IoSettingsOutline onClick={() => { setShowPopup(prev => !prev) }} style={{ cursor: "pointer" }} />
            {showPopup && <div className="popup">
                <p className="popup_option" onClick={onButtonClick}>
                    Change Photo
                </p>
                <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <a
                    href="mailto:brijrajparmaromegab32@gmail.com"
                    className="popup_option"
                >
                    Report bug
                </a>
                <button className="logout_btn" onClick={logout}>
                    Logout
                </button>
            </div>}
        </div>

    </div>
}
export default Header;