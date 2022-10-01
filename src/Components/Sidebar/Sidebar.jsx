import useTeamMembers from "../../Hooks/useTeamMembers";
import "./Sidebar.css"
import avatar from "../../assets/avatar.svg";
const Sidebar = () => {
    const teamdata = useTeamMembers();

    const getDp = each => each.image ? each.image : avatar;

    return (
        <div className="sidebar">
            <h2 className="section_title">Team</h2>
            <div className="team_contain">

                {
                    teamdata && teamdata.map((each) => {
                        console.log(each);
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
    )
}
export default Sidebar;