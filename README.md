# MXGuide

Landing page de MXGuide, una aplicación móvil de guía turística de México. Presenta el proyecto, sus características anunciadas, instrucciones de uso, avance, preguntas frecuentes y un formulario de contacto. Las características descritas son contenido promocional: este repositorio no implementa ni verifica las funcionalidades de la aplicación móvil.

## Tecnologías y servicios

- HTML para estructura y controles del formulario.
- CSS puro para apariencia, diseño responsivo y tema según la preferencia del sistema.
- JavaScript puro para cargar contenido, ajustar el tamaño de texto y enviar consultas.
- JSON como fuente de contenido de la landing page.
- FormSubmit como servicio externo de envío de consultas al correo de soporte configurado.

No hay frameworks, gestor de paquetes declarado, dependencias instalables, proceso de compilación ni backend propio en este repositorio. El enlace a GitHub es un enlace externo; los recursos gráficos se sirven localmente.

## Estructura

```text
MxGuide/
├── index.html
├── css/
│   ├── styles.css
│   └── privacy.css
├── js/
│   └── app.js
├── privacy/
│   └── index.html
├── data.json
├── assets/
│   ├── mxguide_icono.png
│   ├── mxguide_logo_blanco.png
│   └── mxguide_logo_oscuro.png
├── README.md
└── CHANGELOG.md
```

- `index.html`: punto de entrada, secciones, navegación por anclas y formulario. Conserva los atributos de estilo puntuales existentes.
- `css/styles.css`: reglas extraídas del bloque de estilos original, incluidas variables, media queries, estados y estilos del formulario.
- `privacy/index.html`: estructura estática de la futura Política de Privacidad; solo muestra el estado de preparación.
- `css/privacy.css`: ajustes exclusivos de ancho de lectura, título y encabezado de esa página.
- `js/app.js`: lógica original de la página, sin división en módulos.
- `data.json`: textos, tarjetas, pasos, avance, preguntas frecuentes, configuración de contacto y enlaces.
- `assets/`: icono y logotipos para temas claro y oscuro.
- `CHANGELOG.md`: registro de esta etapa; no representa un historial de versiones anteriores.

## Ejecución local

Sirve la raíz del repositorio mediante HTTP. Abrir `index.html` con doble clic (`file://`) puede impedir la carga de `data.json` mediante `fetch`.

Si ya tienes Python 3 disponible, desde la raíz puedes ejecutar:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

En Windows también puedes usar `py -3` en lugar de `python` si ese es el lanzador disponible. Abre `http://127.0.0.1:8000/` y detén el servidor con `Ctrl+C`. Python es una opción para servir los archivos localmente, no una dependencia del sitio. También puedes utilizar un servidor HTTP local que ya tengas instalado.

No hay scripts npm ni paso de compilación. No es necesario instalar dependencias del proyecto. Para revisar la apariencia y el contenido no envíes formularios reales.

## Contenido dinámico y navegación

`js/app.js` solicita `data.json` mediante una ruta relativa al documento HTML, no a la ubicación del script. Por eso el JSON permanece en la raíz después de mover el JavaScript.

El script actualiza título, lema, introducción, tarjetas, listas, pasos, preguntas frecuentes, descarga, contacto y pie. `tarjetas()` y `lista()` generan bloques repetidos; `esc()` escapa texto usado en varias inserciones HTML. El botón A+ alterna la clase `big` y guarda esa preferencia en `localStorage` cuando el navegador lo permite.

Mantén las propiedades y tipos esperados del JSON y los identificadores HTML utilizados por el script. El JavaScript depende de elementos concretos de esta landing; no es un módulo genérico para futuras páginas.

La navegación utiliza fragmentos como `#que-es`, `#pasos` y `#ayuda`. No hay enrutador. La página adicional de privacidad es un documento HTML estático independiente. Cuando la URL de descarga está vacía, se muestra el aviso de disponibilidad futura. La propiedad `actualizado` del JSON no se muestra actualmente.

## Formulario de contacto

`iniciarFormulario()` carga los tipos de consulta desde `data.json`, comprueba campos obligatorios y formato del correo mediante `checkValidity()` / `reportValidity()`, y recoge nombre, correo, tipo y mensaje. Incluye un campo señuelo `_honey`.

El envío principal es un POST JSON a `https://formsubmit.co/ajax/` seguido del destinatario configurado en `contacto.correo`. Se conservan asunto, plantilla y parámetro `_captcha` con valor `false`. No se han cambiado destinatario, mensajes ni funcionamiento en esta etapa.

Si el envío produce un `TypeError`, `enviarPorIframe()` intenta un POST convencional mediante un formulario e iframe ocultos. Este camino muestra un mensaje positivo y limpia los campos sin leer la respuesta: **no verifica de manera fiable la recepción**. Un segundo intento también podría duplicar una consulta si el primero llegó al servicio pero no pudo leerse su respuesta.

Incluso una respuesta positiva del envío principal no acredita entrega final al buzón, lectura o atención del mensaje. Activación del servicio, entrega, límites y condiciones de tratamiento de datos requieren verificación externa. La validación del navegador no demuestra controles del servidor. El formulario envía datos personales a un tercero y no crea solicitudes con seguimiento ni elimina cuentas o datos.

## Despliegue

El proyecto es compatible con hosting estático: deben publicarse `index.html`, `privacy/`, `css/`, `js/`, `data.json` y `assets/`, conservando su estructura. No hay un directorio de salida generado ni compilación requerida por el código.

No existen `netlify.toml`, `_redirects`, `_headers` ni configuración de despliegue versionada que permita confirmar cómo está configurado Netlify. Tampoco se utilizan variables de entorno en el código inspeccionado.

La URL mencionada para el proyecto, `https://mx-guide.netlify.app`, no ha sido verificada como despliegue de este código. Repositorio conectado, revisión publicada, directorio de publicación, HTTPS, acceso público y configuración del panel permanecen pendientes de comprobación. Esta etapa no realiza despliegues ni modifica configuraciones del proveedor.

## Problemas conocidos pendientes

- El fallback por iframe muestra éxito sin confirmar recepción; se conserva por el alcance de esta etapa.
- El mensaje de error de carga aún sugiere `npx serve docs`, aunque no existe una carpeta `docs`; no se modificó el mensaje original. Usa las instrucciones locales de este README.
- El contenido depende de JavaScript y de que `data.json` cargue correctamente; el formulario no tiene un destino HTML alternativo declarado si falla su inicialización.
- El JavaScript presupone la presencia de los identificadores de esta página.
- La preferencia A+ se guarda localmente; no se observa analítica ni uso explícito de cookies en el código, pero no se ha auditado el comportamiento de proveedores externos.

## Próximas funcionalidades (no implementadas)

- Revisión, aprobación e incorporación del contenido definitivo de la Política de Privacidad a `/privacy/`; la estructura visual ya existe, pero no contiene una política definitiva ni el borrador v0.2.
- Página pública de solicitud de eliminación de cuentas y datos asociados.
- Integración posterior de sus enlaces con la aplicación Flutter.
- Revisión del mecanismo operativo de eliminación: identidad, recepción verificable, responsables, seguimiento, ejecución en backend y tratamiento de datos relacionados y retenciones.

La Etapa 1 reorganizó los archivos. La Etapa 2D agrega únicamente la estructura provisional de privacidad y su enlace; no implementa formularios de eliminación ni endpoints.

## Página de privacidad — Etapa 2D

La ruta `/privacy/` corresponde a `privacy/index.html`. El pie de la landing enlaza a `privacy/`; desde la página se regresa al inicio mediante `../`. Su único contenido documental es el título, el estado «Documento en preparación» y el mensaje informativo de preparación. No constituye una Política de Privacidad definitiva ni una declaración de cumplimiento con Google Play.

Reutiliza `../css/styles.css` para colores, tipografía, tema y elementos comunes, y `../css/privacy.css` para el ancho de lectura y los ajustes específicos. Las imágenes utilizan rutas `../assets/`. No importa `js/app.js`, no solicita `data.json` y funciona sin JavaScript. El borrador v0.2 permanece fuera del repositorio y pendiente de aprobación, según el contexto del equipo; no se ha incorporado su contenido.

Para probarla, inicia el servidor HTTP local descrito arriba desde la raíz y abre `http://127.0.0.1:8000/`. Sigue el enlace del pie y regresa al inicio. También abre directamente `http://127.0.0.1:8000/privacy/` y recarga esa dirección: un servidor estático con resolución de `index.html` por directorio debe servirla sin enrutador ni reescrituras especiales. Comprueba CSS e imágenes, escritorio y móvil, tema claro/oscuro y navegación por teclado. No envíes formularios.

La configuración efectiva de Netlify sigue sin verificarse y no se modificó. La revisión y aprobación del contenido definitivo siguen pendientes antes de publicar la política. No existe todavía una página de eliminación de cuentas.
