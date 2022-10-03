import { useState } from "react";
import RichText from "../../Components/RichText/RichText";
import Select from "react-select";
import "./Create.css";
import { useEffect } from "react";
import useTeamMembers from "../../Hooks/useTeamMembers";
import useAuthContext from "../../Hooks/ContextHooks/useAuthContext";
import useProject from "../../Hooks/useProject";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.svg";

const Create = () => {
    const [users, setUsers] = useState([]);
    const [RichData, setRichData] = useState("");
    const [Selectedcategory, setCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState([]);
    const [feildError, setError] = useState(null);
    const { user } = useAuthContext();
    const { createProject, loading, error } = useProject();
    const navigate = useNavigate();

    const teamdata = useTeamMembers();

    useEffect(() => {
        if (teamdata) {
            let data = [];
            teamdata.forEach((each) => {
                data.push({ value: each, label: each.name });
            });
            setUsers([...data]);
            data = [];
        }
    }, [teamdata])

    const handleProjectSubmit = (e) => {
        e.preventDefault();
        let [name, details, due, category, assigned] = [e.target.name.value.trim(), RichData.trim(), e.target.date.value, Selectedcategory, assignedTo];
        try {
            if (details.length == 0 || name.length == 0 || category.length == 0 || assigned.length == 0) {
                throw "Fields Cannot be Empty"
            }
            else {
                let data = {
                    name,
                    details,
                    due,
                    category,
                    assigned,
                    createdBy: { uid: user.uid, name: user.displayName, image: user.photoURL }
                }
                createProject(data, navigate);
            };
        }
        catch (err) {
            setError(err);
        }
    }



    const catagories = [
        {
            value: "development",
            label: "Development"
        },
        {
            value: "design",
            label: "Design"
        },
        {
            value: "marketing",
            label: "Marketing"
        },
        {
            value: "sales",
            label: "Sales"
        },
        {
            value: "legal",
            label: "Legal"
        },
        {
            value: "human resources",
            label: "Human Resources"
        },
        {
            value: "others",
            label: "Others"
        }
    ]
    return <div className="create" id="style-1">
        <h2>Create Project</h2>
        <form className="create_contain" onSubmit={handleProjectSubmit}>
            <div className="input_contain">
                <p className="lable">Project Name</p>
                <input type="text" name="name" className="tb" required />
            </div>
            <div className="input_contain">
                <p className="lable">Details</p>
                <RichText setRichData={setRichData} />
            </div>
            <div className="input_contain">
                <p className="lable">Due Date</p>
                <input type="date" name="date" className="tb" required />
            </div>
            <div className="input_contain">
                <p className="lable">Category</p>
                <Select options={catagories} onChange={(selected) => { setCategory(selected.value); }} />
            </div>
            <div className="input_contain">
                <p className="lable">Assigned to</p>
                <Select options={users} isMulti onChange={(selected) => { setAssignedTo(selected); }} />
            </div>
            {feildError && <p className="error_msg">{feildError}</p>}
            {error && <p className="error_msg">{error.message}</p>}
            <button type="submit" value="Save Project" className="submit_btn" >
                {loading ? <img src={loader} className="loader" alt="loading" /> : "Save Project"}
            </button>
        </form>
    </div>
}
export default Create;