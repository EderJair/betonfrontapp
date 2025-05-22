// services/api.js
import authService from "@services/authService";

// Configuración base para las peticiones fetch
const BASE_URL = import.meta.env.VITE_API_URL;

// Objeto para manejar las peticiones a la API
const api = {
  // Método GET para obtener datos
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Método POST para crear recursos
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Método PUT para actualizar recursos
  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Método DELETE para eliminar recursos
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
};

// Función para obtener los headers comunes
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`,
  };
};

// Función para manejar las respuestas
const handleResponse = async (response) => {
  // Verificar si la respuesta fue exitosa
  if (!response.ok) {
    // Si hay error, extraer el mensaje para devolverlo
    const errorData = await response.json().catch(() => ({
      message: 'Error desconocido del servidor'
    }));
    
    // Lanzar error con detalles
    throw {
      status: response.status,
      message: errorData.message || `Error: ${response.status}`,
      data: errorData
    };
  }
  
  // Para respuestas vacías (como en DELETE exitosos)
  if (response.status === 204) {
    return { success: true };
  }
  
  // Intentar parsear la respuesta como JSON
  const data = await response.json();
  return {
    data,
    status: response.status,
    success: true
  };
};

// Función para manejar errores de red o excepciones
const handleError = (error) => {
  console.error("Error en petición a API:", error);
  throw {
    status: 0,
    message: 'Error de conexión con el servidor',
    error
  };
};

export default api;