import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Mission from "../components/Mission";

export default function Home() {

  const [userCharacter, setUserCharacter] = useState(null);
  const [characterMissions, setCharacterMissions] = useState(null);

  useEffect(()=>{
    const getCharacter = async() => { 
      const characterRequest = await fetch("/api/users/getCharacter");
      const json = await characterRequest.json();
      if(characterRequest.ok){
        console.log(json.missions);
        setUserCharacter(json);
        setCharacterMissions(json.missions);
      };
    };
    getCharacter();
  },[]);


  return (
    <div className="Home">
      <h1>Netrunners Home</h1>
      <button onClick={() => {console.log(userCharacter)}}>Character</button>
      <Navbar/>
      {userCharacter ?
        <div>
          {characterMissions.map((mission) => {
            return <Mission key={mission._id}/>
          })}
        </div> :
        <div> 
          Login to play.
        </div>
      }
    </div>
  );
};