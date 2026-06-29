// archivo: src/app/dashboard/page.js

// importa el componente principal del dashboard
import DashboardClient from './DashboardClient'; 

// funcion que obtiene datos desde el servidor para cumplir con ssr
async function getEventos() {
  try {
    // llamada a la api externa sin cache para datos frescos
    const res = await fetch('https://api.tu-servidor.com/api/eventos', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

// componente principal de pagina ejecutado en el servidor
export default async function Page() {
  // obtiene los eventos iniciales en el servidor
  const eventosIniciales = await getEventos();
  
  // renderiza el cliente pasando los datos como propiedades
  return <DashboardClient eventosIniciales={eventosIniciales} />;
}