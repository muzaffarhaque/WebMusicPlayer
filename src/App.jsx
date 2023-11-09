
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { ErrorPage, Home, Layout, Login } from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/> ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
     
    ],
  },
  {
    path: "/login",
    element: <Login/>,
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
