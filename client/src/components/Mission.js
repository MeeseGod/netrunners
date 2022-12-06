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

    function startMission(){
        console.log("Start Mission");
    };


    return <div className="missionContainer">
        <h2>{mission.title}</h2>
        <div>
            {mission.isStarted
                ? <Timer time={calculateTime()}/>
                : <button onClick={() => {startMission()}}>Start Mission</button>
            }
        </div>

    </div>
};