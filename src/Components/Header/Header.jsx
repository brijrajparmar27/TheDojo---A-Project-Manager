import "./Header.css";
import logo from "../../assets/logo.svg";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import useLogout from "../../Hooks/useLogout";

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { logout } = useLogout();
    const onButtonClick = () => { }

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
                    // ref={inputFile}
                    style={{ display: "none" }}
                    // onChange={handleImageChange}
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