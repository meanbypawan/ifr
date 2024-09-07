import axios from "axios";
import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageExam(){
    const [examList, setExamList] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        loadExams();
    },[]);

    const loadExams = ()=>{
        axios.get(Api.EXAM_LIST)
        .then(response=>{  
          setExamList(response.data.result);
          console.log(response.data.result);
        })
        .catch(err=>{
            toast.error("Oops! something went wrong");
            console.log(err);
        });
    }
    const removeExam = (id)=>{
      if(window.confirm("Do you want delete it ?")){  
        axios.post(Api.REMOVE_EXAM,{id})
        .then(response=>{
           if(response.data.result.acknowledged){
             toast.success("Exam removed...");
             let index = examList.findIndex((exam)=>{return exam._id == id});
             examList.splice(index,1);
             setExamList([...examList]);
           }  
        }).catch(err=>{
        console.log(err);
        toast.error("Oops! something went wrong...");
       });
      }
    }
    const generateExamPassword = (code)=>{
      axios.post(Api.GENERATE_PASSWORD,{code})
      .then(response=>{
        toast.success(response.data.message);
      }).catch(err=>{
        console.log(err);
        toast.error("Oops! something went wrong...");
      })
    }
    const changeStatus = (code,status)=>{
      if(status == "Close")
        status = "Open";
      else if(status == "Open")
         status = "Close";

      axios.post(Api.CHANGE_EXAM_STATUS,{code,status})
      .then(response=>{
        toast.success(response.data.message);
        loadExams();
      }).catch(err=>{
        toast.error("Oops! something went wrong...");
      });

    }
    return <>
      <ToastContainer/>
      <div className="container mt-5">
        <table className="table">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Exam code</th>
                    <th>Status</th>
                    <th>Manage</th>
                </tr>
            </thead>
            <tbody>
                {examList.map((exam,index)=><tr key={index}>
                    <td>{index+1}</td>
                    <td>{exam.code}</td>
                    <td>{exam.status+""}</td>
                    <td>
                        {/* <button onClick={()=>{removeExam(exam._id)}} className="btn btn-outline-danger mr-2">Remove</button> */}
                        <button onClick={()=>{changeStatus(exam.code,'Terminate')}} className="btn btn-outline-warning mr-2">Terminate</button>
                        <button onClick={()=>generateExamPassword(exam.code)} className="btn btn-secondary ml-2">Generate password</button>
                        <button onClick={()=>navigate(`/system-administration/dashboard/data-sheet/${exam.code}`)} className="btn btn-danger ml-2">View Data Sheet</button>
                    </td>
                    <td>
                        <input value={exam.status} onChange={(event)=>changeStatus(exam.code,event.target.value)} type="checkbox" className="ml-3 mt-2" style={{height:"30px",width:"50px"}}/>
                    </td>
                </tr>)}
            </tbody>
        </table>
      </div>
    </>
}

export default ManageExam;