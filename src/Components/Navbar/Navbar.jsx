import "./Navbar.css";
import avatarPlaceholer from "../../assets/avatar.svg";
import { MdOutlineSpaceDashboard, MdAdd } from "react-icons/md";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user } = useAuthContext();
    return <div className="navbar">
        <div className="profile_contain">
            <div style={{ backgroundImage: `url("${user.photoURL?user.photoURL:avatarPlaceholer}")` }} className="user_avatar" />
            <h2 className="username">{user.displayName}</h2>
        </div>
        <div className="section_contain">
            <NavLink to="/" className="section_link" >
                <MdOutlineSpaceDashboard />
                <p>Dashboard</p>
            </NavLink>
            <NavLink to="/create" className="section_link" >
                <MdAdd />
                <p>New Project</p>
            </NavLink>
        </div>
    </div>
}
export default Navbar;