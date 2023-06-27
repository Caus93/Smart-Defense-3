/* Checkbox */

const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

checkbox1.addEventListener("change", () => {
  checkbox2.checked = checkbox1.checked ? false : checkbox2.checked;
});

checkbox2.addEventListener("change", () => {
  checkbox1.checked = checkbox2.checked ? false : checkbox2.checked;
});

/* Fechas y horas */

const fechaVuelo = () => {
  $('input[name="fechaVuelo"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format("YYYY"), 10),
    timePicker: true,
    timePicker12Hour: true, // Establece el formato de 24 horas para la selección de la hora
    timePickerIncrement: 1, // Incremento en minutos para la selección de la hora
    locale: {
      format: "DD/MM/YYYY hh:mm A", // Formato de fecha y hora
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
    },
  });
};
/* YYYY-MM-DD hh:mm A */
$(document).ready(function () {
  fechaVuelo();
});

/* Form */

const btnSiguiente = document.getElementById("btn-siguiente");
const formDatosPerson = document.getElementById("form-datosPerson");
const formDatosViaje = document.getElementById("form-datosViaje");
const btnEnviar = document.getElementById("btn-enviar");
const btnAtras = document.getElementById("btn-atras");

btnSiguiente.addEventListener("click", (event) => {
  event.preventDefault();
  formDatosViaje.classList.add("d-none");
  formDatosPerson.classList.remove("d-none");
});

btnAtras.addEventListener("click", (event) => {
  event.preventDefault();
  formDatosViaje.classList.remove("d-none");
  formDatosPerson.classList.add("d-none");
});

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  if (!usuarioHaIniciadoSesion()) {
    Swal.fire({
      title:
        "Por favor, inicia sesión en Google antes de enviar los datos del formulario.",
      icon: "warning",
      confirmButtonColor: "red",
    });
    return;
  }

  const checkboxInputs = document.querySelectorAll(".checkbox-input");
  let isFormValid = true;
  let isChecked = false;

  checkboxInputs.forEach((input) => {
    if (input.checked) {
      isChecked = true;
    }
  });

  const validateInputs = document.querySelectorAll(".validate-input");
  validateInputs.forEach((input) => {
    if (input.value === "" && input.type !== "checkbox") {
      isFormValid = false;
      input.classList.add("validate-error");
      console.log("Campo vacío:", input);
    } else {
      input.classList.remove("validate-error");
    }
  });

  const validateSelects = document.querySelectorAll(".validate-select");
  validateSelects.forEach((select) => {
    if (select.selectedIndex === 0) {
      isFormValid = false;
      select.classList.add("validate-error");
      console.log("Seleccione una opción:", select);
    } else {
      select.classList.remove("validate-error");
    }
  });

  if (!isChecked) {
    isFormValid = false;
    console.log("Ningún checkbox seleccionado");
    checkboxInputs.forEach((input) => {
      input.classList.add("validate-error");
    });
  }

  if (!isFormValid) {
    Swal.fire({
      title: "Por favor, complete todos los campos requeridos.",
      icon: "warning",
      confirmButtonColor: "red",
    });
    return;
  }

  Swal.fire({
    title: "Está seguro de enviar los datos del formulario?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
    confirmButtonColor: "green",
    cancelButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Sus datos han sido enviados con exito!",
        icon: "success",
        confirmButtonColor: "green",
        text: `Nuestros abogados se estarán contactando con usted para el paso a seguir.`,
        timer: 3500,
      });
      enviarDatos();
      setTimeout(() => {
        formDatosPerson.submit();
        formDatosViaje.submit();
      }, 4000);
    } else {
      Swal.fire({
        title: "Sus datos no han sido enviados",
        icon: "info",
        text: `Por favor continúe diligenciando los datos correspondientes.`,
        confirmButtonColor: "green",
        timer: 50000,
      });
    }
  });
});

/* Validaciones Inputs */

const validarNumero = (event) => {
  const input = event.target;
  const valor = input.value.replace(/[^\d]/g, "");

  if (valor.length > 10 && event.key !== "Backspace") {
    input.value = valor.slice(0, 10);
    event.preventDefault();
  } else {
    input.value = valor;
  }
};

const validarLetras = (event) => {
  const input = event.target;
  const valor = input.value;

  if (
    (event.key < "a" || event.key > "z") &&
    (event.key < "A" || event.key > "Z") &&
    event.key !== "Backspace" &&
    event.key !== " "
  ) {
    event.preventDefault();
  }

  if (valor.length > 15 && event.key !== "Backspace") {
    event.preventDefault();
  }
};

const precioVuelo = document.getElementById("precioVuelo");
precioVuelo.addEventListener("input", validarNumero);

const precioAfectacion = document.getElementById("precioAfectacion");
precioAfectacion.addEventListener("input", validarNumero);

const idPasajero = document.getElementById("idPasajero");
idPasajero.addEventListener("input", validarNumero);

const celPasajero = document.getElementById("celPasajero");
celPasajero.addEventListener("input", validarNumero);

const nombrePasajero = document.getElementById("nombrePasajero");
nombrePasajero.addEventListener("keydown", validarLetras);

const apellidoPasajero = document.getElementById("apellidoPasajero");
apellidoPasajero.addEventListener("keydown", validarLetras);

const ciudadPasajero = document.getElementById("ciudadPasajero");
ciudadPasajero.addEventListener("keydown", validarLetras);

const emailPasajero = document.getElementById("emailPasajero");

const aeropuertoSalida = document.getElementById("aeropuertoSalida");

const aeropuertoDestino = document.getElementById("aeropuertoDestino");

const numeroVuelo = document.getElementById("numeroVuelo");

const fechaVueloInput = document.getElementById("fechaVuelo");

/* Función enviar datos */

async function enviarDatos() {
  const precioVueloNumero = parseFloat(precioVuelo.value);
  const precioAfectacionNumero = parseFloat(precioAfectacion.value);
  const idPasajeroNumero = parseFloat(idPasajero.value);
  const celPasajeroNumero = parseFloat(celPasajero.value);
  const fechaVueloSeleccionada = $('input[name="fechaVuelo"]')[0].value;

  const aerolinea = document.getElementById("aerolinea");
  const aerolineaSeleccionada =
    aerolinea.options[aerolinea.selectedIndex].textContent.trim();

  const causalNal = document.getElementById("causalNal");
  const causalNalSeleccionada =
    causalNal.options[causalNal.selectedIndex].textContent.trim();

  const causalIntl = document.getElementById("causalIntl");
  const causalIntlSeleccionada =
    causalIntl.options[causalIntl.selectedIndex].textContent.trim();

  const datosFormulario = {
    nombre: nombrePasajero.value,
    apellido: apellidoPasajero.value,
    ciudad: ciudadPasajero.value,
    email: emailPasajero.value,
    aeropuertoSalida: aeropuertoSalida.value,
    aeropuertoDestino: aeropuertoDestino.value,
    aerolinea: aerolineaSeleccionada,
    causalNal: causalNalSeleccionada,
    causalIntl: causalIntlSeleccionada,
    numeroVuelo: numeroVuelo.value,
    fechaVuelo: fechaVueloSeleccionada,
    precioVuelo: precioVueloNumero,
    precioAfectacion: precioAfectacionNumero,
    idPasajero: idPasajeroNumero,
    celPasajero: celPasajeroNumero,
  };

  const tipoVueloCheckbox = document.querySelectorAll(
    'input[name="checkboxGroup"]:checked'
  );
  const tipoVueloSeleccionado = Array.from(tipoVueloCheckbox).map(
    (checkbox) => checkbox.value
  );

  datosFormulario.tipoVuelo = tipoVueloSeleccionado.join(", ");
  datosFormulario.fechaVuelo = fechaVueloSeleccionada;

  console.log("Datos del formulario:", datosFormulario);

  try {
    // Obtener el ID consecutivo
    const idConsecutivo = await generarId();

    // Asignar el ID al objeto datosFormulario
    datosFormulario.id = idConsecutivo;

    // Almacenar los datos en el localStorage
    localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));

    // Agregar los datos al archivo de Google Sheets
    await agregarDatosSheet(datosFormulario);
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    // Manejo de errores al enviar los datos
    // Puedes mostrar un mensaje de error al usuario
    return;
  }
}

/* Tooltip */

let tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl, {
    template:
      '<div class="tooltip tooltip-blue" role="tooltip"><div class="tooltip-inner"></div></div>',
  });
});
