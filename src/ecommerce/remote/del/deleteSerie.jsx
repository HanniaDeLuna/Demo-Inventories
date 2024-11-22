import axios from "axios";
export function deleteSerie(id) { 
    return new Promise((resolve, reject) => { 
        axios.delete(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/${id}`) 
        .then((response) => { 
            console.log("Serie eliminado: ", response.data); 
            resolve(response.data);
        }) .catch((error) => { 
            console.error("Error en <<deleteSerie>>", error); 
            reject(error);
            }); 
        }); 
    }