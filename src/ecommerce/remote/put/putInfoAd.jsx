import axios from "axios";

export function putInfoAd(idAlmacen, idInfoAd, infoAd) {
    console.log("<<EJECUTA>> API <<UpdateInfoAd>> Requiere:", { idAlmacen, idInfoAd, infoAd });

    return new Promise((resolve, reject) => {
        axios.put(
            `${import.meta.env.VITE_REST_API_ECOMMERCE}/prod-serv/almacen/${idAlmacen}/info_ad/${idInfoAd}`,
            infoAd
        )
        .then((response) => {
            console.log("<<RESPONSE>> UpdateInfoAd", response.data);
            const data = response.data;
            if (!data || data.error) {
                console.error("<<ERROR>> <<NO>> se ejecutó la API <<UpdateInfoAd>> de forma correcta", data);
                reject(data);
            } else {
                resolve(data);
            }
        })
        .catch((error) => {
            console.error("<<ERROR>> en API <<UpdateInfoAd>>", error);
            reject(error);
        });
    });
}
