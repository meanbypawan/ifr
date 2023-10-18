import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import 'react-toastify/dist/ReactToastify.css';
import ExamDashboard from './components/exam/ExamDashboard';
import QuestionDashBoard from './components/exam/question-dashboard/QuestionDashboard';
import Auth from './Auth';
function App() {
  return <div>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/exam-dashboard' element={<Auth><ExamDashboard/></Auth>}/>
       <Route path='/question-dashboard' element={<Auth><QuestionDashBoard/></Auth>}/>
     </Routes>
  </div>
}

export default App;
