//Código responsavel por Cadastro

function LoginUsuario(event) {
    event.preventDefault(); // proibi a página de atualizar

    // pega os valores do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    //recupera os dados do localstorage do cadastro.html
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    //faz a verificação do email e senha com o LocalStorage
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        alert(`Login bem-sucedido! Bem-vindo, ${usuario.nome}!`);
        // código para fazer depois que o login for bem sucedido
    } else {
        //alera o limpa oque foi escrito depois 
        alert('Email ou senha incorretos!');
        document.getElementById('email').value = ""
        document.getElementById('senha').value = ""
    }
}

//vinculação ao login.html
document.getElementById('formLogin').addEventListener('submit', LoginUsuario);