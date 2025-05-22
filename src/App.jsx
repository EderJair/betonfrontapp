import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './routes/Routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      {/* Proveedor de rutas */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      
      {/* Configuración del sistema de notificaciones */}
      <Toaster 
        position="bottom-right" 
        richColors 
        closeButton 
        duration={4000}
        expand={true}
      />
    </>
  );
};

export default App;