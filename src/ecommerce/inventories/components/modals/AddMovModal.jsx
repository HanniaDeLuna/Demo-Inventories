import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    DialogActions,
    Box,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllInventories } from "../../../remote/GetAllInventories";
import { MovimientosValues } from "../../helpers/MovimientosValues";
import { AddOneMov } from "../../../remote/post/AddOneMov";


const AddMovModal = ({ AddMovShowModal, setAddMovShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [comboOptions, setComboOptions] = useState([]); // Para almacenar opciones dinámicas

    // Cargar opciones del ComboBox desde la base de datos
    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const inventories = await getAllInventories(); //sacamos los datos del inventario
                const options = inventories.map((item) => item.IdAlmacenOK); // Extraer los IdAlmacenOK
                setComboOptions([...new Set(options)]); // Eliminar duplicados antes de cargarlo
            } catch (error) {
                console.error("Error al cargar los inventarios:", error); // Mostrar errores en la consola
            }
        };
        //solo cargamos los datos en el combo si el modal se abre
        if (AddMovShowModal) {
            fetchInventories();
        }
    }, [AddMovShowModal]);

    const formik = useFormik({
        initialValues: {
            IdAlmacenOK: "",
            IdTipoMovtoOK: "",
            CantidadMovto: "",
            CantidadAnt: "",
            CantidadAct: "",
            IdClaseMovtoOK: "",
            Referencia: "",
        },
        validationSchema: Yup.object({
            IdAlmacenOK: Yup.string().required("Campo requerido"),
            IdTipoMovtoOK: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            CantidadMovto: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            CantidadAnt: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            CantidadAct: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            IdClaseMovtoOK: Yup.number()
                .required("Campo requerido")
                .typeError("Debe ser un Número"),
            Referencia: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Mov = MovimientosValues(values);
                console.log("<<Movimientos>>", Mov);
                await AddOneMov(Mov);
                setMensajeExitoAlert("Movimiento creado y guardado Correctamente");
            } catch (e) {
                setMensajeErrorAlert("No se pudo crear el Movimiento");
                setMensajeExitoAlert(null);
            }
            setLoading(false);
        },
    });
    //propiedades comunes de los TextField
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={AddMovShowModal}
            onClose={() => setAddMovShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Movimiento</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: "flex", flexDirection: "column" }}
                    dividers
                >
                    {/* ComboBox dinámico para seleccionar el ID de Almacén */}
                    <FormControl
                        // Ajusta el ancho para ocupar todo el contenedor disponible
                        fullWidth
                        // Agrega un diseño más compacto con márgenes pequeños
                        margin="dense"
                        // Configura el estado de error según si el campo ha sido tocado y tiene errores
                        error={
                            formik.touched.IdAlmacenOK &&
                            Boolean(formik.errors.IdAlmacenOK)
                        }
                    >
                        {/* Etiqueta del campo */}
                        <InputLabel id="IdAlmacenOK-label">
                            ID Almacén*
                        </InputLabel>

                        {/* Select para mostrar las opciones del ComboBox */}
                        <Select
                            // ID del componente Select
                            id="IdAlmacenOK"
                            // Nombre del campo usado por Formik
                            name="IdAlmacenOK"
                            // Valor actual del campo, gestionado por Formik
                            value={formik.values.IdAlmacenOK}
                            // Maneja cambios en el valor del campo y actualiza el estado de Formik
                            onChange={formik.handleChange}
                            // Marca el campo como "tocado" al perder el foco
                            onBlur={formik.handleBlur}
                            // Vincula el Select con su etiqueta a través de este ID
                            labelId="IdAlmacenOK-label"
                            // Desactiva el campo si ya hay un mensaje de éxito
                            disabled={!!mensajeExitoAlert}
                        >
                            {/* Mapea las opciones del ComboBox dinámicamente */}
                            {comboOptions.map((option, index) => (
                                // Renderiza cada opción como un elemento de menú
                                <MenuItem key={index} value={option}>
                                    {option} {/* Texto visible de la opción */}
                                </MenuItem>
                            ))}
                        </Select>

                        {/* Mensaje de error si el campo es inválido */}
                        {formik.touched.IdAlmacenOK && formik.errors.IdAlmacenOK && (
                            <Typography
                                // Cambia el color del texto a rojo para indicar error
                                color="error"
                                // Usa un tamaño pequeño para el mensaje de error
                                variant="caption"
                            >
                                {formik.errors.IdAlmacenOK} {/* Texto del error */}
                            </Typography>
                        )}
                    </FormControl>


                    <TextField
                        id="CantidadMovto"
                        label="Cantidad Mov.*"
                        value={formik.values.CantidadMovto}
                        {...commonTextFieldProps}
                        error={
                            formik.touched.CantidadMovto &&
                            Boolean(formik.errors.CantidadMovto)
                        }
                        helperText={
                            formik.touched.CantidadMovto &&
                            formik.errors.CantidadMovto
                        }
                    />
                    <TextField
                        id="CantidadAnt"
                        label="Cantidad Ant.*"
                        value={formik.values.CantidadAnt}
                        {...commonTextFieldProps}
                        error={
                            formik.touched.CantidadAnt &&
                            Boolean(formik.errors.CantidadAnt)
                        }
                        helperText={
                            formik.touched.CantidadAnt && formik.errors.CantidadAnt
                        }
                    />
                    <TextField
                        id="CantidadAct"
                        label="Cantidad Act.*"
                        value={formik.values.CantidadAct}
                        {...commonTextFieldProps}
                        error={
                            formik.touched.CantidadAct &&
                            Boolean(formik.errors.CantidadAct)
                        }
                        helperText={
                            formik.touched.CantidadAct && formik.errors.CantidadAct
                        }
                    />
                    <TextField
                        id="IdClaseMovtoOK"
                        label="Clase Movimiento*"
                        value={formik.values.IdClaseMovtoOK}
                        {...commonTextFieldProps}
                        error={
                            formik.touched.IdClaseMovtoOK &&
                            Boolean(formik.errors.IdClaseMovtoOK)
                        }
                        helperText={
                            formik.touched.IdClaseMovtoOK &&
                            formik.errors.IdClaseMovtoOK
                        }
                    />
                    <TextField
                        id="Referencia"
                        label="Referencia*"
                        value={formik.values.Referencia}
                        {...commonTextFieldProps}
                        error={
                            formik.touched.Referencia &&
                            Boolean(formik.errors.Referencia)
                        }
                        helperText={
                            formik.touched.Referencia && formik.errors.Referencia
                        }
                    />
                </DialogContent>
                <DialogActions>
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
                        onClick={() => setAddMovShowModal(false)}
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

export default AddMovModal;
