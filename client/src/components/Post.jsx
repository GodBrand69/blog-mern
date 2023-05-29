import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
    return (  
        <div className="flex mx-32 my-20 gap-10">
            <div>
                <Link to={`/post/${_id}`}>
                    <img className="max-w-[500px] max-h-[500px]" src={'http://localhost:4000/'+cover} />
                </Link>
            </div>
            <div>
                <Link to={`/post/${_id}`}>
                    <h1 className="text-3xl my-2 font-bold">
                        {title}
                    </h1>
                </Link>
                <div className="gap-2 flex text-lg my-2 items-center">
                <span className="font-bold text-gray-600 ">{author.username}</span><time>{formatISO9075(new Date(createdAt))}</time>
                </div>
                <p className="text-md text-justify leading-[30px]">
                    {summary}
                </p>
            </div>
        </div>
    );
}
 
export default Post;