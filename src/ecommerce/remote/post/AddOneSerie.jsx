import axios from "axios";

export function AddOneSerie(Serie) {
    
    console.log("<<EJECUTA>> API <<AddOneSerie>> Requiere:", Serie)
    return new Promise((resolve, reject) => {

      axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/`, Serie)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneSerie", Serie)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneSerie>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneSerie>>", error);
          reject(error); 
        });     
    });
 }