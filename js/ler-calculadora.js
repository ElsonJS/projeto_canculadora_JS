'use strict';

const display = document.getElementById('cal-display');
const numeros = document.querySelectorAll('[id*=bnt]');
const operadores = document.querySelectorAll('[id*=op]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
};

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
    document.querySelector('#igual').focus();
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.'));
    }
};
operadores.forEach((operador) =>
    operador.addEventListener('click', selecionarOperador)
);

const ativarIgual = () => {
    calcular();
    operador = undefined;
};
document.getElementById('igual').addEventListener('click', ativarIgual);

const delDisplay = () => (display.textContent = '');
document
    .getElementById('delDisplay')
    .addEventListener('click', delDisplay);

const limparCalculo = () => {
    delDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('delCalculo')
    .addEventListener('click', limparCalculo);

const removerUltimoNumero = () =>
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    0: 'bnt0',
    1: 'bnt1',
    2: 'bnt2',
    3: 'bnt3',
    4: 'bnt4',
    5: 'bnt5',
    6: 'bnt6',
    7: 'bnt7',
    8: 'bnt8',
    9: 'bnt9',
    '/': 'opDividir',
    '*': 'opMultiplicar',
    '-': 'opSubtrair',
    '+': 'opSoma',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'delDisplay',
    Escape: 'delCalculo',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);