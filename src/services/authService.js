import { jwtDecode } from 'jwt-decode';

/**
 * Servicio para manejar la autenticación y el almacenamiento del token JWT
 */
const authService = {
  /**
   * Guarda el token JWT en el localStorage
   * @param {string} token - Token JWT
   */
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  /**
   * Obtiene el token JWT del localStorage
   * @returns {string|null} - Token JWT o null si no existe
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Elimina el token JWT del localStorage
   */
  removeToken: () => {
    localStorage.removeItem('token');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - true si el usuario está autenticado, false en caso contrario
   */
  isAuthenticated: () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken) return false;

      // Verificar expiración del token
      const currentTime = Date.now() / 1000;
      return !(decodedToken.exp && decodedToken.exp < currentTime);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  },

  /**
   * Obtiene la información del usuario del token JWT
   * @returns {Object|null} - Información del usuario o null si no está autenticado
   */
  getUserInfo: () => {
    const token = authService.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return null;
    }
  },

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string|string[]} roles - Rol o roles a verificar
   * @returns {boolean} - true si el usuario tiene al menos uno de los roles, false en caso contrario
   */
  hasRole: (roles) => {
    const userInfo = authService.getUserInfo();
    if (!userInfo || !userInfo.rol) return false;

    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.includes(userInfo.rol);
  }
};

export default authService;