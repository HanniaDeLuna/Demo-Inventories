import axios from "axios";

export async function AddOneStatusVenta(statusVenta, idSerie, idAlmacen) {
  const apiUrl = `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/serie/${idSerie}/estatus_venta`;

  console.log("Ejecutando API AddOneStatusVenta con URL:", apiUrl);
  console.log("Datos enviados a la API:", statusVenta);

  try {
    const response = await axios.post(apiUrl, statusVenta);

    if (!response.data || response.data.error) {
      throw new Error(response.data.error || "Error desconocido en el servidor.");
    }

    console.log("Estatus de venta creado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en AddOneStatusVenta:", error);
    throw error;
  }
}
