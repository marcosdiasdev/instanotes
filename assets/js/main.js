const novoItem = document.querySelector(".novo-item");
var listaVirtual = JSON.parse(localStorage.getItem("lista")) || [];

for(item of listaVirtual) {
    let li = criarItemDaLista(item.trim());
    novoItem.after(li);
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
        novoItem.classList.add("novo-item");
    } else {
        
        let li = criarItemDaLista(novoItem.textContent);
        novoItem.after(li);
        novoItem.textContent = "Novo item";

        atualizaLista();
    }
});

/*
 * Funções para controle da lista
 */

function atualizaLista() {
    let itens = document.getElementsByClassName('conteudo');
    listaVirtual = [];
    for(item of itens) {
        listaVirtual.unshift(item.textContent);
    }
    localStorage.setItem("lista", JSON.stringify(listaVirtual));
}

function criarItemDaLista(texto) {
    let li = 
    `<div class="tarefa">
        <div contenteditable class="conteudo">${texto}</div>
        <div class="fas fa-times fa-xs btn-excluir"></div>
    </div>`;
    li = htmlToElement(li);
    li.querySelector('.conteudo').addEventListener('blur', function() {
        atualizaLista();
    });
    li.querySelector('.btn-excluir').addEventListener('click', function() {
        li.remove();
        atualizaLista();
    });
    return li;
}

/*
 * Funções para gerar elementos HTML a partir de strings
 */

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}