const form = document.getElementById("codeForm");
const codigoInput = document.getElementById("codigo");
const error = document.getElementById("error");

const CODIGO_CORRECTO = "15092222";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const codigoIngresado = codigoInput.value.trim();

  if (codigoIngresado === CODIGO_CORRECTO) {

    // Código correcto
    window.location.href = "bienvenido.html";

  } else {

    // Código incorrecto
    error.textContent = "ERROR: CÓDIGO INCORRECTO. FUERA INTRUSO";

    document.body.classList.add("broken");

    codigoInput.disabled = true;
    form.querySelector("button").disabled = true;
  }
});
