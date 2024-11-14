// AuthenticationRoutes.js
import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const Login = Loadable(lazy(() => import('views/pages/SignIn/SignIn.jsx')));

const AuthenticationRoutes = {
  path: '/login',
  element: <Login />
};

export default AuthenticationRoutes;
