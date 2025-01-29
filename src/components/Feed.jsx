import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utills/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try{
            if(feed) return;
            const feedData = await axios.get(`${BASE_URL}/user/feed`, {
                withCredentials: true,
            });
            dispatch(addFeed(feedData.data));
        } catch (error) {

        }
    }
    useEffect( () => {
        getFeed();
    }, []);
    return feed && (
        <div className="flex justify-center my-10">
            < UserCard user={feed[0]} />
        </div>
    )
}

export default Feed