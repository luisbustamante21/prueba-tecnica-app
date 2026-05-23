# Prueba Técnica App

## Descripción General

Aplicación móvil e-commerce desarrollada con React Native y Expo. Este proyecto demuestra la implementación de una arquitectura escalable y mantenible, integrando un catálogo de productos completo con autenticación, gestión de estado global, consumo eficiente de APIs y persistencia de datos locales.

---

# Características Principales

## Exploración de Productos
Catálogo dinámico con:

- Paginación infinita
- Búsqueda integrada
- Filtrado por categorías
- Ordenamiento por:
  - Precio
  - Calificación
  - Orden alfabético

## Detalle de Producto
Interfaz enfocada en experiencia de usuario con:

- Carrusel nativo de imágenes
- Indicadores de paginación
- Selección dinámica de variantes y colores
- Funcionalidad para compartir productos

## Sistema de Autenticación

- Inicio de sesión seguro
- Persistencia de token de acceso
- Recuperación automática de sesión
- Cierre de sesión seguro

## Gestión de Favoritos

- Sistema de favoritos global
- Disponible en listado y detalle de productos
- Persistencia offline mediante almacenamiento local

## Optimización de Red

- Cliente HTTP centralizado con Axios
- Interceptores para:
  - Inyección automática de tokens
  - Manejo global de errores
  - Estandarización de respuestas

## Caché y Sincronización

Uso de TanStack Query para:

- Caché inteligente de peticiones
- Invalidación automática de datos
- Optimización de listas infinitas
- Mejor experiencia offline-first

---

# Stack Tecnológico

## Core
- React Native `0.85.3`
- Expo `~56.0.3`
- TypeScript

## Navegación
- React Navigation v7
  - Native Stack
  - Bottom Tabs

## Gestión de Datos
- TanStack React Query v5

## Peticiones HTTP
- Axios

## Persistencia Local
- AsyncStorage

## UI/UX
- Expo Vector Icons
- React Native Safe Area Context
- Expo Linear Gradient

---

# Estructura del Proyecto

La arquitectura del proyecto sigue una separación clara de responsabilidades para facilitar la escalabilidad, el mantenimiento y la reutilización de código.

```text
/src
 ├── api
 │    Configuración base de Axios e interceptores
 │
 ├── components
 │    Componentes reutilizables de UI
 │
 ├── context
 │    Estado global mediante Context API
 │
 ├── hooks
 │    Custom hooks con React Query
 │
 ├── screens
 │    Pantallas principales de la aplicación
 │
 ├── services
 │    Lógica de comunicación con APIs
 │
 └── types
      Interfaces y tipos TypeScript
```

## Detalle de Carpetas

### `/src/api`
Configuración centralizada del cliente HTTP y definición de interceptores globales.

### `/src/components`
Componentes reutilizables de interfaz como tarjetas de producto, loaders y headers.

### `/src/context`
Manejo de estado global utilizando Context API:
- `AuthContext`
- `FavoritesContext`

### `/src/hooks`
Custom hooks reutilizables para:
- Obtención de productos
- Detalle de productos
- Categorías
- Paginación infinita

### `/src/screens`
Pantallas principales:
- ExploreScreen
- DetailScreen
- LoginScreen
- FavoritesScreen

### `/src/services`
Abstracción de llamadas HTTP:
- `auth.service`
- `product.service`

### `/src/types`
Definición de modelos y contratos TypeScript para mantener tipado estricto en toda la aplicación.

---

# Decisiones Técnicas

## Uso de React Query

Se seleccionó TanStack React Query para manejar el estado del servidor debido a:

- Caché automática
- Manejo eficiente de sincronización
- Reintentos automáticos
- Optimización de peticiones
- Soporte nativo para paginación infinita

Esto reduce significativamente la complejidad del manejo manual de estados de carga y sincronización.

## Arquitectura por Capas

La aplicación se organizó separando responsabilidades en:

- Servicios
- Hooks
- Contextos
- Componentes
- Pantallas

Esto permite:

- Mejor mantenibilidad
- Escalabilidad
- Reutilización de lógica
- Facilidad de testing

## Uso de Context API

Se utilizó Context API para estados globales livianos como:

- Autenticación
- Favoritos

Evitando agregar librerías más pesadas como Redux innecesariamente.

## Axios con Interceptores

Se implementaron interceptores para:

- Adjuntar automáticamente el token JWT
- Centralizar errores HTTP
- Mantener consistencia en las respuestas

## Persistencia Local

Se utilizó AsyncStorage para:

- Persistir sesión de usuario
- Guardar favoritos offline
- Mejorar experiencia de usuario

## Optimización de Rendimiento

Se aplicaron estrategias como:

- `FlatList`
- `onEndReached`
- Memoización de componentes
- Renderizado optimizado
- Paginación incremental

Con el objetivo de mantener un rendimiento fluido incluso con grandes volúmenes de datos.

---

# Requisitos Previos

Antes de ejecutar el proyecto es necesario contar con:

- Node.js (22.9.0)
- npm o yarn
- Expo CLI
- Emulador Android/iOS o dispositivo físico con Expo Go

---

# Instalación y Ejecución

## 1. Clonar el repositorio

```bash
git clone https://github.com/luisbustamante21/prueba-tecnica-app.git
cd prueba-tecnica-app
```

## 2. Instalar dependencias

```bash
npm install
```

o

```bash
yarn install
```

---

# Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API_URL=https://dummyjson.com
```

---

# Ejecutar el Proyecto

## Iniciar servidor de desarrollo

```bash
npx expo start
```

---

# Notas de Desarrollo

- Se priorizó una arquitectura mantenible y escalable.
- Toda la comunicación con APIs está fuertemente tipada mediante TypeScript.
- Se manejan estados de carga y error de forma consistente.
- La experiencia de usuario fue optimizada para dispositivos móviles utilizando componentes nativos y listas eficientes.
- El proyecto está preparado para crecimiento modular y nuevas funcionalidades futuras.
