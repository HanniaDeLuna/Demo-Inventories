import { Box } from "@mui/material";
import InventoriesNavTab from "../components/tabs/InventoriesNavTab";
import { useState } from "react";
import InstitutoTab from "../components/tabs/InstitutoTab";
import NegocioTab from "../components/tabs/NegocioTab";
import AlmacenTab from "../components/tabs/AlmacenesTab";
// import InfoTab from "../components/tabs/InfoAdTab";
// import MvtosTab from "../components/tabs/MvtosTab";
import SeriesTab from "../components/tabs/SeriesTab";
// import EstatusFisicoTab from "../components/tabs/EstatusFisicoTab";
// import EstatusVentaTab from "../components/tabs/EstatusVentaTab";
// import UbicacionesTab from "../components/tabs/UbicacionesTab";

const Inventories = () => {
    const [CurrentRowInInventoriesTab, setCurrentRowInInventoriesTab] = useState(0);
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("INSTITUTOS");

    return (
        <Box>
            <InventoriesNavTab
                setCurrentRowInInventoriesTab={setCurrentRowInInventoriesTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
            />
            {currentNameTabInPrincipalTab === "INSTITUTOS" && <InstitutoTab />}
            {currentNameTabInPrincipalTab === "NEGOCIOS" && <NegocioTab />}
            {currentNameTabInPrincipalTab === "ALMACENES" && <AlmacenTab />}
            {currentNameTabInPrincipalTab === "SERIES" && <SeriesTab />}
            {/* {currentNameTabInPrincipalTab === "INFORMACIÓN ADICIONAL" && <InfoTab />}
            {currentNameTabInPrincipalTab === "MOVIMIENTOS" && <MvtosTab />}
            
            {currentNameTabInPrincipalTab === "ESTATUS FÍSICO" && <EstatusFisicoTab />}
            {currentNameTabInPrincipalTab === "ESTATUS DE VENTA" && <EstatusVentaTab />}
            {currentNameTabInPrincipalTab === "UBICACIONES" && <UbicacionesTab />} */}
        </Box>
    );
};

export default Inventories;
