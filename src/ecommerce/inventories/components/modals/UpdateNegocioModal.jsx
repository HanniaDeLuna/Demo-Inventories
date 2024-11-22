import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NegocioValues } from "../../helpers/NegocioValues"; 
import { putNegocio } from "../../../remote/put/putNegocio";
import { getNegocio } from "../../../remote/get/getNegocio";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";
import { getAllInventories } from "../../../remote/GetAllInventories";

const UpdateNegocioModal = ({UpdateNegocioshowModal, setUpdateNegocioshowModal, NegocioSel}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");  
    const [Institutes ,setInstitutes] = useState([]); 
    const [Loading, setLoading] = useState(false);

    useEffect(() => { 
        fetchInstitutes();
        fetchNegocio(); 
    }, [NegocioSel]); 

    const fetchInstitutes = async () => {
        try { 
            const data = await getAllInventories(); 
            setInstitutes(data); 
        } catch (error) { 
            console.error("Error al obtener Negocios:", error); 
        }
    };

    const fetchNegocio = async () => {
        try { 
            const data = await getNegocio(NegocioSel.IdNegocioOK); 
            console.log(data);
            formik.setValues({ 
                IdNegocioOK: data.IdNegocioOK || '',
                IdInstitutoOK: data.IdInstitutoOK || '', 
                NombreNegocio: data.NombreNegocio || '', 
                ControlaSerie: data.ControlaSerie || ''
            });
        } catch (error) { 
            console.error("Error al obtener Negocios:", error); 
        }
    };

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            NombreNegocio: "",
            ControlaSerie: ""
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            NombreNegocio: Yup.string().required("Campo requerido"),
            ControlaSerie: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Negocio = NegocioValues(values);
                console.log("<<Negocio>>", Negocio);
                await putNegocio(NegocioSel.IdNegocioOK, Negocio);
                setMensajeExitoAlert("Inventario creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Inventario");
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
    return(
        <Dialog 
            open={UpdateNegocioshowModal}
            onClose={() => setUpdateNegocioshowModal(false)}
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
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Inventario</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Negocios */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >

                        <Select id="IdInstitutoOK" name="IdInstitutoOK" 
                            value={formik.values.IdInstitutoOK} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)} > 
                        <MenuItem value=""> 
                            <em>Seleccione un instituto</em> 
                        </MenuItem> {
                            Institutes.map((instituto) => ( 
                            <MenuItem key={instituto.IdInstitutoOK} 
                            value={instituto.IdInstitutoOK}> 
                            {instituto.IdInstitutoOK} </MenuItem> ))} 
                        </Select> {formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}

                    <TextField
                        id="NombreNegocio"
                        label="NombreNegocio*"
                        value={formik.values.NombreNegocio}
                        {...commonTextFieldProps}
                        error={ formik.touched.NombreNegocio && Boolean(formik.errors.NombreNegocio) }
                        helperText={ formik.touched.NombreNegocio && formik.errors.NombreNegocio }
                    />
                    <TextField
                        id="ControlaSerie"
                        label="ControlaSerie*"
                        value={formik.values.ControlaSerie}
                        {...commonTextFieldProps}
                        error={ formik.touched.ControlaSerie && Boolean(formik.errors.ControlaSerie) }
                        helperText={ formik.touched.ControlaSerie && formik.errors.ControlaSerie }
                    />
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                        onClick={() => setUpdateNegocioshowModal(false)}
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
export default UpdateNegocioModal;