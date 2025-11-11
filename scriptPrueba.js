//const API_URL = 'http://localhost:3000/api/pruebas';
const API_URL = 'https://uxt-api.onrender.com/api/pruebas';
console.log ("algo")



// Función para obtener información de la página
function obtenerInfoPagina() {
  return {
    title: document.title || 'Título por defecto',
    url: window.location.href || 'https://ejemplo.com',
    dominio: window.location.hostname || 'ejemplo.com',
    userAgent: navigator.userAgent || 'desconocido',
    referrer: document.referrer || 'Directo'
  };
}

// Función para enviar datos a la API usando fetch
async function enviarDatosAPI(datos) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      console.error('Respuesta de error de la API:', errBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultado = await response.json();
    console.log('Datos enviados exitosamente:', resultado);
    return resultado;

  } catch (error) {
    console.error('Error al enviar datos:', error);
    throw error;
  }
}

const datos = obtenerInfoPagina();
enviarDatosAPI(datos);


