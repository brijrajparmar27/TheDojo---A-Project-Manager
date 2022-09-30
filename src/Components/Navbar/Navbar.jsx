import "./Navbar.css";
import avatarPlaceholer from "../../assets/avatar.svg";
import { MdOutlineSpaceDashboard, MdAdd } from "react-icons/md";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";

const Navbar = () => {
    const { user } = useAuthContext();
    return <div className="navbar">
        <div className="profile_contain">
            <div style={{ backgroundImage: `url("${avatarPlaceholer}")` }} className="user_avatar" />
            <h2 className="username">{user.displayName}</h2>
        </div>
        <div className="section_contain">
            <div className="section_navig">
                <MdOutlineSpaceDashboard />
                <p>Dashboard</p>
            </div>
            <div className="section_navig">
                <MdAdd />
                <p>New Project</p>
            </div>
        </div>
    </div>
}
export default Navbar;