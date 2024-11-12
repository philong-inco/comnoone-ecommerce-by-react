import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const Login = Loadable(lazy(() => import('views/pages/SignIn/SignIn.jsx')));

const AuthenticationRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/login/form" element={<Login />} />
    </Route>
  </Routes>
);

export default AuthenticationRoutes;
