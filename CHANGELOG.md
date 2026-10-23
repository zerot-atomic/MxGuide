# Registro de cambios

## 2026-10-23 — Etapa 2D: estructura de la página de privacidad

### Archivos creados

- `privacy/index.html`: documento HTML5 en español, encabezado de marca, enlace al inicio, área semántica de lectura y pie consistente con el sitio.
- `css/privacy.css`: ajustes exclusivos para el documento, reutilizando los estilos generales sin modificarlos.

### Archivos modificados

- `index.html`: enlace «Política de Privacidad» a `privacy/` en el pie; se conservan los demás enlaces y secciones.
- `README.md`: estructura actualizada, propósito y estado de `/privacy/`, estilos y pruebas locales.
- `CHANGELOG.md`: registro de esta etapa.

### Alcance y pendientes

- La página muestra únicamente el título solicitado, «Documento en preparación» y el mensaje informativo aprobado para esta etapa.
- No se incorpora el borrador legal v0.2 ni se inventan datos jurídicos. El contenido definitivo requiere revisión y aprobación.
- No carga JavaScript ni introduce dependencias, formularios o rutas de eliminación de cuentas.
- Se conservan `data.json`, `js/app.js`, FormSubmit, imágenes y estilos generales.
- Sin cambios de configuración de hosting, despliegues, commits ni push. La validación visual en navegador y la comprobación del hosting real quedan pendientes.

## 2026-10-23 — Etapa 1: refactorización conservadora y documentación

### Archivos creados

- `css/styles.css`: extracción íntegra de las reglas del bloque `<style>` de `index.html`, conservando orden, variables, colores, tipografía, espaciado, media queries y estados.
- `CHANGELOG.md`: registro de esta etapa, sin reconstruir versiones anteriores.

### Archivos movidos

- `app.js` → `js/app.js`: traslado sin cambios en su contenido.

### Archivos modificados

- `index.html`: sustitución del bloque `<style>` por el enlace a `css/styles.css` y actualización de la referencia a `js/app.js?v=2`.
- `README.md`: documentación de propósito, tecnologías, estructura, ejecución local, contenido dinámico, formulario, hosting y trabajo pendiente.

### Funcionalidades conservadas deliberadamente

- Apariencia definida por las reglas CSS originales, tema oscuro y diseño responsivo.
- Estructura HTML, estilos puntuales, imágenes, textos y navegación por anclas.
- `data.json` íntegro, incluidos contacto, URLs y estados de desarrollo.
- Generación de tarjetas, listas, preguntas frecuentes y contenido dinámico.
- Control de tamaño de texto y persistencia de preferencia en `localStorage`.
- FormSubmit: destinatario, validación, parámetros, envío AJAX, fallback por iframe y mensajes originales.
- Ausencia de dependencias y compilación; no se agregan funcionalidades.

### Problemas conocidos que permanecen pendientes

- El fallback por iframe anuncia envío sin comprobar la respuesta; no confirma recepción y podría duplicar un intento previo.
- La respuesta del servicio no demuestra entrega final, lectura ni atención del mensaje.
- El error de carga recomienda una carpeta `docs` inexistente.
- Contenido y formulario dependen de la inicialización JavaScript; el script está acoplado a los elementos de la landing.
- Configuración real del hosting, HTTPS, correspondencia del despliegue y operación de FormSubmit sin verificar.
- Política de Privacidad, solicitud de eliminación, enlaces desde Flutter y proceso operativo de eliminación aún no implementados.
