// import { supabase } from './supabaseClient';

// async function obtenerDatos() {
//     try {
//       const { data, error } = await supabase.from('datos_recolectados').select();
  
//       if (error) {
//         throw error;
//       }
  
//       // Asumo que solo necesitas el primer conjunto de datos
//       const primerDato = data[0];
  
//       // Formatea la fecha una vez
//       const fechaFormateada = formatearFechaEnEspanol(primerDato.fecha);
  
//       // Devuelve un objeto con los datos formateados
//       return {
//         fecha: fechaFormateada,
//         temperatura: primerDato.temperatura.toFixed(2),
//         humedad: primerDato.humedad,
//       };
//     } catch (err) {
//       console.error('Error al recibir los datos de la db', err);
//       // En caso de error, puedes manejarlo según tus necesidades (lanzar una excepción, devolver un objeto de error, etc.)
//       return {
//         error: 'Error al recibir los datos de la db',
//       };
//     }
//   }

// function formatearFechaEnEspanol(fecha) { 
//   const fechaObjeto = new Date(fecha);
//   const opciones = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false,
//   };
//   const fechaFormateada = fechaObjeto.toLocaleString('es-ES', opciones);

//   return fechaFormateada;
// }
