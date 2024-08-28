import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/home/home';
import 'react-toastify/dist/ReactToastify.css';
import ExamDashboard from './components/exam/ExamDashboard';
import QuestionDashBoard from './components/exam/question-dashboard/QuestionDashboard';
import Auth from './Auth';
import Result from './components/exam/result/Result';
import { useEffect, useState } from 'react';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/admin-dashboard/Dashboard';
import CreateExam from './components/admin/admin-dashboard/CreateExam';
import UploadStudent from './components/admin/admin-dashboard/UploadStudent';
import Features from './components/admin/admin-dashboard/Features';
import ManageExam from './components/admin/admin-dashboard/ManageExam';
function App() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
   const handleBackButton = (event) => {
     event.preventDefault(); // Prevents the default behavior of the back button
     // Implement your custom behavior here, e.g., show a confirmation modal
   };

   window.addEventListener('popstate', handleBackButton);

   return () => {
     window.removeEventListener('popstate', handleBackButton);
   };
 }, [navigate]);
  return <div>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/exam-dashboard' element={<Auth><ExamDashboard/></Auth>}/>
       <Route path='/question-dashboard' element={<Auth><QuestionDashBoard/></Auth>}/>
       <Route path='/result' element={<Result/>}/>
       <Route path='/system-administration/login' element={<AdminLogin/>}/>
       <Route path='/system-administration/dashboard' element={<Dashboard/>}>
         <Route path='create-exam' element={<CreateExam/>}/>
         <Route path='upload-student' element={<UploadStudent/>}/>
         <Route index element={<Features/>}/>
         <Route path='manage-exam' element={<ManageExam/>}/>
       </Route>
    </Routes>
   </div>
}

export default App;
