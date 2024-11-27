import axios from "axios";

export async function putEstatusVenta(idAlmacen, idSerie, idEstatus, statusVenta) {
  const apiUrl = `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/serie/${idSerie}/estatus_venta/${idEstatus}`;

  console.log("Ejecutando API putEstatusVenta con URL:", apiUrl);
  console.log("Datos enviados a la API:", statusVenta);

  try {
    const response = await axios.put(apiUrl, statusVenta, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data || response.data.error) {
      throw new Error(response.data.error || "Error desconocido en el servidor.");
    }

    console.log("Estatus de venta actualizado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en putEstatusVenta:", error.message || error);
    throw error;
  }
}
