import { buscarSetores } from "/apiAccess.js";

const setoresContainer = document.querySelector(".cards-container")

document.addEventListener('DOMContentLoaded',()=>renderizarSetores())

async function renderizarSetores(){

    let setores = await buscarSetores()
    
    if(setores.length === 0){
    
        setoresContainer.innerHTML = "<h1>Não existem setores cadascrados</h1>"
    
    }
    else{
    setores.forEach(e => {
    
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardText = document.createElement('p');
    
        card.classList.add('card', 'm-4');
        card.style.width = '12rem';
        card.style.cursor = 'pointer';
    
        cardBody.classList.add('card-body');
        cardText.classList.add('card-text', 'text-center');
    
        cardText.textContent = e.nome;
        
        card.setAttribute('setorId', e.id);
        card.setAttribute('setorNome', e.nome);
        cardBody.appendChild(cardText)
        card.appendChild(cardBody)
        setoresContainer.appendChild(card)
    
        card.addEventListener('click',(e)=>{
        localStorage.setItem("setor-id-atual",e.currentTarget.getAttribute("setorId"))
    
        window.location.replace('./setorFuncionarios/setorFuncionarios.html')
    
    
        })
    
    });
    }
    }