
# Rate Monotonic

Este repositório contém um sistema desenvolvido para analisar e determinar o escalonamento de uma carga de trabalho em tempo real utilizando o algoritmo **Rate Monotonic (RM)**. O sistema recebe como entrada um arquivo JSON que contém informações detalhadas sobre um conjunto de tarefas periódicas e realiza a análise de viabilidade do escalonamento, além de sugerir um possível escalonamento com base em uma heurística apropriada.

## Descrição Geral

O objetivo deste projeto é implementar um algoritmo que analisa a viabilidade do escalonamento de um conjunto de tarefas utilizando o **Rate Monotonic Scheduling**. Este é um algoritmo clássico para escalonamento de tarefas periódicas em sistemas de tempo real, onde a prioridade de cada tarefa é determinada com base em seu período: quanto menor o período, maior a prioridade. 

### Objetivos do Projeto

1. **Determinar a viabilidade do escalonamento** de uma carga de trabalho específica utilizando o algoritmo Rate Monotonic.
2. **Sugerir um escalonamento possível** para a carga de trabalho com base em uma heurística de análise das tarefas fornecidas.

## Como Funciona

O código realiza três etapas principais:

1. **Cálculo da Utilização Total das Tarefas**: Verifica se a carga de trabalho pode ser escalonada em tempo real de forma segura.
2. **Verificação da Viabilidade de Escalonamento**: Utiliza a fórmula de limite de utilização para decidir se o conjunto de tarefas pode ser escalonado sem violar os limites de tempo.
3. **Sugestão de Escalonamento de Tarefas**: Gera uma sugestão de escalonamento ordenando as tarefas com base em seus períodos, conforme a política de Rate Monotonic.

### Estrutura do Código

- **Função `calcularUtilizacaoTotal(tasks)`**:
  - Calcula a utilização total das tarefas.
  - A utilização total é a soma do tempo de execução dividido pelo período de cada tarefa.
  - **Fórmula**: `Utilização Total = Σ (Tempo de Execução / Período)`

- **Função `verificarViabilidadeEscalonamento(tasks)`**:
  - Verifica se o conjunto de tarefas pode ser escalonado de acordo com o algoritmo RM usando a fórmula de limite de utilização.
  - **Limite de Utilização**: `n * (2^(1/n) - 1)`, onde `n` é o número de tarefas.
  - A função compara a utilização total calculada com o limite de utilização para determinar a viabilidade.

- **Função `ordenarTarefasPorPrioridade(tasks)`**:
  - Ordena as tarefas em ordem crescente de seus períodos (menor período = maior prioridade).
  - Retorna uma lista de tarefas com suas respectivas prioridades atribuídas.

- **Função Principal `processarCargaTrabalho(filePath)`**:
  - Lê um arquivo JSON contendo a carga de trabalho e analisa as tarefas.
  - Executa as funções para verificar a viabilidade do escalonamento e gera uma sugestão de escalonamento com base na análise.
  - Exibe o resultado final no console, indicando se o escalonamento é viável e sugerindo uma ordem de escalonamento das tarefas.

## Como Usar

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado em seu ambiente.

### Execução

1. **Prepare o arquivo JSON de entrada**: Crie um arquivo JSON com a estrutura esperada, por exemplo:

```
{
  "tasks": [
    { "id": 1, "execution_time": 1, "period": 5 },
    { "id": 2, "execution_time": 2, "period": 10 },
    { "id": 3, "execution_time": 1, "period": 20 }
  ]
}
```

2. **Edite o Caminho do Arquivo**: Certifique-se de que o caminho do arquivo JSON (`filePath`) no código aponta para o local correto do seu arquivo.

3. **Execute o Script**:

```
node seu_arquivo.js
```

### Exemplo de Saída

O resultado será exibido no console da seguinte forma:

```
{
  "schedulability": "viable",
  "suggested_schedule": [
    { "id": 1, "priority": 1 },
    { "id": 2, "priority": 2 },
    { "id": 3, "priority": 3 }
  ]
}
```

- **`schedulability`**: Indica se o escalonamento é "viable" (viável) ou "not viable" (não viável).
- **`suggested_schedule`**: Lista das tarefas com suas respectivas prioridades sugeridas.

## Arquivo index.html

Apenas para simplficar a interação com o conceito do projeto, foi desenvolvido um arquivo intex.html que pode ser aberto em qualquer navegador e o usuário pode ir criando de maneira dinamica as tarefas e depois verificando a análise.
