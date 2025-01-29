import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utills/connectionSlice";

const Connections = () => {
    const connections = useSelector((state) => state.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res?.data?.data);

            dispatch(addConnections(res?.data?.data));
        } catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;
    if(connections.length === 0) return <h1>No connections found</h1>
  return (
    <div className="text-center my-10">
        <h1 className="text-2xl font-bold">Connections</h1>
        {
            connections.map((connection) => {
                const { firstName, lastName, about } = connection;
                
                return (
                <div className="m-4 p-4 rounded-lg bg-base-300 w-1/4 mx-auto">
                    <h2>{`${firstName} ${lastName}`}</h2>
                    <p>{about}</p>
                </div>
                );
            })
        }
    </div>
  )
}

export default Connections