const texto = document.querySelector('.texto');
const botao = document.querySelector('.botao');
const form = document.querySelector('.login');

function habilitarBotao ({target}){
    if(target.value.length > 3){
        botao.removeAttribute('disabled');
    }
    else{
        botao.setAttribute('disabled', '');
    }
}

async function entrarSala(usuario){
    localStorage.setItem('usuario', texto.value);
    const url = 'https://mock-api.driven.com.br/api/v6/uol/participants'
    const informacoes = { name: usuario };
    axios.post(url, informacoes)
        .then(response => {
            window.location = 'index.html'
        })
        .catch(error => {
            window.alert('Nome de usuário já está sendo usado! Utilize outro')
            window.location = 'home.html'

            ;
        });
}

function enviar (e){
    e.preventDefault();
    entrarSala(texto.value);
}

texto.addEventListener('input', habilitarBotao);
form.addEventListener('submit', enviar);

