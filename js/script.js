const usuario = localStorage.getItem("usuario");

const mensagem = document.querySelector(".chat");

const botao = document.querySelector(".botao");

const icone = document.querySelector('.icone');

const cnt = document.querySelector('.nome');

let contato = 'Todos'
let tipoMensagem = 'message';

icone.addEventListener("click", function () {
    console.log('cliquei')
    if(icone.icludes.classList('escondido')){
        icone.classList.remove('.escondido');
    }
});

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let texto = document.querySelector(".texto");
    enviarMensagem(usuario, "Todos", texto.value, "message");
    texto.value = "";
  }
});

function atualizarChat() {
  const mensagemStatus = document.querySelector(".chat");
  const mensagemReservada = document.querySelector('footer')
  axios
    .get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then((response) => {
        console.log('atualizar chat')
      for (let mensagem of response.data) {
        if (mensagem.type == "status") {
          let item = `<p class="status">
                            <span class="hora"> ${mensagem.time}
                            </span><strong>${mensagem.from}</strong> ${mensagem.text}
                        </p>`;
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        } /* else if (mensagem.type == "message") {
          let item = `<p class="reservado">
                            <span class="hora"> ${mensagem.time} 
                            </span><strong> ${mensagem.from}}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text}
                        </p>`;
            let msg = `<p>Enviando para ${mensagem.to} (reservadamente)</p>`
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
          mensagemReservada.innerHTML = mensagemReservada + msg;
        }  */else if (mensagem.type == "message") {
          let item = `<p class="todos">
                            <span class="hora"> ${mensagem.time}
                            </span><strong>${mensagem.from}</strong> para<strong>${mensagem.to}</strong>: ${mensagem.text}
                        </p>`;
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        }
      }
    })
    .catch((error) => {
      console.log(`atualizarChat: ${error}`);
    });
  const mensagem = document.querySelector(".chat p:last-child");
  mensagem.scrollIntoView();
}

function manterConexao() {
  const url = "https://mock-api.driven.com.br/api/v6/uol/status";
  const informacoes = { name: usuario };
  axios
    .post(url, informacoes)
    .then((response) => 
    {
            console.log('manter conexão')
    })
    .catch((error) => 
    {
        console.log(error)
    window.location = "home.html";
    });
}

function enviarMensagem(quem, para, texto, tipo) {
  const url = "https://mock-api.driven.com.br/api/v6/uol/messages";

  const informacoes = { from: quem, to: para, text: texto, type: tipo };
  console.log(informacoes);
  axios
    .post(url, informacoes)
    .then((response) => {
      atualizarChat()
    })
    .catch((error) => {
      console.log(`enviarMensagem: ${error}`);
    });
}

setInterval(manterConexao, 5000);

setInterval(atualizarChat, 1000);