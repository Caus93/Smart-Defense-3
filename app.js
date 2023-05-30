const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

checkbox1.addEventListener("change", () => {
  checkbox2.checked = checkbox1.checked ? false : checkbox2.checked;
});

checkbox2.addEventListener("change", () => {
  checkbox1.checked = checkbox2.checked ? false : checkbox2.checked;
});
