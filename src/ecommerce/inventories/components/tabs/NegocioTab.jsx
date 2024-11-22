import { Box } from "@mui/material";
import { useState } from "react";
import NegociosTable from "../tables/NegociosTable";
import AlmacenTab from "./AlmacenesTabb";
import NegociosNavTab from "./NegociosNavTab";

const NegocioTab = () => {
   
   //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado. 
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);    
   
   //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS. 
   const [currentRowInNegociosTab, setCurrentNameTabInAlmacenesTab] = useState("NEGOCIOS");
   
   return ( 
      <Box>   
            <NegociosNavTab
                setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}  
                setCurrentNameTabInAlmacenesTab={setCurrentNameTabInAlmacenesTab}   
            />

            {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}
            
            {console.log(currentRowInNegociosTab)}
            {/* {currentNameTabInAlmacenesTab == "NEGOCIOS" && <AlmacenesTab />} */}
            
            {currentRowInNegociosTab === "NEGOCIOS" && <NegociosTable />}
            {currentRowInNegociosTab === "ALMACENES" && <AlmacenTab />}

      </Box>
    );
  }

  export default NegocioTab;