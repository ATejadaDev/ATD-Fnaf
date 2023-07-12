"use strict";

// Variables de configuración
const nivelIA = 20; // Nivel de IA, se deberá cambiar con un input
let salaAnimatronico = 1; // Sala inicial del animatrónico
let timerId; // Variable global para apagar el intervalo en gameover y victoria

///////////////////////////// Salas del juego
const salasAdyacentes = {
  1: [2],
  2: [3, 4, 6],
  3: [2, 5],
  4: [2, 7],
  5: [3, 8, 6],
  6: [5, 2, 7, 10],
  7: [4, 6, 9],
  8: [5, 10],
  9: [7, 10],
};

///////////////////////// Puertas. Izquierda = puertas[0], centro = puertas[1], derecha = puertas[2];
let puertas = [false, false, false];

///////////////////////// Generador de números
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

///////////////////////// Calculo de movimiento segun nivel de IA:
function calcularIntervalo(nivelIA) {
  if (nivelIA >= 1 && nivelIA <= 5) {
    return 12000;
  } else if (nivelIA >= 6 && nivelIA <= 10) {
    return 10000;
  } else if (nivelIA >= 11 && nivelIA <= 15) {
    return 8000;
  } else return 5000;
}

// Movimiento
function movimiento() {
  const intervalo = calcularIntervalo(nivelIA);
  const numeroAleatorioActual = generarNumeroAleatorio(1, 20);
  if (numeroAleatorioActual <= nivelIA) {
    const salasDisponibles = salasAdyacentes[salaAnimatronico];
    let nuevaSala;

    // Si está en la sala 8, 6 o 9, el animatronico puede intentar entrar a la sala 10.
    if ([8, 6, 9].includes(salaAnimatronico)) {
      // Si la puerta correspondiente está abierta, el animatronico se moverá a la sala 10.
      if (
        (salaAnimatronico === 8 && puertas[0] === false) ||
        (salaAnimatronico === 6 && puertas[1] === false) ||
        (salaAnimatronico === 9 && puertas[2] === false)
      ) {
        nuevaSala = 10;
      }
      // Si la puerta correspondiente está cerrada, el animatronico se moverá a una sala adyacente aleatoria (excepto la 10).
      else {
        do {
          nuevaSala =
            salasDisponibles[
              generarNumeroAleatorio(0, salasDisponibles.length - 1)
            ];
        } while (nuevaSala === 10);
      }
    }
    // Si está en cualquier otra sala, el animatronico simplemente se moverá a una sala adyacente aleatoria (excepto la 10).
    else {
      do {
        nuevaSala =
          salasDisponibles[
            generarNumeroAleatorio(0, salasDisponibles.length - 1)
          ];
      } while (nuevaSala === 10);
    }

    salaAnimatronico = nuevaSala;
    console.log(
      `El animatronico se ha movido a la sala ${nuevaSala}, el nivel de IA es de ${nivelIA} y el intervalo es de ${intervalo}`
    );
    // Comprobamos si el juego ha terminado.
    if (salaAnimatronico === 10) {
      gameOver();
      return;
    }
  } else {
    console.log(`No ha habido movimiento`);
  }
  timerId = setTimeout(movimiento, intervalo);
}

// Función que se llama cuando se dan las condiciones de perder
function gameOver() {
  clearTimeout(timerId);
  console.log("Game Over!");
}

movimiento();
