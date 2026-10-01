const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const pregunta = document.getElementById("pregunta");
const buttons = document.getElementById("buttons");
const pista = document.getElementById("pista");
const corazones = document.getElementById("corazones");

const COLORES_CORAZON = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#be123c"];

const MENSAJES_NO = [
  "¿Seguro? 🥺",
  "No podés 😭",
  "¡Nooo! 😭",
  "Intentá de nuevo 😈",
  "Ese botón no funciona 😂",
  "Mmm... no 😏",
  "Por acá tampoco 😭",
  "Pensalo bien 🥹",
  "Error 404: NO no encontrado 🤖"
];

const PISTAS = [
  "",
  "El verde es más lindo 👀",
  "Pista: el botón grande 💚",
  "Ya casi no entra el botón SÍ 😂",
  "Dale, apretá SÍ 🥺"
];

let escapes = 0;
let aceptado = false;
let lluviaIntervalo = null;

const aleatorio = (lista) => lista[Math.floor(Math.random() * lista.length)];


// ========================================
// ❤️ BOTÓN SÍ
// ========================================

btnSi.addEventListener("click", () => {
  if (aceptado) return;
  aceptado = true;

  pregunta.textContent = "Empieza lo mejor";
  pregunta.classList.add("respuesta");

  // Reemplazamos los botones por el mensaje final
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.innerHTML = '<span class="latido" aria-hidden="true">♥</span><span>Vos y yo, desde hoy</span><p class="dedicatoria">Lo que tanto esperamos se hizo realidad.<br>Te amo.</p>';
  buttons.replaceChildren(mensaje);
  pista.textContent = "";

  document.body.classList.add("accepted");

  // Explosión inicial + lluvia suave que sigue
  crearCorazones(30, 80);
  lluviaIntervalo = setInterval(() => crearCorazones(1), 700);

  // Vibración en celulares que lo soporten
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
});


// ========================================
// 😈 BOTÓN NO
// ========================================

function seSuperponen(a, b, margen = 15) {
  return !(
    a.right + margen < b.left ||
    a.left - margen > b.right ||
    a.bottom + margen < b.top ||
    a.top - margen > b.bottom
  );
}

function moverNo() {
  const margen = 20;
  const ancho = btnNo.offsetWidth;
  const alto = btnNo.offsetHeight;
  const maxX = Math.max(margen, window.innerWidth - ancho - margen);
  const maxY = Math.max(margen, window.innerHeight - alto - margen);
  const rectSi = btnSi.getBoundingClientRect();

  // Buscamos una posición que no tape el botón SÍ
  let x, y;
  for (let i = 0; i < 30; i++) {
    x = margen + Math.random() * (maxX - margen);
    y = margen + Math.random() * (maxY - margen);
    const rectNo = { left: x, top: y, right: x + ancho, bottom: y + alto };
    if (!seSuperponen(rectNo, rectSi)) break;
  }

  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
}

function escapar(event) {
  if (event) event.preventDefault();
  if (aceptado) return;

  escapes++;

  btnNo.classList.add("escapando");
  btnNo.textContent = aleatorio(MENSAJES_NO);

  // Cada vez que huye, el SÍ crece y el NO se achica un poquito
  const escalaSi = Math.min(1 + escapes * 0.12, 2.2);
  const escalaNo = Math.max(1 - escapes * 0.05, 0.6);
  btnSi.style.setProperty("--escala-si", escalaSi);
  btnNo.style.setProperty("--escala-no", escalaNo);

  pista.textContent = PISTAS[Math.min(Math.floor(escapes / 3), PISTAS.length - 1)];

  // Esperamos un frame para medir el tamaño con el texto nuevo
  requestAnimationFrame(moverNo);
}

btnNo.addEventListener("mouseenter", escapar);                       // PC
btnNo.addEventListener("touchstart", escapar, { passive: false });   // Celular
btnNo.addEventListener("click", escapar);                            // Teclado / por las dudas

// Si cambia el tamaño de la pantalla, que el NO no quede afuera
window.addEventListener("resize", () => {
  if (btnNo.classList.contains("escapando") && !aceptado) moverNo();
});


// ========================================
// ❤️ CREAR CORAZONES
// ========================================

function crearCorazones(cantidad, intervalo = 0) {
  // Límite para no saturar celulares viejos
  if (corazones.childElementCount > 80) return;

  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      const corazon = document.createElement("div");
      corazon.className = aceptado ? "corazon" : "corazon suave";
      corazon.textContent = "♥";
      corazon.style.color = aleatorio(COLORES_CORAZON);

      corazon.style.left = `${Math.random() * 100}%`;
      corazon.style.fontSize = `${14 + Math.random() * 22}px`;
      corazon.style.animationDuration = `${3 + Math.random() * 4}s`;
      corazon.style.setProperty("--deriva", `${(Math.random() - 0.5) * 120}px`);

      corazon.addEventListener("animationend", () => corazon.remove());
      corazones.appendChild(corazon);
    }, i * intervalo);
  }
}

// Unos poquitos corazones de fondo mientras decide 😏
const ambiente = setInterval(() => {
  if (aceptado) return clearInterval(ambiente);
  crearCorazones(1);
}, 1500);
