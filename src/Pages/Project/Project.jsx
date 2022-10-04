import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useProject from "../../Hooks/useProject";
import avatar from "../../assets/avatar.svg";
import "./Project.css";
import { IoSend } from "react-icons/io5";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import useComments from "../../Hooks/useComments";

const Project = () => {
    const { fetchProject, updateProject, deleteProject, loading: projectLoading } = useProject();
    const [projectDetails, setProjectDetails] = useState(null);
    const { id } = useParams();
    const { user } = useAuthContext();
    const { comments, loading: commentsLoading, addComment } = useComments(id);
    const navigate = useNavigate();

    const getDP = image => image ? image : avatar;

    useEffect(() => {
        fetchProject(id, setProjectDetails);
    }, [id])

    const handleComment = (e) => {
        e.preventDefault();
        let commentData = {
            comment: e.target.comment.value,
            uid: user.uid,
            name: user.displayName,
            image: user.photoURL,
            time: new Date().getTime(),
            pid: id
        }
        addComment(commentData);
        e.target.reset();
    }

    const handleProjectState = () => {
        updateProject({ completed: !projectDetails.completed }, id);
        setProjectDetails({ ...projectDetails, completed: !projectDetails.completed });
    }

    const handleDelete = () => {
        deleteProject(id);
        navigate("/");
    }

    const commentsVariant = {
        hidden: {
            opacity: 0,
            x: 100
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    const detailsVariant = {
        hidden: {
            opacity: 0,
            x: -100
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    return <div className="project">
        < div className="row" >
            <h2>Project</h2>
            <button className="del_project" onClick={handleDelete}>Delete Project</button>
        </div >
        <div className="project_section_contain">
            {
                projectDetails && !projectLoading && <motion.div className="project_details_section" variants={detailsVariant} initial="hidden" animate="visible">
                    <div className="project_details_contain" id="style-1">
                        <div className="project_info_bundle">
                            <p className="project_title">
                                {projectDetails.name}
                            </p>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <p className="flair">
                                    {projectDetails.category}
                                </p>
                                <p className="due">
                                    {projectDetails.due.toDate().toDateString()}
                                </p>

                            </div>

                            <div className="creator_contain">
                                <p className="creator_label">
                                    Created by
                                </p>
                                <div className="creator_info">
                                    <div className="comment_avatar" style={{ backgroundImage: `url(${getDP(projectDetails.createdBy.image)})` }}></div>
                                    <span className="creator_name">{projectDetails.createdBy.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="content_description" dangerouslySetInnerHTML={{ __html: projectDetails.details }}>

                        </div>
                        <div className="assigned">
                            <p className="assigned_label">Assigned to</p>
                            <div className="members_contain">
                                {projectDetails.assigned.map((each) => {
                                    return <div className="member_avatar" style={{ backgroundImage: `url(${getDP(each.value.image)})` }} key={each.value.uid}>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <button className="submit_btn" onClick={handleProjectState}>{projectDetails.completed ? "Reopen Project" : "Mark as Completed"}</button>
                </motion.div>
            }
            {
                comments && !commentsLoading && <motion.div className="comments_section" variants={commentsVariant} initial="hidden" animate="visible">
                    <h3>Comments</h3>
                    <form className="comments_input_contain" onSubmit={handleComment}>
                        <input type="text" name="comment" className="comment_tb" />
                        <button type="submit" value="send" className="submit_btn"><IoSend></IoSend></button>
                    </form>
                    <div className="comments_contain" id="style-1">
                        {
                            comments.map((comment) => {
                                return (<div className="comment" key={comment.Cid}>
                                    <div className="comment_avatar" style={{ backgroundImage: `url(${getDP(comment.image)})` }}></div>
                                    <div className="comment_data">
                                        <p className="comment_name">{comment.name}</p>
                                        <p className="comment_text">{comment.comment}</p>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </motion.div>
            }
        </div>
    </div >
}
export default Project;