import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['activa', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));



// import { supabase } from "src/supabase/supabaseClient";

// async function composteras() {
//   try {
//     const { data, error } = await supabase.from('datos_recolectados').select();

//     if (error) {
//       throw error;
//     }

//     if (!data || data.length === 0) {
//       // No hay datos disponibles
//       return {
//         error: 'No hay datos disponibles en la base de datos',
//       };
//     }

//     // Mapea los datos de la base de datos a un array de objetos similar al que generas con faker
//     const composteras = data.map((dato) => ({
//       id: dato.idcomp, // Asegúrate de tener la propiedad 'idcomp' en tus datos reales
//       tipo: dato.tipo, // Asegúrate de tener la propiedad 'tipo' en tus datos reales
//       capacidad: dato.capacidad, // Asegúrate de tener la propiedad 'capacidad' en tus datos reales
//       ubicacion: dato.ubicacion, // Asegúrate de tener la propiedad 'ubicacion' en tus datos reales
//       fechaInstalacion: dato.fechainstalacion, // Asegúrate de tener la propiedad 'fechainstalacion' en tus datos reales
//       estado: dato.estado, // Asegúrate de tener la propiedad 'estado' en tus datos reales
//       comentarios: dato.comentarios, // Asegúrate de tener la propiedad 'comentarios' en tus datos reales
//     }));

//     return composteras;
//   } catch (err) {
//     console.error('Error al recibir los datos de la db', err);
//     return {
//       error: 'Error al recibir los datos de la db',
//     };
//   }
// }

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

// export {composteras};