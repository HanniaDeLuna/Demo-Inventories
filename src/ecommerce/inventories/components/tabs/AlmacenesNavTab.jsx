import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const AlmacenesTabs = ["ALMACENES", "INFO ADICIONAL", "MOVIMIENTOS", "SERIES"];

const AlmacenesNavTab = ({ currentNameInAlmacenesTab, setCurrentNameTabInAlmacenesTab }) => {
	
	const [currenTabIndex, setCurrentTabIndex] = useState(0);

	const handleChange = (e) => {
		setCurrentNameTabInAlmacenesTab(e.target.innerText.toUpperCase());
		switch (e.target.innerText.toUpperCase()) {
			case "ALMACENES":
				setCurrentTabIndex(0);
				break;
			case "INFO ADICIONAL":
				setCurrentTabIndex(1);
				break;
			case "MOVIMIENTOS":
				setCurrentTabIndex(2);
				break;
            case "SERIES":
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
				
				{AlmacenesTabs.map((tab) => {		
					return <Tab key={tab} label={tab} disabled ={currentNameInAlmacenesTab === null}/>;
				})}
			</Tabs>
		</Box>
	);
};

export default AlmacenesNavTab;