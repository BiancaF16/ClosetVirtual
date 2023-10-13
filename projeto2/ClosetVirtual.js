// Menu Bar

const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
})

// Upload Preview

const inputFile = document.querySelector('#pictureInput');
const pictureImage = document.querySelector('.pictureImage');
const pictureImageTxt = "Escolha um arquivo";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function (e) {
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture_img');

            pictureImage.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
})


// Modal PopUp

function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e) => {
            if (e.target.id === modalID || e.target.id === 'fecharPop') {
                modal.classList.remove('mostrar');
            }
        });
    }
}

function teste() {
    iniciaModal('modaljs')
}


// Cadastrar Produto

const botaao = document.querySelector(".cadastrarPd");
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
const cards = document.getElementsByClassName('cards')
const formulario = document.getElementsByClassName('formulario')

function exibirProdutos() {
    let containerProdutos = document.getElementById('containerProdutos');
    for (const [index, produto] of produtos.entries()) {
        const novoCard = document.createElement('div');
        novoCard.classList.add('cardPd');
        novoCard.setAttribute('data-index', index); 
        novoCard.innerHTML = `
         <div class='cardPd'>
            <div class='img'>
                <img src='${produto.pictureInput}' alt='Imagem do Produto'/>
            </div>
            <div class="content">
                <h3 class="nomeProduto">${produto.nomeProd}</h3>
                <div class="price">R$${produto.precoProd}</div>
            </div>
            <button class="carro" onclick="adicionarAoCarrinho(${produtos.indexOf(produto)})"><img src="image/carrinho.png" alt=""></button>
            <button class="lixo" onclick="excluirProduto(this, ${index})"><img src="image/iconLixeira.png" alt=""></button>
     </div>`;
    
     containerProdutos.appendChild(novoCard);
    }
}

function excluirProduto(element, index) {
    produtos.splice(index, 1); 
    localStorage.setItem('produtos', JSON.stringify(produtos));
    element.remove(); 
    location.reload();
}


exibirProdutos();

function saveProduct() {
    const nomeProd = document.getElementById('nomeProd').value;
    const precoProd = parseFloat(document.getElementById('precoProd').value);
    const pictureInput = document.getElementById('pictureInput');
    const pictureFileName = pictureInput.files[0].name;

    const novoProduto = { nomeProd, precoProd, pictureInput: pictureFileName };

    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function excluirDiv() {
    const caard = document.querySelector('.cardPd');
    if (caard) {
        caard.remove();
    }
}

//CARRINHO DE COMPRAS

const botaoSacola = document.querySelector('#abrirCart');
botaoSacola.addEventListener('click', mostrarCarrinho);

function mostrarCarrinho() {
    const carrinhoCompras = document.querySelector('.carrinhoCompras');

    if (carrinhoCompras) {
        carrinhoCompras.classList.add('mostraCarrinho');
    }
}

const fecharCarro = document.querySelector('.fecharCarrinho');
fecharCarro.addEventListener('click' , fecharCarrinho);

function fecharCarrinho(){
    const carrinhoCp = document.querySelector('.carrinhoCompras');
    if(carrinhoCp) {
        carrinhoCp.classList.remove('mostraCarrinho');
    }
}

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = 0;

//adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
     // Verifique se o preço é um número válido antes de adicioná-lo
     if (typeof preco === 'number' && !isNaN(preco)) {
        const produto = {
            nome: nome,
            preco: preco,
        };
        carrinho.push(produto);
        atualizarCarrinho();
        atualizarLocalStorage();
        alert('Produto adicionado ao carrinho')
    } else {
        alert('Produto adicionado ao carrinho');
    }
}

// Atualizar o carrinho
function atualizarCarrinho() {
    const listaProdutos = document.querySelector(".listaProdutos");
  
    total = 0; // Zera o total

    listaProdutos.innerHTML = ''; // Limpa a lista de produtos

    carrinho.forEach((produto, index) => {
        listaProdutos.innerHTML += `
        <li>
            ${produto.nome}
            <div class="priceRemove">R$${produto.preco}
            <button class="removecart" onclick="removerDoCarrinho(${index})">
            <img src='image/iconLixeira.png'></button>
            </div>
        </li>
    `;
        total += produto.preco;
    });

    const totalSpan = document.querySelector(".total");
    totalSpan.textContent = `R$ ${total}`;
}


// Remover um produto do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    atualizarLocalStorage();
}

// Atualizar o LocalStorage com os dados do carrinho
function atualizarLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

//Botão adicionar ao carrinho
const botoesAdicionar = document.querySelectorAll(".carro");
const fecharCarrinhoBtn = document.querySelector(".fecharCarrinho");

botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        const card = document.querySelectorAll(".cardPd")[index];
        const nome = card.querySelector("h3").textContent;
        const preco = parseFloat(card.querySelector(".price").textContent.replace("R$", "").trim());

        adicionarAoCarrinho(nome, preco);
    });
});

// Inicializar o carrinho com dados do LocalStorage
window.addEventListener('DOMContentLoaded', () => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinhoSalvo) {
        carrinho.push(...carrinhoSalvo);
        atualizarCarrinho();
    }
});