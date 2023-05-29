import { useState } from "react";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })
        if(response.status === 200)
        {
            alert("Registration Succefull!")
        }
        else
        {
            alert("Registration Failed!")
        }
    }

    return (  
        <div className="w-[400px] mx-auto items-center">  
            <h1 className="text-2xl font-bold">
                Register
            </h1>
            <form onSubmit={register}>
                <input 
                    className="w-full px-2 border-2 rounded-md my-2 h-[40px]" 
                    placeholder="Username" 
                    type="text" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    className="w-full px-2 border-2 rounded-md my-2 h-[40px]" 
                    placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-full h-[40px] bg-slate-700 hover:bg-black text-white ">Register</button>
            </form>
        </div>
    );
}

export default Register;