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
import DataSheet from './components/admin/admin-dashboard/DataSheet';
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
       <Route path='/system-administration/dashboard' element={<Auth><Dashboard/></Auth>}>
         <Route path='create-exam' element={<Auth><CreateExam/></Auth>}/>
         <Route path='upload-student' element={<Auth><UploadStudent/></Auth>}/>
         <Route index element={<Auth><Features/></Auth>}/>
         <Route path='manage-exam' element={<Auth><ManageExam/></Auth>}/>
         <Route path='data-sheet/:code' element={<Auth><DataSheet/></Auth>}/>
       </Route>
    </Routes>
   </div>
}

export default App;
