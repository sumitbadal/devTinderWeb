import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { addUser } from "../utills/userSlice";

const EditProfile = ({user}) => {
    console.log(user);
    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastname] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setphotoUrlt] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const editProfile = async () => {
        try{
            // Call an API to update the user profile
            const res = await axios.patch(`${BASE_URL}/profile/edit`,
                {firstName, lastName, photoUrl, about, gender},
                {withCredentials: true}
            );
            console.log(res);
            dispatch(addUser(res.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input type="text" value={firstName} className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstname(e.target.value)}
                                />                        
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" 
                                    onChange={(e) => setLastname(e.target.value)}
                                />                        
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <input type="text" value={gender} className="input input-bordered w-full max-w-xs" 
                                    onChange={(e) => setGender(e.target.value)}
                                />                        
                            </label>
                        </div>
                        <p className="text-red">{error}</p>
                        <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={editProfile}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{firstName, lastName, photoUrl, about, gender} } />
            {
                showToast && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile saved successfully.</span>
                        </div>
                    </div>
                )
            }
        </div>
      )
}

export default EditProfile;