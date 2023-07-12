"use strict";

// Variables de configuración
const nivelIA = 4; // Nivel de IA, se deberá cambiar con un input
let salaAnimatronico = 1; // Sala inicial del animatrónico
salaAnimatronico === 10 ? gameOver() : null; // Condición de Game Over

// Salas del juego
const salasAdyacentes = {
  1: [2],
  2: [3, 4, 6],
  3: [2, 5],
  4: [2, 7],
  5: [3, 8, 6],
  6: [5, 2, 7],
  7: [4, 6, 9],
  8: [5],
  9: [7],
};

// Generador de números
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Calculo de movimiento segun nivel de IA:
function calcularIntervalo(nivelIA) {
  if (nivelIA >= 1 && nivelIA <= 5) {
    return 8000;
  } else if (nivelIA >= 6 && nivelIA <= 10) {
    return 6000;
  } else if (nivelIA >= 11 && nivelIA <= 15) {
    return 4000;
  } else return 2000;
}

// Movimiento
function movimiento() {
  const intervalo = calcularIntervalo(nivelIA);
  const numeroAleatorioActual = generarNumeroAleatorio(1, 20);
  if (numeroAleatorioActual <= nivelIA) {
    const salasDisponibles = salasAdyacentes[salaAnimatronico];
    const nuevaSala =
      salasDisponibles[generarNumeroAleatorio(0, salasDisponibles.length - 1)];
    salaAnimatronico = nuevaSala;

    console.log(
      `El animatronico se ha movido a la sala ${nuevaSala}, el nivel de IA es de ${nivelIA} y el intervalo es de ${intervalo}`
    );
  } else {
    console.log(`No ha habido movimiento`);
  }
  setTimeout(movimiento, intervalo);
}

movimiento();
