const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

function setActive(targetId){
  pages.forEach(p => p.classList.toggle('active', p.id === targetId));
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
  const el = document.getElementById(targetId);
  if(el) el.setAttribute('tabindex','-1'), el.focus();
}

navBtns.forEach(btn=>{
  btn.addEventListener('click',()=> setActive(btn.dataset.target));
});

function downloadCredits(){
  const text = [
    'Créditos do Projeto - jogo da forca',
    '=======================================',
    '',
    'Equipe:',
    '- Sofia Alves Figueredo — Telas de login e cadastro e página inicial (frontend)',
    '- Ludmila Souza Santiago — Backend e Frontend do jogo',
    '- Matheus Santos Rodrigues — Sistema de login e cadastro com local storage (BackEnd)',
    '- Yasmim Barbosa Lima — Backend e Frontend da página de créditos',
    '',
    'Agradecimentos:',
    '- Professor(a): Jonathan Toczek Souza',
    '- Instituição: Instituto Federal do Espírito Santo',
    '',
    'Lançamento: 25/10/2025'
  ].join('\n');

  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'creditos_projeto.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printCredits(){ window.print(); }

function copyToClipboard(){
  const el = document.querySelector('#final .game-info');
  if(!el) return alert('Elemento de créditos não encontrado.');
  const text = el.innerText;
  navigator.clipboard?.writeText(text).then(()=>{
    alert('Créditos copiados para a área de transferência!');
  }).catch(()=> alert('Não foi possível copiar automaticamente.'));
}

if(location.hash){
  const target = location.hash.replace('#','');
  if([...pages].some(p => p.id === target)) setActive(target);
}
