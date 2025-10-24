// RecoverPassword.js


// Código responsavel pela recuperação de senha com código de verificação falso, gerado só para simulação, mas que funciona pelo alert
(function () {
    const form = document.getElementById('rp-form');
    const rpEmail = document.getElementById('rp-email');
    const rpEnviado = document.getElementById('rp-enviado');
    const rpCodigoWrap = document.getElementById('rp-codigo-wrap');
    const rpCodigoInput = document.getElementById('rp-codigo');
    const rpVerificarCodigoBtn = document.getElementById('rp-verificar-codigo');
    const rpNovaSenhaWrap = document.getElementById('rp-nova-senha-wrap');
    const rpSenha = document.getElementById('rp-senha');
    const rpConfirmarSenha = document.getElementById('rp-confirmar-senha');
    const rpAtualizarSenhaBtn = document.getElementById('rp-atualizar-senha');
    const rpHidder = document.getElementById('rp-hidder');
  
    let codigoGerado = null;
    let emailEmProcesso = null;
  
    function emailValido(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  
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
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      esconderMensagem();
      const email = rpEmail.value.trim();
  
      if (!emailValido(email)) {
        mostrarMensagem('Digite um e-mail válido.');
        return;
      }
  
      const usuario = buscarUsuarioPorEmail(email);
      if (!usuario) {
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
  
    rpAtualizarSenhaBtn.addEventListener('click', () => {
      esconderMensagem();
      const nova = rpSenha.value.trim();
      const conf = rpConfirmarSenha.value.trim();
  
      if (!nova || !conf) {
        mostrarMensagem('Preencha os dois campos.');
        return;
      }
      if (nova !== conf) {
        mostrarMensagem('As senhas não coincidem.');
        return;
      }
      if (nova.length < 5) {
        mostrarMensagem('Senha muito curta.');
        return;
      }
  
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
  