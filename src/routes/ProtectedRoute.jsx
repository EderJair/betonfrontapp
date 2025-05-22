import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

/**
 * Componente para proteger rutas basado en autenticación y roles
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si el usuario está autorizado
 * @param {string[]} [props.requiredRoles] - Roles requeridos para acceder a la ruta (opcional)
 * @returns {React.ReactNode} - El componente hijo o redirección a login
 */

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = () => {
      try {
        // Obtener token del localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Verificar y decodificar el token
        let decodedToken;
        try {
          decodedToken = jwtDecode(token);
        } catch (error) {
          console.error('Error al decodificar token:', error);
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
        
        if (!decodedToken) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Verificar expiración del token
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Verificar roles si se requieren
        if (requiredRoles.length > 0) {
          const userRole = decodedToken.rol;
          const hasRequiredRole = requiredRoles.includes(userRole);
          
          if (!hasRequiredRole) {
            toast.error('No tienes permisos para acceder a esta página');
            setIsAuthorized(false);
            setIsLoading(false);
            return;
          }
        }

        // Usuario autorizado
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        toast.error('Error de autenticación');
        setIsAuthorized(false);
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [requiredRoles, location.pathname]);

  // Mostrar indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Redirigir a login si no está autorizado
  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Renderizar los componentes hijos si está autorizado
  return children;
};

export default ProtectedRoute;