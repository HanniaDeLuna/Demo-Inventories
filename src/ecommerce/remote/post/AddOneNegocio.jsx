import axios from "axios";

export function AddOneNegocio(id,Negocio) {
    
    console.log("<<EJECUTA>> API <<AddOneNegocio>> Requiere:", Negocio)
    return new Promise((resolve, reject) => {

      axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}/negocio/`, Negocio)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneNegocio", Negocio)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneNegocio>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneNegocio>>", error);
          reject(error); 
        });     
    });
 }