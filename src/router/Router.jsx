 
import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
  import ErrorPage from '../pages/ErrorPage.jsx'
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";
import Homepage from "../pages/Homepage.jsx";
 const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <SignUp />,
        
      },
      {
        path: "/login",
        element: <Login />,
        
      },
      {
        path: "/home",
        element: <Homepage />,
        
      },
      
      
    
  ]);
  
  export default  Router;