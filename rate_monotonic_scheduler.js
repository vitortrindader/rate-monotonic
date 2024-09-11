const fs = require('fs');

// Função para calcular a utilização total
function calcularUtilizacaoTotal(tasks) {
    return tasks.reduce((sum, task) => sum + (task.execution_time / task.period), 0);
}

// Função para verificar a viabilidade do escalonamento usando a fórmula de limite de utilização
function verificarViabilidadeEscalonamento(tasks) {
    const n = tasks.length;
    const limiteUtilizacao = n * (Math.pow(2, 1 / n) - 1);
    const utilizacaoTotal = calcularUtilizacaoTotal(tasks);

    return utilizacaoTotal <= limiteUtilizacao;
}

// Função para ordenar as tarefas pela prioridade (menor período = maior prioridade)
function ordenarTarefasPorPrioridade(tasks) {
    return tasks.sort((a, b) => a.period - b.period).map((task, index) => ({
        id: task.id,
        priority: index + 1
    }));
}

// Função principal para processar a carga de trabalho
function processarCargaTrabalho(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        const workload = JSON.parse(data);
        const tasks = workload.tasks;

        // Verificar viabilidade do escalonamento
        const viabilidade = verificarViabilidadeEscalonamento(tasks);
        const resultadoViabilidade = viabilidade ? 'viable' : 'not viable';

        // Gerar sugestão de escalonamento
        const sugestaoEscalonamento = ordenarTarefasPorPrioridade(tasks);

        // Formar o resultado final
        const resultado = {
            schedulability: resultadoViabilidade,
            suggested_schedule: sugestaoEscalonamento
        };

        console.log(JSON.stringify(resultado, null, 2));
    });
}

// Caminho do arquivo JSON de entrada
const filePath = 'arquivo.json';

// Executar o processamento da carga de trabalho
processarCargaTrabalho(filePath);
