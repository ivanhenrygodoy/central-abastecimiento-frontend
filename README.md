# 🏢 Central de Abastecimiento

Sistema de gestión de productos para mantenimiento y abastecimiento desarrollado con Vue 3 + TypeScript y PrimeVue.

## 📋 Descripción

Central de Abastecimiento es una aplicación web moderna que permite gestionar productos, categorías y establecimientos de manera eficiente. El sistema cuenta con funcionalidades de autenticación, CRUD completo de productos, manejo de archivos múltiples y una interfaz intuitiva con componentes reutilizables.

## 🚀 Características

### ✨ Funcionalidades Principales

- **🔐 Autenticación JWT** - Sistema seguro de login/logout
- **📊 Gestión de Productos** - CRUD completo con paginación del servidor
- **📁 Manejo de Archivos** - Subida múltiple de documentos con nombres descriptivos
- **🔍 Búsqueda y Filtros** - Sistema de búsqueda en tiempo real
- **📄 Paginación Inteligente** - Navegación eficiente con lazy loading
- **📱 Diseño Responsivo** - Compatible con dispositivos móviles y desktop

### 🎨 UI/UX

- **🎯 Interfaz Moderna** - Diseño limpio con PrimeVue 4 + Lara Theme
- **🎨 Tailwind CSS** - Estilizado utilitario para desarrollo ágil
- **💬 Notificaciones Toast** - Feedback visual para acciones del usuario
- **🔄 Estados de Carga** - Indicadores visuales para mejor experiencia

## 🛠️ Tecnologías

### Frontend

- **Vue 3** - Framework progresivo con Composition API
- **TypeScript** - Tipado estático para mayor robustez
- **PrimeVue 4.3.6** - Biblioteca de componentes UI completa
- **Tailwind CSS** - Framework CSS utilitario
- **Vue Router** - Navegación SPA con guards de autenticación
- **Pinia** - Estado global reactivo
- **Axios** - Cliente HTTP para APIs

### Herramientas de Desarrollo

- **Vite** - Build tool ultrarrápido
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **Vitest** - Testing framework
- **TypeScript** - Verificación de tipos

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Recursos estáticos
│   ├── base.css
│   ├── main.css
│   └── img/
├── components/          # Componentes reutilizables
│   └── NavBar.vue
├── modules/             # Módulos funcionales
│   ├── auth/           # Módulo de autenticación
│   │   ├── composables/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   ├── mantenimientos/ # Módulo de gestión
│       ├── composables/
│       │   ├── indexMantProductos.ts    # Listado
│       │   └── createMantProductos.ts   # Creación
│       ├── pages/
│       │   └── indexMantProductos.vue   # Vista principal
│       ├── services/
│       │   ├── indexMantProductosService.ts  # API Listado
│       │   └── createMantProductosServices.ts # API Creación
│       └── interfaces/
├── plugins/            # Configuraciones
│   └── axios.ts       # Cliente HTTP
├── routes/            # Configuración de rutas
│   └── index.ts
└── store/            # Estado global
    └── counter.js
```

### 🏗️ Arquitectura Modular

El proyecto sigue una arquitectura modular limpia:

- **📦 Composables** - Lógica de negocio reutilizable
- **🔧 Services** - Capa de acceso a datos (API)
- **🎭 Components** - Componentes UI reutilizables
- **📄 Pages** - Vistas principales de la aplicación
- **🛡️ Interfaces** - Definiciones TypeScript

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Backend Laravel con API REST

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd central-abastecimiento
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tu configuración:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

### 5. Construir para producción

```bash
npm run build
```

## 📡 API Integration

### Endpoints Principales

#### Autenticación

```
POST /api/auth/login
POST /api/auth/logout
```

#### Productos

```
GET  /api/mantenimiento-producto/index-product?page=1&paginate=10
POST /api/mantenimiento-producto/create-product
```

### 📤 Estructura de FormData (Creación)

```typescript
FormData:
├── nombre: string
├── codigo: string
├── id_categoria_producto: string
├── id_establecimiento_origen: string
├── documentos[0]: File
├── documentos[1]: File
├── nombre_documento[0]: string
└── nombre_documento[1]: string
```

## 🎯 Funcionalidades Detalladas

### 🔐 Sistema de Autenticación

- Login con JWT tokens
- Guards de ruta automáticos
- Logout con limpieza de estado
- Redirección inteligente

### 📊 Gestión de Productos

- **Listado Paginado** - Navegación eficiente con datos del servidor
- **Búsqueda en Tiempo Real** - Filtros instantáneos
- **Creación con Archivos** - Subida múltiple de documentos
- **Validación Completa** - Validaciones client-side y server-side

### 📁 Manejo de Archivos

- **Selección Múltiple** - Varios archivos simultáneamente
- **Filtro de Duplicados** - Previene archivos repetidos
- **Nombres Descriptivos** - Personalización de nombres
- **Vista Previa** - Información detallada de archivos
- **Eliminación Individual** - Control granular

### 🎨 Componentes Reutilizables

- **NavBar** - Navegación consistente
- **DataTable** - Tabla avanzada con paginación
- **Toast** - Notificaciones elegantes
- **Dialog** - Modales responsivos

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test:unit

# Tests en modo watch
npm run test:unit -- --watch
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot-reload
npm run build        # Build de producción
npm run preview      # Vista previa del build
npm run type-check   # Verificación TypeScript
npm run lint         # Linting con ESLint
npm run format       # Formateo con Prettier
```

## 🔧 Configuración Avanzada

### Personalización de PrimeVue

```typescript
// main.ts
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
```

### Configuración de Axios

```typescript
// plugins/axios.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 Convenciones de Código

- **TypeScript** - Tipado estricto
- **Composition API** - Preferir sobre Options API
- **Nomenclatura** - camelCase para variables, PascalCase para componentes
- **Estructura** - Separación clara de responsabilidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Equipo de Desarrollo** - _Desarrollo inicial_ - [Tu Organización]

## 🙏 Agradecimientos

- PrimeVue por los excelentes componentes UI
- Vue.js team por el increíble framework
- Tailwind CSS por el sistema de diseño
- La comunidad open source

---

## 🔗 Enlaces Útiles

- [Vue 3 Documentation](https://vuejs.org/)
- [PrimeVue Documentation](https://primevue.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**🏢 Central de Abastecimiento** - Gestión eficiente y moderna de productos
