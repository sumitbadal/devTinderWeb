import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utills/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try{
            const res = await axios.post(
                `${BASE_URL}/auth/login`,
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            return navigate("/");
        } catch(error) {
            setError(error?.response?.data);
            console.log(error);
        }
    }
  return (
    <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Login!</h2>
                <div>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input type="text" value={emailId} className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setEmailId(e.target.value)}
                        />                        
                    </label>
                </div>
                <div>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="text" className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setPassword(e.target.value)}
                        />                        
                    </label>
                </div>
                <p className="text-red">{error}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login