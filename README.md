# Encuesta de neuromarketing y decisiones de compra

Encuesta académica del Programa de Administración de Empresas de la Fundación Universitaria del Área Andina, Valledupar, 2026.

**Sitio publicado:** https://encuesta-neuromarketing-valledupar.vercel.app

## Qué incluye

- 15 preguntas originales de opción única divididas en 3 secciones de 5 preguntas.
- Pantalla de consentimiento voluntario y opción de no participar.
- Validación de respuestas obligatorias.
- Interfaz responsive para celulares, tabletas y computadores.
- Revisión de las 15 respuestas antes de compartirlas.
- Identificador de encuesta y fecha, para ordenar manualmente la recepción.
- Envío a un chat de WhatsApp con el número colombiano `+57 311 735 0027`.

## Cómo llegan las respuestas a WhatsApp

1. El participante acepta el consentimiento y responde las 15 preguntas.
2. Revisa sus respuestas y toca **Abrir WhatsApp**.
3. Se abre el chat del número indicado con el texto ya preparado.
4. **El participante tiene que pulsar Enviar dentro de WhatsApp.** Abrir el chat no garantiza la entrega.

Esto funciona **sin credenciales de WhatsApp Business API**, pero **no es un envío automatizado**. Para envíos automáticos desde el servidor se requiere integrar una cuenta autorizada de WhatsApp Business Platform (Meta Cloud API o proveedor), configurar sus credenciales de forma segura y atender las reglas de mensajería correspondientes.

**Privacidad:** La encuesta no pide nombre ni almacena datos en un servidor. Si el participante envía el mensaje desde su WhatsApp personal, el destinatario puede conocer su número y, dependiendo de su configuración, su perfil. Por tanto, esta modalidad no debe describirse como estrictamente anónima.

## Desarrollo

La aplicación es estática, sin dependencias ni base de datos:

- `index.html`: estructura de la página.
- `styles.css`: estilos responsive.
- `app.js`: preguntas, validación, navegación, revisión y enlace de WhatsApp.

La rama `main` está conectada con Vercel para despliegues automáticos tras los cambios.

## Parámetro de configuración

Para cambiar el destino de WhatsApp, modifica la constante `WHATSAPP_NUMBER` al inicio de `app.js`, en formato internacional sin el signo `+`.

## Uso responsable

La investigación especifica una muestra prevista de 25 personas mayores de 18 años de Valledupar, reclutadas por conveniencia. Las respuestas solo describen a las personas participantes y no deben presentarse como representativas de toda la población.
