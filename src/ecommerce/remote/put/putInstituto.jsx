import axios from "axios";

export function putInstituto(id,Instituto) {
    
    console.log("<<EJECUTA>> API <<UpdateInstituto>> Requiere:", Instituto)
    return new Promise((resolve, reject) => {

      axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}`, Instituto)
        .then((response) => {
          console.log("<<RESPONSE>> UpdateInstituto", Instituto)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateInstituto>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<UpdateInstituto>>", error);
          reject(error); 
        });     
    });
 }