import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import RegistrarDash from './components/RegistrarDash';
import StudentDash from './components/StudentDash';
import ProfessorDash from './components/ProfessorDash';
import './App.css';
import CreateCourse from './components/CreateCourse';
import ApprovedCourses from './components/ApprovedCourses';
import CourseBatches from './components/CourseBatches';
import ManageStudents from './components/ManageStudents';
import ManageProfessors from './components/ManageProfessors';
import ManageEnrollments from './components/ManageEnrollments';
import ViewStudents from './components/ViewStudent';
import ViewProfessors from './components/ViewProfessors';
import ViewCourses from './components/ViewCourses';
import CourseRequests from './components/CourseRequests';
import AvailableCourses from './components/AvailableCourses';
import EnrolledCourses from './components/EnrolledCourses';
import CoursePage from './components/CoursePage';
import CompletedCourses from './components/CompletedCourses';
import GenerateReport from './components/GenerateReport';
import StudentList from './components/StudentList';
import Reports from './components/Reports';

const AppLayout = ()=> {
  return(
    <div className='app'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Header />
        <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element: <Login />,
      },
      {
        path:'/login',
        element: <Login />,
      },
      {
        path:'/register',
        element: <Register />,
      },
      {
        path:'/adminPage',
        element:<RegistrarDash />,
      },
      {
        path:'/studentPage',
        element:<StudentDash />,
      },
      {
        path:'/professorPage',
        element:<ProfessorDash />,
      },
      {
        path:'/create-course',
        element: <CreateCourse />
      },
      {
        path:'/approved-courses',
        element: <ApprovedCourses />
      },
      {
        path:'/courses/:courseId/batches',
        element : <CourseBatches />
      },
      {
        path:'/manage-students',
        element:<ManageStudents />
      },
      {
        path:'/manage-professors',
        element: <ManageProfessors />
      },
      {
        path: '/manage-enrollments',
        element: <ManageEnrollments />
      },
      {
        path: '/all-students',
        element: <ViewStudents />
      },
      {
        path:'/all-professors',
        element: <ViewProfessors />
      },
      {
        path:'/all-courses',
        element: <ViewCourses />
      },
      {
        path:'/pending-courses',
        element: <CourseRequests />
      },
      {
        path:'/available-courses',
        element: <AvailableCourses />
      },
      {
        path: '/my-courses',
        element: <EnrolledCourses />
      },
      {
        path:'/course/:courseId',
        element: <CoursePage />
      },
      {
        path:'/completed-courses',
        element: <CompletedCourses />
      },
      {
        path: '/generate-report',
        element: <GenerateReport />
      },
      {
        path: '/report/:courseId/students',
        element: <StudentList />
      },
      {
        path:'/report',
        element: <Reports />
      }
    ],
  },
])

function App() {
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App;
