// script.js - WiFi Escola Melhorado

const dicas = [
    { num: "1", texto: "Fique mais perto do roteador ou ponto de acesso WiFi" },
    { num: "2", texto: "Desconecte outros celulares e dispositivos que não estão usando" },
    { num: "3", texto: "Evite assistir vídeos em alta qualidade enquanto estuda" },
    { num: "4", texto: "Feche abas desnecessárias do navegador" },
    { num: "5", texto: "Prefira a rede 2.4 GHz (tem maior alcance)" },
    { num: "6", texto: "Ative o Modo Avião por 10 segundos e reconecte" }
];

function carregarDicas() {
    const container = document.getElementById('dicas-container');
    container.innerHTML = '';

    dicas.forEach(dica => {
        const div = document.createElement('div');
        div.className = 'dica';
        div.innerHTML = `
            <div class="dica-number">${dica.num}</div>
            <span>${dica.texto}</span>
        `;
        container.appendChild(div);
    });
}

function recarregarPagina() {
    window.location.reload();
}

function testarVelocidade() {
    const btn = document.querySelector('.btn.secondary');
    const textoOriginal = btn.innerHTML;

    btn.innerHTML = '🔄 Testando conexão...';
    btn.disabled = true;

    setTimeout(() => {
        alert("📊 Teste simulado realizado!\n\nVelocidade aproximada: 1.8 ~ 3.5 Mbps\n\nDica extra: Tente se aproximar mais do roteador.");
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }, 1600);
}

// Inicia ao carregar a página
window.onload = carregarDicas;
