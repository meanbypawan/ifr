import { useLocation, useNavigate } from "react-router-dom"
import "./Result.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux-data/UserSlice";
export default function Result(){
    const location  = useLocation();
    let score = location.state.param.score;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(signOut());
    return <>
       <div className="result-container">
         <div className="show-result" style={{backgroundColor: score>=50 ? "green" : "red"}}>
            <h1>Your total score is : {score}</h1>
            {score>=50? <p>Congratulation ! You are selected for next round</p>:<p>Better Luck Next Time !!</p>}
            <button onClick={()=>navigate("/")}>Thank You</button>
         </div>
       </div>
    </>
}