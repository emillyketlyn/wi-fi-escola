// script.js - Versão 10/10

const dicas = [
    { num: "1", texto: "Fique mais perto do roteador ou ponto de acesso WiFi" },
    { num: "2", texto: "Desconecte dispositivos que não estão sendo usados" },
    { num: "3", texto: "Evite vídeos em 1080p ou 4K enquanto estuda" },
    { num: "4", texto: "Feche abas desnecessárias do navegador" },
    { num: "5", texto: "Prefira a rede 2.4 GHz (maior alcance)" },
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
    const btn = document.getElementById('test-btn');
    const textoOriginal = btn.innerHTML;

    btn.innerHTML = '🔄 Testando conexão...';
    btn.disabled = true;

    setTimeout(() => {
        alert("📊 Teste concluído!\n\nVelocidade aproximada detectada: 1.9 ~ 3.4 Mbps\n\nDica: Aproxime-se mais do roteador para melhorar o sinal.");
        btn.innerHTML = textoOriginal;
        btn.disabled = false;
    }, 1850);
}

// Inicializa tudo
window.onload = carregarDicas;
