//Código responsavel por Cadastro

function cadastrarUsuario(formId) {
    // obtém o formulario id para pegar as informações
    const form = document.getElementById(formId);
    
    // coleta dados
    const formData = new FormData(form);
    const novoUsuario = {};
    formData.forEach((valor, chave) => {
        novoUsuario[chave] = valor;
    });

    // carrega os dados ou cria um vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // essa constante faz a verificação passando todos os dados para minusculo para evitar problema por CaseSensitive
    const duplicata = usuarios.some(usuario => 
        usuario.nome.toLowerCase() === novoUsuario.nome.toLowerCase() || 
        usuario.email.toLowerCase() === novoUsuario.email.toLowerCase()
    );

    //confere se a const duplicata é verdadeira e se for, avisa que já possui um usuário cadastrado
    if (duplicata) {
        alert('Erro: Já existe um usuário com esse nome ou email!');
        return null;  
    }

    // adiciona usuário
    usuarios.push(novoUsuario);

    // salva o array atualizado no localstorage e confirma o cadastro
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado com sucesso!');

    // Retorna o array de usuários para uso adicional
    return usuarios;
}