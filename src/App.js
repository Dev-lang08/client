import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentLogin from './users/Student/Login';
import StudentRegister from './users/Student/Register';
import StudentInfo from './users/Student/Info';
import MYInfo from './users/Student/myinfo';
import FacultyLogin from './users/Faculty/Login';
import FacultyRegister from './users/Faculty/Register';
import FacultyInfo from './users/Faculty/Info';
import WardenLogin from './users/Warden/login';
import WardenInfo from './users/Warden/info';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' exact element={<Home />} /> */}
        <Route path='/' exact element={<Home />} />
        <Route path='/Student/login' exact element={<StudentLogin />} />
        <Route path='/Student/register' exact element={<StudentRegister />} />
        <Route path='/Student/info' exact element={<StudentInfo />} />
        <Route path='/Student/myinfo' exact element={<MYInfo />} />
        <Route path='/Faculty/login' exact element={<FacultyLogin />} />
        <Route path='/Faculty/register' exact element={<FacultyRegister />} />
        <Route path='/Faculty/info' exact element={<FacultyInfo />} />
        <Route path='/Warden/login' exact element={<WardenLogin />} />
        <Route path='/Warden/info' exact element={<WardenInfo />} />
      </Routes>
    </div>
  );
}

export default App;