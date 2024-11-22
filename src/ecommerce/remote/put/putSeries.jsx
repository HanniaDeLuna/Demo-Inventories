import axios from "axios";

export function putSeries(Series) {
    
    console.log("<<EJECUTA>> API <<UpdateSeries>> Requiere:", Series)
    return new Promise((resolve, reject) => {

      axios.put(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}`, Series)
        .then((response) => {
          console.log("<<RESPONSE>> UpdateSeries", Series)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateSeries> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<UpdateSeries>", error);
          reject(error); 
        });     
    });
 }