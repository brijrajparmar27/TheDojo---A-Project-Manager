import useLogout from "../../Hooks/useLogout";
import "./Dashboard.css";

const Dashboard = () => {
    const {logout} = useLogout();
    return <div className="dashboard">
        <p onClick={logout}>Dashboard</p>
    </div>
}
export default Dashboard;