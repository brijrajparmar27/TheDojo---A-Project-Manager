import "./Navbar.css";
import avatarPlaceholer from "../../assets/avatar.svg";
import { MdOutlineSpaceDashboard, MdAdd } from "react-icons/md";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import { NavLink } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
    const [credentials,setCredentials] = useState();
    const { user } = useAuthContext();
    const {userData} = useCurrentUser();

    useEffect(()=>{
        setCredentials(userData);
    },[userData])

    const getDp = ()=>{
        if(credentials && credentials.image){
            return credentials.image;
        }
        else{
            return avatarPlaceholer;
        }
    }

    return <div className="navbar">
        <div className="profile_contain">
            <div style={{ backgroundImage: `url("${getDp()}")` }} className="user_avatar" />
            {credentials && <h2 className="username">{credentials.name}</h2>}
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