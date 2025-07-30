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
const enviado = document.getElementById("enviado");
function MudarLogin(){
   enviado.style.display = "block";
   enviado.innerHTML = "Carregando para aba de Login..."
}

function MudarCadastro(){
    enviado.style.display = "block";
    enviado.innerHTML = "Carregando para aba de Cadastro...";
}