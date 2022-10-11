import useFetchProjects from "../../Hooks/useFetchProjects";
import "./Dashboard.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { where } from "firebase/firestore";
import { motion } from "framer-motion";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import { useState } from "react";
import fetching from "../../assets/fetching.svg";
import empty from "../../assets/empty.svg";

const Dashboard = () => {
    const [filter, setFilter] = useState(false);
    const { projects, loading, error } = useFetchProjects(filter);
    const { user } = useAuthContext();

    const filterOptions = [
        {
            name: "All",
            function: null
        },
        {
            name: "Completed",
            function: where("completed", "==", true)
        },
        {
            name: "Running",
            function: where("completed", "==", false)
        },
        {
            name: "Mine",
            function: where("createdBy.uid", "==", user.uid)
        },
    ]

    const getMemberDP = (image) => {
        return image ? image : avatar;
    }

    const pageVariant = {
        hide: {
            x: "-100vw",
            transition: {
                type: "spring", duration: 0.5, ease: "easeInOut"
            }
        },
        show: {
            x: 0,
            transition: {
                type: "spring", duration: 0.5, ease: "easeInOut"
            }
        },
        exit: {
            x: "-100vw",
            transition: {
                type: "spring", duration: 0.5, ease: "easeInOut"
            }
        }
    }

    return <motion.div className="dashboard"
        variants={pageVariant} initial='hide' animate='show' id="style-1"
        exit='exit'>
        <h2>Dashboard</h2>
        <div className="dashboard_content">
            <div className="section_title">
                <h3>Filter</h3>
                <div className="filter_contain">
                    {
                        filterOptions.map((each, index) => {
                            return <p className="filter_option" key={index} onClick={() => { setFilter(each.function) }}>
                                {each.name}
                            </p>
                        })
                    }
                </div>
            </div>
            <div className="projects_section">
                <div className="section_title">
                    <h3>Projects</h3>
                </div>
                <div className="projects_contain">
                    {
                        loading && <img src={fetching} alt="fetching data" />
                    }
                    {
                        !loading && projects && projects.length <= 0 && <img src={empty} alt="no projects" height="300px" />
                    }
                    {
                        projects && !loading && projects.map((project) => {
                            return <Link to={"/project/" + project.uid} key={project.uid}>
                                <div className="project_card">
                                    <div className="details_contain">
                                        <p className="project_title">
                                            {project.name}
                                        </p>
                                        <p className="due_date">Due on {project.due.toDate().toDateString()}</p>
                                        <p className="flair">{project.category}</p>
                                    </div>
                                    <div className="members_contain">
                                        {
                                            project.assigned.map((member) => {
                                                return <div style={{backgroundImage:`url(${getMemberDP(member.value.image)})`}} className="member_avatar" alt="image" key={member.value.uid} ></div>
                                            })
                                        }
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    </motion.div>
}
export default Dashboard;