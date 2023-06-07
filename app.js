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
    locale: {
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
    },
  });
};

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

  if (!isChecked) {
    isFormValid = false;
    console.log("Ningún checkbox seleccionado");
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
        text: `Nuestros abogados se estarán contactando con usted para el paso a seguir. `,
        timer: 3500,
      });
      setTimeout(() => {
        formDatosPerson.submit();
        formDatosViaje.submit();
      }, 3000);
    } else {
      Swal.fire({
        title: "Sus datos no han sido enviados",
        icon: "info",
        text: `Por favor continúe diligenciando los datos correspondientes`,
        confirmButtonColor: "green",
        timer: 3500,
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

const precioVuelo = document.getElementById("precioVuelo");
precioVuelo.addEventListener("input", validarNumero);

const precioAfectacion = document.getElementById("precioAfectacion");
precioAfectacion.addEventListener("input", validarNumero);

const idPasajero = document.getElementById("idPasajero");
idPasajero.addEventListener("input", validarNumero);

const celPasajero = document.getElementById("celPasajero");
celPasajero.addEventListener("input", validarNumero);

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

const nombrePasajero = document.getElementById("nombrePasajero");
nombrePasajero.addEventListener("keydown", validarLetras);

const apellidoPasajero = document.getElementById("apellidoPasajero");
apellidoPasajero.addEventListener("keydown", validarLetras);

const ciudadPasajero = document.getElementById("ciudadPasajero");
ciudadPasajero.addEventListener("keydown", validarLetras);
