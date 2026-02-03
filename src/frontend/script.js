const API_URL = '';

// Estado da aplicação
let treinadores = [];
let pokemons = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    inicializarTabs();
    inicializarFormularios();
    carregarDados();
});

// Sistema de Tabs
function inicializarTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Inicializar formulários
function inicializarFormularios() {
    document.getElementById('form-treinador').addEventListener('submit', cadastrarTreinador);
    document.getElementById('form-pokemon').addEventListener('submit', cadastrarPokemon);
    document.getElementById('form-batalha').addEventListener('submit', simularBatalha);
}

// Carregar dados iniciais
async function carregarDados() {
    await carregarTreinadores();
    await carregarPokemons();
}

// API - Treinadores
async function carregarTreinadores() {
    try {
        const response = await fetch(`${API_URL}/treinadores`);
        if (!response.ok) throw new Error('Erro ao carregar treinadores');
        
        treinadores = await response.json();
        renderizarTreinadores();
        atualizarSelectTreinadores();
    } catch (error) {
        mostrarMensagem('Erro ao carregar treinadores', 'erro');
        console.error(error);
    }
}

async function cadastrarTreinador(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome-treinador').value.trim();
    
    if (!nome) {
        mostrarMensagem('Nome do treinador é obrigatório', 'erro');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/treinadores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.erro || 'Erro ao cadastrar treinador');
        }
        
        mostrarMensagem('Treinador cadastrado com sucesso!', 'sucesso');
        document.getElementById('form-treinador').reset();
        await carregarTreinadores();
    } catch (error) {
        mostrarMensagem(error.message, 'erro');
        console.error(error);
    }
}

function renderizarTreinadores() {
    const lista = document.getElementById('lista-treinadores');
    
    if (treinadores.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">Nenhum treinador cadastrado</p>';
        return;
    }
    
    lista.innerHTML = treinadores.map(t => `
        <div class="card">
            <h3>👤 ${t.nome}</h3>
            <p><strong>ID:</strong> ${t.id}</p>
            <p><strong>Pokémons:</strong> ${pokemons.filter(p => p.treinador_id === t.id).length}</p>
        </div>
    `).join('');
}

function atualizarSelectTreinadores() {
    const select = document.getElementById('treinador-pokemon');
    select.innerHTML = '<option value="">Selecione o treinador</option>' +
        treinadores.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
}

// API - Pokémons
async function carregarPokemons() {
    try {
        const response = await fetch(`${API_URL}/pokemons`);
        if (!response.ok) throw new Error('Erro ao carregar pokémons');
        
        pokemons = await response.json();
        renderizarPokemons();
        atualizarSelectPokemons();
    } catch (error) {
        mostrarMensagem('Erro ao carregar pokémons', 'erro');
        console.error(error);
    }
}

async function cadastrarPokemon(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome-pokemon').value.trim();
    const tipo = document.getElementById('tipo-pokemon').value;
    const nivel = parseInt(document.getElementById('nivel-pokemon').value);
    const treinador_id = parseInt(document.getElementById('treinador-pokemon').value);
    
    if (!nome || !tipo || !treinador_id) {
        mostrarMensagem('Todos os campos são obrigatórios', 'erro');
        return;
    }
    
    if (nivel < 1) {
        mostrarMensagem('Nível deve ser maior ou igual a 1', 'erro');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/pokemons`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, tipo, nivel, treinador_id })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.erro || 'Erro ao cadastrar pokémon');
        }
        
        mostrarMensagem('Pokémon cadastrado com sucesso!', 'sucesso');
        document.getElementById('form-pokemon').reset();
        await carregarPokemons();
        renderizarTreinadores();
    } catch (error) {
        mostrarMensagem(error.message, 'erro');
        console.error(error);
    }
}

function renderizarPokemons() {
    const lista = document.getElementById('lista-pokemons');
    
    if (pokemons.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">Nenhum pokémon cadastrado</p>';
        return;
    }
    
    lista.innerHTML = pokemons.map(p => {
        const treinador = treinadores.find(t => t.id === p.treinador_id);
        return `
            <div class="card">
                <h3>🔴 ${p.nome}</h3>
                <p><strong>ID:</strong> ${p.id}</p>
                <p><strong>Nível:</strong> ${p.nivel}</p>
                <span class="tipo ${p.tipo}">${obterIconeTipo(p.tipo)} ${p.tipo}</span>
                <p style="margin-top: 10px;"><strong>Treinador:</strong> ${treinador ? treinador.nome : 'Desconhecido'}</p>
            </div>
        `;
    }).join('');
}

function atualizarSelectPokemons() {
    const selectAtacante = document.getElementById('pokemon-atacante');
    const selectDefensor = document.getElementById('pokemon-defensor');
    
    const options = '<option value="">Selecione um Pokémon</option>' +
        pokemons.map(p => `<option value="${p.id}">${p.nome} (Nv. ${p.nivel} - ${p.tipo})</option>`).join('');
    
    selectAtacante.innerHTML = options;
    selectDefensor.innerHTML = options;
}

function obterIconeTipo(tipo) {
    const icones = {
        'fogo': '🔥',
        'agua': '💧',
        'planta': '🌿',
        'eletrico': '⚡',
        'normal': '⭐'
    };
    return icones[tipo.toLowerCase()] || '⭐';
}

// API - Batalhas
async function simularBatalha(e) {
    e.preventDefault();
    
    const pokemon_atacante_id = parseInt(document.getElementById('pokemon-atacante').value);
    const pokemon_defensor_id = parseInt(document.getElementById('pokemon-defensor').value);
    
    if (!pokemon_atacante_id || !pokemon_defensor_id) {
        mostrarMensagem('Selecione ambos os pokémons', 'erro');
        return;
    }
    
    if (pokemon_atacante_id === pokemon_defensor_id) {
        mostrarMensagem('Um pokémon não pode batalhar contra si mesmo', 'erro');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/batalhas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pokemon_atacante_id, pokemon_defensor_id })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.erro || 'Erro ao simular batalha');
        }
        
        const resultado = await response.json();
        exibirResultadoBatalha(resultado);
    } catch (error) {
        mostrarMensagem(error.message, 'erro');
        console.error(error);
    }
}

function exibirResultadoBatalha(resultado) {
    const container = document.getElementById('resultado-batalha');
    const conteudo = document.getElementById('resultado-conteudo');
    
    if (resultado.resultado === 'empate') {
        conteudo.innerHTML = `
            <div class="resultado-empate">
                <h3>🤝 Empate!</h3>
                <p>${resultado.mensagem}</p>
            </div>
        `;
    } else {
        conteudo.innerHTML = `
            <div class="resultado-vitoria">
                <h3>🏆 Vitória!</h3>
                <p><strong>Vencedor:</strong> ${resultado.vencedor.nome}</p>
                <p><strong>Perdedor:</strong> ${resultado.perdedor.nome}</p>
            </div>
        `;
    }
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Sistema de mensagens
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    
    setTimeout(() => mensagem.classList.add('show'), 10);
    
    setTimeout(() => {
        mensagem.classList.remove('show');
    }, 3000);
}
