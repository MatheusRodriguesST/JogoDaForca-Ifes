// Função para atualizar a hora
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `Hora ${hours}:${minutes}:${seconds}`;
    document.getElementById('hora').innerText = timeString;
}

// Atualiza imediatamente e depois a cada segundo
updateTime();
setInterval(updateTime, 1000);

// Toggle do menu hamburger
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do hamburger (transforma em X quando aberto)
    menuToggle.classList.toggle('active');
});