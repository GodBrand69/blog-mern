import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    const logout = () => {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST"
        });
        setUserInfo(null)
    }

    const username = userInfo?.username;

    return (  
        <nav className="flex justify-between mb-20 mx-20 my-4">
            <h1 className="text-xl font-bold">
                <Link to="/">Blog</Link>
            </h1>
            {username && 
                <ul className="flex gap-6 items-center">
                <li>
                    <Link to="/create">Create New Post</Link>
                </li>
                <li>
                    <Link onClick={logout}>Logout</Link>
                </li>
            </ul>
            }
            {!username && 
                <ul className="flex gap-6 items-center">
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            }
        </nav>
    );
}
 
export default Navbar;