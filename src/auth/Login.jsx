import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '@hooks/useLogin';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    //Custom Hook
    const { Login } = useLogin();

    const onSubmit = async (data) => {
        setIsLoading(true);
        Login(data, setIsLoading);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-[400px] h-[500px] p-10 rounded-l-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col justify-center">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-black dark:text-white text-center text-2xl font-bold">Bienvenido</h2>
                    <p className="text-black dark:text-gray-200 text-center text-base">Inicia Sesión para continuar</p>
                </div>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="correo" className="block text-black dark:text-white text-sm font-semibold">Correo</label>
                        <input
                            type="email"
                            id="correo"
                            {...register('correo', { required: 'El correo es requerido' })}
                            placeholder="ejm@betondecken.com"
                            className={`w-full p-3 border rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 placeholder-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.correo ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.correo && <span className="mt-1 text-red-500 text-sm">{errors.correo.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contrasena" className="block text-black dark:text-white text-sm font-semibold">Contraseña</label>
                        <div className="relative flex w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="contrasena"
                                {...register('contrasena', { required: 'La contraseña es requerida' })}
                                className={`w-full p-3 border rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 placeholder-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.contrasena ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex items-center justify-center text-gray-400 hover:text-yellow-500 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.contrasena && <span className="mt-1 text-red-500 text-sm">{errors.contrasena.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-white rounded-lg font-medium text-sm transition cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="flex items-center text-center text-gray-400 dark:text-gray-300 my-2 text-sm w-full">
                        <span className="flex-1 border-b border-gray-200"></span>
                        <span className="px-2">Betondecken &copy; 2025</span>
                        <span className="flex-1 border-b border-gray-200"></span>
                    </div>
                </form>
            </div>
            <div className="w-full max-w-[400px] h-[500px] p-10 rounded-r-lg shadow-lg bg-gray-100 dark:bg-gray-300 justify-center items-center md:flex">
                <img src="/img/betondecken-logo.png" alt="Logo Betondecken" className="w-full transition-transform duration-300 hover:scale-110" />
            </div>
        </div>
    );
};

export default Login;