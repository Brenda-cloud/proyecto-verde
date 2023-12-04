// ----------------------------------------------------------------------
import { useState, useEffect } from 'react';
import { supabase } from 'src/supabase/supabaseClient';

// ----------------------------------------------------------------------
import { FaMicrochip } from 'react-icons/fa';
import { MdCompost, MdOutlineNearbyError } from 'react-icons/md';
import { GiAutoRepair } from 'react-icons/gi';

import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

export default function AppView() {
  const [numCompostadores, setNumCompostadores] = useState(0);
  const [numCompostadoresInactivos, setNumCompostadoresInactivos] = useState(0);
  const [numCompostadoresEnReparacion, setNumCompostadoresEnReparacion] = useState(0);
  const [numEquipos, setNumEquipos] = useState(0);

  const [datosRecolectadosSemana, setDatosRecolectadosSemana] = useState([]);

  useEffect(() => {
    fetchComposteras();
    fetchEquipos();
    fetchCompostadoresEnReparacion();
    fetchCompostadoresInactivos();
    fetchDatosRecolectadosSemana();
    // Agrega más llamadas a funciones de recuento según sea necesario
  }, []);
  console.log(datosRecolectadosSemana);

  async function fetchComposteras() {
    try {
      const { data, error } = await supabase.from('compostadores').select('idcomp');

      if (error) {
        console.error('Error al obtener compostadores', error);
        return;
      }

      setNumCompostadores(data.length);
    } catch (error) {
      console.error('Error en la operación', error);
    }
  }
  async function fetchCompostadoresInactivos() {
    try {
      const { data, error } = await supabase
        .from('compostadores')
        .select('idcomp')
        .eq('estado', 'inactivo'); // Filtra por compostadores inactivos

      if (error) {
        console.error('Error al obtener compostadores inactivos', error);
        return;
      }

      setNumCompostadoresInactivos(data.length);
    } catch (error) {
      console.error('Error en la operación', error);
    }
  }
  async function fetchCompostadoresEnReparacion() {
    try {
      const { data, error } = await supabase
        .from('compostadores')
        .select('idcomp')
        .eq('estado', 'reparacion'); // Filtra por compostadores en reparación

      if (error) {
        console.error('Error al obtener compostadores en reparación', error);
        return;
      }

      setNumCompostadoresEnReparacion(data.length);
    } catch (error) {
      console.error('Error en la operación', error);
    }
  }

  async function fetchEquipos() {
    try {
      const { data, error } = await supabase.from('equipo').select('ideq');

      if (error) {
        console.error('Error al obtener equipos', error);
        return;
      }

      setNumEquipos(data.length);
    } catch (error) {
      console.error('Error en la operación', error);
    }
  }

  // -------------------------------------------------------------------------------------------
  async function fetchDatosRecolectadosSemana() {
    try {
      // Obtén la fecha de inicio de la semana actual
      const today = new Date();
      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );

      // Formatea la fecha al formato de Supabase (YYYY-MM-DD)
      const formattedStartDate = startOfWeek.toISOString().split('T')[0];

      // Realiza la consulta a Supabase con filtro de fecha
      const { data, error } = await supabase
        .from('datos_recolectados')
        .select('*')
        .gte('fecha', formattedStartDate); // Filtra para obtener datos desde el inicio de la semana

      if (error) {
        console.error('Error al obtener datos recolectados de la semana', error);
        return;
      }

      // Aquí deberías procesar los datos según tus necesidades
      setDatosRecolectadosSemana(data);
    } catch (error) {
      console.error('Error en la operación', error);
    }
  }

  function getFechasSemana(startOfWeek) {
    const fechasSemana = [];
    for (let i = 0; i < 7; i += 1) {
      const fecha = new Date(startOfWeek);
      fecha.setDate(startOfWeek.getDate() + i);
      fechasSemana.push(fecha.toISOString().split('T')[0]);
    }
    return fechasSemana;
  }

  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - ((today.getDay() + 6) % 7)
  );
  const fechasSemana = getFechasSemana(startOfWeek);
  // console.log('Fechas de la semana:', fechasSemana);

  const datosPorDia = {
    1: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Lunes
    2: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Martes
    3: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Miércoles
    4: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Jueves
    5: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Viernes
    6: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Sábado
    0: { temperaturaTotal: 0, humedadTotal: 0, count: 0 }, // Domingo
  };

  datosRecolectadosSemana.forEach((dato) => {
    const fecha = new Date(dato.fecha);
    const diaDeLaSemana = (fecha.getDay() + 6) % 7; // Ajuste para comenzar en lunes

    datosPorDia[diaDeLaSemana].temperaturaTotal += dato.temperatura;
    datosPorDia[diaDeLaSemana].humedadTotal += dato.humedad;
    datosPorDia[diaDeLaSemana].count += 1;
  });

  const promediosPorDia = {
    temperatura: Array.from({ length: 7 }, (_, index) => {
      const count = datosPorDia[index].count || 1;
      return datosPorDia[index].temperaturaTotal / count;
    }),
    humedad: Array.from({ length: 7 }, (_, index) => {
      const count = datosPorDia[index].count || 1;
      return datosPorDia[index].humedadTotal / count;
    }),
  };

  console.log(promediosPorDia);

  const fechasEspañol = [];
  const temperaturas = [];
  const humedades = [];

  datosRecolectadosSemana.forEach(({ fecha, temperatura, humedad }) => {
    const fechaObj = new Date(fecha);

    if (!Number.isNaN(fechaObj)) {
      // fechasEspañol.push(fechaObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }));
      fechasEspañol.push(fecha);
      temperaturas.push(temperatura);
      humedades.push(humedad);
    } else {
      console.error(`Fecha no válida: ${fecha}`);
    }
  });

  console.log('Fechas en Español:', fechasEspañol);
  console.log('Temperaturas:', temperaturas);
  console.log('Humedades:', humedades);

  // -------------------------------------------------------------------------------------------

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola, bienvenido de nuevo 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid key={1} xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Cantidad de equipos"
            total={numEquipos !== null ? numEquipos : '0'}
            color="success"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            icon={<FaMicrochip size={50} color="black" />}
          />
        </Grid>
        <Grid key={2} xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Cantidad de composteras"
            total={numCompostadores !== null ? numCompostadores : '0'}
            color="success"
            icon={<MdCompost size={50} color="green" />}
          />
        </Grid>

        <Grid key={3} xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Composteras en reparacion"
            total={numCompostadoresEnReparacion == null ? numCompostadoresEnReparacion : '0'}
            color="success"
            icon={<GiAutoRepair size={50} color="blue" />}
          />
        </Grid>
        <Grid key={4} xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Composteras inactivas"
            total={numCompostadoresInactivos == null ? numCompostadoresInactivos : '0'}
            color="success"
            icon={<MdOutlineNearbyError size={50} color="red" />}
          />
        </Grid>

        {/* asta aqui las cards */}

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Temperatura semanal"
            subheader="Esta semana"
            chart={{
              labels: fechasEspañol,
              series: [
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'gradient',
                //   data: temperaturas,
                // },
                {
                  name: 'Humedad',
                  type: 'area',
                  fill: 'gradient',
                  data: humedades,
                },
                {
                  name: 'Temperatura',
                  type: 'line',
                  fill: 'gradient',
                  data: temperaturas,
                },
              ],
            }}
          />
        </Grid>
        {console.log(fechasSemana)}  
            {console.log(temperaturas)}
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Medición Semanal"
            chart={{
              categories: fechasSemana,
              series: [
                { name: 'Temperatura', data: promediosPorDia.temperatura },
                { name: 'Humedad', data: promediosPorDia.humedad },
              ],
            }}
            />
        </Grid>
            

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italia', value: 400 },
                { label: 'Japona', value: 430 },
                { label: 'Porcelana', value: 448 },
                { label: 'canada', value: 470 },
                { label: 'Francia', value: 540 },
                { label: 'Alemania', value: 580 },
                { label: 'Sur Corea', value: 690 },
                { label: 'Países Bajos', value: 1100 },
                { label: 'Unida Estados', value: 1200 },
                { label: 'Unida Reino', value: 1380 },
              ],
            }}
          />
        </Grid> */}

        {/* 
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Actualización de las noticias"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={12}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
