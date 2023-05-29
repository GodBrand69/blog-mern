import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    const login = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/login", {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        })
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        } else {
            alert("Wrong Credentials!")
        }
    }

    if(redirect) {
        return <Navigate to={"/"} />
    }

    return (  
        <div className="w-[400px] mx-auto items-center">  
            <h1 className="text-2xl font-bold">
                Login
            </h1>
            <form onSubmit={login}>
                <input 
                className="w-full px-2 border-2 rounded-md my-2 h-[40px]" 
                placeholder="Username" 
                type="text" 
                value={username}
                onChange={e => {setUsername(e.target.value)}}
                />
                <input 
                className="w-full px-2 border-2 rounded-md my-2 h-[40px]" 
                placeholder="Password" 
                type="password" 
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                />
                <button className="w-full h-[40px] bg-slate-700 hover:bg-black text-white ">Login</button>
            </form>
        </div>
    );
}

export default Login;