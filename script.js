document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Inisialisasi database di Local Storage jika belum ada
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Toggle between login and register forms
    loginToggle.addEventListener('click', function() {
        this.classList.add('active');
        registerToggle.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });
    
    registerToggle.addEventListener('click', function() {
        this.classList.add('active');
        loginToggle.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
    
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username);
        
        const message = document.getElementById('login-message');
        
        if (!user) {
            message.textContent = 'Username tidak ditemukan!';
            message.className = 'message error';
            return;
        }
        
        if (user.password !== password) {
            message.textContent = 'Password salah!';
            message.className = 'message error';
            return;
        }
        
        message.textContent = 'Login berhasil! Mengarahkan...';
        message.className = 'message success';
        
        // Simpan informasi login
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect ke hm-downloader.vercel.app setelah 2 detik
        setTimeout(() => {
            window.location.href = 'https://hm-downloader.vercel.app/';
        }, 2000);
    });
    
    // Handle register form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        const message = document.getElementById('register-message');
        
        if (password !== confirmPassword) {
            message.textContent = 'Password dan konfirmasi password tidak cocok!';
            message.className = 'message error';
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users'));
        
        if (users.some(u => u.username === username)) {
            message.textContent = 'Username sudah terdaftar!';
            message.className = 'message error';
            return;
        }
        
        // Tambahkan user baru
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        message.textContent = 'Pendaftaran berhasil! Silakan login.';
        message.className = 'message success';
        
        // Otomatis pindah ke form login
        setTimeout(() => {
            loginToggle.click();
            document.getElementById('login-username').value = username;
            document.getElementById('login-password').value = '';
        }, 1500);
    });
});