import axios from "axios";

export function AddOneUbicacion(Ubicacion) {
    
    console.log("<<EJECUTA>> API <<AddOneUbicacion>> Requiere:", Ubicacion)
    return new Promise((resolve, reject) => {

      axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/`, Ubicacion)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneInventory", Ubicacion)
          const data = response.data;
          if (!data || data.error) {  
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneUbicacion>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneUbicacion>>", error);
          reject(error); 
        });     
    });
 }