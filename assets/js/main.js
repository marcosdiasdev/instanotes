const novoItem = document.querySelector(".novo-item");
var listaVirtual = JSON.parse(localStorage.getItem("lista")) || [];

for(item of listaVirtual) {
    item = criarItemDaLista(item.trim());
    console.log(item);
    novoItem.after(item);
}

/*
 * Eventos do campo de adicionar novo item
 */

novoItem.addEventListener("keydown", (evt) => {
    if(evt.key == "Enter") {
        novoItem.blur();
        setTimeout(function() {
            novoItem.focus();
        }, 200);
    }
});

novoItem.addEventListener('focus', () => {
    novoItem.textContent = null;
});

novoItem.addEventListener('blur', () => {
    if(!novoItem.textContent) {
        novoItem.textContent = "Novo item";
    } else {
        
        let item = criarItemDaLista(novoItem.textContent);
        novoItem.after(item);
        novoItem.textContent = "Novo item";

        atualizaLista();
    }
});

/*
 * Funções para controle da lista
 */

function atualizaLista() {
    let itens = document.querySelectorAll('.conteudo');
    listaVirtual = [];
    for(item of itens) {
        listaVirtual.unshift(item.textContent);
    }
    localStorage.setItem("lista", JSON.stringify(listaVirtual));
}

function criarItemDaLista(texto) {
    let tarefa = 
    `<div class="tarefa">
        <div contenteditable class="conteudo">${texto}</div>
        <div class="fas fa-times fa-xs btn-excluir"></div>
    </div>`;
    
    tarefa = textoParaHTML(tarefa);
    
    tarefa.querySelector('.conteudo').addEventListener('blur', function() {
        atualizaLista();
    });

    tarefa.querySelector('.btn-excluir').addEventListener('click', function() {
        tarefa.remove();
        atualizaLista();
    });

    return tarefa;
}

/*
 * Função para gerar elementos HTML a partir de strings
 */

function textoParaHTML(texto) {
    let template = document.createElement('template');
    template.innerHTML = texto.trim();
    return template.content.firstChild;
}