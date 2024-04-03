let participantes = [
  {
  nome: "João Ferreira",
  email: "joao@gmail.com",
  dataInscricao: new Date(2024, 2, 3, 19, 19),
  dataCheckIn: new Date (2024, 2, 26, 19, 19)
  },
  {
    nome: "Giovanna Marques",
    email: "Giovanna@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 7, 7),
    dataCheckIn: new Date(2024, 2, 26, 19, 19)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 15, 45),
    dataCheckIn: new Date(2024, 1, 10, 9, 30)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 8, 0),
    dataCheckIn: new Date(2024, 2, 1, 17, 45)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 20),
    dataCheckIn: new Date(2024, 2, 5, 11, 30)
  },
  {
    nome: "Fernanda Lima",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 0, 28, 11, 10),
    dataCheckIn: new Date(2024, 2, 10, 8, 45)
  },
  {
    nome: "Lucas Pereira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 17, 55),
    dataCheckIn: new Date(2024, 2, 15, 16, 20)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 13, 30),
    dataCheckIn: new Date(2024, 2, 20, 10, 10)
  },
  {
    nome: "Gustavo Martins",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 9, 40),
    dataCheckIn: new Date(2024, 2, 25, 12, 15)
  },
  {
    nome: "Juliana Oliveira",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 16, 0),
    dataCheckIn: new Date(2024, 1, 5, 8, 30)
  }
];
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}