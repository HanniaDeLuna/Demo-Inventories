import { MaterialReactTable } from 'material-react-table'; // Componente principal para renderizar tablas
import { Box, Stack, Tooltip, IconButton, Dialog, darken } from "@mui/material"; // Componentes de MUI para diseño y funcionalidades
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Icono para agregar
import EditIcon from "@mui/icons-material/Edit"; // Icono para editar
import InfoIcon from "@mui/icons-material/Info"; // Icono para mostrar detalles
import DeleteIcon from "@mui/icons-material/Delete"; // Icono para eliminar
import Autorenew from "@mui/icons-material/Autorenew"; // Icono para recargar
import React, { useEffect, useState } from "react"; // Hooks de React
import AddMovModal from '../modals/AddMovModal'; // Componente modal para agregar movimientos
import { getInventario } from '../../../remote/get/getInventario'; // Función para obtener detalles de un inventario
import { getAllInventories } from '../../../remote/GetAllInventories'; // Función para obtener todos los inventarios

// Configuración de columnas para la tabla
const MovColumns = [
    { accessorKey: "IdAlmacenOK", header: "ID OK", size: 30 }, // Columna para ID de almacén
    { accessorKey: "IdTipoMovtoOK", header: "IdTipoMovtoOK", size: 30 }, // Columna para tipo de movimiento
    { accessorKey: "IdClaseMovtoOK", header: "IdClaseMovtoOK", size: 150 }, // Columna para clase de movimiento
    { accessorKey: "CantidadMovto", header: "Cantidad Movto Apartada", size: 50 }, // Cantidad apartada
    { accessorKey: "CantidadAnt", header: "Cantidad Ant", size: 30 }, // Cantidad anterior
    { accessorKey: "Referencia", header: "Referencia", size: 150 }, // Referencia
];

// Componente principal de la tabla
const MovTable = () => {
    const [loadingTable, setLoadingTable] = useState(true); // Estado para controlar el indicador de carga
    const [InventoriesData, setInventoriesData] = useState([]); // Estado para almacenar los datos de inventarios
    const [AddMovShowModal, setAddMovShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null); // Estado para almacenar la fila seleccionada
    const [productSel, setProductSel] = useState(null); // Estado para almacenar el producto seleccionado

    // Función para obtener los datos de inventarios
    async function fetchData() {
        try {
            const AllInventoriesData = await getAllInventories(); // Llama a la API para obtener todos los inventarios
            console.log(AllInventoriesData);

            // Procesa los datos para aplanarlos en una estructura compatible con la tabla
            const movimientos = (AllInventoriesData || []).flatMap((inventario) =>
                (inventario?.negocios || []).flatMap((negocio) =>
                    (negocio?.almacenes || []).flatMap((almacen) =>
                        (almacen?.movtos || []).map((movimiento) => ({
                            IdAlmacen: almacen.IdAlmacenOK || null,
                            IdTipoMovto: movimiento.IdTipoMovtoOK || null,
                            IdClaseMovto: movimiento.IdClaseMovtoOK || null,
                            CantidadMovto: movimiento.CantidadMovto || null,
                            CantidadAnterior: movimiento.CantidadAnt || null,
                            CantidadActual: movimiento.CantidadAct || null,
                            Referencia: movimiento.Referencia || null,
                        }))
                    )
                )
            );

            setInventoriesData(AllInventoriesData); // Actualiza el estado con los datos obtenidos
            setLoadingTable(false); // Desactiva el indicador de carga
        } catch (error) {
            console.error("Error al obtener productos:", error); // Muestra errores en la consola
        }
    }

    // Ejecuta fetchData al cargar el componente
    useEffect(() => {
        fetchData();
    }, []);

    // Función para abrir el modal
    const handleOpenModal = () => {
        setAddMovShowModal(true); // Actualiza el estado para mostrar el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setAddMovShowModal(false); // Actualiza el estado para ocultar el modal
    };

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={MovColumns} // Configuración de columnas
                    data={InventoriesData} // Datos de la tabla
                    state={{ isLoading: loadingTable }} // Indicador de carga
                    initialState={{ density: "compact", showGlobalFilter: true }} // Estado inicial de la tabla
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: (event) => {
                            setProductSel(row.original); // Establece el producto seleccionado
                            setIdSelectedRowProduct(row.id); // Establece la fila seleccionada
                        },
                        sx: {
                            cursor: loadingTable ? "not-allowed" : "pointer", // Desactiva el clic si la tabla está cargando
                            backgroundColor:
                                idSelectedRowProduct === row.id
                                    ? darken("#EFF999", 0.01) // Cambia el color de fondo si la fila está seleccionada
                                    : "inherit",
                        },
                    })}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Tooltip title="Agregar Movimiento">
                                <IconButton onClick={handleOpenModal}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Detalles">
                                <IconButton onClick={() => getInventario(productSel?.IdAlmacenOK)}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Recargar">
                                <IconButton onClick={fetchData}>
                                    <Autorenew />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}
                />
            </Box>

            {/* Modal de Agregar Movimiento */}
            <Dialog open={AddMovShowModal} onClose={handleCloseModal}>
                <AddMovModal
                    AddMovShowModal={AddMovShowModal}
                    setAddMovShowModal={setAddMovShowModal}
                    onClose={handleCloseModal} // Pasamos la función de cierre
                />
            </Dialog>
        </Box>
    );
};

export default MovTable;
