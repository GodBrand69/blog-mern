import {formatISO9075} from "date-fns";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const PostDesc = () => {
    const {id} = useParams()
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])

    if(!postInfo) {
        return ""
    }

    return (  
        <div className="mx-24">
            <h1 className="text-3xl flex justify-between font-bold mb-6">    
                {postInfo.title}
                {userInfo.id === postInfo.author._id && ( 
                <div className="text-[15px]">
                <Link to={`/edit/${postInfo._id}`}>
                    <button className="text-md font-normal flex items-center gap-2 bg-slate-700 text-white py-1 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                        Edit this post
                    </button>
                </Link>
                </div>
            )}
            </h1>
            <div className="mb-10 flex gap-4">
                <span className="font-bold text-gray-500">
                    @{postInfo.author.username}
                </span>
                <time className="text-slate-400">{formatISO9075(new Date(postInfo.createdAt))}</time>
            </div>
            <img className="max-w-full mx-auto my-4" src={`http://localhost:4000/${postInfo.cover}`} />
            <div className="text-lg leading-8 my-6 text-justify" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    );
}
 
export default PostDesc;