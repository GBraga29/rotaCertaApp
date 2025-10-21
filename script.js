// Dados mockados dos postos
const postosData = [
    {
        id: 1,
        nome: 'Posto Ipiranga - Av. Paulista',
        distancia: 1.2,
        segmento: 'bandeira',
        comodidadesCarro: ['Fraldário', 'Wi-Fi', 'Loja de Conveniência', 'Ar Gratuito'],
        comodidadesCaminhao: ['Pátio Vigiado', 'Chuveiro', 'Restaurante', 'Borracharia'],
        combustiveis: [
            {
                tipo: 'Gasolina Comum',
                preco: 5.65,
                atualizadoEm: '2025-10-21T11:55:00-03:00',
                notaQualidade: 4.5,
                seloANP: true
            },
            {
                tipo: 'Gasolina Aditivada',
                preco: 5.89,
                atualizadoEm: '2025-10-21T11:55:00-03:00',
                notaQualidade: 4.8,
                seloANP: true
            },
            {
                tipo: 'Etanol',
                preco: 3.99,
                atualizadoEm: '2025-10-21T11:50:00-03:00',
                notaQualidade: 4.2,
                seloANP: true
            }
        ]
    },
    {
        id: 2,
        nome: 'Posto Certo (Bandeira Branca)',
        distancia: 2.4,
        segmento: 'bandeira_branca',
        comodidadesCarro: ['Wi-Fi', 'Ar Gratuito'],
        comodidadesCaminhao: ['Pátio Vigiado', 'Chuveiro'],
        combustiveis: [
            {
                tipo: 'Gasolina Comum',
                preco: 5.55,
                atualizadoEm: '2025-10-21T09:30:00-03:00',
                notaQualidade: 3.8,
                seloANP: false
            },
            {
                tipo: 'Etanol',
                preco: 3.85,
                atualizadoEm: '2025-10-21T09:30:00-03:00',
                notaQualidade: 3.5,
                seloANP: false
            },
            {
                tipo: 'Diesel S-10',
                preco: 6.05,
                atualizadoEm: '2025-10-21T09:25:00-03:00',
                notaQualidade: 4.0,
                seloANP: true
            }
        ]
    },
    {
        id: 3,
        nome: 'Posto BR - Rodovia Anhanguera',
        distancia: 8.1,
        segmento: 'rodovia',
        comodidadesCarro: ['Fraldário', 'Wi-Fi', 'Loja de Conveniência', 'Ar Gratuito', 'Caixa 24h'],
        comodidadesCaminhao: ['Pátio Vigiado', 'Chuveiro', 'Restaurante', 'Borracharia', 'Oficina Mecânica', 'Hotel'],
        combustiveis: [
            {
                tipo: 'Diesel S-10',
                preco: 5.99,
                atualizadoEm: '2025-10-21T12:00:00-03:00',
                notaQualidade: 4.9,
                seloANP: true
            },
            {
                tipo: 'Gasolina Comum',
                preco: 5.79,
                atualizadoEm: '2025-10-21T12:00:00-03:00',
                notaQualidade: 4.6,
                seloANP: true
            },
            {
                tipo: 'Arla 32',
                preco: 3.50,
                atualizadoEm: '2025-10-21T12:00:00-03:00',
                notaQualidade: 5.0,
                seloANP: true
            }
        ]
    }
];

// Variável global para armazenar o perfil selecionado
let selectedProfile = 'consumer';

// Filtros ativos
let filtroSegmento = 'todos';
let filtroPerfil = 'carro';

// Histórico de navegação para voltar corretamente
let navigationHistory = [];

// Função principal para mostrar telas
function showScreen(screenId) {
    // Esconde todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostra a tela solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Adiciona ao histórico de navegação (exceto para telas especiais)
        if (!['welcomeScreen', 'loginScreen', 'createAccountScreen', 'forgotPasswordScreen'].includes(screenId)) {
            navigationHistory.push(screenId);
            // Limita o histórico a 10 itens
            if (navigationHistory.length > 10) {
                navigationHistory.shift();
            }
        }
    }
}

// Função para selecionar perfil na tela de boas-vindas
function selectProfile(profile) {
    selectedProfile = profile;
    showScreen('loginScreen');
}

// Função para lidar com o login
function handleLogin() {
    // Simula verificação de login
    if (selectedProfile === 'owner') {
        // Se for dono de posto, vai para escolha de plano
        showScreen('planChoiceScreen');
    } else {
        // Se for consumidor, vai para dashboard de consumidor
        showScreen('userDashboardScreen');
    }
}

// Função para lidar com criação de conta
function handleCreateAccount() {
    // Simula criação de conta
    if (selectedProfile === 'owner') {
        // Se for dono de posto, vai para escolha de plano
        showScreen('planChoiceScreen');
    } else {
        // Se for consumidor, vai para dashboard de consumidor
        showScreen('userDashboardScreen');
    }
}

// Função para navegar entre telas do usuário e atualizar botões ativos
function showUserScreen(screenId, button) {
    // Mostra a tela
    showScreen(screenId);
    
    // Atualiza os botões ativos em todas as barras de navegação
    const allNavBtns = document.querySelectorAll('.nav-btn');
    allNavBtns.forEach(btn => btn.classList.remove('active'));
    
    // Ativa os botões correspondentes em todas as navegações
    const targetBtns = document.querySelectorAll(`[onclick*="${screenId}"]`);
    targetBtns.forEach(btn => {
        if (btn.classList.contains('nav-btn')) {
            btn.classList.add('active');
        }
    });
}

// Função para abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Função para fechar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Função para reagir à concorrência
function reactToCompetitor(action) {
    let message = '';
    
    switch(action) {
        case 'cover':
            message = 'Preço atualizado para R$ 5,59 (Cobrir concorrente)';
            break;
        case 'beat':
            message = 'Preço atualizado para R$ 5,58 (Bater concorrente)';
            break;
        default:
            message = 'Ação registrada';
    }
    
    alert(message);
    closeModal('reactionModal');
}

// Função para voltar à tela anterior
function goBack() {
    // Remove a tela atual do histórico
    if (navigationHistory.length > 0) {
        navigationHistory.pop();
    }
    
    // Se há histórico, volta para a tela anterior
    if (navigationHistory.length > 0) {
        const previousScreen = navigationHistory[navigationHistory.length - 1];
        showScreen(previousScreen);
    }
    // Se não há histórico, volta para a tela apropriada baseada no perfil
    else {
        if (selectedProfile === 'owner') {
            showScreen('proDashboardScreen');
        } else {
            showScreen('userDashboardScreen');
        }
    }
}

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Função para calcular tempo desde atualização
function calcularTempoDesdeAtualizacao(dataHora) {
    const agora = new Date();
    const dataAtualizacao = new Date(dataHora);
    const diferencaMs = agora - dataAtualizacao;
    const diferencaMin = Math.floor(diferencaMs / 60000);
    
    if (diferencaMin < 60) {
        return `Atualizado há ${diferencaMin} min`;
    } else if (diferencaMin < 1440) {
        const horas = Math.floor(diferencaMin / 60);
        return `Atualizado há ${horas}h`;
    } else {
        const dias = Math.floor(diferencaMin / 1440);
        return `Atualizado há ${dias}d`;
    }
}

// Função para renderizar estrelas de qualidade
function renderizarEstrelas(nota) {
    const estrelas = [];
    const notaArredondada = Math.round(nota * 2) / 2; // Arredonda para 0.5
    
    for (let i = 1; i <= 5; i++) {
        if (i <= notaArredondada) {
            estrelas.push('★');
        } else if (i - 0.5 === notaArredondada) {
            estrelas.push('☆');
        } else {
            estrelas.push('☆');
        }
    }
    
    return estrelas.join('');
}

// Função para filtrar postos por segmento
function filtrarPorSegmento(segmento) {
    filtroSegmento = segmento;
    renderizarPostos();
    
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Função para alternar perfil
function alternarPerfil(perfil) {
    filtroPerfil = perfil;
    renderizarPostos();
    
    // Atualiza botões ativos
    document.querySelectorAll('.profile-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Função para renderizar lista de postos
function renderizarPostos() {
    const container = document.getElementById('postosContainer');
    if (!container) return;
    
    // Filtra postos
    let postosFiltrados = postosData;
    
    if (filtroSegmento !== 'todos') {
        postosFiltrados = postosFiltrados.filter(posto => posto.segmento === filtroSegmento);
    }
    
    // Limpa container
    container.innerHTML = '';
    
    // Renderiza cada posto
    postosFiltrados.forEach(posto => {
        const postoElement = document.createElement('div');
        postoElement.className = 'list-item-expandable';
        
        // Seleciona comodidades baseado no perfil
        const comodidades = filtroPerfil === 'carro' ? posto.comodidadesCarro : posto.comodidadesCaminhao;
        
        // Renderiza combustíveis
        const combustiveisHTML = posto.combustiveis.map(combustivel => `
            <div class="combustivel-item">
                <div class="combustivel-info">
                    <div class="combustivel-tipo">${combustivel.tipo}</div>
                    <div class="combustivel-preco">R$ ${combustivel.preco.toFixed(2)}</div>
                </div>
                <div class="combustivel-detalhes">
                    <div class="combustivel-tempo">${calcularTempoDesdeAtualizacao(combustivel.atualizadoEm)}</div>
                    <div class="combustivel-qualidade">
                        <span class="estrelas">${renderizarEstrelas(combustivel.notaQualidade)}</span>
                        <span class="nota">${combustivel.notaQualidade.toFixed(1)}</span>
                    </div>
                    ${combustivel.seloANP ? '<div class="selo-anp">✓ Selo ANP</div>' : ''}
                </div>
            </div>
        `).join('');
        
        // Renderiza comodidades
        const comodidadesHTML = comodidades.map(comodidade => 
            `<span class="comodidade-tag">${comodidade}</span>`
        ).join('');
        
        postoElement.innerHTML = `
            <div class="list-item-header" onclick="togglePostoDetalhes(${posto.id})">
                <div class="list-item-name">${posto.nome}</div>
                <div class="list-item-distance">${posto.distancia} km</div>
            </div>
            <div class="posto-detalhes" id="posto-${posto.id}">
                <div class="combustiveis-section">
                    <h3 class="section-subtitle">Combustíveis</h3>
                    ${combustiveisHTML}
                </div>
                <div class="comodidades-section">
                    <h3 class="section-subtitle">Comodidades</h3>
                    <div class="comodidades-list">
                        ${comodidadesHTML}
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(postoElement);
    });
}

// Função para expandir/recolher detalhes do posto
function togglePostoDetalhes(postoId) {
    const detalhes = document.getElementById(`posto-${postoId}`);
    if (detalhes) {
        detalhes.classList.toggle('expanded');
    }
}

// Inicialização - mostra a tela de boas-vindas
window.addEventListener('DOMContentLoaded', () => {
    showScreen('welcomeScreen');
    
    // Renderiza postos se estiver na tela de lista
    setTimeout(() => {
        renderizarPostos();
    }, 100);
});

