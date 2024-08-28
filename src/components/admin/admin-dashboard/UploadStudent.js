import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../../api/Api";

function UploadStudent(){
    const [codeList,setCodeList]  = useState([]);
    const [upload,setUpload] = useState();
    const [code,setCode] = useState("0");
    const fileRef = useRef();
    useEffect(()=>{
        loadExamCode();
    },[]);
    const loadExamCode = ()=>{
        axios.get(Api.EXAM_CODE)
        .then(response=>{
            console.log(response.data);
            setCodeList(response.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    const setFile = ()=>{
        setUpload(fileRef.current.files[0]);
    }
    const handleSubmit = ()=>{
       if(code == "0"){
         toast.error("Please select exam code");
       } 
       else{
         let formData = new FormData();
         formData.append("users",upload);
         formData.append("code",code);
         axios.post(Api.UPLOAD_USER,formData)
         .then(response=>{
            toast.success(response.data.message);
         }).catch(err=>{
            toast.error("Oops! something went wrong..");
         });
       }
    }
    return <>
      <ToastContainer/>
      <div className="container">
         <div className="d-flex p-5">
            <select onChange={(event)=>setCode(event.target.value)} className="form-control">
                <option value="0">select exam code</option>
                {codeList.map((code,index)=><option value={code.code} key={index}>{code.code}</option>)}
            </select>
            <input ref={fileRef} onChange={setFile} type="file" className="form-control ml-2"/>
            <button onClick={handleSubmit} className="btn btn-success ml-2">Done</button>
         </div>
      </div>
    </>
}
export default UploadStudent;