import "./Navbar.css";
import avatarPlaceholer from "../../assets/avatar.svg";
import { MdOutlineSpaceDashboard, MdAdd } from "react-icons/md";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import { NavLink } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import useMenuProvider from "../../Hooks/ContextHooks/useMenuProvieder";

const Navbar = () => {
    const [credentials, setCredentials] = useState();
    const { user } = useAuthContext();
    const { userData } = useCurrentUser();
    const { HamburgerMenu } = useMenuProvider();

    useEffect(() => {
        setCredentials(userData);
    }, [userData])

    const getDp = () => {
        if (credentials && credentials.image) {
            return credentials.image;
        }
        else {
            return avatarPlaceholer;
        }
    }

    const navVariant = {
        hidden: {
            x: -100,
        },
        visible: {
            x: 0,
            transition: {
                type: "", duration: 0.3, ease: "easeInOut", damping: 2
            }
        },
    }

    return <motion.div className="navbar" variants={navVariant} initial="hidden" animate="visible" style={{ display: HamburgerMenu ? "block" : "none" }}>
        <div className="nav_content">
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
    </motion.div>
}
export default Navbar;