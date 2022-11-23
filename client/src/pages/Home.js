import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
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
    }, []) 


    return (
      <div className="Home">
        <h1>Netrunners Home</h1>
        <Navbar/>
        <div>
            {currentUser ? currentUser.username : null}
        </div>
      </div>
    );
}