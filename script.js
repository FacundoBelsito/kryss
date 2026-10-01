const form = document.getElementById("codeForm");
const codigoInput = document.getElementById("codigo");
const boton = form.querySelector("button");
const error = document.getElementById("error");
const candado = document.querySelector(".candado");

const CODIGO_CORRECTO = "15092222";
const TIEMPO_BLOQUEO = 3000; // ms que dura el "modo intruso"

let intentos = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const codigoIngresado = codigoInput.value.trim();

  // Campo vacío: aviso suave, sin el efecto de "intruso"
  if (codigoIngresado === "") {
    codigoInput.classList.add("vacio");
    codigoInput.focus();
    setTimeout(() => codigoInput.classList.remove("vacio"), 500);
    return;
  }

  if (codigoIngresado === CODIGO_CORRECTO) {
    // Guardamos que el código fue correcto para que bienvenido.html
    // no se pueda abrir directamente sin pasar por acá
    try { sessionStorage.setItem("kryss-desbloqueado", "1"); } catch (e) {}

    candado.textContent = "🔓";
    document.body.classList.add("unlocked");
    boton.disabled = true;
    codigoInput.disabled = true;

    setTimeout(() => {
      window.location.href = "bienvenido.html";
    }, 900);
    return;
  }

  // Código incorrecto
  intentos++;
  error.textContent =
    intentos > 2
      ? "ERROR: CÓDIGO INCORRECTO. ¿OTRA VEZ VOS? 🤨"
      : "ERROR: CÓDIGO INCORRECTO. FUERA INTRUSO";

  document.body.classList.add("broken");
  codigoInput.disabled = true;
  boton.disabled = true;

  // Después de unos segundos se puede volver a intentar
  // (por si fue un error de tipeo)
  setTimeout(() => {
    document.body.classList.remove("broken");
    error.textContent = "";
    codigoInput.disabled = false;
    boton.disabled = false;
    codigoInput.value = "";
    codigoInput.focus();
  }, TIEMPO_BLOQUEO);
});
