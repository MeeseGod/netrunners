import { useEffect, useState } from "react";

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
        <div>
            {users && users.map((user) => (
                <p key={`key${user.username}`}>{user.username}</p>
            ))}
        </div>
      </div>
    );
}