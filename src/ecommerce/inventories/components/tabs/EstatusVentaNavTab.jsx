import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";
// Definimos las pestañas específicas para Estatus Venta
const EstatusVentaTabs = ["ESTATUS", "DETALLES", "OBSERVACIONES"];

const EstatusVentaNavTab = ({ currentRowInEstatusVentaTab, setCurrentNameTabInEstatusVentaTab }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleChange = (e) => {
    const selectedTab = e.target.innerText.toUpperCase();
    setCurrentNameTabInEstatusVentaTab(selectedTab);

    switch (selectedTab) {
      case "ESTATUS":
        setCurrentTabIndex(0);
        break;
      case "DETALLES":
        setCurrentTabIndex(1);
        break;
      case "OBSERVACIONES":
        setCurrentTabIndex(2);
        break;
      default:
        setCurrentTabIndex(0);
        break;
    }
  };

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 0.5,
      }}
    >
      <Tabs
        value={currentTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="estatus venta tabs"
        textColor="primary"
      >
        {EstatusVentaTabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            disabled={currentRowInEstatusVentaTab === null} // Desactiva si no hay fila seleccionada
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default EstatusVentaNavTab;
