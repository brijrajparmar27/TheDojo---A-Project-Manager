import "./Header.css";
import logo from "../../assets/logo.svg";

const Header = () => {
    return <div className="header">
        <div className="branding_contain">
            <img src={logo} className="logo_img" />
            <h1 className="app_title">
                The Dojo
            </h1>
        </div>
    </div>
}
export default Header;