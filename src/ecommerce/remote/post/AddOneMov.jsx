import axios from "axios";

export function AddOneMov(Movimiento) {

    console.log("<<EJECUTA>> API <<AddOneMovimiento>> Requiere:", Movimiento)
    return new Promise((resolve, reject) => {

        axios.post(`${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/negocio/9001-1101/movimiento`, Movimiento)
            .then((response) => {
                console.log("<<RESPONSE>> AddOneInventory", Inventory)
                const data = response.data;
                //console.log("<<RESPONSE>> DATA:", data);
                if (!data || data.error) {
                    console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneMovimiento>> de forma correcta", data);
                    reject(data);
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("<<ERROR>> en API <<AddOneMovimientos>>", error);
                reject(error);
            });
    });
}