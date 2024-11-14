import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([AuthenticationRoutes, MainRoutes ], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
