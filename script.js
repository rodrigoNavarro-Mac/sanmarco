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
