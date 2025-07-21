document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('.register-form') as HTMLFormElement | null;
  
  if (!registerForm) {
    console.error('Formulario de registro no encontrado. Verifica que tenga la clase .register-form');
    return;
  }
  
  registerForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    
    const nameInput = registerForm.querySelector('input[name="name"]') as HTMLInputElement | null;
    const emailInput = registerForm.querySelector('input[name="email"]') as HTMLInputElement | null;
    const passwordInput = registerForm.querySelector('input[name="password"]') as HTMLInputElement | null;
    
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
    
    const user: User = { name, email, password };
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
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