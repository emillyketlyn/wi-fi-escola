
// =============================================
// DIAGNÓSTICO DE WIFI - ESCOLA (JavaScript Puro)
// =============================================

const WiFiDiagnostico = {
    resultados: {},

    // Medir latência (Ping) com várias tentativas
    async medirPing(tentativas = 5) {
        let total = 0;
        let sucessos = 0;

        for (let i = 0; i < tentativas; i++) {
            const inicio = Date.now();
            try {
                await fetch('https://www.google.com/favicon.ico', {
                    mode: 'no-cors',
                    cache: 'no-cache'
                });
                const tempo = Date.now() - inicio;
                total += tempo;
                sucessos++;
            } catch (e) {
                console.log(`Tentativa ${i+1} falhou`);
            }
            // Pequeno delay entre tentativas
            await new Promise(r => setTimeout(r, 300));
        }

        const pingMedio = sucessos > 0 ? Math.round(total / sucessos) : "Erro";
        return { ping: pingMedio, tentativas: sucessos };
    },

    // Medir velocidade de download aproximada
    async medirDownload() {
        const imagemTeste = 'https://picsum.photos/3000/3000'; // Imagem grande (~2-3MB)
        const inicio = Date.now();

        try {
            const response = await fetch(imagemTeste, { cache: 'no-cache' });
            const blob = await response.blob();
            const fim = Date.now();

            const duracaoSegundos = (fim - inicio) / 1000;
            const tamanhoBits = blob.size * 8;
            const velocidadeMbps = (tamanhoBits / duracaoSegundos / 1024 / 1024).toFixed(2);

            return {
                velocidade: parseFloat(velocidadeMbps),
                tamanhoMB: (blob.size / 1024 / 1024).toFixed(2)
            };
        } catch (error) {
            console.error("Erro no teste de download:", error);
            return { velocidade: 0, erro: "Falha na conexão" };
        }
    },

    // Avaliação da qualidade da conexão
    avaliarQualidade(velocidade, ping) {
        if (velocidade === 0) return { status: "ERRO", cor: "red", mensagem: "Sem conexão com a internet" };

        if (velocidade < 3) {
            return {
                status: "MUITO RUIM",
                cor: "red",
                mensagem: "Internet muito fraca. Muitos dispositivos conectados ou sinal ruim."
            };
        }
        if (velocidade < 10) {
            return {
                status: "RUIM",
                cor: "orange",
                mensagem: "Conexão lenta. Recomenda-se reiniciar o roteador e limitar o número de dispositivos."
            };
        }
        if (velocidade < 25) {
            return {
                status: "RAZOÁVEL",
                cor: "yellow",
                mensagem: "Velocidade aceitável para navegação básica, mas ruim para videoaulas."
            };
        }
        return {
            status: "BOA",
            cor: "lime",
            mensagem: "Conexão boa para uso escolar."
        };
    },

    // Função principal para executar o teste completo
    async executarTesteCompleto() {
        console.clear();
        console.log("%c🔍 Iniciando Diagnóstico de WiFi da Escola...", "color: cyan; font-size: 16px;");

        // 1. Teste de Ping
        console.log("📡 Medindo latência (Ping)...");
        const pingResult = await this.medirPing(6);

        // 2. Teste de Download
        console.log("⬇️ Medindo velocidade de download...");
        const downloadResult = await this.medirDownload();

        // 3. Avaliação
        const avaliacao = this.avaliarQualidade(downloadResult.velocidade, pingResult.ping);

        // Resultados finais
        this.resultados = {
            ping: pingResult.ping,
            downloadMbps: downloadResult.velocidade,
            tamanhoTesteMB: downloadResult.tamanhoMB,
            qualidade: avaliacao.status,
            recomendacao: avaliacao.mensagem,
            data: new Date().toLocaleString('pt-BR')
        };

        console.log("%c✅ Teste Concluído!", "color: lime; font-weight: bold;");
        console.table(this.resultados);

        // Mensagem amigável para o usuário
        alert(`📊 Diagnóstico WiFi - Escola

Velocidade de Download: ${this.resultados.downloadMbps} Mbps
Latência (Ping): ${this.resultados.ping} ms
Qualidade: ${this.resultados.qualidade}

${this.resultados.recomendacao}

✅ Salve este resultado e envie para o TI da escola!`);
        
        return this.resultados;
    }
};

// ======================
// COMO USAR:
// ======================

// Basta chamar esta função quando quiser rodar o teste:
async function testarWifiEscola() {
    await WiFiDiagnostico.executarTesteCompleto();
}

// Exemplo de uso direto no console do navegador:
// testarWifiEscola();
