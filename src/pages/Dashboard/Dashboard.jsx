import { useInfo } from "@hooks/useInfo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatearFecha, formatearHora } from "@utils/FormatoFechaHora"; // Función para transformar la fecha
import api from "@services/api";
import EditarDespacho from "@components/modales/EditarDespacho"; // Componente para editar despacho

const Dashboard = () => {
  const { userInfo, userRole } = useInfo();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDespacho, setSelectedDespacho] = useState(null);

  // Consulta para obtener despachos usando TanStack Query
  const { data: despachos, isLoading, isError, error } = useQuery({
    queryKey: ["despachos", userInfo?.id_usuario],
    queryFn: async () => {
      const response = await api.get(`/despacho/user/${userInfo?.id_usuario}`);
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutos
    cacheTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1, // Limitar reintentos
  });

  // Filtrar despachos basados en el término de búsqueda
  const filteredDespachos = despachos?.filter(despacho =>
    despacho.codigo_despacho.toString().includes(searchTerm) ||
    despacho.fecha?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    despacho.hora?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const onClose = () => {
    setOpenModal(false);
    // Resetear el despacho seleccionado después de un breve retraso para permitir la animación de cierre
    setTimeout(() => {
      setSelectedDespacho(null);
    }, 300);
  };
  
  const handleEditClick = (despacho) => {
    setSelectedDespacho(despacho);
    setOpenModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Bienvenido, <span className="font-semibold">{userInfo?.nombre || 'Usuario'}</span></p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rol: {userRole}</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Buscar despachos..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}

      {/* Estado de error */}
      {isError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error?.message || 'Ocurrió un error al cargar los despachos'}</p>
        </div>
      )}

      {openModal && <EditarDespacho onClose={onClose} despacho={selectedDespacho} />}

      {/* Tabla de despachos */}
      {!isLoading && !isError && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {filteredDespachos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredDespachos.map((despacho) => (
                    <tr key={despacho.codigo_despacho} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{despacho.codigo_despacho}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatearFecha(despacho.fecha)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatearHora(despacho.hora)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(despacho.estado)}`}>
                          {despacho.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-3">
                          Ver
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" 
                          onClick={() => handleEditClick(despacho)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No se encontraron despachos</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Función para determinar el color del estado
const getStatusColor = (estado) => {
  switch (estado?.toLowerCase()) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'en proceso':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completado':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'cancelado':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export default Dashboard;
