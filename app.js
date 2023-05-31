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
