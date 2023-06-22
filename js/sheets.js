let arrayInfo = [];

localStorage.getItem("datosFormulario")
  ? (arrayInfo = JSON.parse(localStorage.getItem("datosFormulario")))
  : ((arrayInfo = []),
    localStorage.setItem("datosFormulario", JSON.stringify(arrayInfo)));

async function agregarDatosSheet(datos) {
  const aerolineaSeleccionada =
    aerolinea.options[aerolinea.selectedIndex].textContent;
  const causalNalSeleccionada =
    causalNal.options[causalNal.selectedIndex].textContent;
  const causalIntlSeleccionada =
    causalIntl.options[causalIntl.selectedIndex].textContent;
  const update = [
    datos.id,
    datos.aeropuertoSalida,
    datos.aeropuertoDestino,
    datos.tipoVuelo,
    aerolineaSeleccionada,
    causalNalSeleccionada,
    causalIntlSeleccionada,
    datos.numeroVuelo,
    datos.fechaVuelo,
    datos.precioVuelo,
    datos.precioAfectacion,
    datos.nombre,
    datos.apellido,
    datos.idPasajero,
    datos.email,
    datos.celPasajero,
    datos.ciudad,
  ];

  // Realizar la solicitud de actualización de datos en el archivo de Google Sheets
  const response = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: "12Y1J7SBNm_Xg9R6YHC1PyMecr-XtlX0O8lBamN4urM8",
    range: "informacion_clientes!A:N",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [update],
    },
  });

  console.log("Datos agregados al archivo de Google Sheets:", response);
}

async function generarId() {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "12Y1J7SBNm_Xg9R6YHC1PyMecr-XtlX0O8lBamN4urM8",
    range: "informacion_clientes!A:A",
    majorDimension: "COLUMNS",
  });

  const data = response.result.values;

  let id = 1;

  if (data && data.length > 0) {
    const columnValues = data[0];
    const maxId = Math.max(...columnValues.filter((value) => !isNaN(value)));

    if (!isNaN(maxId) && maxId >= 1) {
      id = maxId + 1;
    }
  }

  return id;
}
