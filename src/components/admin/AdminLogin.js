import axios from "axios";
import { useState } from "react";
import Api from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post(Api.ADMIN_SIGN_IN,{username,password})
        .then(response=>{
            if(response.data.status)
              navigate("/system-administration/dashboard");
            else
              toast.error(response.data.message);  
        }).catch(err=>{
            console.log(err);
            toast.error("Oops! something went wrong");
        });
    }
    return <>
       <ToastContainer/>
       <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
          <div style={{"width":"30%", "height":"auto", "boxShadow":"3px 3px 3px 3px red"}}>
            <form className="p-2" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input onChange={(event)=>setUsername(event.target.value)} type="text" placeholder="Enter username" className="form-control"/>
                </div>
                <div className="form-group">
                    <input onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Enter password" className="form-control"/>
                </div>
                <div className="form-group">
                  <button className="btn btn-danger text-white" style={{width:"100%"}}>Sign in</button>
                </div>
            </form>
          </div>
       </div>
    </>
}

export default AdminLogin;