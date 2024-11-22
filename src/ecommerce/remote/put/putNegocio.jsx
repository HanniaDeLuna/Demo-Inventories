import axios from "axios";

export function putNegocio(id,Negocio) {
    
    console.log("<<EJECUTA>> API <<UpdateNegocio>> Requiere:", Negocio)
    return new Promise((resolve, reject) => {

      axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/${id}`, Negocio)
        .then((response) => {
          console.log("<<RESPONSE>> UpdateNegocio", Negocio)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateNegocio>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<UpdateNegocio>>", error);
          reject(error); 
        });     
    });
 }