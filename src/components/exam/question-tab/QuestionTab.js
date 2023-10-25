import React, { useState } from 'react';
import './QuestionTab.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function QuestionTab({changeTab,questionPaper,setQuestionPaper,userId,questionList,setQuestionList,activeQuestionList,setActiveQuestionList,subjectList,setSubjectList}){
    console.log(questionPaper);

    const saveAnswer = (id,answerKey)=>{
      let questionList = JSON.parse(localStorage.getItem("question-list"));
      let updatedQuestionList = {...questionList};
      let targetedQuestion = updatedQuestionList[activeQuestionList].findIndex((question)=>question.Id==id);
      updatedQuestionList[activeQuestionList][targetedQuestion].AnswerKey = answerKey;
      localStorage.setItem("question-list",JSON.stringify(updatedQuestionList));  
      setQuestionPaper(updatedQuestionList);
    }
    const submitTest = async ()=>{
       let questionList = localStorage.getItem("question-list");      
       questionList = questionList && JSON.parse(questionList);
       let response = await axios.post("http://localhost:3001/paper/submit",{questionList,userId});
       if(response.data.score >=50)
        toast.success("Passed : Total Score  is : "+response.data.score);
       else
        toast.error("Failed : Total Score is : "+response.data.score);
       
      localStorage.clear();  
    }
    return <>
    <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
           <div className="col-md-12 tabs d-flex justify-content-between">
              <button onClick={()=>changeTab('question-section',"English")} className={(activeQuestionList == "English") ? "active":""}>English</button>
                <button onClick={()=>changeTab('question-section',"Hindi")} className={(activeQuestionList == "Hindi") ? "active":""}>Hindi</button>
              <button onClick={()=>changeTab('question-section',"General Knowledge")} className={(activeQuestionList == "General Knowledge") ? "active":""}>G.K</button>
              <button onClick={()=>changeTab('question-section',"Computer Basic")} className={(activeQuestionList == "Computer Basic") ? "active":""}>Computer</button>
              <button onClick={()=>changeTab('question-section',"Quantitative Aptitude")} className={(activeQuestionList == "Quantitative Aptitude") ? "active":""}>Math</button>
              <button onClick={()=>changeTab('question-section',"Logical Resoning")} className={(activeQuestionList == "Logical Resoning") ? "active":""}>L.R</button>
           </div>
        </div>
        <div className="row">
          <div id="question-section" className="col-12 question-section p-5">
            {questionPaper[activeQuestionList].map((question,index)=><div className="questions" key={index}>
              <p style={{fontWeight:"bold"}}>Q.{index+1} {question.Question}</p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="A"} onChange={()=>saveAnswer(question.Id,"A")} id={activeQuestionList+question.A}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+"A"}>{question.A}</label></p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="B"} onChange={()=>saveAnswer(question.Id,"B")} id={activeQuestionList+question.B}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+"B"}>{question.B}</label></p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="C"} onChange={()=>saveAnswer(question.Id,"C")} id={activeQuestionList+question.C}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+"C"}>{question.C}</label></p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="D"} onChange={()=>saveAnswer(question.Id,"D")} id={activeQuestionList+question.D}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+"D"}>{question.D}</label></p>
              <hr/> 
            </div>)}
            
          </div>  
        </div>    
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 question-tracking-section d-flex justify-content-around align-items-center">
            <div>
              <span className="mr-2" style={{width:"15px", height:"15px", borderRadius:"50%",display:"inline-block",backgroundColor:"#EA3F3F"}}></span> Answerd
            </div>
            <div>
            <span className="mr-2" style={{width:"15px", height:"15px",display:"inline-block", borderRadius:"50%",backgroundColor:"#E1DFDF"}}></span> Not answered
            </div>
            <div><span className="mr-2" style={{width:"15px", height:"15px",display:"inline-block", borderRadius:"50%",backgroundColor:"#E77C34"}}></span>Marked for review</div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row" style={{padding:"0px"}}>
          <div style={{padding:"0px"}} className="col-12 question-footer d-flex justify-content-center align-items-center">
            <button onClick={()=>submitTest()} id="submit-button" className="btn btn-outline-secondary w-100 p-2">End Test</button>
          </div>
        </div>
      </div>
    </>
}

export default QuestionTab;