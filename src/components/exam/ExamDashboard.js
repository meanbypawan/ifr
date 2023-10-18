import { useSelector } from "react-redux";
import "./ExamDashboard.css";
import { useState } from "react"; 
import {useNavigate} from "react-router-dom";
export default function ExamDashboard() {
    const { name } = useSelector((store) => store.user);
    const [flag,setFlag] = useState(true);
    const navigate = useNavigate();
    
    return <>
        <div className="container-fluid bg-container d-flex justify-content-center align-items-center">
            <div className="info-block">
                <div className="exam-instruction-block">
                    <label className="text-center mt-5 text-danger" style={{ fontSize: '20px' }}>Information Technology Excellence Program Online Test</label>
                    <hr />
                    <p><span style={{ fontSize: '25px' }}>Dear {name}</span> <br/>Read all instrucation carefully before starting the exam  </p>
                    <ol className="instruction-list">
                        <li className="mt-1 mb-1">fdkf fdkf fdkf fdkfd</li>
                        <li className="mt-1 mb-1">fdklf fdlfkd rer mfkldlf rerer dfldfd</li>
                        <li className="mt-1 mb-1">djlkf rerpoer dkflkf vxvnn dfdfklf oreproe</li>
                        <li className="mt-1 mb-1">fkldjkf fdkf errtyyttr</li>
                        <li className="mt-1 mb-1">fdfjk dfd reepo fkfkj fdf rerpore cxvmnv eropr ero</li>
                    </ol>
                    <input type="checkbox" onChange={()=>setFlag(!flag)}/> Have you read all instruction ?
                </div>
                <div className="block-footer mt-5 mb-4 d-flex justify-content-center align-items-center">
                    <button disabled={flag} onClick={()=>navigate("/question-dashboard")} type="button" className="btn btn-success">Start Online Test</button>
                </div>
            </div>
            
        </div>
    </>
}
