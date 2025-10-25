// Código responsavel pela recuperação de senha com código de verificação falso, gerado só para simulação, mas que funciona pelo alert
(function () {
  const form = document.getElementById('rp-form');
  const rpEmail = document.getElementById('rp-email');
  const rpTextoEmail = document.getElementById('rp-textoEmail');
  const rpEnviado = document.getElementById('rp-enviado');
  const rpCodigoWrap = document.getElementById('rp-codigo-wrap');
  const rpCodigoInput = document.getElementById('rp-codigo');
  const rpVerificarCodigoBtn = document.getElementById('rp-verificar-codigo');
  const rpNovaSenhaWrap = document.getElementById('rp-nova-senha-wrap');
  const rpSenha = document.getElementById('rp-senha');
  const rpTextoSenha = document.getElementById('rp-textoSenha');
  const rpConfirmarSenha = document.getElementById('rp-confirmar-senha');
  const rpTextoConfirmarSenha = document.getElementById('rp-textoConfirmarSenha');
  const rpAtualizarSenhaBtn = document.getElementById('rp-atualizar-senha');
  const rpHidder = document.getElementById('rp-hidder');
  const rpConfirmarHidder = document.getElementById('rp-confirmar-hidder');

  let codigoGerado = null;
  let emailEmProcesso = null;
  let validEmail = false;
  let validSenha = false;
  let validConfirmarSenha = false;

  // Regex para validações
  const temLetra = /[A-Za-z]/;
  const temNumero = /\d/;
  const temCaractereEspecial = /[!@#$%^&*]/;

  function mostrarMensagem(texto, tipo = 'erro') {
      rpEnviado.style.display = 'block';
      rpEnviado.innerHTML = texto;
      rpEnviado.style.background = tipo === 'ok'
          ? 'rgba(194, 247, 194, 1)'
          : 'rgba(255, 175, 175, 1)';
      rpEnviado.style.color = '#111';
      rpEnviado.style.border = tipo === 'ok'
          ? '1px solid rgba(0,120,0,0.2)'
          : '1px solid rgba(120,0,0,0.2)';
  }

  function esconderMensagem() {
      rpEnviado.style.display = 'none';
  }

  function emailValido(email) {
      const depoisArroba = email.substring(email.indexOf('@') + 1);
      const depoisPonto = email.substring(email.indexOf('.') + 1);
      return email.includes('@') &&
             depoisArroba.trim().length > 2 &&
             depoisArroba.includes('.') &&
             depoisPonto.trim().length > 2;
  }

  function validarEmail() {
      const email = rpEmail.value.trim();
      const depoisArroba = email.substring(email.indexOf('@') + 1);
      const depoisPonto = email.substring(email.indexOf('.') + 1);

      if (email === "") {
          rpTextoEmail.style.color = "red";
          rpEmail.value = "";
          mostrarMensagem("Não pode começar com espaço, <br> por favor digite um valor válido.");
          validEmail = false;
      } else if (email.length <= 5) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("Por favor, digite um email maior que 5 letras.");
          validEmail = false;
      } else if (!email.includes('@')) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("O email deve conter caractere '@'.");
          validEmail = false;
      } else if (depoisArroba.trim() === "") {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("O email deve ter um domínio válido. <br> (ex.: exemplo@dominio.com).");
          validEmail = false;
      } else if (depoisArroba.trim().length <= 2) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("O email deve ter um domínio maior que 2 letras. <br> (ex.: exemplo@dominio.com).");
          validEmail = false;
      } else if (!depoisArroba.includes('.')) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("Um email deve ter um domínio válido. <br> (ex.: .com, .org, .net).");
          validEmail = false;
      } else if (depoisPonto.trim().length <= 2) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem("Digite um domínio maior que 2 letras. <br> (ex.: .com, .org, .net).");
          validEmail = false;
      } else {
          rpTextoEmail.style.color = "rgb(194, 247, 194)";
          esconderMensagem();
          validEmail = true;
      }
  }

  function validarSenha() {
      const senha = rpSenha.value.trim();
      if (senha === "") {
          rpTextoSenha.style.color = "red";
          rpSenha.value = "";
          mostrarMensagem("Não pode começar com espaço, <br> por favor digite um valor válido.");
          validSenha = false;
      } else if (senha.length <= 4) {
          rpTextoSenha.style.color = "red";
          mostrarMensagem("Por favor, digite uma senha maior que 4 caracteres.");
          validSenha = false;
      } else if (!temLetra.test(senha)) {
          rpTextoSenha.style.color = "red";
          mostrarMensagem("Insira ao menos uma letra.");
          validSenha = false;
      } else if (!temNumero.test(senha) && !temCaractereEspecial.test(senha)) {
          rpTextoSenha.style.color = "red";
          mostrarMensagem("Insira um número e/ou caractere especial <br> (ex.: @, -, !).");
          validSenha = false;
      } else {
          rpTextoSenha.style.color = "rgb(194, 247, 194)";
          esconderMensagem();
          validSenha = true;
      }
  }

  function validarConfirmarSenha() {
      const confirmarSenha = rpConfirmarSenha.value.trim();
      if (confirmarSenha === "") {
          rpTextoConfirmarSenha.style.color = "red";
          rpConfirmarSenha.value = "";
          mostrarMensagem("Não pode começar com espaço, <br> por favor digite um valor válido.");
          validConfirmarSenha = false;
      } else if (confirmarSenha !== rpSenha.value) {
          rpTextoConfirmarSenha.style.color = "red";
          mostrarMensagem("As senhas diferem.");
          validConfirmarSenha = false;
      } else {
          rpTextoConfirmarSenha.style.color = "rgb(194, 247, 194)";
          esconderMensagem();
          validConfirmarSenha = true;
      }
  }

  function gerarCodigo() {
      return String(Math.floor(100000 + Math.random() * 900000));
  }

  function buscarUsuarioPorEmail(email) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      return usuarios.find(u => u.email === email) || null;
  }

  function atualizarSenhaUsuario(email, novaSenha) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const idx = usuarios.findIndex(u => u.email === email);
      if (idx === -1) return false;
      usuarios[idx].senha = novaSenha;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return true;
  }

  rpEmail.addEventListener('keyup', validarEmail);
  rpSenha.addEventListener('keyup', validarSenha);
  rpConfirmarSenha.addEventListener('keyup', validarConfirmarSenha);

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      validarEmail();
      if (!validEmail) {
          return;
      }

      const email = rpEmail.value.trim();
      const usuario = buscarUsuarioPorEmail(email);
      if (!usuario) {
          rpTextoEmail.style.color = "red";
          mostrarMensagem('Email não encontrado. Cadastre-se primeiro.');
          return;
      }

      codigoGerado = gerarCodigo();
      emailEmProcesso = email;
      alert(`Código de recuperação: ${codigoGerado}`);
      mostrarMensagem('Código gerado (verifique o alerta).', 'ok');

      rpCodigoWrap.style.display = 'block';
      rpNovaSenhaWrap.style.display = 'none';
      rpCodigoInput.value = '';
      rpCodigoInput.focus();
  });

  rpVerificarCodigoBtn.addEventListener('click', () => {
      esconderMensagem();
      const cod = rpCodigoInput.value.trim();
      if (cod !== codigoGerado) {
          mostrarMensagem('Código incorreto.');
          return;
      }
      mostrarMensagem('Código verificado! Defina sua nova senha.', 'ok');
      rpNovaSenhaWrap.style.display = 'block';
      rpSenha.focus();
  });

  rpHidder.addEventListener('click', () => {
      const isPassword = rpSenha.type === 'password';
      rpSenha.type = isPassword ? 'text' : 'password';
      rpHidder.src = isPassword ? '../img/eyeopen.svg' : '../img/eyeclosed.svg';
  });

  rpConfirmarHidder.addEventListener('click', () => {
      const isPassword = rpConfirmarSenha.type === 'password';
      rpConfirmarSenha.type = isPassword ? 'text' : 'password';
      rpConfirmarHidder.src = isPassword ? '../img/eyeopen.svg' : '../img/eyeclosed.svg';
  });

  rpAtualizarSenhaBtn.addEventListener('click', () => {
      validarSenha();
      validarConfirmarSenha();
      if (!validSenha || !validConfirmarSenha) {
          if (!validSenha) {
              rpTextoSenha.style.color = "red";
          } else {
              rpTextoSenha.style.color = "rgb(194, 247, 194)";
          }
          if (!validConfirmarSenha) {
              rpTextoConfirmarSenha.style.color = "red";
          } else {
              rpTextoConfirmarSenha.style.color = "rgb(194, 247, 194)";
          }
          mostrarMensagem('Por favor, corrija os campos inválidos antes de atualizar.');
          return;
      }

      const nova = rpSenha.value.trim();
      const conf = rpConfirmarSenha.value.trim();

      const ok = atualizarSenhaUsuario(emailEmProcesso, nova);
      if (!ok) {
          mostrarMensagem('Erro ao salvar senha.');
          return;
      }

      mostrarMensagem('Senha atualizada com sucesso! Redirecionando...', 'ok');
      setTimeout(() => {
          window.location.href = "../html/login.html";
      }, 2000);
  });
})();