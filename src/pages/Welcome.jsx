import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importando los componentes faltantes
import { CheckCircle, Menu } from 'lucide-react'; // Añadido ícono de menú

// Componente Button personalizado
const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={`px-4 py-2 font-medium transition-colors ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Componente Image personalizado (alternativa a Next.js Image)
const Image = ({ src, alt, width, height, className = '', ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={{ 
        maxWidth: width ? `${width}px` : '100%', // Limita el ancho máximo si se especifica
        height: 'auto',
        borderRadius: '8px',
      }}
      {...props}
    />
  );
};

const Welcome = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Activar la animación después de un pequeño delay para asegurar que el componente esté montado
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`flex flex-col min-h-screen bg-black text-white transition-opacity duration-700 ease-in-out overflow-x-hidden relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fondo con degradado radial con naranja personalizado */}
      <div className="absolute inset-0 w-full h-full" style={{ background: 'radial-gradient(125% 125% at 50% 10%, black 50%, #FF6B00 100%)' }}></div>
      
      {/* Contenido (con posición relativa para aparecer sobre el fondo) */}
      <div className="relative w-full h-full">
        {/* Header/Navigation - Logo y navegación a la izquierda, botón a la derecha */}
        <header className="relative border-b border-black bg-black">
          <div className="w-full py-4 flex items-center justify-between">
            {/* Logo a la izquierda con más margen */}
            <div className="flex-shrink-0 pl-8 ml-4">
              <Image 
                src="public/img/logo-2.webp" 
                alt="Betondecken Logo" 
                width={60}
                className='h-25 w-25'
                style={{ borderRadius: 0 }}
              />
            </div>

            {/* Navegación centrada absoluta */}
            <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
              <Link to="#" className="text-gray-300 hover:text-white py-2 text-base font-medium transition-colors">
                Nosotros
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white py-2 text-base font-medium transition-colors">
                Proyectos
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white py-2 text-base font-medium transition-colors">
                Blog
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white py-2 text-base font-medium transition-colors">
                Tecnologías
              </Link>
            </nav>

            {/* Botón y bandera a la derecha con más margen */}
            <div className="flex items-center pr-8 mr-4">
              <div className="mr-3 relative hidden md:block">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg" 
                  alt="Bandera de Perú" 
                  width={24} 
                  className="h-6 w-auto" 
                  style={{ borderRadius: 5 }}
                />
              </div>
              <Button className="bg-[white] hover:bg-[#c04e15] text-black hover:text-white cursor-pointer rounded-md px-6 py-2.5 text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Contáctanos
              </Button>
              {/* Menú móvil */}
              <button 
                className="block md:hidden text-white ml-4" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Menú móvil estándar */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black py-2 absolute top-full left-0 w-full z-50">
              <div className="container mx-auto px-4">
                <nav className="flex flex-col space-y-1">
                  <Link to="#" className="text-gray-300 hover:text-white py-2 px-4 text-base font-medium transition-colors flex items-center">
                    Nosotros
                  </Link>
                  <Link to="#" className="text-gray-300 hover:text-white py-2 px-4 text-base font-medium transition-colors flex items-center">
                    Proyectos
                  </Link>
                  <Link to="#" className="text-gray-300 hover:text-white py-2 px-4 text-base font-medium transition-colors flex items-center">
                    Blog
                  </Link>
                  <Link to="#" className="text-gray-300 hover:text-white py-2 px-4 text-base font-medium transition-colors flex items-center">
                    Tecnologías
                  </Link>
                  <Button className="sm:hidden bg-[#1e88e5] hover:bg-[#1565c0] text-white rounded-md px-4 py-2 text-base font-medium mt-2 transition-all duration-300 shadow-md hover:shadow-lg">
                    Contáctanos
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <main className="flex-grow overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Columna izquierda - Información */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF6B00 55%,  #FF6B00 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block',
                    }}
                  >
                    BETONDECKEN APP
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8">
                  Hasta <span className="font-bold">78%</span> de ahorro en tiempo de obra con nuestro sistema de
                  seguimiento
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                  <div className={`flex items-center transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <CheckCircle className="text-green-500 mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Seguimiento</span> en tiempo real
                    </div>
                  </div>
                  <div className={`flex items-center transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <CheckCircle className="text-green-500 mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Documentación</span> técnica centralizada
                    </div>
                  </div>
                  <div className={`flex items-center transition-all duration-500 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <CheckCircle className="text-green-500 mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Soporte</span> técnico especializado 24/7
                    </div>
                  </div>
                </div>

                {/* Botón INGRESAR con ISO a la derecha */}
                <div className={`flex items-center space-x-4 mb-4 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <Button 
                    className="bg-orange-500 cursor-pointer text-white px-8 py-3 text-base font-bold tracking-wider rounded-md transition-all duration-200 shadow-md hover:bg-orange-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    onClick={() => navigate('/login')}
                  >
                    INGRESAR
                  </Button>
                  
                  {/* ISO a la derecha del botón */}
                  <div className="flex items-center">
                    <div className="w-[44px] h-[44px]">
                      <Image 
                        src="public/img/iso.png" 
                        alt="ISO 27001" 
                      />
                    </div>
                    <div className="text-xs ml-2">
                      <p className="font-bold">Gestión de Seguridad</p>
                      <p>de la Información</p>
                    </div>
                  </div>
                </div>
                
                <div className={`transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                  <div className="bg-blue-700 text-white py-1 px-3 rounded-full shadow-md inline-flex items-center">
                    <CheckCircle className="text-white h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">App Certificada</span>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Imágenes (visible en todas las pantallas) */}
              <div className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Contenedor principal con fondo de construcción */}
                <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] animate-float-soft">
                  {/* Fondo de construcción (edificio en construcción) - ajustado para pantallas grandes */}
                  <div className="absolute top-0 right-0 w-full h-full">
                    <Image
                      src="/img/constuccion.png"
                      alt="Fondo de construcción"
                      className={`absolute \
                        top-[-47%] sm:top-[-70%] md:top-[-60%] lg:top-[10%] xl:top-[0%] 2xl:top-[-17%]
                        right-[-13%] sm:right-[-15%] md:right-[-10%] lg:right-[-10%] 
                        w-[80%] sm:w-[85%] md:w-[70%] lg:w-[70%] xl:w-[60%]
                        max-w-[500px] h-auto object-contain transition-all duration-1200 delay-1000 
                        ${isVisible ? 'opacity-90 scale-100' : 'opacity-0 scale-105'} animate-float-soft`}
                    />
                  </div>
                  
                  {/* Primera captura (izquierda) */}
                  <div className={`absolute top-[40%] sm:top-[45%] md:top-[50%] left-0 w-[90%] sm:w-[85%] md:w-[80%] z-20 transform -translate-y-1/2 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                    <Image
                      src="/img/cap2.png"
                      alt="Gestión BetonDeck"
                      className="rounded-lg shadow-2xl w-full h-auto"
                    />
                  </div>
                                  
                  {/* Segunda captura (derecha) */}
                  <div className={`absolute top-[75%] sm:top-[80%] right-0 w-[85%] sm:w-[80%] md:w-[75%] z-25 transform -translate-y-1/2 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                    <Image
                      src="/img/cap1.png"
                      alt="Gestión de Despachos BetonDeck"
                      className="rounded-lg shadow-2xl w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Animación CSS global */}
      <style>
      {`
      @keyframes floatSoft {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
      .animate-float-soft {
        animation: floatSoft 4.5s ease-in-out infinite;
      }
      `}
      </style>
    </div>  
  );
};

export default Welcome;