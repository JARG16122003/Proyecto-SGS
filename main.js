"use strict";
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const loginButton = document.querySelector('.login-button');
    const ecoAdventureButton = document.querySelector('.eco-adventure-button');
    if (ecoAdventureButton) {
        ecoAdventureButton.addEventListener('click', () => {
            alert('¡Comencemos tu aventura eco!');
        });
    }
});
