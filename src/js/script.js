// Variáveis principais
let palavraOriginal = '', palavraNormalizada = '', palavraVisivel = [];
let erros = 0, maxErros = 6;

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

// Funções utilitárias
function normalizeStr(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function showError(msg){
    const el = document.getElementById('mensagem-erro');
    el.textContent = msg; el.style.display = 'block';
}
function hideError(){
    document.getElementById('mensagem-erro').style.display = 'none';
}

// Eventos
botaoLimpar.addEventListener('click', ()=>{
    entradaEl.value=''; hideError(); entradaEl.focus();
});

botaoIniciar.addEventListener('click', ()=>{
    hideError();
    const raw = entradaEl.value.trim();
    if(!raw){ showError('Digite uma palavra ou frase!'); return; }
    const rawUpper = raw.toUpperCase();
    const normalized = normalizeStr(rawUpper);
    for(let i=0;i<normalized.length;i++){
        const ch = normalized[i];
        if(!(/[A-Z \-']/).test(ch)){
            showError("Caracter inválido! Use letras, espaços, - ou '");
            return;
        }
    }
    
    palavraOriginal = rawUpper;
    palavraNormalizada = normalized;
    palavraVisivel = [];
    for(let i=0;i<palavraOriginal.length;i++){
        if(palavraOriginal[i] === ' ') palavraVisivel[i] = ' ';
        else if (palavraOriginal[i] === '-' || palavraOriginal[i] === "'") palavraVisivel[i] = palavraOriginal[i];
        else palavraVisivel[i] = '_';
    }
    erros = 0;
    telaInicial.style.display = 'none';
    telaJogo.style.display = 'block';
    mensagemJogoEl.textContent='';
    contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`;
    mostrarPalavraEl.textContent = palavraVisivel.join(' ');
    criarTeclado();
    botaoReiniciar.style.display = 'none';
});

function criarTeclado(){
    tecladoEl.innerHTML = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÂÊÔÃÕÇ';
    for(let i=0;i<letras.length;i++){
        const btn = document.createElement('button');
        btn.textContent = letras[i];
        btn.dataset.letra = letras[i];
        btn.addEventListener('click', ()=>{adivinharLetra(btn)});
        tecladoEl.appendChild(btn);
    }
}

function adivinharLetra(btn){
    const letra = btn.dataset.letra; btn.disabled = true;
    let encontrou = false;
    const letraNorm = normalizeStr(letra);
    for(let i=0;i<palavraNormalizada.length;i++){
        if(palavraNormalizada[i] === letraNorm){
            palavraVisivel[i] = palavraOriginal[i];
            encontrou = true;
        }
    }
    mostrarPalavraEl.textContent = palavraVisivel.join(' ');
    if(!encontrou){ erros++; contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`; }
    let venceu = !palavraVisivel.includes('_');
    if(venceu) terminarJogo(true);
    else if(erros >= maxErros) terminarJogo(false);
}

function terminarJogo(vitoria){
    tecladoEl.querySelectorAll('button').forEach(b=>b.disabled=true);
    botaoReiniciar.style.display = 'inline-block';
    if(vitoria){
        tituloResultado.textContent = '🎉 Parabéns!';
        tituloResultado.className = 'win';
        textoResultado.textContent = 'Você acertou a palavra!';
    } else {
        tituloResultado.textContent = '😢 Que pena...';
        tituloResultado.className = 'lose';
        textoResultado.textContent = 'Você atingiu o número máximo de erros.';
    }
    palavraFinal.textContent = palavraOriginal;
    overlay.style.display = 'flex';
}

botaoReiniciar.addEventListener('click', reiniciarJogo);
botaoDesistir.addEventListener('click', ()=>{ terminarJogo(false); });
voltarInicio.addEventListener('click', ()=>{ overlay.style.display = 'none'; reiniciarJogo(); });
jogarNovamente.addEventListener('click', ()=>{ overlay.style.display = 'none'; reiniciarJogo(); });

function reiniciarJogo(){
    palavraOriginal = ''; palavraNormalizada = ''; palavraVisivel = []; erros = 0;
    entradaEl.value = '';
    telaJogo.style.display = 'none';
    telaInicial.style.display = 'block';
    mostrarPalavraEl.textContent = '';
    contadorErrosEl.textContent = `Erros: ${erros}/${maxErros}`;
    mensagemJogoEl.textContent = '';
    overlay.style.display = 'none';
}