import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/users");
            const json = await response.json();
            if(response.ok){
                setUsers(json);
            }
        };

        fetchUsers();
    }, []) 

    return (
      <div className="Home">
        <h1>Netrunners Home</h1>
        <Navbar/>
        <div>
            {users && users.map((user) => (
                <p key={`key${user.username}`}>{user.username}</p>
            ))}
        </div>
      </div>
    );
}