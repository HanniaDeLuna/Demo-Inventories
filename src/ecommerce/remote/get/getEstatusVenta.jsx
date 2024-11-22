export async function getEstatusVenta(idTipoEstatusOK) {
    try {
      // Simulación de una API que devuelve datos completos
      const response = await fetch('/api/inventories'); // URL ficticia de la API
      const data = await response.json();
  
      // Buscamos el estatus de venta específico
      const estatusVenta = data
        .flatMap((instituto) =>
          instituto.negocios.flatMap((negocio) =>
            negocio.almacenes.flatMap((almacen) =>
              almacen.series.flatMap((serie) => serie.estatus_venta)
            )
          )
        )
        .find((estatus) => estatus.IdTipoEstatusOK === idTipoEstatusOK);
  
      if (!estatusVenta) {
        throw new Error(`No se encontró el estatus de venta con ID: ${idTipoEstatusOK}`);
      }
  
      return estatusVenta;
    } catch (error) {
      console.error(`Error al obtener el estatus de venta con ID: ${idTipoEstatusOK}`, error);
      throw error;
    }
  }
  