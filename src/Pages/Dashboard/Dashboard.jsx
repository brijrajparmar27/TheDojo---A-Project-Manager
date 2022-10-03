import { useEffect } from "react";
import useFetchProjects from "../../Hooks/useFetchProjects";
import useLogout from "../../Hooks/useLogout";
import "./Dashboard.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { logout } = useLogout();
    const { projects, loading, error } = useFetchProjects();

    const getMemberDP = (image) => {
        return image ? image : avatar;
    }

    useEffect(() => {
        projects && console.log(projects);
    }, [projects])


    return <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="dashboard_content">
            {/* <div className="filter_section">

            </div> */}
            <div className="projects_section">
                <h3>Projects</h3>
                <div className="projects_contain">
                    {projects && projects.map((project) => {
                        return <Link to={"/project/" + project.uid} key={project.uid}>
                            <div className="project_card">
                                <div className="details_contain">
                                    <p className="project_title">
                                        {project.name}
                                    </p>
                                    <p className="due_date">{project.due}</p>
                                    <p className="flair">{project.category}</p>
                                </div>
                                <div className="members_contain">
                                    {
                                        project.assigned.map((member) => {
                                            return <img src={getMemberDP(member.value.image)} className="member_avatar" alt="image" key={member.value.uid} />
                                        })
                                    }
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    </div>
}
export default Dashboard;