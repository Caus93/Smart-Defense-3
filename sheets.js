let datosForm;

async function getInfoFormSheet() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1b1eauWs87c3uyCHYGYLC2Tv2_ByA6bW3YgPNf-NCcxU",
      range: "informacion_clientes!A:N",
    });
  } catch (err) {
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    console.warn("No se encontraron valores");
    return;
  }

  datosForm = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoForm = {
      id: fila[0],
      aeropuertoSalida: fila[1],
      aeropuertoDestino: fila[2],
      tipoVuelo: fila[3],
      aerolinea: fila[4],
      numeroVuelo: fila[5],
      fechaVuelo: fila[6],
      precioVuelo: fila[7],
      precioAfectacion: fila[8],
      nombrePasajero: fila[9],
      apellidoPasajero: fila[10],
      idPasajero: fila[11],
      emailPasajero: fila[12],
      celPasajero: fila[13],
      ciudadPasajero: fila[14],
    };
    arrayInfo.push(nuevoForm);
  });
  console.log(arrayInfo);
}

let arrayInfo = [];

localStorage.getItem("datosFormulario")
  ? (arrayInfo = JSON.parse(localStorage.getItem("datosFormulario")))
  : ((arrayInfo = []),
    localStorage.setItem("datosFormulario", JSON.stringify(arrayInfo)));

async function agregarDatosSheet(arrayInfo) {
  const update = [
    arrayInfo.id,
    arrayInfo.aeropuertoSalida,
    arrayInfo.aeropuertoDestino,
    arrayInfo.tipoVuelo,
    arrayInfo.aerolinea,
    arrayInfo.numeroVuelo,
    arrayInfo.fechaVuelo,
    arrayInfo.precioVuelo,
    arrayInfo.precioAfectacion,
    arrayInfo.nombrePasajero,
    arrayInfo.apellidoPasajero,
    arrayInfo.idPasajero,
    arrayInfo.emailPasajero,
    arrayInfo.celPasajero,
    arrayInfo.ciudadPasajero,
  ];
  console.log(update);
  const filaAEditar = parseInt(arrayInfo.id) + 1;
  const response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: "1b1eauWs87c3uyCHYGYLC2Tv2_ByA6bW3YgPNf-NCcxU",
    range: `informacion_clientes!A${filaAEditar}:N${filaAEditar}`,
    values: [update],
    valueInputOption: "USER_ENTERED",
  });
  return response;
}

/*     dat.id,
    dat.aeropuertoSalida,
    dat.aeropuertoDestino,
    dat.tipoVuelo,
    dat.aerolinea,
    dat.numeroVuelo,
    dat.fechaVuelo,
    dat.precioVuelo,
    dat.precioAfectacion,
    dat.nombrePasajero,
    dat.apellidoPasajero,
    dat.idPasajero,
    dat.emailPasajero,
    dat.celPasajero,
    dat.ciudadPasajero, */
