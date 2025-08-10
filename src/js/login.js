//Código responsavel por login

function LoginUsuario(event) {
    event.preventDefault(); // proibi a página de atualizar

    // pega os valores do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha1').value;

    //recupera os dados do localstorage do cadastro.html
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    //faz a verificação do email e senha com o LocalStorage
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        alert(`Login bem-sucedido! Bem-vindo, ${usuario.nome}! Clique no OK para continuar`);
        // código para fazer depois que o login for bem sucedido
        setTimeout(() => {
        window.location.href = "../html/index.html";
    }, 1000);
    } else {
        //alera o limpa oque foi escrito depois 
        alert('Email ou senha incorretos!');
        document.getElementById('email').value = "";
        document.getElementById('senha1').value = "";
    }
}

//vinculação ao login.html
document.getElementById('formLogin').addEventListener('submit', LoginUsuario);

//parte responsavel por alterar e esconder ou exibir senha
document.getElementById('hidder').addEventListener('click', function () {
    const senhaInput = document.getElementById('senha1');
    const isPassword = senhaInput.type === 'password';
    senhaInput.type = isPassword ? 'text' : 'password'; //altera o tipo de input
    this.src = isPassword ? '../img/eyeopen.svg' : '../img/eyeclosed.svg'; //altera a imagem
});

// Aparência

// Declaração das variáveis

// Div onde mostra os erros e acertos
const enviado = document.getElementById("enviado");

// Apenas Letras Incluido
const apenasLetras = /^[A-Za-zÀ-ÿ\s]*$/;

// Pelo menos uma letra
const temLetra = /[A-Za-z]/; 

// Pelo menos um número
const temNumero = /\d/; 

// Pelo menos um caractere especial
const temCaractereEspecial = /[!@#$%^&*]/; 

// Apenas letras, números e caracteres especiais
const caracteresPermitidos = /^[A-Za-z\d!@#$%^&*]*$/; 

// Declaração do input e texto - email
const email = document.getElementById("email");
const textoEmail = document.getElementById("textoEmail");
let validEmail = false;
email.addEventListener('keyup', validarEmail);

// Declaração do input e texto - senha
const senha = document.getElementById("senha1");
const textoSenha = document.getElementById("textoSenha");
let validSenha = false;
senha.addEventListener('keyup', validarSenha);

function validarEmail(){
    const depoisArroba = email.value.substring(email.value.indexOf('@') + 1);
    const depoisPonto = email.value.substring(email.value.indexOf('.') + 1);

    if (email.value.trim() === ""){
        textoEmail.style.color = "red";
        email.value = "";
        enviado.style.display = "block";
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validEmail = false;
    } 
    else if (email.value.trim().length <= 5){
        textoEmail.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um email maior que 5 letras."
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
        enviado.innerHTML = "Não pode começar com espaço, <br> por favor digite um valor válido."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    } 
    else if (senha.value.trim().length <= 4){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, digite um nome maior que 4 letras.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    } 
    else if(!temLetra.test(senha.value)){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Insira ao menos uma letra."
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        validSenha = false;
    }
    else if(!temNumero.test(senha.value) && !temCaractereEspecial.test(senha.value)){
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Insira um número e/ou caractere especial <br> (ex.: @, -, !)."
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

// Informar se o login é válido
function EnviarLogin() {
    if (!validEmail || !validSenha) {
        textoEmail.style.color = "red";
        textoSenha.style.color = "red";
        enviado.style.display = "block";
        enviado.innerHTML = "Por favor, corrija os campos inválidos antes de enviar.";
        enviado.style.background = "rgba(255, 175, 175, 1)";
        enviado.style.color = "rgba(14, 14, 14, 1)";
        enviado.style.border = "red";
        return false; 
    }
    return true; 
}

// MUDAR COR DA DIV PRO ALERTA
function MudarCadastro(){
    enviado.style.display = "block";
    enviado.innerHTML = "Carregando para aba de Cadastro...";
}