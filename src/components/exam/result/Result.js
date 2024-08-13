import { useLocation } from "react-router-dom"
import "./Result.css";
export default function Result(){
    const location  = useLocation();
    let score = location.state.param.score;
    return <>
       <div className="result-container">
         <div className="show-result" style={{backgroundColor: score>=50 ? "green" : "red"}}>
            <h1>Your total score is : {score}</h1>
            {score>=50? <p>Congratulation ! You are selected for next round</p>:<p>Better Luck Next Time !!</p>}
            <button>Thank You</button>
         </div>
       </div>
    </>
}