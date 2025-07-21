document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form') as HTMLFormElement | null;
  
  if (!loginForm) {
    console.error('Formulario de login no encontrado. Verifica que tenga la clase .login-form');
    return;
  }
  
  loginForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    
    const emailInput = loginForm.querySelector('input[name="email"]') as HTMLInputElement | null;
    const passwordInput = loginForm.querySelector('input[name="password"]') as HTMLInputElement | null;
    
    if (!emailInput || !passwordInput) {
      alert('Error: Uno o más campos del formulario no se encontraron.');
      return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }
    
    if (email === 'admin@algo.com' && password === 'admin') {
      window.location.href = 'admin.html';
      return;
    }
    
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      window.location.href = 'user.html';
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  });
});