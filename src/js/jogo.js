// Verifica se o usuário está logado
try {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado || !usuarioLogado.email) {
        alert('Você precisa estar logado para acessar o jogo!');
        window.location.href = "../html/login.html";
    }
} catch (e) {
    alert('Erro ao verificar login. Por favor, faça login novamente.');
    localStorage.removeItem('usuarioLogado'); // Limpa qualquer dado corrompido
    window.location.href = "../html/login.html";
}

// Variáveis principais
let palavraOriginal = '', palavraNormalizada = '', palavraVisivel = [];
let erros = 0, maxErros = 6;
let wins = localStorage.getItem('hangmanWins') ? parseInt(localStorage.getItem('hangmanWins')) : 0;
let losses = localStorage.getItem('hangmanLosses') ? parseInt(localStorage.getItem('hangmanLosses')) : 0;

// Referências DOM
const entradaEl = document.getElementById('entrada');
const botaoIniciar = document.getElementById('botao-iniciar');
const botaoLimpar = document.getElementById('botao-limpar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const botaoDesistir = document.getElementById('botao-desistir');
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const mostrarPalavraEl = document.getElementById('mostrar-palavra');
const contadorErrosEl = document.getElementById('contador-erros');
const mensagemJogoEl = document.getElementById('mensagem-jogo');
const tecladoEl = document.getElementById('teclado');
const overlay = document.getElementById('overlay');
const tituloResultado = document.getElementById('titulo-resultado');
const textoResultado = document.getElementById('texto-resultado');
const palavraFinal = document.getElementById('palavra-final');
const voltarInicio = document.getElementById('voltar-inicio');
const jogarNovamente = document.getElementById('jogar-novamente');
const canvas = document.getElementById('forca-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// Adiciona elemento para exibir pontuação
const pontuacaoEl = document.createElement('p');
pontuacaoEl.id = 'pontuacao';
pontuacaoEl.textContent = `Vitórias: ${wins} | Derrotas: ${losses}`;
document.getElementById('tela-jogo').insertBefore(pontuacaoEl, mostrarPalavraEl);

// Funções utilitárias
function normalizeStr(str) {
    return str.normalize("NFC"); // Mantém acentos intactos para comparação precisa
}
function showError(msg) {
    const el = document.getElementById('mensagem-erro');
    el.textContent = msg; el.style.display = 'block';
}
function hideError() {
    document.getElementById('mensagem-erro').style.display = 'none';
}
function atualizarExibicaoPalavra() {
    mostrarPalavraEl.textContent = palavraVisivel.join('');
}
function atualizarPontuacao() {
    pontuacaoEl.textContent = `Vitórias: ${wins} | Derrotas: ${losses}`;
    localStorage.setItem('hangmanWins', wins);
    localStorage.setItem('hangmanLosses', losses);
}

// Função para atualizar a hora
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `Hora ${hours}:${minutes}:${seconds}`;
    document.getElementById('hora').innerText = timeString;
}
updateTime();
setInterval(updateTime, 1000);

// Desenhar base da forca
function desenharForcaBase() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(250, 250);
    ctx.stroke();
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 50);
    ctx.stroke();
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 80);
    ctx.stroke();
}

// Desenhar partes do boneco
function desenharBoneco(erros) {
    if (!ctx) return;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    switch (erros) {
        case 1: // Cabeça
            ctx.beginPath();
            ctx.arc(200, 100, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: // Corpo
            ctx.beginPath();
            ctx.moveTo(200, 120);
            ctx.lineTo(200, 180);
            ctx.stroke();
            break;
        case 3: // Braço esquerdo
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(170, 160);
            ctx.stroke();
            break;
        case 4: // Braço direito
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(230, 160);
            ctx.stroke();
            break;
        case 5: // Perna esquerda
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(170, 210);
            ctx.stroke();
            break;
        case 6: // Perna direita
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(230, 210);
            ctx.stroke();
            break;
    }
}

// Eventos
entradaEl.addEventListener('dblclick', () => {
    if (entradaEl.type === 'password') {
        entradaEl.type = 'text';
    } else {
        entradaEl.type = 'password';
    }
});

botaoLimpar.addEventListener('click', () => {
    entradaEl.value = '';
    hideError();
    entradaEl.focus();
    entradaEl.type = 'password'; // Reseta para oculto ao limpar
});

botaoIniciar.addEventListener('click', () => {
    hideError();
    const raw = entradaEl.value.trim();
    if (!raw) { showError('Digite uma palavra ou frase!'); return; }
    const rawUpper = raw.toUpperCase();
    const normalized = normalizeStr(rawUpper);
    for (let i = 0; i < normalized.length; i++) {
        const ch = normalized[i];
        if (!(/[A-ZÀ-ÚÁÉÍÓÚÂÊÎÔÛÃÕÇ \-']/).test(ch)) {
            showError("Caracter inválido! Use letras com ou sem acento, espaços, - ou '");
            return;
        }
    }
    
    palavraOriginal = rawUpper;
    palavraNormalizada = normalized;
    palavraVisivel = [];
    let currentWord = '';
    for (let i = 0; i < palavraOriginal.length; i++) {
        if (palavraOriginal[i] === ' ') {
            palavraVisivel.push(currentWord);
            currentWord = '';
            palavraVisivel.push('   '); // Adiciona espaço de 3 dígitos
        } else if (palavraOriginal[i] === '-' || palavraOriginal[i] === "'") {
            currentWord += palavraOriginal[i];
        } else {
            currentWord += '_';
        }
    }
    if (currentWord) palavraVisivel.push(currentWord); // Adiciona a última palavra
    palavraVisivel = palavraVisivel.join('').split('');
    erros = 0;
    telaInicial.style.display = 'none';
    telaJogo.style.display = 'block';
    mensagemJogoEl.textContent = '';
    contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`;
    mostrarPalavraEl.textContent = palavraVisivel.join('');
    criarTeclado();
    botaoReiniciar.style.display = 'none';
    desenharForcaBase();
});

function criarTeclado() {
    tecladoEl.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÂÊÎÔÛÃÕÇ -'; // Adicionado travessão
    for (let i = 0; i < letras.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = letras[i];
        btn.dataset.letra = letras[i];
        btn.addEventListener('click', () => { adivinharLetra(btn) });
        tecladoEl.appendChild(btn);
    }
}

function adivinharLetra(btn) {
    const letra = btn.dataset.letra;
    btn.disabled = true;
    let encontrou = false;
    const letraNorm = normalizeStr(letra);
    for (let i = 0; i < palavraNormalizada.length; i++) {
        if (palavraNormalizada[i] === letraNorm && /[A-ZÀ-ÚÁÉÍÓÚÂÊÎÔÛÃÕÇ]/.test(palavraOriginal[i])) {
            let adjustedIndex = 0;
            let spaceCount = 0;
            for (let j = 0; j < i; j++) {
                if (palavraOriginal[j] === ' ') {
                    spaceCount++; // Conta quantos espaços foram encontrados antes
                }
            }
            // Ajusta o índice considerando que cada espaço adiciona 3 posições (" ")
            adjustedIndex = i + (spaceCount * 2); // Multiplica por 2 porque " " ocupa 3 posições, mas só ajustamos 2 a mais
            palavraVisivel[adjustedIndex] = palavraOriginal[i];
            encontrou = true;
        }
    }
    atualizarExibicaoPalavra();
    if (!encontrou && /[A-ZÀ-ÚÁÉÍÓÚÂÊÎÔÛÃÕÇ]/.test(letra)) {
        erros++;
        contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`;
        desenharBoneco(erros);
    }
    let venceu = !palavraVisivel.includes('_');
    if (venceu) terminarJogo(true);
    else if (erros >= maxErros) terminarJogo(false);
}

function terminarJogo(vitoria) {
    tecladoEl.querySelectorAll('button').forEach(b => b.disabled = true);
    botaoReiniciar.style.display = 'inline-block';
    if (vitoria) {
        tituloResultado.textContent = '🎉 Parabéns!';
        tituloResultado.className = 'win';
        textoResultado.textContent = 'Você acertou a palavra!';
        wins++;
    } else {
        tituloResultado.textContent = '😢 Que pena...';
        tituloResultado.className = 'lose';
        textoResultado.textContent = 'Você atingiu o número máximo de erros.';
        losses++;
    }
    palavraFinal.textContent = palavraOriginal;
    atualizarPontuacao();
    overlay.style.display = 'flex';
}

botaoReiniciar.addEventListener('click', reiniciarJogo);
botaoDesistir.addEventListener('click', () => { terminarJogo(false); });
voltarInicio.addEventListener('click', () => { 
    overlay.style.display = 'none'; 
    wins = 0; 
    losses = 0; 
    atualizarPontuacao(); 
    reiniciarJogo(); 
});
jogarNovamente.addEventListener('click', () => { 
    overlay.style.display = 'none'; 
    reiniciarJogo(); 
});

function reiniciarJogo() {
    palavraOriginal = ''; palavraNormalizada = ''; palavraVisivel = []; erros = 0;
    entradaEl.value = '';
    entradaEl.type = 'password'; // Reseta para oculto ao reiniciar
    telaJogo.style.display = 'none';
    telaInicial.style.display = 'block';
    mostrarPalavraEl.textContent = '';
    contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`;
    mensagemJogoEl.textContent = '';
    overlay.style.display = 'none';
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    tecladoEl.querySelectorAll('button').forEach(b => b.disabled = false);
    botaoReiniciar.style.display = 'none';
}

const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

function setActive(targetId){
  pages.forEach(p => p.classList.toggle('active', p.id === targetId));
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
  const el = document.getElementById(targetId);
  if(el) el.setAttribute('tabindex','-1'), el.focus();
}

navBtns.forEach(btn=>{
  btn.addEventListener('click',()=> setActive(btn.dataset.target));
});

function downloadCredits(){
  const text = [
    'Créditos do Projeto - jogo da forca',
    '=======================================',
    '',
    'Equipe:',
    '- Sofia Alves Figueredo — Telas de login e cadastro e página inicial (frontend)',
    '- Ludmila Souza Santiago — Backend e Frontend do jogo',
    '- Matheus Santos Rodrigues — Sistema de login e cadastro com local storage (BackEnd)',
    '- Yasmim Barbosa Lima — Backend e Frontend da página de créditos',
    '',
    'Agradecimentos:',
    '- Professor(a): Jonathan Toczek Souza',
    '- Instituição: Instituto Federal do Espírito Santo',
    '',
    'Lançamento: 25/10/2025'
  ].join('\n');

  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'creditos_projeto.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printCredits(){ window.print(); }

function copyToClipboard(){
  const el = document.querySelector('#final .game-info');
  if(!el) return alert('Elemento de créditos não encontrado.');
  const text = el.innerText;
  navigator.clipboard?.writeText(text).then(()=>{
    alert('Créditos copiados para a área de transferência!');
  }).catch(()=> alert('Não foi possível copiar automaticamente.'));
}

if(location.hash){
  const target = location.hash.replace('#','');
  if([...pages].some(p => p.id === target)) setActive(target);
}

// Função para logout
function logout() {
    localStorage.removeItem('usuarioLogado'); // Remove o usuário logado
    alert('Você foi desconectado!');
    window.location.href = "../html/login.html";
}

// Vincula o botão de logout
document.getElementById('botao-logout').addEventListener('click', logout);