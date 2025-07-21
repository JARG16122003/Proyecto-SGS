"use strict";
var _a;
const allFacilities = [
    {
        id: 'gym001',
        name: "Gimnasio Central",
        type: "Gimnasio",
        description: "Equipos modernos de cardio y pesas. Ofrecemos clases de spinning y yoga.",
        location: "Centro deportivo principal, Calle Falsa 123",
        isOnline: true,
        icon: "fitness_center",
    },
    {
        id: 'futbol002',
        name: "Cancha de Fútbol Norte",
        type: "Fútbol",
        description: "Cancha de césped sintético profesional con iluminación nocturna.",
        location: "Complejo deportivo norte, Avenida Siempre Viva 742",
        isOnline: true,
        icon: "sports_soccer",
    },
    {
        id: 'piscina003',
        name: "Piscina Olímpica",
        type: "Piscina",
        description: "Piscina de 50 metros, ideal para competencias y entrenamiento. Climatizada.",
        location: "Centro acuático, Boulevard de los Sueños 456",
        isOnline: false,
        icon: "pool",
    },
    {
        id: 'tennis004',
        name: "Canchas de Tenis Sur",
        type: "Tenis",
        description: "Tres canchas de tenis de arcilla en excelente estado.",
        location: "Club deportivo del Sur, Plaza Mayor 1",
        isOnline: true,
        icon: "sports_tennis",
    }
];
// Función para crear un elemento HTML de tarjeta de instalación
function createFacilityCard(facility) {
    const card = document.createElement('div');
    card.classList.add('facility-card');
    card.innerHTML = `
        <div class="facility-header">
            <div class="facility-icon icon-orange-light">
                <span class="material-icons">${facility.icon}</span>
            </div>
            <h3>${facility.name}</h3>
            <div class="status-indicator ${facility.isOnline ? 'online' : 'offline'}"></div>
        </div>
        <p class="facility-type">${facility.type}</p>
        <p class="facility-description">${facility.description}</p>
        <p class="facility-location">
            <span class="material-icons icon-small">place</span>
            ${facility.location}
        </p>
        <div class="facility-actions">
            <button class="btn primary view-details-btn" data-facility-id="${facility.id}">Ver detalles</button>
            ${facility.isOnline ?
        `<button class="btn primary register-btn" data-facility-id="${facility.id}">Registrarse</button>` :
        `<button class="btn disabled" disabled>No disponible</button>`}
        </div>
    `;
    return card;
}
// Función para renderizar instalaciones basadas en una lista filtrada
function renderFacilities(facilitiesToRender) {
    const facilityListContainer = document.getElementById('facilityList');
    if (!facilityListContainer)
        return;
    facilityListContainer.innerHTML = ''; // Limpiar las tarjetas existentes
    if (facilitiesToRender.length === 0) {
        facilityListContainer.innerHTML = '<p class="no-results">No se encontraron instalaciones que coincidan con su búsqueda.</p>';
        return;
    }
    facilitiesToRender.forEach(facility => {
        const card = createFacilityCard(facility);
        facilityListContainer.appendChild(card);
    });
    // Añadir los escuchadores de eventos para los botones después de que las tarjetas se renderizan
    addCardEventListeners();
}
// Función para manejar la entrada de búsqueda
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim(); // Usar trim para limpiar espacios
    const filteredFacilities = allFacilities.filter(facility => facility.name.toLowerCase().includes(searchTerm) ||
        facility.type.toLowerCase().includes(searchTerm) ||
        facility.description.toLowerCase().includes(searchTerm) ||
        facility.location.toLowerCase().includes(searchTerm));
    renderFacilities(filteredFacilities);
}
// --- Funcionalidad del Modal de Detalles ---
const facilityDetailsModal = document.getElementById('facilityDetailsModal');
const detailsCloseBtn = facilityDetailsModal === null || facilityDetailsModal === void 0 ? void 0 : facilityDetailsModal.querySelector('.details-close-btn');
const modalFacilityName = document.getElementById('modalFacilityName');
const modalFacilityType = document.getElementById('modalFacilityType');
const modalFacilityDescription = document.getElementById('modalFacilityDescription');
const modalFacilityLocation = document.getElementById('modalFacilityLocation');
const modalFacilityStatusText = document.getElementById('modalFacilityStatusText');
const modalFacilityStatusIndicator = document.getElementById('modalFacilityStatusIndicator');
const modalRegisterBtn = document.getElementById('modalRegisterBtn');
function openFacilityDetailsModal(facility) {
    if (!facilityDetailsModal)
        return;
    modalFacilityName.textContent = facility.name;
    modalFacilityType.textContent = facility.type;
    modalFacilityDescription.textContent = facility.description;
    modalFacilityLocation.innerHTML = `<span class="material-icons icon-small">place</span> ${facility.location}`;
    modalFacilityStatusText.textContent = facility.isOnline ? 'En línea' : 'Fuera de línea';
    modalFacilityStatusIndicator.classList.remove('online', 'offline');
    modalFacilityStatusIndicator.classList.add(facility.isOnline ? 'online' : 'offline');
    if (facility.isOnline) {
        modalRegisterBtn.classList.remove('disabled');
        modalRegisterBtn.classList.add('primary');
        modalRegisterBtn.textContent = 'Registrarse';
        modalRegisterBtn.disabled = false;
        modalRegisterBtn.setAttribute('data-facility-id', facility.id);
    }
    else {
        modalRegisterBtn.classList.remove('primary');
        modalRegisterBtn.classList.add('disabled');
        modalRegisterBtn.textContent = 'No disponible';
        modalRegisterBtn.disabled = true;
        modalRegisterBtn.removeAttribute('data-facility-id');
    }
    facilityDetailsModal.classList.add('active');
}
function closeFacilityDetailsModal() {
    if (!facilityDetailsModal)
        return;
    facilityDetailsModal.classList.remove('active');
}
detailsCloseBtn === null || detailsCloseBtn === void 0 ? void 0 : detailsCloseBtn.addEventListener('click', closeFacilityDetailsModal);
facilityDetailsModal === null || facilityDetailsModal === void 0 ? void 0 : facilityDetailsModal.addEventListener('click', (event) => {
    if (event.target === facilityDetailsModal) {
        closeFacilityDetailsModal();
    }
});
// --- Funcionalidad del Modal de Registro ---
const registrationModal = document.getElementById('registrationModal');
const registrationCloseBtn = registrationModal === null || registrationModal === void 0 ? void 0 : registrationModal.querySelector('.registration-close-btn');
const regFacilityName = document.getElementById('regFacilityName');
const regFacilityType = document.getElementById('regFacilityType');
const regFacilityDescription = document.getElementById('regFacilityDescription');
const registrationForm = document.getElementById('registrationForm');
const cancelRegBtn = registrationModal === null || registrationModal === void 0 ? void 0 : registrationModal.querySelector('.cancel-reg-btn');
const confirmRegBtn = registrationModal === null || registrationModal === void 0 ? void 0 : registrationModal.querySelector('.confirm-reg-btn');
let currentFacilityForRegistration = null;
function openRegistrationModal(facility) {
    if (!registrationModal)
        return;
    currentFacilityForRegistration = facility;
    regFacilityName.textContent = facility.name;
    regFacilityType.textContent = facility.type;
    regFacilityDescription.textContent = facility.description;
    const regDateInput = document.getElementById('regDate');
    const regTimeInput = document.getElementById('regTime');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    regDateInput.value = `${yyyy}-${mm}-${dd}`; // Establecer la fecha actual por defecto
    regTimeInput.value = '';
    closeFacilityDetailsModal(); // Cerrar el modal de detalles si está abierto
    registrationModal.classList.add('active');
}
function closeRegistrationModal() {
    if (!registrationModal)
        return;
    registrationModal.classList.remove('active');
    currentFacilityForRegistration = null; // Limpiar la instalación actual
    registrationForm.reset(); // Opcional: reiniciar el formulario
}
registrationCloseBtn === null || registrationCloseBtn === void 0 ? void 0 : registrationCloseBtn.addEventListener('click', closeRegistrationModal);
cancelRegBtn === null || cancelRegBtn === void 0 ? void 0 : cancelRegBtn.addEventListener('click', closeRegistrationModal);
registrationModal === null || registrationModal === void 0 ? void 0 : registrationModal.addEventListener('click', (event) => {
    if (event.target === registrationModal) {
        closeRegistrationModal();
    }
});
// Manejar el envío del formulario de registro
registrationForm === null || registrationForm === void 0 ? void 0 : registrationForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    if (currentFacilityForRegistration) {
        const regDate = document.getElementById('regDate').value;
        const regTime = document.getElementById('regTime').value;
        // Por ahora, usamos un alert, pero aquí iría la llamada a una API
        alert(`Registro confirmado para: ${currentFacilityForRegistration.name}
Fecha: ${regDate}
Hora: ${regTime}`);
        closeRegistrationModal(); // Cerrar el modal después de confirmar
    }
    else {
        alert('Error: No se ha seleccionado una instalación para registrar.');
    }
});
// Función para añadir escuchadores de eventos a los botones creados dinámicamente
function addCardEventListeners() {
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const facilityId = event.target.dataset.facilityId;
            const facility = allFacilities.find(f => f.id === facilityId);
            if (facility) {
                openFacilityDetailsModal(facility);
            }
        });
    });
    // Ahora los botones "Registrarse" abren el nuevo modal de registro
    // Botón "Registrarse" en las tarjetas principales
    document.querySelectorAll('.facility-card .register-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const facilityId = event.target.dataset.facilityId;
            const facility = allFacilities.find(f => f.id === facilityId);
            if (facility) {
                openRegistrationModal(facility);
            }
        });
    });
    // Botón "Registrarse" dentro del modal de detalles
    if (modalRegisterBtn) {
        modalRegisterBtn.removeEventListener('click', handleModalRegisterClick); // Remover el antiguo si existe
        modalRegisterBtn.addEventListener('click', handleModalRegisterClick);
    }
}
// Función auxiliar para el listener del botón de registro en el modal de detalles
function handleModalRegisterClick(event) {
    const facilityId = event.target.dataset.facilityId;
    const facility = allFacilities.find(f => f.id === facilityId);
    if (facility) {
        openRegistrationModal(facility);
    }
}
// Escuchador de eventos para el botón 'Cerrar sesión'
(_a = document.querySelector('.btn.secondary')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    alert('Cerrar sesión clicked!');
    // En una aplicación real, esto manejaría el cierre de sesión
});
// Renderizado inicial de todas las instalaciones cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    renderFacilities(allFacilities);
    // Añadir escuchador de eventos para la entrada de búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
});
