import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const SeriesTabs = ["SERIES","ESTATUS VENTA", "ESTATUS FISICO", "UBICACIONES"]; // Actualizamos las pestañas

const SeriesNavTab = ({ currentRowInSeriesTab, setCurrentNameTabInSeriesTab }) => {

   const [currenTabIndex, setCurrentTabIndex] = useState(0);

   const handleChange = (e) => {
		setCurrentNameTabInSeriesTab(e.target.innerText.toUpperCase());
		switch (e.target.innerText.toUpperCase()) {
			case "SERIES":
				setCurrentTabIndex(0);
				break;
			case "ESTATUS VENTA":
				setCurrentTabIndex(1);
				break;
			case "ESTATUS FISICO":
				setCurrentTabIndex(2);
				break;
            case "UBICACIONES":
            setCurrentTabIndex(3);
            break;  
		}
	};

   return (
		<Box sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
			<Tabs
				value={currenTabIndex}
				variant={"fullWidth"}
				onChange={handleChange}
				aria-label="icon tabs example"
				textColor="primary"
			>
				
				{SeriesTabs.map((tab) => {		
					return <Tab key={tab} label={tab} disabled ={currentRowInSeriesTab === null}/>;
				})}
			</Tabs>
		</Box>
	);
};

export default SeriesNavTab;
