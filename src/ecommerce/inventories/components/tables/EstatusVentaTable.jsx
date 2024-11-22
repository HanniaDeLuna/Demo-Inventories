import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddStatusModal from "../modals/AddEstatusVentaModal";
import { getEstatusVenta } from "../../../remote/get/getEstatusVenta";
import { getAllInventories } from "../../../remote/getAllInventories";

const EstatusVentaColumns = [
  {
    accessorKey: "idTipoEstatusOK",
    header: "ID Estatus",
    size: 30,
  },
  {
    accessorKey: "Actual",
    header: "Actual",
    size: 30,
  },
  {
    accessorKey: "Observacion",
    header: "Observación",
    size: 150,
  },
];

const EstatusVentaTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [estatusVentaData, setEstatusVentaData] = useState([]);
  const [addStatusShowModal, setAddStatusShowModal] = useState(false);
  const [idSelectedRowStatus, setIdSelectedRowStatus] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  async function fetchData() {
    try {
      const allStatusesData = await getAllInventories();
      const allStatus = allStatusesData.flatMap((instituto) =>
        instituto.negocios.flatMap((negocio) =>
          negocio.almacenes.flatMap((almacen) =>
            almacen.series.flatMap((serie) => serie.estatus_venta)
          )
        )
      );
      console.log(allStatus);
      setEstatusVentaData(allStatus);
      setLoadingTable(false);
    } catch (error) {
      console.error("Error al obtener los estatus de venta:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={EstatusVentaColumns}
          data={estatusVentaData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setSelectedStatus(row.original);
              setIdSelectedRowStatus(row.id);
            },
            sx: {
              cursor: loadingTable ? "not-allowed" : "pointer",
              backgroundColor:
                idSelectedRowStatus === row.id ? darken("#EFF999", 0.01) : "inherit",
            },
          })}
          renderTopToolbarCustomActions={() => (
            <>
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddStatusShowModal(true)}>
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
                    <IconButton
                      onClick={() =>
                        selectedStatus &&
                        getEstatusVenta(selectedStatus.idTipoEstatusOK)
                      }
                    >
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
            </>
          )}
        />
      </Box>
      <Dialog open={addStatusShowModal}>
        <AddStatusModal
          addStatusShowModal={addStatusShowModal}
          setAddStatusShowModal={setAddStatusShowModal}
          onClose={() => setAddStatusShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default EstatusVentaTable;
