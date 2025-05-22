import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import authService from '@services/authService';

export const useLogin = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Redireccionar a la página anterior o al dashboard después del login
  const from = location.state?.from?.pathname || '/dashboard';

  const Login = async (data, setIsLoading) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al iniciar sesión');
      }

      // Guardar el token en localStorage
      authService.setToken(result.token);
      
      // Mostrar mensaje de éxito
      toast.success('Inicio de sesión exitoso');
      
      // Redireccionar al usuario
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Error de login:', error);
      toast.error(error.message || 'Error al iniciar sesión');
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  }

  return {
    Login,
  }
}