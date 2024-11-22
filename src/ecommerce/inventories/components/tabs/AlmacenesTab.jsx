import { Box } from "@mui/material";
import { useState } from "react";
//FIC:
import AlmacenesNavTab from "./AlmacenesNavTab";
import InfoAdTab from "./InfoAdTab";
import MvtosTab from "./MvtosTab";
import SeriesTab from "./SeriesTabb";
import AlmacenTab from "./AlmacenesTabb";

const AlmacenesTab = () => {
   
   //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado. 
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);    
   
   //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS. 
   const [currentNameInAlmacenesTab, setCurrentNameTabInAlmacenesTab] = useState("ALMACENES");
   
   return ( 
      <Box>   
            <AlmacenesNavTab
                setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}  
                setCurrentNameTabInAlmacenesTab={setCurrentNameTabInAlmacenesTab}   
            />

            {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}
            
            {console.log(currentNameInAlmacenesTab)}
            {/* {currentNameTabInAlmacenesTab == "NEGOCIOS" && <AlmacenesTab />} */}
            {currentNameInAlmacenesTab === "ALMACENES" && <AlmacenTab />}
            {currentNameInAlmacenesTab === "INFO ADICIONAL" && <InfoAdTab />}
            {currentNameInAlmacenesTab === "MOVIMIENTOS" && <MvtosTab />}
            {currentNameInAlmacenesTab === "SERIES" && <SeriesTab />}

      </Box>
    );
  }

  export default AlmacenesTab;