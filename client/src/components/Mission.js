import Timer from "../components/Timer";

export default function Mission(props){
    const mission = props.mission;
    // console.log(props.mission);

    function calculateTime(){
        const currentTime = Date.now() / 1000;
        const endTime = (Date.now() + 60000) / 1000;
        // Will be used when endTimes are properly implemented
        // const endTime = mission.endTime / 1000;
        return endTime - currentTime;
    };

    async function startMission(missionID){
        await fetch("/api/missions/startMission", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                missionID: missionID,
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("Failed to start mission");
            }
        }).catch(console.error)
        
        console.log(missionID);
    };
    
    return <div className="missionContainer">
        <h2>{mission.title}</h2>
        <div>
            {mission.isStarted
                ? <Timer time={calculateTime()}/>
                : <button onClick={() => {startMission(mission._id)}}>Start Mission</button>
            }
        </div>

    </div>
};