const modal = new bootstrap.Modal('.modal')
const formulario = document.querySelector('.formulario')
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    if(!formulario.checkValidity()) {
        formulario.classList.add('was-validated')
        return
    }

    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value
    const validacao = validarConta(email)
    if(validacao) {
        salvarLocalStorage({
            email: email,
            senha: senha,
            recados: []
        })

        exibirModal('Conta criada com sucesso!')
    }
    

})

function exibirModal (mensagem) {
    const pegarModal = document.querySelector('#mensagem')
    pegarModal.innerText = mensagem
    modal.show()
    setTimeout(function () {
        modal.hide() 
    } , 3000)
}

function salvarLocalStorage(usuario) {
    localStorage.setItem(usuario.email, JSON.stringify(usuario))
}

function validarConta(email) {
    const validacao = localStorage.getItem(email)
    if(validacao) {
        return exibirModal('Já existe uma conta com esse e-mail. Tente novamente!')
    }

    return true
}