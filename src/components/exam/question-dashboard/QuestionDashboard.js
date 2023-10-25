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
  
  const [questionPaper,setQuestionPaper] = useState(JSON.parse(localStorage.getItem("question-list")));

  const changeTab = (scrollContainerId,subject)=>{
    setActiveQuestionList(subject);
    let scrollContainer = document.querySelector("#"+scrollContainerId);    
    scrollContainer.scrollTop = 0;
  }
  const styles = {
    selected:{
      backgroundColor: "#EA3F3F",
      color:"white",
      width:"20px",
      height:"20px",
      borderRadius:"50%",
      fontSize:"10px"
    },
    notSelected:{
      backgroundColor: "#E1DFDF",
      color: "black",
      width:"20px",
      height:"20px",
      borderRadius:"50%",
      fontSize:"10px"
    }
  };
  const [time, setTime] = useState(90*60);
 
  useEffect(()=>{
    loadQuestionsPaper();
  },[]);
  const loadQuestionsPaper = async ()=>{
   try{ 
    const response = await axios.post("http://localhost:3001/paper/generate",{userId});
    setQuestionList([...response.data.questionsList]);
    console.log("Inside load question paper...........");
    console.log(questionList);
    saveQuestion(response.data.questionsList);
    setTime(localStorage.getItem("timer")*1);
   }
   catch(err){
    toast.error("Oops! something went wrong..");
   } 
  }

  const saveQuestion = (questionList)=>{
    //questionList = JSON.parse(questionList);
    if(!localStorage.getItem("question-list")){
       let updateQuestionList = {"English":[],"Hindi":[],"General Knowledge":[],"Computer Basic":[],"Quantitative Aptitude":[],"Logical Resoning":[]};
       for(let key in questionList[0])
          for(let question of questionList[0][key]){
            delete question.Answer;
            updateQuestionList[key].push(question);
          }
        localStorage.setItem("question-list",JSON.stringify(updateQuestionList));
        setQuestionPaper(updateQuestionList);
    }
  } 
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        localStorage.setItem("timer",""+(time-1));
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
              {questionList.length!=0 && questionPaper!=null?<QuestionTab changeTab={changeTab} userId={userId} questionList={questionList} setQuestionList={setQuestionList} activeQuestionList={activeQuestionList} setActiveQuestionList={setActiveQuestionList} subjectList={subjectList} setSubjectList={setSubjectList} questionPaper={questionPaper} setQuestionPaper={setQuestionPaper}/> : <p>Data loading....</p>}  
              
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
                   {questionList[0]?.[subject].map((question,index)=><span key={index} className="d-flex ml-2 mt-1 justify-content-center align-items-center" style={(questionPaper?.[subject].find((obj)=>{return obj.Id == question.Id}).AnswerKey!='null')? styles.selected:styles.notSelected}>{index+1}</span>
                  )}
                  </div>
                  <hr/>
                </div>)}

            </div>
        </div>
      </div>
    </>
}