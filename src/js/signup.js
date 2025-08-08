//Código responsavel por Cadastro


function cadastrarUsuario(event) {
    event.preventDefault(); // proibi a página de atualizar

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
    window.location.href = "../html/index.html"; // redireciona para a página do jogo
}

document.getElementById('formCadastro').addEventListener('submit', cadastrarUsuario); // vincula a função ao botão

//Aparência 

// Declaração das variáveis

// Div onde mostra os erros e acertos
const enviado = document.getElementById("enviado");

// Apenas Letras Incluido
const apenasLetras = /^[A-Za-zÀ-ÿ\s]*$/;

// Declaração do input e texto - nome
const nome = document.getElementById("nome");
const textoNome = document.getElementById("textoNome");
let validNome = false;
nome.addEventListener('keyup', validarNome);

// Declaração do input e texto - email
const email = document.getElementById("email");
const textoEmail = document.getElementById("textoEmail");
let validEmail = false;
email.addEventListener('keyup', validarEmail);

const depoisArroba = email.value.substring(indiceArroba + 1);

// Declaração do input e texto - senha
const senha = document.getElementById("senha");
const textoSenha = document.getElementById("textoSenha");
let validSenha = false;
senha.addEventListener('keyup', validarSenha);

// Declaração do input e texto - confirmar senha
const confirmarSenha = document.getElementById("confirmar-senha");
const textoConfirmarSenha = document.getElementById("textoConfirmar-senha");
let validConfirmarSenha = false;
confirmarSenha.addEventListener('keyup', validarConfirmarSenha);

// Evento para informar se o nome está de acordo com o solicitado
function validarNome(){
    if (nome.value.trim() === ""){
        textoNome.style.color = "red";
        nome.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (!apenasLetras.test(nome.value)){
        textoNome.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, não insirá números."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    }
    else if (nome.value.trim().length <= 2){
        textoNome.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um nome maior que 2 letras."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (nome.value.trim() != "" && 
             nome.value.trim().length >= 3 &&
             apenasLetras.test(nome.value)) 
    {
        textoNome.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
        validNome = true;
    }
}


// Alerta depois do @
function validarEmail(){
    if (email.value.trim() === ""){
        textoEmail.style.color = "red";
        email.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (email.value.trim().length <= 5){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um email maior que 5 letras."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (!email.value.includes('@')){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "O email deve conter caractere '@'.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (depoisArroba === "") {
            textoEmail.style.color = "red";
            enviado.style.display = "block";
            enviado.innerHTML = "O email deve ter um domínio válido (ex.: exemplo@dominio.com).";
            enviado.style.background = "rgba(255, 175, 175, 1)";
            enviado.style.color = "rgba(14, 14, 14, 1)";
            enviado.style.border = "red";
    }
    else if (depoisArroba.indexOf('.') === -1) {
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "O domínio do email deve conter um ponto (ex.: dominio.com).";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    }
    else if (email.value.trim() != "" && 
             email.value.trim().length >= 6 &&
             email.value.includes('@')) 
    {
        textoEmail.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
    }
}

function validarSenha(){
    if (senha.value.trim() === ""){
        textoSenha.style.color = "red";
        senha.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } else if (senha.value.trim().length <= 2){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um nome maior que 2 letras."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (senha.value.trim() != "" && 
             senha.value.trim().length >= 3 ) 
    {
        textoSenha.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
    }
}

function validarConfirmarSenha(){
    if (confirmarSenha.value.trim() === ""){
        textoConfirmarSenha.style.color = "red";
        confirmarSenha.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } else if (confirmarSenha.value.trim().length <= 2){
        textoConfirmarSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um nome maior que 2 letras."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
    } 
    else if (confirmarSenha.value.trim() != "" && 
             confirmarSenha.value.trim().length >= 3 ) 
    {
        textoConfirmarSenha.style.color = "rgb(194, 247, 194)";
        enviado.style.display = "none";
    }
}

// Informar se o login é válido
function EnviarLogin(){
    // Mudar o nome
    if (nome.value === ""){
        // Texto do nome
        textoNome.style.color = "red";

        // Div com o resultado
        enviado.style.display = "block";
        enviado.innerHTML = "Os campos estão vazios, insira um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";

    } else {
        textoNome.style.color = "rgba(202, 254, 209, 1)";
        enviado.style.display = "none";
    }

    // Mudar o email
    if (email.value === ""){
        textoEmail.style.color = "red";
    } else {
        textoEmail.style.color = "green";
    }

    // Mudar a senha
    if (senha.value === ""){
        textoSenha.style.color = "red";
    } else {
        textoSenha.style.color = "green";
    }

    // Mudar a confirmação de senha
    if (confirmarSenha.value === ""){
        textoConfirmarSenha.style.color = "red";
    } else {
        textoConfirmarSenha.style.color = "green";
    }
}

function MudarLogin(){
   enviado.style.display = "block";
   enviado.innerHTML = "Carregando para aba de Login..."
}

function MudarCadastro(){
    enviado.style.display = "block";
    enviado.innerHTML = "Carregando para aba de Cadastro...";
}