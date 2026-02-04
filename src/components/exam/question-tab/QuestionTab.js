import React, { useEffect, useState } from 'react';
import './QuestionTab.css';
import { ToastContainer} from 'react-toastify';
function QuestionTab({submitTest,changeTab,questionPaper,setQuestionPaper,activeQuestionList,subjectList,targetQuestionNo}){
    const [answerd,setAnswered] = useState(localStorage.getItem("totalCheckedAnswer"));
    const [notAnswered,setNotAnswered] = useState(localStorage.getItem("totalUnCheckedAnswer"));
    const [markedForReview,setMarkedForReview] = useState(localStorage.getItem("totalMarkedForReview"));
    const saveAnswer = (id,answerKey)=>{
      let questionList = JSON.parse(localStorage.getItem("question-list"));
      let updatedQuestionList = {...questionList};
      let targetedQuestion = updatedQuestionList[activeQuestionList].findIndex((question)=>question.Id==id);
      if(answerKey == "reset"){
        updatedQuestionList[activeQuestionList][targetedQuestion].AnswerKey = "null";
        updatedQuestionList[activeQuestionList][targetedQuestion].MarkedForReview = "null";
      }
      else if(answerKey == "marked for review")
        updatedQuestionList[activeQuestionList][targetedQuestion].MarkedForReview = true;
      else{
        updatedQuestionList[activeQuestionList][targetedQuestion].AnswerKey = answerKey;
        updatedQuestionList[activeQuestionList][targetedQuestion].MarkedForReview = "null";
      }
      localStorage.setItem("question-list",JSON.stringify(updatedQuestionList));  
      setQuestionPaper(updatedQuestionList);
      let ansChecked = 0;
      let ansNotChecked = 0;
      let reviewChecked = 0;
      for(let key in updatedQuestionList){
         for(let question of updatedQuestionList[key]){
               if(question.MarkedForReview == true)
                 reviewChecked++;
               else if(question.AnswerKey != "null"){
                 ansChecked++;
                 if(question.MarkedForReview == true)
                   reviewChecked--;
               }  
               else
                 ansNotChecked++;  
         }
      }
      setAnswered(ansChecked);
      setNotAnswered(ansNotChecked);
      setMarkedForReview(reviewChecked);
      localStorage.setItem("totalCheckedAnswer",""+ansChecked);
      localStorage.setItem("totalUnCheckedAnswer",ansNotChecked);
      localStorage.setItem("totalMarkedForReview",reviewChecked);
    }
    
    useEffect(()=>{
      for(let i=0; i<=targetQuestionNo;i++)
        handleScroll(targetQuestionNo-1);
    },[targetQuestionNo]);

    const handleScroll = (index)=>{
      if(index == questionPaper[activeQuestionList].length-1){
        let subIndex = subjectList.findIndex((subject)=>{return subject == activeQuestionList});
        if(subIndex < subjectList.length-1)
          changeTab("question-section",subjectList[subIndex+1]);
      }else{
        let divObj = document.getElementById("div" + (index + 1));
        if (divObj) {
          divObj.scrollIntoView({ behavior: "smooth", block: "start" });
        }
       }
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
          <div id="question-section" className="col-12 question-section p-3">
            {questionPaper[activeQuestionList]?.map((question,index)=><div id={"div"+index} className="questions" key={index}>
              <p style={{fontWeight:"bold"}}>Q.{index+1} {question.Question}</p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="A"} onChange={()=>saveAnswer(question.Id,"A")} id={activeQuestionList+question.A}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+question.A}>{question.A}</label></p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="B"} onChange={()=>saveAnswer(question.Id,"B")} id={activeQuestionList+question.B}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+question.B}>{question.B}</label></p>
              <p><input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="C"} onChange={()=>saveAnswer(question.Id,"C")} id={activeQuestionList+question.C}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+question.C}>{question.C}</label></p>
              <p className='d-flex justify-content-between'>
                <label>
                <input checked={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey=="D"} onChange={()=>saveAnswer(question.Id,"D")} id={activeQuestionList+question.D}  name={activeQuestionList+question._id} type='radio' className="mr-2"/><label htmlFor={activeQuestionList+question.D}>{question.D}</label>
                </label>
                <label>
                  <button disabled={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey == "null" && questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).MarkedForReview == "null" ? true : false} onClick={()=>saveAnswer(question.Id,"reset")} className="btn btn-outline-secondary mr-2">Reset</button>
                  <button disabled={questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).MarkedForReview == true || questionPaper[activeQuestionList].find((obj)=>obj.Id==question.Id).AnswerKey != "null"} className='btn btn-outline-warning mr-2' onClick={()=>saveAnswer(question.Id,"marked for review")}>Mark for review</button>
                  <button onClick={()=>handleScroll(index)} className="active btn">Next</button>
                </label>
              </p>
              <hr/> 
            </div>)}
            
          </div>  
        </div>    
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 question-tracking-section d-flex justify-content-around align-items-center">
            <div>
              <span className="mr-2" style={{width:"15px", height:"15px", borderRadius:"50%",display:"inline-block",backgroundColor:"#6A0DAD"}}></span> Answerd({answerd})
            </div>
            <div>
            <span className="mr-2" style={{width:"15px", height:"15px",display:"inline-block", borderRadius:"50%",backgroundColor:"#E1DFDF"}}></span> Not visited({notAnswered})
            </div>
            <div><span className="mr-2" style={{width:"15px", height:"15px",display:"inline-block", borderRadius:"50%",backgroundColor:"#E77C34"}}></span>Marked for review({markedForReview})</div>
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