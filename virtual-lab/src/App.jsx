import React from 'react';
import {Routes,Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LoginLanding from './pages/LoginLanding';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Employees from './pages/Employees';
import LeaveHistory from './pages/LeaveHistory';
import Leave from './pages/Leave';
import Setting from './pages/Settings';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
            <Route path='/login' element={<LoginLanding/>} />
            <Route path='/login/admin' element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to access your account"/>} />
            <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account"/>} />


            <Route element={<Layout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/leavehistory' element={<LeaveHistory />} />
              <Route path='/leave' element={<Leave />} />
              <Route path='/settings' element={<Setting />} />
            </Route>
          <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;