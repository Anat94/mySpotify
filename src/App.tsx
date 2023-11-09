import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "*",
  //   element: <NotFound404 />,
  // }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
