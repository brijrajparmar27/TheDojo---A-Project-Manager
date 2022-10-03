import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../Hooks/useProject";
import avatar from "../../assets/avatar.svg";
import "./Project.css";
import { IoSend } from "react-icons/io5";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import useComments from "../../Hooks/useComments";

const Project = () => {
    const { fetchProject } = useProject();
    const [projectDetails, setProjectDetails] = useState(null);
    const { id } = useParams();
    const { user } = useAuthContext();
    const { comments, loading, addComment } = useComments(id);

    const getDP = image => image ? image : avatar;

    useEffect(() => {
        fetchProject(id, setProjectDetails);
    }, [id])

    useEffect(()=>{
        comments && console.log(comments);
    },[comments])

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

    return <div className="project">
        <h2>Project</h2>
        <div className="project_section_contain">
            {projectDetails && <div className="project_details_section">
                <div className="project_details_contain">
                    <div className="project_info_bundle">
                        <p className="project_title">
                            {projectDetails.name}
                        </p>
                        <p className="due">
                            {projectDetails.due}
                        </p>
                        <p className="creator">
                            Created by: <span className="creator_name">{projectDetails.createdBy.name}</span>
                        </p>
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
                <button className="submit_btn">Mark as Completed</button>
            </div>}
            <div className="comments_section">
                <h3>Comments</h3>
                <form className="comments_input_contain" onSubmit={handleComment}>
                    <input type="text" name="comment" className="comment_tb" />
                    <button type="submit" value="send" className="submit_btn"><IoSend></IoSend></button>
                </form>
                {comments && <div className="comments_contain">
                    {
                        comments.map((comment) => {
                            return(<div className="comment" key={comment.Cid}>
                                <div className="comment_avatar" style={{ backgroundImage: `url(${getDP(comment.image)})` }}></div>
                                <div className="comment_data">
                                    <p className="comment_name">{comment.name}</p>
                                    <p className="comment_text">{comment.comment}</p>
                                </div>
                            </div>)
                        })
                    }
                </div>}
            </div>
        </div>
    </div>
}
export default Project;