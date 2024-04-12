//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//Variaveis da Raquete
let xRaquete= 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosOpo = 0;

//Variaveis da Raquete Oponente
let xRaqueteOpo = 585;
let yRaqueteOpo = 150;
let velocidadeYOpo;


//Velocidade da Bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
 trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}




function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  // verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOpo, yRaqueteOpo);
  movimentaRaqueteOpo();
  bolinhaNaoFicaPresa();
  verificaColisaoRaquete(xRaqueteOpo, yRaqueteOpo);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
  
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}


function verificaColisao() {
  if(xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  } 
  if(yBolinha + raio > height ||
    yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
}
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
}
  yRaquete = constrain(yRaquete, 0, 310);
}



function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + compriRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    veloXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y) {
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
        velocidadeXBolinha *= -1;
  raquetada.play();
  }
}


function movimentaRaqueteOpo() {
   velocidadeYOpo = yBolinha - yRaqueteOpo - raqueteComprimento / 2 - 30;
  yRaqueteOpo += velocidadeYOpo + chanceDeErrar;
  calculaChanceDeErrar();
  
//  yRaqueteOpo = constrain(yRaqueteOpo, 0, 310);
  
//   if (keyIsDown(87)) {
//     yRaqueteOpo -= 10;
// }
//   if(keyIsDown(83)) {
//     yRaqueteOpo += 10;
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOpo, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOpo += 1;
    ponto.play();
  }
}

let chanceDeErrar = 0;

function calculaChanceDeErrar() {
  if (pontosOpo >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

