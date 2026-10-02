let jogos = [
  {
    id: 1,
    nome: "The Witcher 3",
    genero: "RPG",
    sinopse: "Geralt busca por Ciri em um mundo aberto devastado pela guerra.",
    favorito: false
  },
  {
    id: 2,
    nome: "Hollow Knight",
    genero: "Metroidvania",
    sinopse: "Explore um vasto reino subterrâneo cheio de insetos e segredos.",
    favorito: true
  }
];

const app = document.querySelector("#app");
const botoes = document.querySelectorAll("nav button");

botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".ativo").classList.remove("ativo");
    btn.classList.add("ativo");
    renderizar(btn.dataset.rota);
  });
});

function renderizar(rota) {
  if (rota === "catalogo") mostrarCatalogo();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "gerenciar") mostrarGerenciar();
  if (rota === "favoritos") mostrarFavoritos();
}

function mostrarCatalogo() {
  app.innerHTML = `<h1>Catálogo de Jogos</h1><div class="lista-jogos"></div>`;
  renderizarJogos(jogos);
}

function mostrarFavoritos() {
  app.innerHTML = `<h1>Meus Favoritos</h1><div class="lista-jogos"></div>`;
  const favs = jogos.filter(j => j.favorito);
  renderizarJogos(favs);
}

function renderizarJogos(lista) {
  const container = app.querySelector(".lista-jogos");
  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }
  
  let html = "";
  lista.forEach(jogo => {
    html += `
      <div class="jogo">
        <h2>${jogo.nome}</h2>
        <div class="genero">${jogo.genero}</div>
        <p>${jogo.sinopse}</p>
        <button class="btn-favorito ${jogo.favorito ? 'ativo' : ''}" onclick="alternarFavorito(${jogo.id})">
          ${jogo.favorito ? 'Remover Favorito' : 'Marcar Favorito'}
        </button>
      </div>
    `;
  });
  container.innerHTML = html;
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Novo Jogo</h1>
    <form id="form-jogo">
      <div>
        <label>Nome:</label>
        <input type="text" id="nome" required>
      </div>
      <div>
        <label>Gênero:</label>
        <input type="text" id="genero" required>
      </div>
      <div>
        <label>Sinopse:</label>
        <textarea id="sinopse" required></textarea>
      </div>
      <button type="submit">Salvar</button>
    </form>
  `;
  
  document.getElementById("form-jogo").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const sinopse = document.getElementById("sinopse").value;
    
    jogos.push({
      id: Date.now(),
      nome,
      genero,
      sinopse,
      favorito: false
    });
    
    document.querySelector("[data-rota='catalogo']").click();
  });
}

function mostrarGerenciar() {
  app.innerHTML = `<h1>Gerenciar Jogos</h1><div class="lista-jogos" id="lista-gerenciar"></div>`;
  const container = document.getElementById("lista-gerenciar");
  
  if (jogos.length === 0) {
    container.innerHTML = "<p>Nenhum jogo para gerenciar.</p>";
    return;
  }

  let html = "";
  jogos.forEach(jogo => {
    html += `
      <div class="jogo">
        <h2>${jogo.nome}</h2>
        <div class="genero">${jogo.genero}</div>
        <div style="margin-top: 10px;">
          <button style="padding: 5px; cursor: pointer;" onclick="mostrarEditar(${jogo.id})">Editar</button>
          <button style="padding: 5px; cursor: pointer; color: red;" onclick="excluirJogo(${jogo.id})">Excluir</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function excluirJogo(id) {
  if(confirm("Tem certeza que deseja excluir este jogo?")) {
    jogos = jogos.filter(j => j.id !== id);
    mostrarGerenciar();
  }
}

function mostrarEditar(id) {
  const jogo = jogos.find(j => j.id === id);
  if (!jogo) return;

  app.innerHTML = `
    <h1>Editar Jogo</h1>
    <form id="form-editar">
      <div>
        <label>Nome:</label>
        <input type="text" id="edit-nome" value="${jogo.nome}" required>
      </div>
      <div>
        <label>Gênero:</label>
        <input type="text" id="edit-genero" value="${jogo.genero}" required>
      </div>
      <div>
        <label>Sinopse:</label>
        <textarea id="edit-sinopse" required>${jogo.sinopse}</textarea>
      </div>
      <button type="submit">Atualizar</button>
      <button type="button" onclick="mostrarGerenciar()" style="margin-top: 5px; background: #999;">Cancelar</button>
    </form>
  `;

  document.getElementById("form-editar").addEventListener("submit", (e) => {
    e.preventDefault();
    jogo.nome = document.getElementById("edit-nome").value;
    jogo.genero = document.getElementById("edit-genero").value;
    jogo.sinopse = document.getElementById("edit-sinopse").value;
    mostrarGerenciar();
  });
}

function alternarFavorito(id) {
  const jogo = jogos.find(j => j.id === id);
  if (jogo) {
    jogo.favorito = !jogo.favorito;
    const rotaAtiva = document.querySelector(".ativo").dataset.rota;
    renderizar(rotaAtiva);
  }
}

renderizar("catalogo");