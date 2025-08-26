// JavaScript para San Marco Ristorante
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN SUAVE =====
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Agregar evento de clic a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del enlace
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando la navegación fija
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // Scroll suave hacia la sección
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NAVEGACIÓN ACTIVA =====
    // Función para actualizar la navegación activa
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('nav').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - navHeight - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-olive');
            link.classList.add('text-white');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-white');
                link.classList.add('text-olive');
            }
        });
    }
    
    // Llamar la función al hacer scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // ===== MENÚ MÓVIL =====
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.md\\:block');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
            
            // Agregar animación
            if (mobileMenu.classList.contains('block')) {
                mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            }
        });
    }
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar elementos cuando entran al viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.menu-category, .gallery-item, .event-card, .location-info, .contact-info');
        
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in-up', 'animated');
            }
        });
    }
    
    // Llamar la función al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Llamar una vez al cargar la página
    animateOnScroll();
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Simular envío del formulario
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simular delay de envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showNotification('¡Reserva enviada con éxito! Te contactaremos pronto.', 'success');
                
                // Resetear formulario
                this.reset();
                
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Reserva';
            }, 2000);
        });
    }
    
    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        
        // Estilos según el tipo
        if (type === 'success') {
            notification.classList.add('bg-green-600', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-600', 'text-white');
        } else {
            notification.classList.add('bg-blue-600', 'text-white');
        }
        
        notification.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // ===== GALERÍA INTERACTIVA =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aquí se puede implementar un lightbox
            const image = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            
            // Por ahora, solo mostrar una alerta
            showNotification(`Vista ampliada: ${title}`, 'info');
        });
    });
    
    // ===== EFECTOS DE PARALLAX SUAVE =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===== VALIDACIÓN DE FORMULARIO =====
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Validaciones específicas
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, ingresa un email válido';
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, ingresa un teléfono válido';
            }
        }
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Aplicar estilos según validación
        if (!isValid) {
            field.classList.add('error');
            field.style.borderColor = '#EF4444';
            
            // Mostrar mensaje de error
            let errorElement = field.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('p');
                errorElement.className = 'error-message text-red-500 text-sm mt-1';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
            
            // Remover mensaje de error
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }
    
    // ===== CONTADOR DE VISITANTES (SIMULADO) =====
    function updateVisitorCount() {
        const visitorCount = Math.floor(Math.random() * 1000) + 500;
        // Aquí se podría mostrar en algún lugar de la página
        console.log(`Visitantes hoy: ${visitorCount}`);
    }
    
    // Simular actualización cada 5 minutos
    setInterval(updateVisitorCount, 300000);
    
    // ===== PRELOADER (OPCIONAL) =====
    window.addEventListener('load', function() {
        // Ocultar preloader si existe
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // ===== ENHANCEMENTS ADICIONALES =====
    
    // Efecto de typing en el hero
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de typing al eslogan (opcional)
    const heroSubtitle = document.querySelector('.hero-section p');
    if (heroSubtitle && window.innerWidth > 768) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Aplicar throttle a funciones de scroll
    const throttledScrollHandler = throttle(() => {
        updateActiveNav();
        animateOnScroll();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    console.log('San Marco Ristorante - Página cargada exitosamente');
});

// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validar campos obligatorios
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            // Crear el contenido del email
            const emailSubject = encodeURIComponent(`[San Marco Ristorante] ${asunto}`);
            const emailBody = encodeURIComponent(`
Hola Alberto,

Has recibido un nuevo mensaje desde el sitio web de San Marco Ristorante:

📋 INFORMACIÓN DEL CONTACTO:
• Nombre: ${nombre}
• Email: ${email}
• Teléfono: ${telefono || 'No proporcionado'}
• Asunto: ${asunto}

💬 MENSAJE:
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
            `);
            
            // Crear el enlace mailto
            const mailtoLink = `mailto:alberto.panza@sanmarcoristorante.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Abrir el cliente de email predeterminado
            window.open(mailtoLink, '_blank');
            
            // Mostrar mensaje de confirmación
            alert('¡Mensaje enviado! Se abrirá tu cliente de email predeterminado.');
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }
    
    // Validación en tiempo real para el teléfono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            // Permitir solo números, espacios, paréntesis, guiones y el símbolo +
            let value = e.target.value;
            value = value.replace(/[^\d\s\(\)\-\+]/g, '');
            e.target.value = value;
        });
    }
    
    // Validación en tiempo real para el nombre
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        nombreInput.addEventListener('input', function(e) {
            // Permitir solo letras, espacios y acentos
            let value = e.target.value;
            value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            e.target.value = value;
        });
    }
});

// Funcionalidad de navegación suave
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Funcionalidad de scroll para la navegación
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Animaciones de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .fade-in-up, .scale-in');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Funcionalidad de galería con lightbox (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            // Crear lightbox simple
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer';
            lightbox.innerHTML = `
                <img src="${this.src}" alt="${this.alt}" class="max-w-4xl max-h-4xl object-contain">
                <button class="absolute top-4 right-4 text-white text-2xl hover:text-olive transition-colors">×</button>
            `;
            
            document.body.appendChild(lightbox);
            
            // Cerrar lightbox
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
});

// Funcionalidad de formulario de reserva (si existe)
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('form:not(#contactForm)');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para el formulario de reserva
            alert('Funcionalidad de reserva en desarrollo. Por favor, usa el formulario de contacto.');
        });
    }
});

// ===== FUNCIONES UTILITARIAS =====

// Función para formatear números de teléfono
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Función para validar fecha de reserva
function validateReservationDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}

// Función para obtener la hora actual en formato legible
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
    });
}
