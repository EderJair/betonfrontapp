import { createBrowserRouter } from 'react-router-dom';

// Componente de protección de rutas
import ProtectedRoute from '@routes/ProtectedRoute';

// Importar páginas
import Login from '@auth/Login';
import Welcome from '@pages/Welcome';
import Dashboard from '@pages/Dashboard/Dashboard';

// Definición de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>,
  },
]);

export default router;