
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");

const pregunta = document.getElementById("pregunta");
const buttons = document.getElementById("buttons");

const corazones = document.getElementById("corazones");


// ========================================
// ❤️ BOTÓN SÍ
// ========================================

btnSi.addEventListener("click", () => {

  // Cambiamos el mensaje principal
  pregunta.innerHTML = "SABÍA QUE IBAS A DECIR QUE SÍ 😍❤️";

  // Cambiamos los botones por el mensaje
  buttons.innerHTML = `
    <div class="mensaje">
      Ahora somos novios 🥰❤️
    </div>
  `;

  // Cambiamos el fondo
  document.body.classList.add("accepted");

  // Lanzamos los corazones
  crearCorazones();

});


// ========================================
// 😈 BOTÓN NO
// ========================================

function escapar() {

  // El botón pasa a posición fija
  btnNo.style.position = "fixed";

  // Espacio disponible
  const maxX =
    window.innerWidth -
    btnNo.offsetWidth -
    20;

  const maxY =
    window.innerHeight -
    btnNo.offsetHeight -
    20;

  // Posición aleatoria
  const randomX =
    Math.max(
      20,
      Math.random() * maxX
    );

  const randomY =
    Math.max(
      20,
      Math.random() * maxY
    );

  // Movemos el botón
  btnNo.style.left = `${randomX}px`;

  btnNo.style.top = `${randomY}px`;


  // Mensajes aleatorios
  const mensajes = [
    "NO 😢",
    "¿Seguro? 🥺",
    "No podés 😭",
    "¡Nooo! 😭",
    "Intentá de nuevo 😈",
    "Ese botón no funciona 😂",
    "Mmm... no 😏",
    "Por acá tampoco 😭"
  ];

  btnNo.textContent =
    mensajes[
      Math.floor(
        Math.random() * mensajes.length
      )
    ];
}


// PC
btnNo.addEventListener(
  "mouseenter",
  escapar
);


// Celular
btnNo.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

    escapar();

  }
);


// ========================================
// ❤️ CREAR CORAZONES
// ========================================

function crearCorazones() {

  const cantidad = 40;

  for (let i = 0; i < cantidad; i++) {

    setTimeout(() => {

      const corazon =
        document.createElement("div");

      corazon.classList.add("corazon");

      // Diferentes corazones
      const tipos = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💘"
      ];

      corazon.textContent =
        tipos[
          Math.floor(
            Math.random() * tipos.length
          )
        ];


      // Posición horizontal aleatoria
      corazon.style.left =
        `${Math.random() * 100}%`;


      // Tamaño aleatorio
      const tamaño =
        20 + Math.random() * 30;

      corazon.style.fontSize =
        `${tamaño}px`;


      // Duración aleatoria
      const duracion =
        3 + Math.random() * 4;

      corazon.style.animationDuration =
        `${duracion}s`;


      // Lo agregamos
      corazones.appendChild(corazon);


      // Lo eliminamos después
      setTimeout(() => {

        corazon.remove();

      }, duracion * 1000);


    }, i * 100);

  }
}
