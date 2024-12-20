    import { MaterialReactTable } from 'material-react-table';
    import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
    import AddCircleIcon from "@mui/icons-material/AddCircle";
    import EditIcon from "@mui/icons-material/Edit";
    import InfoIcon from "@mui/icons-material/Info";
    import DeleteIcon from "@mui/icons-material/Delete";
    import Autorenew from "@mui/icons-material/Autorenew";
    import React, { useEffect, useState } from "react";
    import AddNegocioModal from '../modals/AddNegocioModal';
    import UpdateNegocioModal from '../modals/UpdateNegocioModal';
    import { getInventario } from '../../../remote/get/getInventario';
    import { getAllInventories } from '../../../remote/getAllInventories';
    import { deleteNegocio } from '../../../remote/del/deleteNegocio';

    const NegociosColumns = [
        {
        accessorKey: "IdInstitutoOK",
        header: "ID Instituto",
        size: 30, //small column
        },
        {
            accessorKey: "IdNegocioOK",
            header: "ID Negocio",
            size: 150, //small column
        },
        {
            accessorKey: "NombreNegocio",
            header: "Nombre Negocio",
            size: 30, //small column
        },
        {
        accessorKey: "ControlaSerie",
        header: "Control de serie",
        size: 30, //small column
        },
    ];
    
    //FIC: Table - FrontEnd.
    const NegociosTable = () => {
        const [loadingTable, setLoadingTable] = useState(true);
        const [NegociosData, setNegociosData] = useState([]);
        const [AddNegocioshowModal, setAddNegocioshowModal] = useState(false);
        const [UpdateNegocioshowModal, setUpdateNegocioshowModal] = useState(false);
        const [idSelectedRowNegocio, setIdSelectedRowNegocio] = useState(null);
        const [NegocioSel, setNegocioSel] = useState(null);
        async function fetchData() {
        try {
            const AllNegociosData = await getAllInventories();
            const NegocioData = AllNegociosData.flatMap(inventario => inventario.negocios.map(negocio => ({ IdInstitutoOK: inventario.IdInstitutoOK, ...negocio })) );
            setNegociosData(NegocioData);   
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener Negocios:", error);
        }
        }
        useEffect(() => {
        fetchData();
        }, []);

        const handleDelete = async () => {
            const res = await swal({ title: "¿Estás seguro?", 
              text: `El Negocio con el ID ${NegocioSel.IdNegocioOK} será eliminado, ¿Desea continuar?`, 
              icon: "warning", 
              buttons: true, 
              dangerMode: true, });
            if (res) {
              try {
                await deleteNegocio(NegocioSel.IdNegocioOK);
                setNegocioSel(null);
                fetchData();
                swal("Listo","Se eliminó el Negocio","success");
              } catch (e) {
                swal("Error","No se pudo eliminar el Negocio","error");
              }
            }
          };

        return (
            <Box>
            <Box>
                <MaterialReactTable
                columns={NegociosColumns}
                data={NegociosData}
                state={{isLoading: loadingTable}}
                initialState={{ density: "compact", showGlobalFilter: true }}
                muiTableBodyRowProps={({ row }) => ({
                //CLIC EN UN ROW
                onClick: (event) => {
                    console.log("ROW", row.original, "ID", row.id);
                    setNegocioSel(row.original);
                    setIdSelectedRowNegocio(row.id);
                },
                sx: {
                    //FIC: si esta cargando no debes dar click aun
                    cursor: loadingTable ? "not-allowed" : "pointer", 
                    backgroundColor:
                    idSelectedRowNegocio === row.id
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
                            <IconButton 
                                onClick={() => setAddNegocioshowModal(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                        <IconButton onClick={() => setUpdateNegocioshowModal(true)} disabled={!NegocioSel}>
                            <EditIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                        <IconButton onClick={handleDelete} disabled={!NegocioSel}>
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalles ">
                        <IconButton onClick={() => getInventario(NegocioSel.IdNegocioOK)}>
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
                <AddNegocioModal
                AddNegocioshowModal={AddNegocioshowModal}
                setAddNegocioshowModal={setAddNegocioshowModal}
                onClose={() => setAddNegocioshowModal(false)}
                />
            </Dialog>

            <Dialog open={UpdateNegocioshowModal}>
                <UpdateNegocioModal
                UpdateNegocioshowModal={UpdateNegocioshowModal}
                setUpdateNegocioshowModal={setUpdateNegocioshowModal}
                onClose={() => setUpdateNegocioshowModal(false)}
                NegocioSel={NegocioSel}
                />
            </Dialog>
            </Box>
        );
    };

    export default NegociosTable;