//--------------------------Parte que faz a troca entre registro e login===================================//
var telaLogin = document.querySelector('.tela-login');
var LinkLogin = document.querySelector('.link-login');
var LinkRegistro = document.querySelector('.link-registro');


LinkRegistro.addEventListener('click', () => {
    telaLogin.classList.add('active');
});

LinkLogin.addEventListener('click', () => {
    telaLogin.classList.remove('active');
});
//--------------------------BOTAO MOSTRAR SENHA -----------------------------//
const password = document.getElementById('senha');
const passwordLogin = document.getElementById('senhaLogin');
const icon = document.getElementById('icone');
const btnShow = document.querySelector('#btnMostrar');
const iconContainer = document.getElementById('iconContainer');
const iconContainerRegistro = document.getElementById('iconContainerRegistro');  // Adicionamos esta linha

function showMostrar() {
    if (passwordLogin.type === 'password') {
        passwordLogin.setAttribute('type', 'text');
        iconContainer.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
    } else {
        passwordLogin.setAttribute('type', 'password');
        iconContainer.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
    }
}

// Função para alternar a visibilidade da senha na parte de registro
function showMostrarRegistro() {
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        iconContainerRegistro.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
    } else {
        password.setAttribute('type', 'password');
        iconContainerRegistro.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
    }
}

// Adicione um evento de clique ao ícone para chamar a função showTeste
iconContainer.addEventListener('click', showMostrar);
iconContainerRegistro.addEventListener('click', showMostrarRegistro);
// function showTeste() {
//     if (passwordLogin.type === 'password') {
//         passwordLogin.setAttribute('type', 'password');
//         iconContainer.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
//     } else {
//         passwordLogin.setAttribute('type', 'text');
//         iconContainer.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
//     }
// }






//-------------------------------------LINKANDO AS VARIÁVEIS------------------------------------------//

let usuario = document.querySelector('input#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

var email = document.querySelector('input#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

var senha = document.querySelector('input#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('input#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');


//-----------------------------------CÓDIGOS PARA VALIDAÇÃO DE USUÁRIOS--------------------------------//

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 2) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = 'Usuário *Insira no mínimo 3 caracteres';
        usuario.setAttribute('style', 'border-color: red');
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'color: #0c141a');
        labelUsuario.innerHTML = 'Usuário';
        validUsuario = true;
    }
});

email.addEventListener('keyup', () => {
    var emailRegex = /[a-z0-9.]+@[a-z]+\.[a-z]+/;
    if (email.value.length <= 4) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'Email *Insira no mínimo 5 caracteres';
        email.setAttribute('style', 'border-color: red');
        validEmail = false;
    } else if (!emailRegex.test(email.value)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'Email *Insira email corretamente';
        email.setAttribute('style', 'border-color: red');
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color: #0c141a');
        labelEmail.innerHTML = 'Email';
        validEmail = true;
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color: #0c141a');
        labelSenha.innerHTML = 'Senha';
        validSenha = true;
    }
});

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color: #0c141a');
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        validConfirmSenha = true;
    }
});

//-----------------------------------------TOASTIFY PRA FUNÇÃO DE LOGAR-----------------------------------//
// forma de conter o flood do toastify que eu aprendi de um indiano
var toastErrorIsVisible = false;

// função para exibir o toast de erro
function exibirToastDeErro(errorMessage) {
    if (!toastErrorIsVisible) {
        Toastify({
            text: errorMessage,
            duration: 3000,
            backgroundColor: 'red',
            close: true,
            callback: function (instance) {
                // quando o toast é fechado, ele coloca o toastErrorIsVisible como falso
                toastErrorIsVisible = false;

                // remove a instancia do toastify quando fecha
                instance.hide();
            }
        }).showToast();

        // quando ele tiver visivel, ai fica verdadeiro
        toastErrorIsVisible = true;
    }
}
//-----------------------------------------------FUNÇÃO DE LOGAR---------------------------------------//
function entrar() {
    var emailLogin = document.querySelector('input#emailLogin');
    var senhaLogin = document.querySelector('input#senhaLogin');
    var users = JSON.parse(localStorage.getItem('listaUser')) || [];
    var users = [];
    users = JSON.parse(localStorage.getItem('listaUser')) || [];
    console.log(users);

    var loginSucesso = false; // variável de controle para verificar o login bem-sucedido

    users.forEach((item) => {
        if (emailLogin.value == item.emailCad && senhaLogin.value == item.senhaCad) {
            loginSucesso = true;

            item.ultimoAcesso = new Date().toLocaleString();
            console.log(`Último acesso atualizado para: ${item.ultimoAcesso}`);
            item.status = "Ativo";
        }
    });

    if (loginSucesso) {
        // esquemazinho que eu fiz pro lembre-se de mim----------------

        if (document.getElementById('example-1-login').checked) {
            // salve as informações do usuário no localStorage
            var ultimoUsuario = document.getElementById('emailLogin').value;
            localStorage.setItem('ultimoUsuario', ultimoUsuario);
        } else {
            localStorage.removeItem('ultimoUsuario');
        }

        emailLogin.value = '';
        senhaLogin.value = '';
        Toastify({
            text: "Você foi logado com sucesso!",
            backgroundColor: 'green',
            duration: 3000
        }).showToast();

        window.location.href = 'ClosetVirtual.html';
        // esquemazinho que eu fiz pro lembre-se de mim -------------------
        // só pra quando voltar na seta, ficar vázio

    } else {
        exibirToastDeErro('Credenciais inválidas. Verifique seu email e senha.');
    }
}

window.onload = function () {
    var ultimoUsuario = localStorage.getItem('ultimoUsuario');
    if (ultimoUsuario) {
        // se achar informações do lembre-se de mim no localStorage, preencha o campo de email
        document.getElementById('emailLogin').value = ultimoUsuario;
    }
}

//----------------------------------------------TOASTIFY PARA A FUNÇÃO DE CADASTRAR------------------------------------------------------//

// forma de conter o flood do toastify que eu aprendi de um indiano
var toastErrorIsVisible = false;

// função para exibir o toast de erro
function exibirToastDeErro(errorMessage) {
    if (!toastErrorIsVisible) {
        Toastify({
            text: errorMessage,
            duration: 3000,
            backgroundColor: 'red',
            close: true,
            callback: function (instance) {
                // quando o toast é fechado, ele coloca o toastErrorIsVisible como falso
                toastErrorIsVisible = false;

                // remove a instancia do toastify quando fecha
                instance.hide();
            }
        }).showToast();

        // // quando ele tiver visivel, ai fica verdadeiro
        toastErrorIsVisible = true;
    }
}

//--------------------------------FUNÇÃO PARA CADASTRAR USUÁRIOS------------------------------------//

function criarConta() {
    var nomeCadastro = document.querySelector('input#usuario');
    var emailCadastro = document.querySelector('input#email');
    var senhaCadastro = document.querySelector('input#senha');

    var novoUsuario = {
        nomeCad: nomeCadastro.value,
        emailCad: emailCadastro.value,
        senhaCad: senhaCadastro.value,
        ultimoAcesso: new Date().toLocaleString(),
        status: "Ativo"
    };


    // Realizando as validações antes de criar a conta
    if (!validUsuario || !validEmail || !validSenha) {
        exibirToastDeErro('Não foi possível criar sua conta. Preencha os campos corretamente.');
        return;
    }

    var users = JSON.parse(localStorage.getItem('listaUser')) || [];

    // Verificando se o email já existe na lista de usuários
    var emailExistente = users.some((item) => item.emailCad === emailCadastro.value);

    if (emailExistente) {
        exibirToastDeErro('Esse email já existe.');
    } else {
        // Adicionando o novo usuário à lista de usuários
        users.push(novoUsuario);

        // Atualizando o localStorage com a lista atualizada de usuários
        localStorage.setItem('listaUser', JSON.stringify(users));

        Toastify({
            text: 'Conta criada com sucesso.',
            duration: 3000,
            backgroundColor: 'green'
        }).showToast();

        // Limpando os campos de entrada após o registro bem-sucedido
        nomeCadastro.value = '';
        emailCadastro.value = '';
        senhaCadastro.value = '';

        setTimeout(() => {
            window.location.href = 'logincad.html';
        }, 2000);
    }
}