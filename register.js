"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');
    if (!registerForm) {
        console.error('Formulario de registro no encontrado. Verifica que tenga la clase .register-form');
        return;
    }
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = registerForm.querySelector('input[name="name"]');
        const emailInput = registerForm.querySelector('input[name="email"]');
        const passwordInput = registerForm.querySelector('input[name="password"]');
        if (!nameInput || !emailInput || !passwordInput) {
            alert('Error: Uno o más campos del formulario no se encontraron.');
            return;
        }
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (!name || !email || !password) {
            alert('Por favor completa todos los campos.');
            return;
        }
        const user = { name, email, password };
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            alert('El correo ya está registrado.');
            return;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso. Por favor inicia sesión.');
        window.location.href = 'login.html';
    });
});
