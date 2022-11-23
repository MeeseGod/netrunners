import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar(){
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await fetch("/api/users/currentUser");
            const json = await response.json();
            if(response.ok){
                setCurrentUser(json);
            }
        }
        getCurrentUser();
    }, []); 

    return (
        <div>
            <div>
                <Link to={"/"}>Home</Link>
            </div>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
            <div>
                {currentUser ? currentUser.username : null}
            </div>
        </div>
    );
};