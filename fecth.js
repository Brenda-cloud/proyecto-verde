const SUPABASE_URL = "https://meruzhshfyrdowxtwrhg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcnV6aHNoZnlyZG93eHR3cmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3MzA0NTIsImV4cCI6MjAxMjMwNjQ1Mn0.JwUvNOUs5p07_v9OBn_xhu1hwtwUME9gaiiNgDJjH6E";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function obtenerDatos() {
  try {
    const { data, error } = await _supabase.from("datos_recolectados").select();
    let temperatura = "";
    let humedad = "";
    data.forEach(function (item) {
      temperatura = item.temperatura;
      humedad = item.humedad;
      // fecha = item.
      // console.log(data)
    });

    document.getElementById("temp").innerHTML = temperatura.toFixed(2);
    document.getElementById("hum").innerHTML = humedad;
  } catch (err) {
    console.error("Error al recibir los datos de la db", err);
  }
  // console.log(data);
}

async function subscribeSensor() {

  const channel = _supabase
    .channel("datos_recolectados")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
      },
      (payload) => {console.log(payload)
        obtenerDatos();
    }
    )
    .subscribe();
  obtenerDatos();
}
subscribeSensor();


// window.addEventListener("load", function (event) {
//   console.log("hola");
//   obtenerComposteras();
// });

async function obtenerComposteras() {
  try {
    const { data, error } = await _supabase.from("compostadores").select();

    if (error) {
      throw error;
    }

    const tabBody = document.getElementById("composteras");
    tabBody.innerHTML = "";

    data.forEach((fila) => {
      const tr = document.createElement("tr");
      console.log(fila);

      const idc = fila.idcomp;
      const ido = fila.idorg;
      const ide = fila.ideq;
      const idtip = fila.tipo;
      const idcap = fila.capacidad;
      const idubi = fila.ubicacion;
      const idfi = fila.fechainstalacion;
      const idest = fila.estado;
      const idcom = fila.comentarios;
      // ideq	idorg	tipo	capacidad	ubicacion	fechainstalacion	estado	comentarios
      const fecha = new Date(idfi);

      // Opciones de formato
      const opcionesDeFormato = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      const formatoFecha = new Intl.DateTimeFormat(
        "es-ES",
        opcionesDeFormato
      ).format(fecha);

      tr.innerHTML = `<td>${idc}</td><td>${ido}</td><td>${ide}</td><td>${idtip}</td><td>${idcap}</td><td>${idubi}</td><td>${formatoFecha}</td><td>${idest}</td><td>${idcom}</td>`;

      tabBody.appendChild(tr);
    });

    //   console.log(data);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

obtenerComposteras();



//graficos

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      datasets: [{ 
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: [282,350,411,502,635,809,947,1402,3700,5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: [168,170,178,190,203,276,408,547,675,734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, { 
          data: [40,20,10,16,24,38,74,167,508,784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, { 
          data: [6,3,2,2,7,26,82,172,312,433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });
  
