import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminSignup from './pages/AdminSignup';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import QuestionSetting from './pages/QuestionSetting';
import TeacherDashboard from './pages/TeacherDashboard';
import QuestionsSolving from './pages/QuestionsSolving';
import StudentDashboard from './pages/StudentDashboard';
import DisplayResult from './pages/DisplayResult';
import Navbar from './components/Navbar';
import PrivateRouteTeacher from './components/PrivateRouteTeacher';
import PrivateRouteStudent from './components/PrivateRouteStudent';
import ExamResults from './pages/ExamResults';
import { LoginForm } from './pages/LoginForm';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/studentsignup' element={<StudentSignup />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
        <Route path='/studentlogin' element={<StudentLogin />} />
        <Route path='/loginform' element={<LoginForm />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        {/* <Route path='/questionsolving' element={<QuestionsSolving />} /> */}
        {/* <Route path='/QuestionSetting' element={<QuestionSetting />} /> */}
        {/* <Route path='/displayresult' element={<DisplayResult />} /> */}
        <Route path='/displayresult' element={<DisplayResult />} />
        <Route path="/exam-results" element={<ExamResults />} />

        {/* Private routes for teachers */}
        <Route element={<PrivateRouteTeacher />}>
          <Route path='/QuestionSetting' element={<QuestionSetting />} />
          <Route path='/teacherdashboard' element={<TeacherDashboard />} />

        </Route>

        {/* Private routes for students */}
        <Route element={<PrivateRouteStudent />}>
          <Route path='/questionsolving' element={<QuestionsSolving />} />
          <Route path='/studentdashboard' element={<StudentDashboard />} />
          <Route path="/exam-results" element={<ExamResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;