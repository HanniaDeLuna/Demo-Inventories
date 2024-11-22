import { Box } from "@mui/material";
import { useState } from "react";
// FIC:
import SeriesNavTab from "./SeriesNavTab";
import EstatusVentaTab from "./EstatusVentaTab"; // Componente para Estatus Venta
import EstatusFisicoTab from "./EstatusFisicoTab"; // Componente para Estatus Físico
import UbicacionTab from "./UbicacionesTab"; // Componente para Ubicación
import SeriesTabb from "./SeriesTabb"; // Componente para Ubicación

const SeriesTab = () => {
   // Indicamos que al iniciar no hay ningún elemento seleccionado
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);

   // El estado inicial de la pestaña activa es "ALMACENES"
   const [currentRowInSeriesTab, setCurrentNameTabInSeriesTab] = useState("SERIES");

   return (
      <Box>
         <SeriesNavTab
            setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}
            setCurrentNameTabInSeriesTab={setCurrentNameTabInSeriesTab}
         />
         
         {console.log(currentRowInSeriesTab)}

         {/* Cambia el contenido según la pestaña seleccionada */}
         {currentRowInSeriesTab === "SERIES" && <SeriesTabb />}
         {currentRowInSeriesTab === "ESTATUS VENTA" && <EstatusVentaTab />}
         {currentRowInSeriesTab === "ESTATUS FISICO" && <EstatusFisicoTab />}
         {currentRowInSeriesTab === "UBICACIONES" && <UbicacionTab />}
      </Box>
   );
}

export default SeriesTab;
