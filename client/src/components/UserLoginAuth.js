import { useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";

export function UserLoginAuth({isLogin,to}){
    console.log(isLogin)
    const navigate = useNavigate();
    if(isLogin.flag){
        if(to==="profile")
        return <Profile isLogin={isLogin}/>
    }
    return (
        <div>
            User not signedin
        </div>
    );
}