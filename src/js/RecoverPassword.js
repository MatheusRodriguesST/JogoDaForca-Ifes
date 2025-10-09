// recuperar.js

// Declaração do input e texto - email
const email = document.getElementById("email");
const textoEmail = document.getElementById("textoEmail");
const enviado = document.getElementById("enviado");
let validEmail = false;

email.addEventListener('keyup', validarEmail);

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

// Enviar Email
function EnviarEmail(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    if (!validEmail) {
        return;
    }
    // Mensagem de sucesso
    enviado.style.display = "block";
    enviado.style.background = "rgba(194, 247, 194, 1)";
    enviado.style.color = "rgba(14, 14, 14, 1)";
    enviado.style.border = "green";
    enviado.innerHTML = "Enviando Email...";

    // Limpa campos
    email.value = "";
}

// Anexa o evento de submit ao formulário
const formRecuperar = document.getElementById("formRecuperar");
formRecuperar.addEventListener('submit', EnviarEmail);