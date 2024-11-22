import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddInstitutoModal from '../modals/AddInstitutoModal';
import UpdateInstitutoModal from '../modals/UpdateInstitutoModal'; 
import { getInstituto } from '../../../remote/get/getInstituto';
import { deleteInstituto } from '../../../remote/del/deleteInstituto';
import { getAllInventories } from '../../../remote/getAllInventories';
import swal from 'sweetalert';

const InstitutosColumns = [
    {
      accessorKey: "IdInstitutoOK",
      header: "ID OK",
      size: 30, //small column
    },
    {
        accessorKey: "NombreInstituto",
        header: "Nombre Instituto",
        size: 150, //small column
    },
    {
      accessorKey: "IdProdServOK",
      header: "ProdServ OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdPresentaOK",
      header: "Presentacion OK",
      size: 30, //small column
    }
  ];
 
  const InstitutosTable = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [InstitutosData, setInstitutosData] = useState([]);
    const [AddInstitutoShowModal, setAddInstitutoShowModal] = useState(false);
    const [UpdateInstitutoShowModal, setUpdateInstitutoShowModal] = useState(false);
    const [idSelectedRowInstituto, setIdSelectedRowInstituto] = useState(null);
    const [InstitutoSel, setInstitutoSel] = useState(null);
    async function fetchData() {
      try {
        const AllInstitutosData = await getAllInventories();
        setInstitutosData(AllInstitutosData);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener Institutoos:", error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);


    const handleDelete = async () => {
      const res = await swal({ title: "¿Estás seguro?", 
        text: `El Instituto con el ID ${InstitutoSel.IdInstitutoOK} será eliminado, ¿Desea continuar?`, 
        icon: "warning", 
        buttons: true, 
        dangerMode: true, });
      if (res) {
        try {
          await deleteInstituto(InstitutoSel.IdInstitutoOK);
          setInstitutoSel(null);
          fetchData();
          swal("Listo","Se eliminó el Instituto","success");
        } catch (e) {
          swal("No se pudo eliminar el Instituto","error");
        }
      }
    };

    return (
        <Box>
          <Box>
            <MaterialReactTable
             columns={InstitutosColumns}
             data={InstitutosData}
              state={{isLoading: loadingTable}}
             initialState={{ density: "compact", showGlobalFilter: true }}
             muiTableBodyRowProps={({ row }) => ({
              //CLIC EN UN ROW
              onClick: (event) => {
                console.log("ROW", row.original, "ID", row.id);
                setInstitutoSel(row.original);
                setIdSelectedRowInstituto(row.id);
              },
              sx: {
                //FIC: si esta cargando no debes dar click aun
                cursor: loadingTable ? "not-allowed" : "pointer", 
                backgroundColor:
                  idSelectedRowInstituto === row.id
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
                            onClick={() => setAddInstitutoShowModal(true)}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => setUpdateInstitutoShowModal(true)} disabled={!InstitutoSel}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton onClick={handleDelete} disabled={!InstitutoSel}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detalles ">
                      <IconButton onClick={() => getInstituto(InstitutoSel.IdInstitutoOK)}>
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
          <Dialog open={AddInstitutoShowModal}>
            <AddInstitutoModal
              AddInstitutoShowModal={AddInstitutoShowModal}
              setAddInstitutoShowModal={setAddInstitutoShowModal}
              onClose={() => setAddInstitutoShowModal(false)}
            />
            
          </Dialog>
          <Dialog open={UpdateInstitutoShowModal}>
            <UpdateInstitutoModal
              UpdateInstitutoShowModal={UpdateInstitutoShowModal}
              setUpdateInstitutoShowModal={setUpdateInstitutoShowModal}
              onClose={() => setUpdateInstitutoShowModal(false)}
              InstitutoSel={InstitutoSel}
            />
          </Dialog>
        </Box>
      );
  };

  export default InstitutosTable;