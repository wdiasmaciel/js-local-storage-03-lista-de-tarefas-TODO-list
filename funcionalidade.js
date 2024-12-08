function obterTarefasDoLocalStorage() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function salvarTarefasNoLocalStorage(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa(tarefa) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.push({ texto: tarefa, concluida: false });
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function removerTarefa(indice) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.splice(indice, 1);
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function alternarConclusaoTarefa(indice) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvarTarefasNoLocalStorage(tarefas);
    renderizarTarefas();
}

function renderizarTarefas() {
    const tarefas = obterTarefasDoLocalStorage();
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';

    tarefas.forEach((tarefa, indice) => {
        const li = document.createElement('li');
        li.className = tarefa.concluida ? 'concluida' : '';

        li.innerHTML = `
            <span>${tarefa.texto}</span>
            <div>
                <button onclick="alternarConclusaoTarefa(${indice})">${tarefa.concluida ? 'Desmarcar' : 'Concluir'}</button>
                <button onclick="removerTarefa(${indice})">Remover</button>
            </div>
        `;

        listaTarefas.appendChild(li);
    });
}

document.getElementById('entradaTarefa').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const entradaTarefa = document.getElementById('entradaTarefa');
        const textoTarefa = entradaTarefa.value.trim();

        if (textoTarefa) {
            adicionarTarefa(textoTarefa);
            entradaTarefa.value = '';
        }
    }
});

renderizarTarefas();
