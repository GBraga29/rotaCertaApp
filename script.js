// Variável global para armazenar o perfil selecionado
let selectedProfile = 'consumer';

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

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Inicialização - mostra a tela de boas-vindas
window.addEventListener('DOMContentLoaded', () => {
    showScreen('welcomeScreen');
});

