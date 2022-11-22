import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <div>
            <div>
                <Link to={"/"}>Home</Link>
            </div>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
        </div>
    )
}