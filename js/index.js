const formulario = document.querySelector('.formulario')
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    const contaCriada = pegarContaLocalStorage(email)
    const validacao = validarConta(contaCriada, senha)
    if(validacao) {
        loginSucesso()
        window.location.href= 'home.html'
        salvarSessionStorage(email)
    }
})

function loginSucesso () {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}

function pegarContaLocalStorage(email) {
    const contaCriada = localStorage.getItem(email)
    if(contaCriada) {
        return JSON.parse(contaCriada)
    }
    return ''
}

function validarConta(conta, senha) {
    if(!conta) {
        alert('E-mail ou senha inválidos.')
        return false
    } 

    if(conta) {
        if(conta.senha != senha) {
            alert('E-mail ou senha incorretos.')
            return false
        }
    }

    return true
}

function salvarSessionStorage(email) {
    sessionStorage.setItem('logado', email)
}
