export function EstatusVentaModel() {
    let EstatusVenta = {
      IdTipoEstatusOK: { type: String },
      Actual: { type: String }, // "S" o "N"
      Observacion: { type: String },
      detail_row: {
        FechaReg: { type: String }, // Fecha en formato ISO
        UsuarioReg: { type: String }, // Usuario que realizó el registro
      },
    };
    return EstatusVenta;
  }
  