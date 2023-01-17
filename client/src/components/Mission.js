import Timer from "../components/Timer";

export default function Mission(props){
    const mission = props.mission;
    console.log(props.mission);

    function calculateTime(){
        const currentTime = (Date.now() / 1000);
        const endTime = (mission.endTime / 1000);
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
        
        // console.log(missionID);
    };

    async function completeMission(missionID, missionDifficulty){
        await fetch("/api/missions/completeMission", {
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
                missionDifficulty: missionDifficulty,
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("Failed to complete mission");
            }
        }).catch(console.error)
        
        // console.log(missionID);
    }

    function displayMission(){
        if(mission.isStarted){
            console.log(mission)
            if(calculateTime() < 0){
                return <div>
                    Complete
                    <button onClick={() => {completeMission(mission._id, mission.difficulty)}}>Complete Mission</button>
                </div>
            }
            else{
                return <Timer time={calculateTime()}/>
            }
        }
        else{
            <button onClick={() => {startMission(mission._id)}}>Start Mission</button>
        }
    }
    
    return <div className="missionContainer">
        <h2>{mission.title}</h2>
        <div>
            {/* {mission.isStarted
                ? <Timer time={calculateTime()}/>
                : <button onClick={() => {startMission(mission._id)}}>Start Mission</button>
            } */}
            {displayMission()}
        </div>

    </div>
};