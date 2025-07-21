class AdminPanel {
    private stats: { title: string; value: number; icon: string }[] = [
        { title: "Atletas Registrados", value: 247, icon: "👤" },
        { title: "Eventos Activos", value: 12, icon: "📅" },
        { title: "Competencias", value: 8, icon: "🏆" },
        { title: "Inscripciones", value: 15, icon: "📝" },
    ];

    private facilities: { name: string; description: string; registrations: number; alert?: boolean; icon: string }[] = [
        { name: "Gimnasio Central", description: "Centro deportivo principal", registrations: 45, icon: "🏋️" },
        { name: "Cancha Fútbol Norte", description: "Complejo deportivo norte", registrations: 78, icon: "⚽" },
        { name: "Piscina Olímpica", description: "Centro acuático", registrations: 23, alert: true, icon: "🏊" },
    ];

    constructor() {
        this.renderStats();
        this.renderFacilities();
        this.addEventListeners();
    }

    private renderStats(): void {
        const statsSection = document.querySelector(".stats") as HTMLElement;
        statsSection.innerHTML = this.stats.map(stat => `
            <div class="stat-card">
                <h3>${stat.title}</h3>
                <p class="stat-number">${stat.value}</p>
                <span class="stat-icon">${stat.icon}</span>
            </div>
        `).join("");
    }

    private renderFacilities(): void {
        const facilitiesSection = document.querySelector(".facilities") as HTMLElement;
        facilitiesSection.innerHTML = `<h2>Gestión de Instalaciones</h2>` + this.facilities.map(facility => `
            <div class="facility-card ${facility.alert ? "alert" : ""}">
                <h3>${facility.name}</h3>
                <p>${facility.description}</p>
                <p>Registros activos: ${facility.registrations}</p>
                <span class="facility-icon">${facility.icon}</span>
            </div>
        `).join("");
    }

    private addEventListeners(): void {
        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                alert(`Botón ${button.textContent} clicked!`);
            });
        });
    }
}

// Initialize the panel
document.addEventListener("DOMContentLoaded", () => {
    new AdminPanel();
});