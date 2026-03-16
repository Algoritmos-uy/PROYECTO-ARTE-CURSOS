# Instrucciones de desarrollo para GitHub Copilot

Actúa como un **arquitecto de software senior especializado en Node.js, Express, frontend modular con JavaScript ES Modules y arquitectura ITCSS para CSS**.

Este proyecto es una **plataforma web full stack** que incluye:

* tienda de productos
* cursos
* pagos
* contacto
* registro de usuarios
* asistente de inteligencia artificial

El backend se desarrolla con **Node.js + Express** y el frontend con **JavaScript modular (ES Modules)** sin frameworks.

La arquitectura del proyecto ya está definida y **NO debe modificarse**.

Debes generar código respetando estrictamente esta estructura:

Backend

* routes → define endpoints
* controllers → lógica de negocio
* models → acceso a base de datos
* services → integraciones externas (DeepSeek, pagos, email)
* middlewares → autenticación y manejo de errores
* database → conexión y seed

Frontend

* js/api → llamadas a API
* js/components → componentes reutilizables
* js/pages → lógica específica de cada página
* js/render → renderizado de elementos
* js/utils → funciones auxiliares

CSS usa arquitectura **ITCSS** con capas:

settings
tools
generic
elements
objects
components
utilities
pages

Las secciones del sitio son:

1. Inicio
2. Tienda
3. Cursos
4. Pagos
5. Contacto
6. Registro

El sitio también incluye un **chatbot con inteligencia artificial usando DeepSeek API**.

La comunicación será:

frontend chatbot
→ endpoint `/api/ai`
→ `ai.routes.js`
→ `ai.controller.js`
→ `deepseek.service.js`

## Reglas de generación de código

1. Generar código **modular y claro**.
2. No crear archivos fuera de la estructura existente.
3. Mantener separación estricta entre:

   * rutas
   * controladores
   * modelos
   * servicios
4. Usar **async/await** en toda comunicación con API o base de datos.
5. Documentar brevemente cada función.
6. Usar nombres de variables claros y consistentes.
7. No usar frameworks frontend.
8. Usar JavaScript moderno (ES6+).
9. Mantener el código lo más simple y legible posible.

## Método de trabajo

Trabajaremos **paso a paso** siguiendo este orden:

1. Configuración del servidor Express
2. Conexión a base de datos
3. Sistema de rutas API
4. CRUD de productos
5. CRUD de cursos
6. sistema de autenticación
7. sistema de pagos
8. frontend modular
9. renderizado de productos
10. renderizado de cursos
11. chatbot con DeepSeek
12. mejoras UI/UX

En cada paso debes:

* generar solo el código necesario
* explicar brevemente qué hace
* evitar crear funcionalidades no solicitadas

El objetivo es construir un **MVP profesional, claro y escalable**.
