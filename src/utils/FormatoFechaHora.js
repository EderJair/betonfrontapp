/**
 * Funciones de utilidad para formatear fechas y horas
 */

/**
 * Transforma una fecha en formato ISO (YYYY-MM-DD) o formato DD/MM/YYYY a formato legible en español
 * Ejemplo: 2025-04-28 -> Lunes, 28 de Abril del 2025
 * @param {string} fecha - Fecha en formato YYYY-MM-DD o DD/MM/YYYY
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
    if (!fecha) return '';
    
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    let fechaObj;
    
    // Verificar si la fecha está en formato DD/MM/YYYY
    if (fecha.includes('/')) {
      const [dia, mes, anio] = fecha.split('/');
      // Crear fecha con formato correcto (YYYY-MM-DD) y asegurarse de usar hora local
      fechaObj = new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T00:00:00`);
    } else {
      // Para formato ISO YYYY-MM-DD, asegurarse de usar hora local
      fechaObj = new Date(`${fecha}T00:00:00`);
    }
    
    const diaSemana = diasSemana[fechaObj.getDay()];
    const dia = fechaObj.getDate();
    const mes = meses[fechaObj.getMonth()];
    const anio = fechaObj.getFullYear();
    
    return `${diaSemana}, ${dia} de ${mes} del ${anio}`;
  };
  
  /**
   * Transforma una hora en formato 24h (HH:MM) a formato 12h con AM/PM
   * Ejemplo: 13:30 -> 1:30 PM, 08:00 -> 8:00 AM
   * @param {string} hora - Hora en formato HH:MM (24h)
   * @returns {string} Hora formateada
   */
  export const formatearHora = (hora) => {
    if (!hora) return '';
    
    const [horas, minutos] = hora.split(':');
    let horasNum = parseInt(horas, 10);
    const periodo = horasNum >= 12 ? 'PM' : 'AM';
    
    // Convertir a formato 12h
    if (horasNum > 12) {
      horasNum -= 12;
    } else if (horasNum === 0) {
      horasNum = 12;
    }
    
    return `${horasNum}:${minutos} ${periodo}`;
  };
  
  /**
   * Formatea una fecha y hora completa
   * @param {string} fecha - Fecha en formato YYYY-MM-DD
   * @param {string} hora - Hora en formato HH:MM
   * @returns {string} Fecha y hora formateadas
   */
  export const formatearFechaHora = (fecha, hora) => {
    if (!fecha || !hora) return '';
    
    const fechaFormateada = formatearFecha(fecha);
    const horaFormateada = formatearHora(hora);
    
    return `${fechaFormateada} a las ${horaFormateada}`;
  };