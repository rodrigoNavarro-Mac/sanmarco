# San Marco Ristorante - Página Web

Una página web elegante y moderna para el restaurante italiano San Marco Ristorante, diseñada con HTML, CSS y JavaScript.

## 🍝 Características

- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Navegación Suave**: Scroll automático entre secciones
- **Animaciones Interactivas**: Efectos visuales elegantes
- **Formulario de Contacto**: Sistema de reservas integrado
- **Galería de Imágenes**: Muestra visual del restaurante
- **Paleta de Colores**: Negro y verde olivo para un look sofisticado

## 📁 Estructura del Proyecto

```
sanmarco/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidades JavaScript
├── images/             # Carpeta para imágenes
│   ├── hero-bg.jpg     # Imagen de fondo del hero
│   ├── galeria1.jpg    # Imágenes de la galería
│   ├── galeria2.jpg
│   ├── galeria3.jpg
│   ├── galeria4.jpg
│   ├── galeria5.jpg
│   ├── galeria6.jpg
│   ├── evento1.jpg     # Imágenes de eventos
│   ├── evento2.jpg
│   └── evento3.jpg
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. Configuración Inicial

1. Abre el archivo `index.html` en tu navegador web
2. La página se cargará automáticamente con todos los estilos y funcionalidades

### 2. Personalización de Imágenes

Para cambiar las imágenes, simplemente reemplaza los archivos en la carpeta `images/`:

#### Cambiar el Logo:
1. Coloca tu archivo de logo en la carpeta `images/` (recomendado: logo.png)
2. En el archivo `index.html`, busca la sección del logo:
```html
<!-- Logo placeholder - Reemplaza el SVG con tu imagen -->
<div class="logo-container mr-4">
    <div class="logo-placeholder">
        <!-- Para usar tu logo: reemplaza todo este div con: <img src="images/logo.png" alt="San Marco Logo" class="w-8 h-8"> -->
        <svg class="w-8 h-8 text-olive" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
    </div>
</div>
```
3. Reemplaza todo el contenido del `div.logo-placeholder` con:
```html
<img src="images/logo.png" alt="San Marco Logo" class="w-8 h-8">
```

#### Imágenes Requeridas:
- **logo.png**: Logo del restaurante (recomendado: 64x64px o 128x128px)
- **hero-bg.jpg**: Imagen de fondo para la sección principal (recomendado: 1920x1080px)
- **galeria1.jpg - galeria6.jpg**: Imágenes para la galería (recomendado: 800x600px)
- **evento1.jpg - evento3.jpg**: Imágenes para eventos (recomendado: 600x400px)

#### Formatos Soportados:
- JPG/JPEG
- PNG
- WebP (para mejor rendimiento)

### 3. Personalización de Contenido

#### Cambiar Información del Restaurante:
Edita el archivo `index.html` y busca estas secciones:

```html
<!-- Nombre del restaurante -->
<h1 class="text-6xl md:text-8xl font-playfair font-black text-white mb-6">
    San Marco
</h1>

<!-- Dirección -->
<p class="text-white text-lg mb-2">Av. Italia 1234</p>
<p class="text-white text-lg mb-2">Centro Histórico</p>
<p class="text-white text-lg mb-6">Ciudad de México, CDMX</p>

<!-- Teléfono -->
<span class="text-white">+52 (55) 1234-5678</span>

<!-- Email -->
<span class="text-white">info@sanmarcoristorante.com</span>
```

#### Cambiar Menú:
Busca la sección del menú y modifica los platos:

```html
<div class="menu-item">
    <div class="flex justify-between items-start">
        <div>
            <h4 class="text-lg font-semibold text-white">Nombre del Plato</h4>
            <p class="text-sm text-gray-400">Descripción del plato</p>
        </div>
        <span class="text-olive font-semibold">$Precio</span>
    </div>
</div>
```

### 4. Personalización de Colores

Para cambiar la paleta de colores, edita el archivo `styles.css`:

```css
:root {
    --olive: #6B8E23;        /* Verde olivo principal */
    --olive-light: #8FBC8F;  /* Verde olivo claro */
    --olive-dark: #556B2F;   /* Verde olivo oscuro */
    --black: #000000;        /* Negro */
    /* ... otros colores ... */
}
```

## 🎨 Características de Diseño

### Tipografías
- **Playfair Display**: Para títulos y elementos destacados
- **Inter**: Para texto de cuerpo y navegación

### Paleta de Colores
- **Negro**: Fondo principal y texto
- **Verde Olivo**: Acentos y elementos interactivos
- **Grises**: Para elementos secundarios y fondos

### Efectos Visuales
- **Hover Effects**: Animaciones al pasar el mouse
- **Scroll Animations**: Elementos que aparecen al hacer scroll
- **Smooth Transitions**: Transiciones suaves entre estados

## 📱 Responsive Design

La página está optimizada para:
- **Desktop**: 1200px y superior
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Funcionalidades JavaScript

### Navegación
- Scroll suave entre secciones
- Navegación activa que se actualiza automáticamente
- Menú móvil responsive

### Formulario
- Validación en tiempo real
- Mensajes de error personalizados
- Simulación de envío de reservas

### Animaciones
- Elementos que aparecen al hacer scroll
- Efectos de hover en galería
- Parallax suave en el hero

## 🌐 Despliegue

### Opciones de Hosting:
1. **GitHub Pages**: Gratuito y fácil de configurar
2. **Netlify**: Drag & drop deployment
3. **Vercel**: Optimizado para sitios estáticos
4. **Hosting tradicional**: Subir archivos via FTP

### Pasos para GitHub Pages:
1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings > Pages
4. Selecciona la rama main
5. Tu sitio estará disponible en `https://tuusuario.github.io/turepositorio`

## 📞 Soporte

### Problemas Comunes:

**Las imágenes no se cargan:**
- Verifica que las imágenes estén en la carpeta `images/`
- Asegúrate de que los nombres coincidan exactamente
- Comprueba que las extensiones sean correctas (.jpg, .png, etc.)

**Los estilos no se aplican:**
- Verifica que el archivo `styles.css` esté en la misma carpeta que `index.html`
- Comprueba que la conexión a Tailwind CSS esté funcionando

**El JavaScript no funciona:**
- Abre la consola del navegador (F12) para ver errores
- Verifica que el archivo `script.js` esté en la misma carpeta

## 🎯 Próximas Mejoras

- [ ] Integración con Google Maps
- [ ] Sistema de reservas real
- [ ] Galería con lightbox
- [ ] Blog de recetas
- [ ] Sistema de testimonios
- [ ] Integración con redes sociales
- [ ] Optimización SEO avanzada

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos comerciales y personales.

---

**Desarrollado con ❤️ para San Marco Ristorante**

*Una experiencia gastronómica italiana auténtica en el corazón de México*
