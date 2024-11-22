import { Box } from "@mui/material";
import { useState } from "react";
import InstitutoTable from "../tables/InstitutosTable";
import NegocioTabb from "./NegociosTabb";
import InstitutosNavTab from "./InstitutosNavTab";

const InstitutoTab = () => {
   
   //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado. 
   const [currentRowInAlmacenesTab, setCurrentRowInAlmacenesTab] = useState(0);    
   
   //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS. 
   const [currentRowInInstitutosTab, setCurrentNameTabInInstitutosTab] = useState("INSTITUTOS");
   
   return ( 
      <Box>   
            <InstitutosNavTab
                setCurrentRowInAlmacenesTab={setCurrentRowInAlmacenesTab}  
                setCurrentNameTabInInstitutosTab={setCurrentNameTabInInstitutosTab}   
            />

            {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}
            
            {console.log(currentRowInInstitutosTab)}
            {/* {currentNameTabInAlmacenesTab == "NEGOCIOS" && <AlmacenesTab />} */}
            
            {currentRowInInstitutosTab === "INSTITUTOS" && <InstitutoTable />}
            {currentRowInInstitutosTab === "NEGOCIOS" && <NegocioTabb />}

      </Box>
    );
  }

  export default InstitutoTab;