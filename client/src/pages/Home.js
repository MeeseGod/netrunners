import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {

  const [userCharacter, setUserCharacter] = useState(null);

  useEffect(()=>{
    const getCharacter = async() => { 
      const characterRequest = await fetch("/api/users/getCharacter");
      const json = await characterRequest.json()
      if(characterRequest.ok){
        setUserCharacter(json);
      };
    };

    getCharacter();
  },[])


  return (
    <div className="Home">
      <h1>Netrunners Home</h1>
      <button onClick={() => {console.log(userCharacter)}}>Character</button>
      <Navbar/>
    </div>
  );
};