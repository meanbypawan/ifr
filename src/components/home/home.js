import { useState } from 'react';
import './home.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux-data/UserSlice';
import Api from '../../api/Api';
export default function Home() {
    const [mobile,setMobile] = useState(null);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signIn = async (event)=>{
      try{  
       event.preventDefault(); 
       const response = await axios.post(Api.USER_SIGN_IN,{mobile,password});
       dispatch(saveUser({secretKey:response.data.token, name:response.data.user.Name,userId:response.data.user._id}));
       navigate("/exam-dashboard");
      }
      catch(err){
        toast.error(err.response.data.error);
      } 
    }
    return <>
        <ToastContainer/>
        <div className="container">
            <div className="row d-flex" style={{ height: "100%", width:"100%" }}>
                <div className="col-md-8 border border-danger size center">
                    <div className="row h-100 d-flex flex-md-row flex-row-reverse">
                        <div className="col-md-6 h-100 banner-image remove-padding" style={{border:"3px solid white"}}>
                            <div className="w-100 h-100 bg-color-with-opacity d-flex flex-column justify-content-center">
                                <h1 className="text-white text-center" style={{fontSize:"25px"}}>Our Mission</h1>
                                <p className="text-white text-center" style={{fontSize:"35px"}}>उन्नत राष्ट्र की कल्पना कम्प्यूटर साक्षरता घर घर पहुँचाना</p>
                            </div>
                        </div>
                        <div className="col-md-6 h-100 d-flex flex-column align-items-center">
                            <img className="logo-size" src="logo.png" />
                            <form onSubmit={signIn} className="mt-5 mb-5">
                                <div className="form-group mt-5">
                                    <input onChange={(event)=>setMobile(event.target.value)} type="text" className="form-control" placeholder='Enter mobile number' />
                                </div>
                                <div className="form-group mt-5">
                                    <input onChange={(event)=>setPassword(event.target.value)} type="password" className="form-control" placeholder='Enter password' />
                                </div>
                                <div className="form-group mt-5">
                                    <button type='submit' className="btn color-background w-100 text-white">Get started</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}