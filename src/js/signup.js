//Código responsavel por Cadastro


function cadastrarUsuario(event) {
    event.preventDefault(); // proibi a página de atualizar

    // Executa as validações antes de prosseguir
    validarNome();
    validarEmail();
    validarSenha();
    validarConfirmarSenha();

    if (!validNome || !validEmail || !validSenha || !validConfirmarSenha) {
        EnviarLogin(); // Exibe mensagem de erro genérica
        return;
    }

    const nome = document.getElementById('nome').value.trim(); //pega o nome do formulário
    const email = document.getElementById('email').value.trim(); // pega o email do formulário
    const senha = document.getElementById('senha').value; //senha e confirmar senha
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // confere se senha e confirmar senha são iguais, se não for adiciona borda vermelha
    if (senha !== confirmarSenha) {
        const senhaInput = document.getElementById('senha');
        const confirmarInput = document.getElementById('confirmar-senha');

        senhaInput.style.border = "2px solid red";
        confirmarInput.style.border = "2px solid red";

        alert("As senhas não coincidem.");
        return;
    } else {
        document.getElementById('senha').style.border = "";
        document.getElementById('confirmar-senha').style.border = "";
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; //lista qyue armazena os usuarios no localStorage

    // Verifica se o nome ou email já estão cadastrados
    const duplicado = usuarios.find(user => user.nome === nome || user.email === email);

    if (duplicado) {
        alert("Nome ou Email já estão em uso!");
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario); //adiciona o novo usuário à lista de usuários e usa o JSON.stringfy para converter o objeto em uma string JSON
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log("Usuário cadastrado com sucesso!");
    window.location.href = "../html/jogo.html"; // redireciona para a página do jogo
    MudarLogin(); // Redireciona para o Login
}

document.getElementById('formCadastro').addEventListener('submit', cadastrarUsuario); // vincula a função ao botão

//Aparência 

// Declaração das variáveis

// Div onde mostra os erros e acertos
const enviado = document.getElementById("enviado");

// Regex para validações
const apenasLetras = /^[A-Za-zÀ-ÿ\s]*$/;
const temLetra = /[A-Za-z]/; 
const temNumero = /\d/; 
const temCaractereEspecial = /[!@#$%^&*]/; 

// Inputs e textos de feedback
const nome = document.getElementById("nome");
const textoNome = document.getElementById("textoNome");
let validNome = false;
nome.addEventListener('keyup', validarNome);

const email = document.getElementById("email");
const textoEmail = document.getElementById("textoEmail");
let validEmail = false;
email.addEventListener('keyup', validarEmail);

const senha = document.getElementById("senha");
const textoSenha = document.getElementById("textoSenha");
let validSenha = false;
senha.addEventListener('keyup', validarSenha);

const confirmarSenha = document.getElementById("confirmar-senha");
const textoConfirmarSenha = document.getElementById("textoConfirmar-senha");
let validConfirmarSenha = false;
confirmarSenha.addEventListener('keyup', validarConfirmarSenha);

// Funções de validação

function validarNome(){
    if (nome.value.trim() === ""){
        textoNome.style.color = "red";
        nome.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validNome = false;
    } 
    else if (!apenasLetras.test(nome.value)){
        textoNome.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, insirá apenas letras.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validNome = false;
    }
    else if (nome.value.trim().length <= 3){
        textoNome.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um nome maior que 3 letras.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validNome = false;
    } 
    else {
        textoNome.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
        validNome = true;
    }
}

function validarEmail(){
    const depoisArroba = email.value.substring(email.value.indexOf('@') + 1);
    const depoisPonto = email.value.substring(email.value.indexOf('.') + 1);

    if (email.value.trim() === ""){
        textoEmail.style.color = "red";
        email.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (email.value.trim().length <= 5){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um email maior que 5 letras.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (!email.value.includes('@')){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "O email deve conter caractere '@'.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (depoisArroba.trim() === "") {
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "O email deve ter um domínio válido. <br> (ex.: exemplo@dominio.com).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (depoisArroba.trim().length <= 2){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "O email deve ter um domínio maior que 2 letras. <br> (ex.: exemplo@dominio.com).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    }
    else if (!depoisArroba.includes('.')) {
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Um email deve ter um dominio válido. <br> (ex.: .com, .org, .net).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (depoisPonto.trim().length <= 2){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Digite um domínio maior que 2 letras. <br> (ex.: .com, .org, .net).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    }
    else {
        textoEmail.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
        validEmail = true;
    }
}

function validarSenha(){
    if (senha.value.trim() === ""){
        textoSenha.style.color = "red";
        senha.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    } 
    else if (senha.value.trim().length <= 4){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite uma senha maior que 4 caracteres.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    } 
    else if(!temLetra.test(senha.value)){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Insira ao menos uma letra.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    }
    else if(!temNumero.test(senha.value) && !temCaractereEspecial.test(senha.value)){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Insira um número e/ou caractere especial <br> (ex.: @, -, !).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    }
    else {
        textoSenha.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
        validSenha = true;
    }
}

function validarConfirmarSenha(){
    if (confirmarSenha.value.trim() === ""){
        textoConfirmarSenha.style.color = "red";
        confirmarSenha.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validConfirmarSenha = false;
    } else if (confirmarSenha.value != senha.value){
        textoConfirmarSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "As senhas diferem.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validConfirmarSenha = false;
    } 
    else {
        textoConfirmarSenha.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
        validConfirmarSenha = true;
    }
}

// Função corrigida para cadastrar o usuário
function cadastrarUsuario(event) {
    event.preventDefault(); // evita recarregar a página

    // Executa as validações para atualizar os flags
    validarNome();
    validarEmail();
    validarSenha();
    validarConfirmarSenha();

    if (!validNome || !validEmail || !validSenha || !validConfirmarSenha) {

        // Validação exclusiva do nome
        if (!validNome){
            textoNome.style.color = "red";
        } else {
            textoNome.style.color = "rgb(194, 247, 194)";
        }
        
         // Validação exclusiva do Email
        if (!validEmail){
            textoEmail.style.color = "red";
        } else {
            textoEmail.style.color = "rgb(194, 247, 194)";
        }
        
         // Validação exclusiva da Senha
        if (!validSenha){
            textoSenha.style.color = "red";
        } else {
            textoSenha.style.color = "rgb(194, 247, 194)";
        }
        
         // Validação exclusiva do Confirmar Senha
        if (!validConfirmarSenha){
            textoConfirmarSenha.style.color = "red";
        } else {
            textoConfirmarSenha.style.color = "rgb(194, 247, 194)";
        }

        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, corrija os campos inválidos antes de cadastrar.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        return; // interrompe o cadastro
    }

    const nomeValor = nome.value.trim();
    const emailValor = email.value.trim();
    const senhaValor = senha.value;
    const confirmarSenhaValor = confirmarSenha.value;

    // Confirma se senhas são iguais (segurança extra)
    if (senhaValor !== confirmarSenhaValor) {
        senha.style.border = "2px solid red";
        confirmarSenha.style.border = "2px solid red";
        alert("As senhas não coincidem.");
        return;
    } else {
        senha.style.border = "";
        confirmarSenha.style.border = "";
    }

    // Recupera usuários já cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica duplicidade de nome ou email
    const duplicado = usuarios.find(user => user.nome === nomeValor || user.email === emailValor);

    if (duplicado) {
        alert("Nome ou Email já estão em uso!");
        return;
    }

    // Cria novo usuário e salva
    const novoUsuario = {
        nome: nomeValor,
        email: emailValor,
        senha: senhaValor
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensagem de sucesso
    enviado.style.display = "block";
    enviado.style.background = "rgba(194, 247, 194, 1)";
    enviado.style.color = "rgba(14, 14, 14, 1)";
    enviado.style.border = "green";
    enviado.innerHTML = "Cadastro realizado com sucesso! Redirecionando para o jogo...";

    // Limpa campos
    nome.value = "";
    email.value = "";
    senha.value = "";
    confirmarSenha.value = "";

    // Redireciona após 2 segundos
    setTimeout(() => {
        window.location.href = "../html/jogo.html";
    }, 2000);
}

// Event listener para o formulário
document.getElementById('formCadastro').addEventListener('submit', cadastrarUsuario);

function MudarLogin(){
    // Mensagem de sucesso
    enviado.style.display = "block";
    enviado.style.background = "rgba(194, 247, 194, 1)";
    enviado.style.color = "rgba(14, 14, 14, 1)";
    enviado.style.border = "green";
    enviado.innerHTML = "Redirecionando para Login...";

    // Limpa campos
    nome.value = "";
    email.value = "";
    senha.value = "";
    confirmarSenha.value = "";

    // Redireciona após 2 segundos
    setTimeout(() => {
        window.location.href = "../html/login.html";
    }, 2000);
}
