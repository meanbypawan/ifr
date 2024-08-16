import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/home/home';
import 'react-toastify/dist/ReactToastify.css';
import ExamDashboard from './components/exam/ExamDashboard';
import QuestionDashBoard from './components/exam/question-dashboard/QuestionDashboard';
import Auth from './Auth';
import Result from './components/exam/result/Result';
import { useEffect, useState } from 'react';
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
    </Routes>
   </div>
}

export default App;
