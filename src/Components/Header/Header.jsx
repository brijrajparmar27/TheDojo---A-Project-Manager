import "./Header.css";
import logo from "../../assets/logo.svg";
import { IoSettingsOutline, IoMenuOutline, IoPeopleOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import useLogout from "../../Hooks/useLogout";
import useUploadImage from "../../Hooks/useUploadImage";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import useUpdateInfo from "../../Hooks/useUpdateInfo";
import useCollection from "../../Hooks/useCollection";
import imageCompression from "browser-image-compression";
import useMenuProvider from "../../Hooks/ContextHooks/useMenuProvieder";

const Header = () => {

    const [showPopup, setShowPopup] = useState(false);
    const { logout } = useLogout();
    const { upload } = useUploadImage();
    const { updateDP } = useUpdateInfo();
    const { user, setUser } = useAuthContext();
    const { updateUser } = useCollection();
    const { OnlineMenu, setOnlineMenu, HamburgerMenu, setHamburgerMenu } = useMenuProvider();

    const inputFile = useRef(null);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const validImages = ["jpg", "jpeg", "png", "gif"];

    const compressionParameters = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 180,
        useWebWorker: true,
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {

            let fileName = e.target.files[0].name;
            let extention = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

            if (validImages.includes(extention)) {
                const compressedFile = await imageCompression(e.target.files[0], compressionParameters);

                let url = await upload("ProfilePictures/" + user.uid + ".jpeg", compressedFile);
                updateDP(url);
                updateUser(user.uid, { image: url });
            }
            else {
                // console.log("invalid format");
            }
        }
    }

    return <div className="header">
        <IoMenuOutline className="context_menus hamburger" onClick={() => { setHamburgerMenu(prev=>!prev) }} />

        <div className="branding_contain">
            <img src={logo} className="logo_img" />
            <h1 className="app_title">
                The Dojo
            </h1>
        </div>
        {showPopup && <div className="backdrop" onClick={() => { setShowPopup(false) }}></div>}
        {HamburgerMenu && <div className="backdrop" onClick={() => { setHamburgerMenu(false) }}></div>}
        {OnlineMenu && <div className="backdrop" onClick={() => { setOnlineMenu(false) }}></div>}

        <div className="settings">
            <IoPeopleOutline className="context_menus online" onClick={() => { setOnlineMenu(prev=>!prev) }} />
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