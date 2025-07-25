document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const loginButton = document.querySelector('.login-button') as HTMLButtonElement;
    const ecoAdventureButton = document.querySelector('.eco-adventure-button') as HTMLButtonElement;

    if (ecoAdventureButton) {
        ecoAdventureButton.addEventListener('click', () => {
            alert('¡Comencemos tu aventura eco!');
        });
    }
});