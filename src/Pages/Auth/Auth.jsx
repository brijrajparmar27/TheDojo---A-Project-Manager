import { useState } from "react";
import logo from "../../assets/logo.svg";
import useLogin from "../../Hooks/useLogin";
import useLogout from "../../Hooks/useLogout";
import useSignup from "../../Hooks/useSignup";
import portrait from "../../assets/Images/portrait.jpg"
import "./Auth.css";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const { signup } = useSignup();
    const { login } = useLogin();
    const { logout } = useLogout();

    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target.email.value.trim();
        let password = e.target.password.value.trim();
        if (isLogin) {
            if (isLogin && email.length > 0 && password.length > 0) {
                login(email, password);
            }
            else {
                console.log("cannot be empty");
            }
        }
        else {
            let username = e.target.username.value.trim();
            if (isLogin && email.length > 0 && password.length > 0 && username.length > 0) {
                signup({ email: email, pass: password, username: username });
            }
            else {
                console.log("cannot be empty");
            }
        }
    }

    return <div className="auth">
        <div className="left_section" style={{backgroundImage:`url("${portrait}")`}}>
            <img src={logo} className="logo_img" />
        </div>
        <div className="right_section">
            <h1 className="app_title" onClick={logout}>
                The Dojo
            </h1>
            <div className="right_content">
                <div className="title_contain">
                    <h1>{isLogin ? "Login" : "Sign up"}</h1>
                    <p>{isLogin ? "Welcome back" : "Lets get you started."}</p>
                </div>
                <div className="form_contain">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="email textbox" placeholder="Email" name="email" />
                        <input type="password" className="password textbox" placeholder="Password" name="password" />
                        {!isLogin && <input type="text" className="username textbox" placeholder="Username" name="username" />}
                        <input type="submit" className="submit_btn" value={isLogin ? "Login" : "Sign up"} />
                    </form>
                    <p className="redirect" onClick={() => { setIsLogin((prev) => !prev) }}>{isLogin ? "Dont have an account? Signup" : "Already have an account? Login"}</p>

                </div>
            </div>
        </div>
    </div>
}
export default Auth;
