import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

const EditarDespacho = ({ onClose, despacho }) => {
  const { register, handleSubmit, reset } = useForm()

  // Cuando el componente recibe un nuevo despacho, actualiza el formulario
  useEffect(() => {
    if (despacho) {
      // Extraer fecha y hora del despacho para el formulario
      const fechaFormateada = despacho.fecha ? despacho.fecha.split('T')[0] : '';
      
      reset({
        fecha: fechaFormateada,
        hora: despacho.hora || '',
        codigo_despacho: despacho.codigo_despacho
      });
    }
  }, [despacho, reset]);

  const onSubmit = async (data) => {
    console.log(data)
    // Aquí iría la lógica para actualizar el despacho
    onClose();
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="flex flex-col gap-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out animate-modal-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Editar Despacho</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {despacho && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--blanco)] dark:text-gray-300">Codigo de Despacho</span>
                <span className="font-medium text-gray-800 bg-[var(--rojo)] p-2 rounded-lg text-sm dark:text-white">{despacho.codigo_despacho}</span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="fecha" className="text-sm font-medium text-[var(--blanco)] dark:text-gray-300">Fecha</label>
              <input 
                type="date" 
                id="fecha" 
                {...register("fecha")} 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="hora" className="text-sm font-medium text-[var(--gris)] dark:text-gray-300">Hora</label>
              <input 
                type="time" 
                id="hora" 
                {...register("hora")} 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[var(--rojo)] text-white rounded-md hover:bg-[var(--rojoOscuro)] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarDespacho
