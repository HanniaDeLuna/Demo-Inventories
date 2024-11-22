import axios from "axios";

export function AddOneStatusVenta(statusVenta, idSerie) {
  console.log("<<EJECUTA>> API <<AddOneStatusVenta>> Requiere:", statusVenta);

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/serie/${idSerie}/estatus-venta`,
        statusVenta
      )
      .then((response) => {
        console.log("<<RESPONSE>> AddOneStatusVenta", response.data);
        const data = response.data;
        if (!data || data.error) {
          console.error(
            "<<ERROR>> <<NO>> se ejecutó la API <<AddOneStatusVenta>> de forma correcta",
            data
          );
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneStatusVenta>>", error);
        reject(error);
      });
  });
}
