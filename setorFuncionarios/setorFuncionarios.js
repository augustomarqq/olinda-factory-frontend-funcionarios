import { buscarSetorX, buscarProblemas, criarRelato } from "../apiAccess.js";

const titleName = document.querySelector("#title")
const funcionariosContainer = document.querySelector("#funcionarios-container");
const displayName = document.querySelector("#setor-nome-display");
const funcionarioNomeDisplay = document.querySelector("#funcionario-nome");
const problemasContainer = document.querySelector("#problemas-container");

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const setorId = localStorage.getItem('setor-id-atual');
        if (!setorId) {
            throw new Error('Setor não encontrado no localStorage');
        }

        const setor = await buscarSetorX(setorId);
        const funcionarios = setor.funcionarios;

        titleName.innerText = 'Setor ' + setor.nome;
        displayName.innerText = 'Funcionários do setor ' + setor.nome;

        funcionariosContainer.innerHTML = '';

        funcionarios.forEach(f => {
            const div = document.createElement('div');
            div.classList.add('card', 'funcionario');
            div.style.cursor = 'pointer';
            div.style.margin = '1rem';
            div.style.padding = '1rem';

            const nomeElement = document.createElement('p');
            nomeElement.textContent = `Nome: ${f.nome}`;
            nomeElement.classList.add('text-bold');
            nomeElement.style.margin = '0.5rem';

            const cargoElement = document.createElement('p');
            cargoElement.textContent = `Cargo: ${f.cargo}`;
            cargoElement.classList.add('text-muted');
            cargoElement.style.margin = '0.5rem';

            div.appendChild(nomeElement);
            div.appendChild(cargoElement);
            funcionariosContainer.appendChild(div);

            div.addEventListener('click', async () => {
                localStorage.setItem('funcionario-nome', f.nome);
                funcionarioNomeDisplay.textContent = `Funcionário: ${f.nome}`;
                
                problemasContainer.innerHTML = '';

                const problemas = await buscarProblemas();

                problemas.forEach(p => {
                    const problemaDiv = document.createElement('div');
                    problemaDiv.classList.add('problema-option');
                    problemaDiv.textContent = p.descricao;
                    problemaDiv.style.cursor = 'pointer';
                    problemaDiv.style.margin = '0.5rem 0';

                    
                    problemaDiv.addEventListener('click', async () => {
                        const setorId = localStorage.getItem('setor-id-atual');
                        const problemaId = p.id;
                        await criarRelato(setorId, problemaId);
                        alert('Problema reportado com sucesso. Obrigado!');
                        
                        const modal = bootstrap.Modal.getInstance(document.getElementById('relatoModal'));
                        modal.hide();
                    });

                    problemasContainer.appendChild(problemaDiv);
                });

                const modal = new bootstrap.Modal(document.getElementById('relatoModal'));
                modal.show();
            });
        });
    } catch (error) {
        console.error('Erro:', error.message);
    }
});
