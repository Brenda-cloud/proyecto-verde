import { useState, useEffect } from 'react';
import { supabase } from 'src/supabase/supabaseClient';
import { Helmet } from 'react-helmet-async';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { FaTemperatureLow } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { IoMdTime } from 'react-icons/io';

import ReactApexChart from 'react-apexcharts';

function formatearFechaEnEspanol(fecha) {
  const fechaObjeto = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  const fechaFormateada = fechaObjeto.toLocaleString('es-ES', opciones);
  return fechaFormateada;
}

export default function Compostera() {
  // const params = useParams();
  const { id } = useParams();
  console.log(id);
  const router = useRouter();
  const handleClick = () => {
    router.push('/composteras');
  };

  const [ultimosDatos, setDatosRecolectados] = useState([]);
  const [datosRecolectados, setDatosRecolectadosFull] = useState([]);
  const [compostador, setCompostador] = useState([]);

  useEffect(() => {
    getDatosRecolectados(id);
    getCompostador(id);
    getDatosRecolectadosFull(id);
  }, [id]);

  async function getDatosRecolectados(ide) {
    const { data } = await supabase
      .from('datos_recolectados')
      .select()
      .eq('idcomp', ide)
      .order('fecha', { ascending: false })
      .limit(1)
      .maybeSingle();
    setDatosRecolectados(data);
  }

  async function getCompostador(ide) {
    const { data } = await supabase.from('compostadores').select().eq('idcomp', ide).maybeSingle();
    setCompostador(data);
  }
//   console.log(ultimosDatos);
//   console.log(compostador);

  const fechaYHora = formatearFechaEnEspanol(ultimosDatos.fecha);
//   console.log(fechaYHora);
  //   const fechaHoraFormateada = fecha.format('DD de MMMM de YYYY, a las HH:mm:ss');

  async function getDatosRecolectadosFull(ide) {
    const { data } = await supabase.from('datos_recolectados')
      .select()
      .eq('idcomp', ide);
  
    const fechas = data.map(dato => dato.fecha);
    const temperaturas = data.map(dato => dato.temperatura);
    const humedades = data.map(dato => dato.humedad);
  
    setDatosRecolectadosFull({ fechas, temperaturas, humedades });
  }
  
  console.log(datosRecolectados.fechas);
  console.log(datosRecolectados.temperaturas);

  const series = [
    {
      name: 'Temperatura (°C)',
      data: datosRecolectados.temperaturas,
    },
    {
      name: 'Humedad (%)',
      data: datosRecolectados.humedades,
    },
  ];

  const options = {
    chart: {
      height: 300,
      type: 'line',
    },
    xaxis: {
    //   categories: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
      categories: datosRecolectados.fechas,
    },
    tooltip: {
      x: {
        format: 'HH:mm',
      },
      y: {
        title: 'Valor',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title> Compostera </title>
      </Helmet>
      <Container>
        <Typography variant="h4" component="div">
          COMPOSTERA N° {id}
        </Typography>

        <Button size="small" color="secondary" onClick={handleClick}>
          Regresar
        </Button>

        <Box
          sx={{
            display: 'flex',
            m: 1,
            p: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
            border: '1px solid',
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
        >
          {/* { comp_dato_rec[0].temperatura} */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Tipo:
              </Typography>
              <Typography variant="h5" component="div" align="center">
                {compostador.tipo}
              </Typography>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                fecha Instalación:
              </Typography>
              <Typography variant="h5" component="div" align="center">
                {compostador.fechainstalacion}
              </Typography>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Estado:
              </Typography>
              <Typography variant="h5" component="div" align="center">
                {compostador.estado}
              </Typography>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Comentarios:
              </Typography>
              <Typography variant="h5" component="div" align="center">
                {compostador.comentarios}
              </Typography>

              {ultimosDatos.temperatura}
            </CardContent>

            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Box>
        <Grid container spacing={3}>
          <Grid key={1000} xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                  <FaTemperatureLow color="red" size={36} />
                  Temperatura
                </Typography>
                <Typography
                  sx={{ fontSize: 65, fontWeight: 'bold' }}
                  component="div"
                  align="center"
                >
                  {ultimosDatos.temperatura} °C
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid key={2000} xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                  <WiHumidity color=" #23c798 " size={36} />
                  Humedad
                </Typography>
                <Typography
                  sx={{ fontSize: 65, fontWeight: 'bold' }}
                  component="div"
                  align="center"
                >
                  {ultimosDatos.humedad} %
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid key={3000} xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                  <IoMdTime color="black" size={36} />
                  Fecha y Hora de la medición
                </Typography>
                <Typography
                  sx={{ fontSize: 35, fontWeight: 'bold' }}
                  component="div"
                  align="center"
                >
                  {fechaYHora}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid key={4000} xs={12} sm={12} md={12}>
            <Card>   <CardContent>
              <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                Datos de hoy{}
              </Typography>

              <ReactApexChart series={series} options={options} type="area" height={500} />
              </CardContent></Card>
          </Grid>
          <Grid key={5000} xs={12} sm={12} md={12}>
            <Card>   <CardContent>
              <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                Datos Recolectados{}
              </Typography>

              
              </CardContent></Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
