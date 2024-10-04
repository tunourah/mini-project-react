 
import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
  import ErrorPage from '../pages/ErrorPage.jsx'
 const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    
      
    
  ]);
  
  export default  Router;