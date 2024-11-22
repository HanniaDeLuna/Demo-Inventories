import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddNegocioModal from '../modals/AddNegocioModal';
import { getInventario } from '../../../remote/get/getInventario';
import { getAllInventories } from '../../../remote/getAllInventories';

const EstatusFisicoColumns = [
    {
        accessorKey: "IdTipoEstatusOK",
        header: "ID Tipo Estatus",
        size: 20,
    },
    {
        accessorKey: "Actual",
        header: "Estatus Actual",
        size: 20,
    },
    {
        accessorKey: "Observacion",
        header: "Observación",
        size: 30,
    },
];

//FIC: Table - FrontEnd.
const EstatusFisicoTable = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [estatusData, setNegociosData] = useState([]);
    const [AddNegocioshowModal, setAddNEstatusegocioshowModal] = useState(false);
    const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
    const [productSel, setProductSel] = useState(null);

    async function fetchData() {
        try {
            const AllEstatusData = await getAllInventories(); // Supongo que este método trae el JSON completo.

            // Transformamos los datos y filtramos los vacíos
            const EstatusData = AllEstatusData.flatMap(inventario => 
                inventario.negocios.flatMap(negocio =>
                    negocio.almacenes.flatMap(almacen =>
                        almacen.series.map(serie => {
                            const estatus = serie.estatus_fisico?.find(estatus => estatus.Actual != "");
                            const transformedData = {
                                IdTipoEstatusOK: estatus?.IdTipoEstatusOK || "",
                                Actual: estatus?.Actual || "",
                                Observacion: serie.Observacion || "sin observación",
                            };
                            // Filtramos si todos los campos están vacíos
                            return Object.values(transformedData).every(value => value === "") ? null : transformedData;
                        })
                    )
                )
            ).filter(item => item !== null);

            console.log("Datos transformados:", EstatusData); // Para depurar.
            setNegociosData(EstatusData);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={EstatusFisicoColumns}
                    data={estatusData}
                    state={{isLoading: loadingTable}}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    muiTableBodyRowProps={({ row }) => ({
                        //CLIC EN UN ROW
                        onClick: (event) => {
                            console.log("ROW", row.original, "ID", row.id);
                            setProductSel(row.original);
                            setIdSelectedRowProduct(row.id);
                        },
                        sx: {
                            //FIC: si esta cargando no debes dar click aun
                            cursor: loadingTable ? "not-allowed" : "pointer", 
                            backgroundColor:
                            idSelectedRowProduct === row.id
                                ? darken("#EFF999", 0.01)
                                : "inherit",
                        },
                    })}
                    renderTopToolbarCustomActions={({ table }) => (
                    <>
                        {/* ------- BARRA DE ACCIONES ------ */}
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Box>
                                <Tooltip title="Agregar">
                                </Tooltip>
                                <Tooltip title="Editar">
                                  <IconButton onClick={() => setAddNEstatusegocioshowModal(true)}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Detalles ">
                                    <IconButton onClick={() => getInventario(productSel?.IdAlmacenOK)}>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Recargar">
                                    <IconButton onClick={fetchData}>
                                        <Autorenew />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Stack>
                        {/* ------- BARRA DE ACCIONES FIN ------ */}
                    </>
                    )}
                />
            </Box>
            <Dialog open={AddNegocioshowModal}>
                <AddNegocioModal />
            </Dialog>
        </Box>
    );
};

export default EstatusFisicoTable;
