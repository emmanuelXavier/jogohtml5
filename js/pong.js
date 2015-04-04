var i = 10;
var j = 10;
var bi = 465;
var bj = 450;
var temporizador;
var limiteBottom = 480;
var limiteRight = 780;
var flagTop = true;
var flagLeft = true;
var score = 0;
var tempoMoveBarra;
var direcaoMoveBarra;
var inclinacao;
var limInfInclinacao = 1;
var limSupInclinacao = 9;
var nivelAtual;
var scoreNivel2 = 5;
var scoreNivel3 = 20;
var scoreWin = 200;
var bola      = document.getElementById('bola');
var barra     = document.getElementById('barra');
var pontuacao = document.getElementById('pontuacao');
var nivelText = document.getElementById('nivelText');

function iniciar(nivel) {
    if (nivel == 0) nivel = 2;
    topBola   = 10;
    leftBola  = 10;
    topBarra  = 470;
    leftBarra = 450;
    mudarNivel(nivel);
    limiteBottom = 480;
    limiteRight  = 780;
    flagTop  = true;
    flagLeft = true;
    score = 0;
    inclinacao = 5;
    bola.style.marginLeft  = leftBola + 'px';
    bola.style.marginTop   = topBola + 'px';
    barra.style.marginLeft = leftBarra + 'px';
    barra.style.marginTop  = topBarra + 'px';
    pontuacao.innerHTML = 'Pontuação:' + score;
    move();
}

function mudarNivel(nivelAtual) {
    temporizador = 50 - ((parseInt(nivelAtual) - 1) * 25);
    if (nivelAtual == 1) nivelText.innerText = 'Fácil';
    if (nivelAtual == 2) nivelText.innerText = 'Normal';
    if (nivelAtual == 3) nivelText.innerText = 'Difícil';
}

function move() {
    if (flagTop) topBola = topBola + 5;
    else topBola = topBola - 5;
    if (flagLeft) leftBola = leftBola + inclinacao;
    else leftBola = leftBola - inclinacao;
    bola.style.marginLeft = leftBola + 'px';
    bola.style.marginTop = topBola + 'px';
    if ((topBola + 20 >= topBarra) && (leftBola + 20 >= leftBarra) && (leftBola <= leftBarra + 170)) {
        flagTop = false;
        score = score + 1;
        if ((nivelAtual == 1) && (score == scoreNivel2)) {
            alert('Parabéns você mudou de nível.');
            mudarNivel(2);
        }
        if ((nivelAtual == 2) && (score == scoreNivel3)) {
            alert('Parabéns você mudou de nível.');
            mudarNivel(3);
        }
        if (score == scoreWin) {
            alert('Parabéns você ganhou o jogo.');
            return;
        }
        pontuacao.innerHTML = 'Pontuação:' + score;
        if (new Date().getTime() - tempoMoveBarra <= 500) {
            if (flagLeft) {
                if (direcaoMoveBarra == 'D') {
                    inclinacao += 4;
                    if (inclinacao > limSupInclinacao) inclinacao = limSupInclinacao;
                }
                if (direcaoMoveBarra == 'E') {
                    inclinacao -= 4;
                    if (inclinacao < limInfInclinacao) inclinacao = limInfInclinacao;
                }
            } else {
                if (direcaoMoveBarra == 'D') {
                    inclinacao -= 4;
                    if (inclinacao < limInfInclinacao) inclinacao = limInfInclinacao;
                }
                if (direcaoMoveBarra == 'E') {
                    inclinacao += 4;
                    if (inclinacao > limSupInclinacao) inclinacao = limSupInclinacao;
                }
            }
        }
        //muda a direção da bola caso a mesma bata no canto esquerdo
        if ((topBola + 20 >= topBarra) && (leftBola + 20 >= leftBarra) && (leftBola <= leftBarra + 10)) {
            flagLeft = false;
            inclinacao = 5;
        }
        //muda a direção da bola caso a mesma bata no canto direito
        if ((topBola + 20 >= topBarra) && (leftBola >= leftBarra + 140) && (leftBola <= leftBarra + 170)) {
            flagLeft = true;
            inclinacao = 5;
        }
    }
    if (topBola >= limiteBottom) {
        pontuacao.innerHTML = 'GAME OVER';
        return;
        flagTop = false;
    }
    if (leftBola >= limiteRight) {
        flagLeft = false;
    }
    if (topBola <= 0) {
        flagTop = true;
    }
    if (leftBola <= 0) {
        flagLeft = true;
    }
    setTimeout("move()", temporizador);
}

document.onkeydown = function(e) {
    var sizeBarra = 150;
    var widthTela = 800;
    if ((e.which == 65) || (e.which == 37)) {
        direcaoMoveBarra = 'E';
        tempoMoveBarra = new Date().getTime();
        leftBarra = leftBarra - (100 - temporizador);
        if (leftBarra < 0) leftBarra = 0;
        barra.style.marginLeft = leftBarra + 'px';
    }
    if ((e.which == 68) || (e.which == 39)) {
        direcaoMoveBarra = 'D';
        tempoMoveBarra = new Date().getTime();
        leftBarra = leftBarra + 100 - temporizador;
        if (leftBarra + sizeBarra > widthTela) leftBarra = widthTela - sizeBarra;
        barra.style.marginLeft = leftBarra + 'px';
    }
}

function stEsquerda() {
    var sizeBarra = 150;
    var widthTela = 800;
    direcaoMoveBarra = 'E';
    tempoMoveBarra = new Date().getTime();
    leftBarra = leftBarra - (100 - temporizador);
    if (leftBarra < 0) leftBarra = 0;
    barra.style.marginLeft = leftBarra + 'px';
}

function stDireita() {
    var sizeBarra = 150;
    var widthTela = 800;
    direcaoMoveBarra = 'D';
    tempoMoveBarra = new Date().getTime();
    leftBarra = leftBarra + 100 - temporizador;
    if (leftBarra + sizeBarra > widthTela) leftBarra = widthTela - sizeBarra;
    barra.style.marginLeft = leftBarra + 'px';
}

if (screen.width == "800") {
    visivil = true;
    window.resizeTo(800, 600);
}