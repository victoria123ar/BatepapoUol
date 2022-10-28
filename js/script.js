const usuario = localStorage.getItem('usuario');

const mensagem = document.querySelector('.mensagem')

const botao = document.querySelector('.botao')

  botao.addEventListener("click", function(e) {
    window.location = 'home.html';
    let texto = document.querySelector(".footer input")
    enviarMensagem(usuario, "Todos", texto.value, "message")
        texto.value = '';
  });

function atualizarChat(){
    const mensagemStatus = document.querySelector('.mensagem');
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(response=>{
    for (let mensagem of response.data){

        if(mensagem.type == "status")
        {
            let item =`<p class="status">
                            <span class="hora">${mensagem.time}
                            </span><strong>${mensagem.from}</strong> ${mensagem.text}
                        </p>`;
            mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        }
        else if(mensagem.type == "message"){
            let item = `<p class="todos">
                            <span class="hora">${mensagem.time}
                            </span><strong>${mensagem.from}</strong> para<strong>${mensagem.to}</strong>: ${mensagem.text}
                        </p>`;
            mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        }
    }
    })
    .catch(error => {
        console.log(`atualizarChat: ${error}`)
    }); 
    const mensagem = document.querySelector('p:last-child');
    mensagem.scrollIntoView();
}

setInterval(atualizarChat, 3000)