import axios from "axios";

export function AddOneInstituto(Instituto) {
    
    console.log("<<EJECUTA>> API <<AddOneInstituto>> Requiere:", Instituto)
    return new Promise((resolve, reject) => {

      axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/`, Instituto)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneInstituto", Instituto)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstituto>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneInstituto>>", error);
          reject(error); 
        });     
    });
 }