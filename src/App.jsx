
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { ErrorPage, Home, Layout, Login } from './pages';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
   const isAuthenticated = localStorage.getItem('music-token'); // You can replace this with your actual authentication logic

  return isAuthenticated ? (
    element 
  ) : (
    <Navigate to="/login" replace />
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/> ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:<PrivateRoute element={<Home />} />,
      },
     
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element:<ErrorPage/>
  }
]);
function App() {
  

  return (<>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  )
}

export default App;
