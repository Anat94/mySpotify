import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SignupCreatePassword from './pages/Signup/SignupCreatePassword';
import HeaderBar from './components/HeaderBar/HeaderBar';
import { ReactNode } from "react";
import React, { useState } from 'react';

type DisplayWithHeaderProps = {
  children: ReactNode;
};

export const DisplayWithHeader = ({ children }: DisplayWithHeaderProps) => {
  return (
    <div className="pageContainer">
      <HeaderBar />
      { children }
    </div>
  )
}

function App() {
  const [field, setField] = useState({
    email: '',
    password: ''
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <>
          <Route path="/signin" element={<DisplayWithHeader children={<Login />} />} />
          <Route path="/signup" element={<DisplayWithHeader children={<Signup field={field} setField={setField}/>} />} />
          <Route path="/signup/step-1" element={<DisplayWithHeader children={<SignupCreatePassword field={field} setField={setField} />} />} />
          <Route path="/signup/step-2" element={<DisplayWithHeader children={<SignupCreatePassword field={field} setField={setField}/>} />} />
        </>
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;