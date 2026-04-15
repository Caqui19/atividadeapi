let listaPersonagens = []

async function carregarPersonagens() {
    const container = document.getElementById("cardsContainer")
    container.innerHTML = "<p>Carregando...</p>"

    try {
        const resposta = await fetch("https://api.jikan.moe/v4/anime/38000/characters")
        const dados = await resposta.json()
        listaPersonagens = dados.data

        container.innerHTML = ''

        personagens.forEach(item => {
            const personagem = item.character

            const card = document.createElement("div")
            card.classList.add("card")

            card.innerHTML = `
                <img src="${personagem.images.jpg.image_url}">
                <div class="card-content">
                    <h3>${personagem.name}</h3>
                    <p><strong>Papel: </strong>${item.role}</p>
                    <p><strong>Favoritos: </strong>${item.favorites || "Sem favoritos"}</p>
                    <p><strong>ID: </strong>${personagem.mal_id || "Desconhecido"}</p>
                </div>
            `

            container.appendChild(card)
        })
    }
    catch (erro) {
        console.error(erro)
    }
}

document.addEventListener("DOMContentLoaded", () => { carregarPersonagens(renderizarPersonagens(listaPersonagens)) })

function renderizarPersonagens(personagens) {
    const container = document.getElementById("cardsContainer")
    container.innerHTML = ''

    personagens.forEach(item => {
        const personagem = item.character

        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
                <img src="${personagem.images.jpg.image_url}">
                <div class="card-content">
                    <h3>${personagem.name}</h3>
                    <p><strong>Papel: </strong>${item.role}</p>
                    <p><strong>Favoritos: </strong>${item.favorites || "Sem favoritos"}</p>
                    <p><strong>ID: </strong>${personagem.mal_id || "Desconhecido"}</p>
                </div>
            `

        container.appendChild(card)
    })
}

const input = document.getElementById("search-input")
const button = document.getElementById("search-button")

button.addEventListener("click", buscar)
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") buscar()
})

function buscar() {
    const termo = input.value.toLowerCase()
    const filtrados = listaPersonagens.filter(item => item.character.name.toLowerCase().includes(termo)
    )

    renderizarPersonagens(filtrados)
}