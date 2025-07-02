# Boutique Claudia

Bienvenido al proyecto **Boutique Claudia**.

## Descripción
Boutique Claudia es una aplicación web moderna para una boutique de belleza, donde los usuarios pueden:
- Conocer los servicios y productos ofrecidos.
- Consultar perfiles de especialistas.
- Agendar citas para tratamientos o consultas.
- Realizar donaciones.
- Gestionar su perfil y su historial de compras o citas.

El objetivo es brindar una experiencia digital atractiva, intuitiva y funcional para clientes y administradores.

## Funcionalidades principales
- **Página de inicio** con video de bienvenida y presentación de la boutique.
- **Catálogo de productos** con imágenes y descripciones.
- **Listado de especialistas** y perfiles detallados.
- **Agendamiento de citas** con selección de especialista y horario.
- **Donaciones** a través de un formulario sencillo.
- **Registro, login y recuperación de contraseña**.
- **Gestión de perfil de usuario**.
- **Carrito de compras** y visualización de historial.
- **Notificaciones globales** (toasts).

## Tecnologías utilizadas
- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/) (entorno de desarrollo y build)
- [Vuetify](https://vuetifyjs.com/) (UI framework)
- [Vue Router](https://router.vuejs.org/) (ruteo de vistas)

## Estructura de carpetas
```
boutique-claudia/
├── public/                # Archivos estáticos (imágenes, datos, favicon, etc.)
│   ├── img/               # Imágenes generales y de productos
│   ├── data/              # Archivos de datos simulados (txt)
│   └── ...
├── src/                   # Código fuente principal
│   ├── assets/            # Recursos estáticos usados en componentes
│   ├── components/        # Componentes reutilizables (Navbar, Footer, Cards, Toast, etc.)
│   ├── composables/       # Composables personalizados (hooks)
│   ├── plugins/           # Configuración de plugins (Vuetify, WebFontLoader)
│   ├── router/            # Definición de rutas
│   ├── services/          # Servicios para acceso a datos
│   ├── store/             # Estado global (Vuex/Pinia)
│   ├── views/             # Vistas principales (Home, Login, Perfil, etc.)
│   └── App.vue            # Componente raíz
├── package.json           # Dependencias y scripts
├── vite.config.js         # Configuración de Vite
└── ...
```

## Instalación y uso

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd boutique-claudia
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```
La app estará disponible normalmente en `http://localhost:5173`.

### 4. Compilar para producción
```bash
npm run build
```

### 5. Previsualizar build de producción
```bash
npm run preview
```

## Scripts disponibles
- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la app para producción en `/dist`.
- `npm run preview` — Previsualiza la build de producción localmente.

## Dependencias principales
- `vue` — Framework principal.
- `vuetify` — Componentes UI.
- `vue-router` — Ruteo de vistas.
- `vite` — Build y desarrollo rápido.

## Datos y recursos
- Los archivos de datos simulados se encuentran en `public/data/`.
- Las imágenes de productos y especialistas están en `public/img/`.

## Personalización
- Puedes modificar los datos de productos, especialistas y usuarios editando los archivos `.txt` en `public/data/`.
- Para cambiar el logo o imágenes, reemplaza los archivos en `public/img/` o `src/assets/`.

## Contribuciones
¡Las contribuciones son bienvenidas! Puedes abrir issues o pull requests para sugerir mejoras, reportar bugs o agregar nuevas funcionalidades.

## Créditos
Desarrollado por Claudia Herrera y equipo.

---

> Proyecto realizado como parte de la materia de Interacción Humano-Computador (IHC).
