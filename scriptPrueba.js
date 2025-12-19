const API_URL = 'https://uxt-api-1.onrender.com/rutas'
// ;
//const API_URL = 'http://localhost:3000/rutas/visitas';
console.log ("algo")

function getUserID() { const STORAGE_KEY = "my_analytics_uid";
  // FunciÃ³n para generar un UUID simple 
  function generateUUID() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16); });
    }
  // Recuperar o crear ID Ãºnico 
  let uid = localStorage.getItem(STORAGE_KEY);
  const isReturning = !!uid; 
  if (!uid) { 
    uid = generateUUID();
    localStorage.setItem(STORAGE_KEY, uid);
  }
    return {
      uid: uid,
      recurrente: isReturning
    }
}

// FunciÃ³n para obtener informaciÃ³n de la pÃ¡gina
function obtenerInfoPagina() {
  let infoUsuario = getUserID();
  return {
    uid: infoUsuario.uid || localStorage.getItem(STORAGE_KEY),
    recurrente: infoUsuario.recurrente || false,
    title: document.title || 'Titulo por defecto',
    url: window.location.href || 'https://ejemplo.com',
    dominio: window.location.hostname || 'ejemplo.com',
    userAgent: navigator.userAgent || 'desconocido',
    referrer: document.referrer || 'Directo'
  };
}

// FunciÃ³n para enviar datos a la API usando fetch
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
console.log(datos);
enviarDatosAPI(datos);
