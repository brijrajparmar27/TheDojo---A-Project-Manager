import useTeamMembers from "../../Hooks/useTeamMembers";
import "./Sidebar.css"
import avatar from "../../assets/avatar.svg";
import { motion } from "framer-motion";
import useMenuProvider from "../../Hooks/ContextHooks/useMenuProvieder";
const Sidebar = () => {
    const teamdata = useTeamMembers();
    const { OnlineMenu } = useMenuProvider();

    const getDp = each => each.image ? each.image : avatar;

    const navVariant = {
        hidden: {
            x: 100,
        },
        visible: {
            x: 0,
            transition: {
                type: "", duration: 0.3, ease: "easeInOut", damping: 2
            }
        },
    }

    return (
        <motion.div className="sidebar" variants={navVariant} initial="hidden" animate="visible" style={{ display: OnlineMenu ? "block" : "none" }}>
            <div className="side_content">
                <h2 className="section_title">Team</h2>
                <div className="team_contain" id="style-1">

                    {
                        teamdata && teamdata.map((each) => {
                            return (
                                <div className="team_member" key={each.uid}>
                                    <div className="avatar_contain" style={{ backgroundImage: `url(${getDp(each)})` }}>
                                        {each.online && <div className="online"></div>}
                                    </div>
                                    <p className="member_name">{each.name}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </motion.div>
    )
}
export default Sidebar;