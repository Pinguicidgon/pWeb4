# Práctica: Depuración de Aplicación Fresh + Deno

## Descripción

Este proyecto es una aplicación web desarrollada con Fresh y Deno que requiere ser depurada y corregida. La aplicación está conectada a una API REST (especificación OpenAPI) y contiene errores intencionados tanto en el frontend como en la integración con la API.

## Documentación de la API

- **Documentación:** [Ver documentación](https://back-p5-y0e1.onrender.com/docs)
- **URL Base:** `https://back-p5-y0e1.onrender.com`

## Funcionalidad Esperada

### Páginas Principales

1. **Página de Inicio (`/`)**
   - Muestra los últimos posts sin paginación
   - Vista alternable entre modo lista y cuadrícula
   - Los posts deben enlazar a su vista detallada

2. **Búsqueda (`/search`)**
   - Permite buscar posts por título
   - Muestra resultados en formato lista
   - Búsqueda accionable mediante botón o tecla Enter

3. **Crear Post (`/create`)**
   - Formulario para crear nuevos posts
   - Muestra errores de validación de la API
   - Redirecciona al inicio tras creación exitosa
   - Botón de cancelación que redirige al inicio

4. **Detalle de Post (`/post/[id]`)**
   - Muestra todos los datos de un post específico
   - Incluye funcionalidad de "Me gusta"
   - Permite eliminar el post
   - Sección de comentarios con capacidad de añadir nuevos

## Requisitos de Entrega

### Forma de Entrega
1. Repositorio público en GitHub con release
2. Enlace a la aplicación desplegada en Deno Deploy
3. Subida del enlace y archivo .zip al campus

### Restricciones
- No se permite el uso de asistentes de código IA (ChatGPT, GitHub Copilot, Codeium, etc.)
- Prohibido copiar soluciones de internet o foros
- Desarrollo estrictamente individual
- Una única entrega por persona

## Instalación y Ejecución

1. Asegúrate de tener instalado [Deno](https://deno.land/)
2. Clona el repositorio
3. Instala las dependencias:
   ```bash
   deno cache --reload --lock=deno.lock --import-map=import_map.json
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   deno task start
   ```

## Notas Adicionales

- Asegúrate de que todos los enlaces sean funcionales
- La aplicación no debe mostrar errores en consola
- El código debe seguir buenas prácticas de desarrollo web
