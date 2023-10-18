import { useSelector } from "react-redux";
import Header from "../question-dashboard-header/Header";
import QuestionTab from "../question-tab/QuestionTab";
import "./QuestionDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function QuestionDashBoard(){
  const {userId} = useSelector((store)=>store.user);
  const [questionList,setQuestionList] = useState([]);
  const[activeQuestionList,setActiveQuestionList] = useState("English");
  const [subjectList,setSubjectList] = useState(["English","Hindi","General Knowledge","Computer Basic","Quantitative Aptitude","Logical Resoning"]);
  const [time, setTime] = useState(90*60);
 
  useEffect(()=>{
    loadQuestionsPaper();
  },[]);
  const loadQuestionsPaper = async ()=>{
   try{ 
    const response = await axios.post("http://localhost:3001/paper/generate",{userId});
    console.log(response.data.questionsList[0].English);
    setQuestionList([...response.data.questionsList]);
   }
   catch(err){
    toast.error("Oops! something went wrong..");
   } 
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        // Handle timer completion here
      }
    }, 1000);

    return () => {
      clearInterval(timer); // Cleanup the timer when the component unmounts
    };
  }, [time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
    return <>
      <div className="pt-2 container-fluid question-dashboard">
        <div className="row">
            <div className="col-md-9">
              <Header/>
              <div className="container-fluid bg-white mt-2 pt-1 pb-1">
              <QuestionTab  userId={userId} questionList={questionList} setQuestionList={setQuestionList} activeQuestionList={activeQuestionList} setActiveQuestionList={setActiveQuestionList}/>
              </div>
            </div>  
            <div className="col-md-3" style={{backgroundColor:"white"}}>
                <div className="d-flex pt-4 align-items-center justify-content-center bg-white" style={{height:"30px"}}>
                  <h5>Time Left - <span className="text-danger">{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</span></h5>
                </div>
                <hr/>
                <h5 className="text-center">Question status</h5>
                {subjectList.map((subject,index)=><div key={index}>
                  <div>{subject}</div>
                  <div className="row pl-3">
                   {questionList[0]?.[subject].map((question,index)=><span className="d-flex ml-2 mt-1 justify-content-center align-items-center" style={{width:"20px", height:"20px", borderRadius:"50%", backgroundColor:"#E1DFDF", fontSize:"10px"}}>{index+1}</span>
                  )}
                  </div>
                  <hr/>
                </div>)}

            </div>
        </div>
      </div>
    </>
}