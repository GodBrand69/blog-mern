import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, []);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <>
            <div className="mx-auto w-[60%]">
                <h1 className="text-2xl mb-4 font-bold">
                    Edit New Post
                </h1>
                <form onSubmit={updatePost}>
                    <input
                        className="w-full px-2 border-2 rounded-md my-2 h-[40px]"
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={e => { setTitle(e.target.value) }}
                    />
                    <textarea
                        className="w-full py-1 px-2 border-2 rounded-md my-2 h-[40px]"
                        placeholder="Summary"
                        type="text"
                        value={summary}
                        onChange={e => { setSummary(e.target.value) }}
                    />
                    <input
                        className="w-full px-2 py-1 border-2 rounded-md my-2 h-[40px]"
                        placeholder="Title"
                        type="file"
                        onChange={e => { setFiles(e.target.files) }}
                    />
                    <ReactQuill
                        value={content}
                        onChange={newValue => setContent(newValue)}
                        modules={modules}
                        theme={'snow'}
                    />
                    <button className="w-full h-[40px] bg-slate-700 hover:bg-black text-white ">Update Post</button>
                </form>
            </div>
        </>

    );
}