const modal = new bootstrap.Modal('.modal')
const formulario = document.querySelector('.formulario')
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    const contaCriada = pegarContaLocalStorage(email)
    const validacao = validarConta(contaCriada, senha)
    if(validacao) {
        
        window.location.href= 'home.html'
        salvarSessionStorage(email)
    }
})

function pegarContaLocalStorage(email) {
    const contaCriada = localStorage.getItem(email)
    if(contaCriada) {
        return JSON.parse(contaCriada)
    }
    return ''
}

function validarConta(conta, senha) {
    if(conta || !conta) {
        if(conta.senha != senha) {
            return exibirModal('Verifique seu e-mail ou senha. Caso não tenha uma conta, crie uma! ;)')
        }
    }

    return true
}

function exibirModal (mensagem) {
    const pegarModal = document.querySelector('#mensagem')
    pegarModal.innerText = mensagem
    modal.show()
    setTimeout(function () {
        modal.hide() 
    } , 4000)
}

function salvarSessionStorage(email) {
    sessionStorage.setItem('logado', email)
}
