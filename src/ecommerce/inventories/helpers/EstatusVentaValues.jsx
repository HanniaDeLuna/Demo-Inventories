import { EstatusVentaModel } from "../models/EstatusVentaModel";

export const EstatusVentaValues = (values) => {
  let estatusVenta = EstatusVentaModel();

  estatusVenta.IdTipoEstatusOK = values.IdTipoEstatusOK;
  estatusVenta.Actual = values.Actual;
  estatusVenta.Observacion = values.Observacion;
  estatusVenta.detail_row = {
    FechaReg: values.FechaReg,
    UsuarioReg: values.UsuarioReg,
  };

  return estatusVenta;
};
