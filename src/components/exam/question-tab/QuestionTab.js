import './QuestionTab.css';
export default function QuestionTab({userId,questionList,setQuestionList,activeQuestionList,setActiveQuestionList}){
    return <>
      <div className="container-fluid">
        <div className="row">
           <div className="col-md-12 tabs d-flex justify-content-between">
              <button onClick={()=>setActiveQuestionList("English")} className={(activeQuestionList == "English") ? "active":""}>English</button>
              <button onClick={()=>setActiveQuestionList("Hindi")} className={(activeQuestionList == "Hindi") ? "active":""}>Hindi</button>
              <button onClick={()=>setActiveQuestionList("General Knowledge")} className={(activeQuestionList == "General Knowledge") ? "active":""}>G.K</button>
              <button onClick={()=>setActiveQuestionList("Computer Basic")} className={(activeQuestionList == "Computer Basic") ? "active":""}>Computer</button>
              <button onClick={()=>setActiveQuestionList("Quantitative Aptitude")} className={(activeQuestionList == "Quantitative Aptitude") ? "active":""}>Math</button>
              <button onClick={()=>setActiveQuestionList("Logical Resoning")} className={(activeQuestionList == "Logical Resoning") ? "active":""}>L.R</button>
           </div>
        </div>
        <div className="row">
          <div className="col-12 question-section p-5">
            {questionList[0]?.[activeQuestionList].map((question,index)=><div className="questions">
              <p style={{fontWeight:"bold"}}>Q.{index+1} {question.Question}</p>
              <p><input name={"answerKey"+index} type='radio' className="mr-2"/>{question.A}</p>
              <p><input name={"answerKey"+index} type='radio' className="mr-2"/> {question.B}</p>
              <p><input name={"answerKey"+index} type='radio' className="mr-2"/> {question.C}</p>
              <p><input name={"answerKey"+index} type='radio' className="mr-2"/> {question.D}</p>
              <hr/> 
            </div>)}
            
          </div>    
        </div>       
      </div>
    </>
}