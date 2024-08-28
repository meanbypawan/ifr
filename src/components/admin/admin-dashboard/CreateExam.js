import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../../api/Api";

function CreateExam(){
    const [code,setCode] = useState();
    const createExam = ()=>{
        axios.post(Api.CREATE_EXAM,{code})
        .then(response=>{
           toast.success(response.data.message);
        })
        .catch(err=>{
           console.log(err);
           toast.error(err.response.data.error);
        });
    }
    return <>
      <ToastContainer/>
      <div className="container">
         <div className="d-flex p-5">
            <input onChange={(event)=>setCode(event.target.value)} type="text" className="form-control" placeholder="Enter exam code"/>
            <button onClick={createExam} className="btn btn-success ml-2">Create</button>
         </div>
      </div>
    </>
}

export default CreateExam;