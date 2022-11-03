const usuario = localStorage.getItem("usuario");

const mensagem = document.querySelector(".chat");

const botao = document.querySelector(".botao");

const icone = document.querySelector(".icone");

const cnt = document.querySelector(".nome");

let contato = "Todos";
let tipoMensagem = "message";

icone.addEventListener("click", function () {
  console.log("cliquei");
  if (icone.includes.classList("escondido")) {
    icone.classList.remove(".escondido");
  }
});

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let texto = document.querySelector(".texto");
    enviarMensagem(usuario, "Todos", texto.value, "message");
    texto.value = "";
  }
});

botao.addEventListener("click", function () {
  let texto = document.querySelector(".texto");
  enviarMensagem(usuario, "Todos", texto.value, "message");
  texto.value = "";
});

function selecionarContato(destinatario, contatoClicado) {
  contato = destinatario;
  const contatoClicadoAnteriormente = document.querySelector(
    ".contatos .selecionado"
  );
  console.log(contatoClicadoAnteriormente)
  contatoClicadoAnteriormente.classList.remove(".selecionado");

  contatoClicado.classList.add("selecionado");
}

function mostrarContatos(resposta) {
  const contatos = document.querySelector(".contatos");

  contatos.innerHTML = `<div class="publico" >
                              <ion-icon class="icones" name="people-sharp"></ion-icon
                              ><span class="nome">Todos</span
                              ><ion-icon class="check" name="checkmark-outline"> </ion-icon>
                          </div>`;

  let item;

  let participante;

  let selecionado = "";

  for (let i = 0; i < resposta.data.length; i++) {
    participante = resposta.data[i];

    if (participante.name === destinatario) {
      selecionado = "selecionado";
    } else {
      selecionado = "";
    }

    item = `<div class="privado ${selecionado}">
                      <ion-icon class="icones" name="person-circle"></ion-icon
                      ><span class="nome">${participante.name}</span
                      ><ion-icon class="check" name="checkmark-outline"> </ion-icon>
                  </div>`;

    contatos.innerHTML += item;
  }
}

cnt.addEventListener("click", function(){selecionarContato()});

function atualizarChat() {
  const mensagemStatus = document.querySelector(".chat");
  const mensagemReservada = document.querySelector("footer");
  axios
    .get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then((response) => {
      console.log("atualizar chat");
      for (let mensagem of response.data) {
        if (mensagem.type == "status") {
          let item = `<p class="status" data-test="message">
                            <span class="hora"> ${mensagem.time}
                            </span><strong>${mensagem.from}</strong> ${mensagem.text}
                        </p>`;
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        } /* else if (mensagem.type == "message") {
          let item = `<p class="reservado" data-test="message">
                            <span class="hora"> ${mensagem.time} 
                            </span><strong> ${mensagem.from}}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text}
                        </p>`;
            let msg = `<p>Enviando para ${mensagem.to} (reservadamente)</p>`
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
          mensagemReservada.innerHTML = mensagemReservada + msg;
        }  */ else if (mensagem.type == "message") {
          let item = `<p class="todos">
                            <span class="hora" data-test="message"> ${mensagem.time}
                            </span><strong>${mensagem.from}</strong> para<strong>${mensagem.to}</strong>: ${mensagem.text}
                        </p>`;
          mensagemStatus.innerHTML = mensagemStatus.innerHTML + item;
        }
      }
        const mensagem = document.querySelector(".chat p:last-child");
  console.log(mensagem)
  mensagem.scrollIntoView();
    })
    .catch((error) => {
      console.log(`atualizarChat: ${error}`);
    });
}

function manterConexao() {
  const url = "https://mock-api.driven.com.br/api/v6/uol/status";
  const informacoes = { name: usuario };
  axios
    .post(url, informacoes)
    .then((response) => {
      console.log("manter conexão");
    })
    .catch((error) => {
      console.log(error);
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
      atualizarChat();
    })
    .catch((error) => {
      console.log(`enviarMensagem: ${error}`);
    });
}

function tipoDeMensagem(tipo, contatoClicado){
  tipoMensagem = tipo;

  const contatoClicadoAnteriormente = document.querySelector('.visibilidade .selecionado');
  contatoClicadoAnteriormente.classList.remove('selecionado');
  
  contatoClicado.classList.add('selecionado');
}

setInterval(manterConexao, 5000);

setInterval(atualizarChat, 1000);
