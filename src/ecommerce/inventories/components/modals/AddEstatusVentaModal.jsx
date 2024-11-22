import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EstatusVentaValues } from "../../helpers/EstatusVentaValues"; 
import { AddOneStatusVenta } from "../../../remote/post/AddOneStatusVenta"
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";


const AddStatusModal = ({ AddStatusShowModal, setAddStatusShowModal }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false); //tabla 

  const formik = useFormik({
    initialValues: {
      IdTipoEstatusOK: "",
      Actual: false,
      Observacion: "",
      FechaReg: "",
      UsuarioReg: "",
    },
    validationSchema: Yup.object({
      IdTipoEstatusOK: Yup.string().required("Campo requerido"),
      Actual: Yup.boolean().required("Campo requerido"),
      Observacion: Yup.string()
        .required("Campo requerido")
        .max(255, "Máximo 255 caracteres"),
      FechaReg: Yup.date().required("Campo requerido").typeError("Debe ser una fecha válida"),
      UsuarioReg: Yup.string()
        .required("Campo requerido")
        .max(100, "Máximo 100 caracteres"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const statusData = EstatusVentaValues({
          ...values,
          Actual: values.Actual ? "S" : "N", // Convertir booleano a 'S' o 'N'
        });
        await AddOneStatusVenta(statusData);
        setMensajeExitoAlert("Estatus creado y guardado correctamente");
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el estatus");
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={AddStatusShowModal}
      onClose={() => setAddStatusShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
      <MyAddLabels
                disabled={!!mensajeExitoAlert}
                label={"Agrega Índices de Búsqueda"}
                onChangeLabels={(labels) =>
                  (formik.values.Indice = labels.join("-"))
                }
              />
        {/* Título */}
        <DialogTitle>
          <Typography>
            <strong>Agregar Nuevo Estatus</strong>
          </Typography>
        </DialogTitle>

        {/* Contenido */}
        <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
          {/* Campos de formulario */}
          <TextField
            id="IdTipoEstatusOK"
            label="ID Estatus*"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK)}
            helperText={formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK}
          />
          <TextField
            id="Observacion"
            label="Observación*"
            value={formik.values.Observacion}
            {...commonTextFieldProps}
            error={formik.touched.Observacion && Boolean(formik.errors.Observacion)}
            helperText={formik.touched.Observacion && formik.errors.Observacion}
          />
          <TextField
            id="FechaReg"
            label="Fecha Registro*"
            type="date"
            value={formik.values.FechaReg}
            {...commonTextFieldProps}
            InputLabelProps={{ shrink: true }}
            error={formik.touched.FechaReg && Boolean(formik.errors.FechaReg)}
            helperText={formik.touched.FechaReg && formik.errors.FechaReg}
          />
          <TextField
            id="UsuarioReg"
            label="Usuario Registro*"
            value={formik.values.UsuarioReg}
            {...commonTextFieldProps}
            error={formik.touched.UsuarioReg && Boolean(formik.errors.UsuarioReg)}
            helperText={formik.touched.UsuarioReg && formik.errors.UsuarioReg}
          />
        </DialogContent>

        {/* Acciones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setAddStatusShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={!!mensajeExitoAlert}
            loading={Loading}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStatusModal;
