import Timer from "../components/Timer";

export default function Mission(props){
    const mission = props.mission;
    console.log(props.mission);

    return <div className="missionContainer">
        <h2>{mission.title}</h2>
        <Timer time={30}/>
    </div>
};