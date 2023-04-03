const modal = new bootstrap.Modal('.modal')
const formulario = document.querySelector(".inputFlex")
const inputDescricao = document.querySelector("#inputDescricao");
const inputDetalhamento = document.querySelector("#inputDetalhamento");
const listaTarefas = document.querySelector("#listaTarefas");
const janelaEdicao = document.querySelector("#janelaEdicao");
const editarDescricao = document.querySelector("#tituloEdicao")
const editarDetalhamento = document.querySelector("#tarefaEdicaoDetalhamento")
const formularioEdicao = document.querySelector("#formularioEdicao")
const idTarefaEdicao = document.querySelector("#idTarefaEdicao");
const botaoFechar = document.querySelector("#btnFechar")
const emailLogado = sessionStorage.getItem("logado")
const dadosDoUsuario = obterUsuarioLogado()

formulario.addEventListener('submit', function(event) {
    event.preventDefault()

    const descricao = inputDescricao.value;
    const detalhamento = inputDetalhamento.value;
    const recado = {
        id: gerarId(),
        descricao: descricao,
        detalhamento: detalhamento
    }
    dadosDoUsuario.recados.push(recado)
    atualizarLocalStorage(dadosDoUsuario)
    criarRecado(recado)
})

formularioEdicao.addEventListener('submit', function (event) {
    event.preventDefault()

    const novoRecado = {
        id: Number(idTarefaEdicao.innerHTML.replace("#", "")),
        descricao: editarDescricao.value,
        detalhamento: editarDetalhamento.value
        
    }
    
    const encontrarId = dadosDoUsuario.recados.findIndex(recado => recado.id === novoRecado.id);

    dadosDoUsuario.recados.splice(encontrarId, 1, novoRecado)
    atualizarLocalStorage(dadosDoUsuario)
    obterRecadosDoUsuario(dadosDoUsuario)
    modal.hide()
})

function obterUsuarioLogado() {
    const dadosDoUsuario = JSON.parse(localStorage.getItem(emailLogado))
    obterRecadosDoUsuario(dadosDoUsuario)
    return dadosDoUsuario
}

function obterRecadosDoUsuario(dadosDoUsuario) {
    listaTarefas.innerHTML = ""
    const recados = dadosDoUsuario.recados
    console.log(recados);
    for(const recado of recados) {
        criarRecado(recado)
    }
}

function gerarId(min = 1, max = 1000000) {
    let id = Math.floor(Math.random() * (max - min) + min);
    let idEncontrado = dadosDoUsuario.recados.findIndex(recado => recado.id === id);

  while (idEncontrado !== -1) {
    id = Math.floor(Math.random() * (max - min) + min);
    idEncontrado = dadosDoUsuario.recados.findIndex(recado => recado.id === id);
  }
  return id;
}

function criarRecado(recado) {
    listaTarefas.innerHTML += `
        <tr>
            <td>${recado.id}</td>
            <td>${recado.descricao}</td>
            <td>${recado.detalhamento}</td>
            <td>
                <button class="botaoExcluir buttonSalvar" onclick="excluirRecado(${recado.id})" >Excluir</button>
                <button data-bs-toggle="modal" data-bs-target="#editarRecado" class="botaoEditar buttonSalvar" onclick="editarRecado(${recado.id})">Editar</button>
            </td>
        </tr>
    `
}

function excluirRecado(id) {
    exibirModal('Tem certeza que quer excluir?')
    if(confirmacao) {
        // Pegar recado com o id que está no parâmetro dessa função
        const indiceRecado = dadosDoUsuario.recados.findIndex(function (recado) {
            return recado.id == id
        })
        console.log(indiceRecado);
        dadosDoUsuario.recados.splice(indiceRecado, 1)
        atualizarLocalStorage(dadosDoUsuario)
        obterRecadosDoUsuario(dadosDoUsuario)
    }
}

function exibirModal (mensagem) {
    const pegarModal = document.querySelector('#mensagem')
    pegarModal.innerText = mensagem
    modal.show()
}


// Função de alterar título e descrição
function editarRecado(id) {
    const idTarefaEdicao = document.querySelector('#idTarefaEdicao')
    const recado = dadosDoUsuario.recados.find(function (recado) {
        return recado.id == id
    })

    idTarefaEdicao.innerText = "#" + id
    editarDescricao.value = recado.descricao
    editarDetalhamento.value = recado.detalhamento
}



function atualizarLocalStorage(dadosDoUsuario) {
    localStorage.setItem(dadosDoUsuario.email, JSON.stringify(dadosDoUsuario))
}
