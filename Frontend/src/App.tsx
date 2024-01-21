import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import './App.css';
import HeaderBar from './components/HeaderBar/HeaderBar';
import { ReactNode } from "react";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import SignupCreatePassword from './pages/Signup/SignupCreatePassword';
import SignupInformations from './pages/Signup/SignupInformations';
import SignupTermOfUse from './pages/Signup/SignupTermOfUse';

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
    password: '',
    name: '',
    birthday: '',
    gender: ''
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <>
          <Route path="/" element={<DisplayWithHeader children={<Login />} />} />
          <Route path="/signin" element={<DisplayWithHeader children={<Login />} />} />
          <Route path="/signup" element={<DisplayWithHeader children={<Signup field={field} setField={setField}/>} />} />
          <Route path="/signup/step-1" element={<DisplayWithHeader children={<SignupCreatePassword field={field} setField={setField} />} />} />
          <Route path="/signup/step-2" element={<DisplayWithHeader children={<SignupInformations field={field} setField={setField}/>} />} />
          <Route path="/signup/step-3" element={<DisplayWithHeader children={<SignupTermOfUse field={field} setField={setField}/>} />} />
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