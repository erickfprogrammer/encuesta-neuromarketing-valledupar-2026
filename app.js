'use strict';

const WHATSAPP_NUMBER = '573117350027';
const questions = [
  { question: '¿Cuál es su rango de edad?', short: 'Rango de edad', options: ['18–25 años', '26–35 años', '36–45 años', '46–55 años', 'Más de 55 años'] },
  { question: '¿Con qué frecuencia realiza compras de productos de uso personal?', short: 'Frecuencia de compras personales', options: ['Varias veces por semana', 'Una vez por semana', 'Varias veces al mes', 'Una vez al mes o menos'] },
  { question: '¿Qué factor tiene mayor importancia al elegir un producto?', short: 'Factor más importante de elección', options: ['Precio', 'Calidad', 'Marca', 'Presentación / diseño', 'Recomendaciones'] },
  { question: '¿Cuánto influye la presentación visual de un producto en su interés por comprarlo?', short: 'Influencia de la presentación visual', options: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente'] },
  { question: '¿Qué importancia tienen los colores y el diseño del empaque al comparar productos similares?', short: 'Importancia del empaque', options: ['Ninguna', 'Baja', 'Moderada', 'Alta', 'Muy alta'] },
  { question: '¿Ha comprado un producto porque su publicidad le generó una emoción positiva?', short: 'Compra motivada por publicidad emotiva', options: ['Sí', 'No', 'No estoy seguro/a'] },
  { question: '¿Qué clase de publicidad suele captar más su atención?', short: 'Publicidad que más llama la atención', options: ['Historias emotivas', 'Promociones / descuentos', 'Reseñas o testimonios', 'Información sobre beneficios', 'Contenido creativo / humorístico'] },
  { question: '¿Qué tan importante es la confianza en una marca para decidir comprar?', short: 'Importancia de confiar en una marca', options: ['Nada importante', 'Poco importante', 'Moderadamente importante', 'Importante', 'Muy importante'] },
  { question: '¿Con qué frecuencia compra productos que no tenía planeado adquirir?', short: 'Frecuencia de compra no planeada', options: ['Nunca', 'Casi nunca', 'Algunas veces', 'Frecuentemente', 'Siempre'] },
  { question: '¿Cuánto influyen las recomendaciones vistas en redes sociales en sus decisiones de compra?', short: 'Influencia de recomendaciones en redes', options: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente'] },
  { question: '¿Cuánto influyen la música, los aromas o la iluminación de una tienda en su experiencia de compra?', short: 'Influencia del ambiente sensorial', options: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente'] },
  { question: 'Si dos productos tienen precio y calidad similares, ¿qué factor le ayudaría más a elegir?', short: 'Desempate entre productos similares', options: ['Marca conocida', 'Empaque atractivo', 'Experiencia anterior positiva', 'Recomendación de otras personas', 'Disponibilidad inmediata'] },
  { question: '¿Estaría dispuesto/a a pagar más por una marca que le genere confianza?', short: 'Pagar más por marca confiable', options: ['Sí', 'No', 'Depende del producto'] },
  { question: '¿Qué tan probable es que considere comprar un producto tras ver publicidad que le resulte atractiva?', short: 'Probabilidad de comprar por publicidad', options: ['Nada probable', 'Poco probable', 'Moderadamente probable', 'Probable', 'Muy probable'] },
  { question: '¿Con qué frecuencia considera que sus emociones influyen en sus decisiones de compra?', short: 'Frecuencia de influencia emocional', options: ['Nunca', 'Casi nunca', 'Algunas veces', 'Frecuentemente', 'Siempre'] }
];

const sections = [
  { kicker: 'SECCIÓN 01 · PERFIL Y PREFERENCIAS', title: 'Tus hábitos de compra', summary: 'Comencemos con algunos aspectos generales de tu comportamiento como consumidor.' },
  { kicker: 'SECCIÓN 02 · PUBLICIDAD Y CONFIANZA', title: 'Lo que capta tu atención', summary: 'Cuéntanos qué influye en tu percepción de los productos y las marcas.' },
  { kicker: 'SECCIÓN 03 · EXPERIENCIA Y EMOCIONES', title: 'Lo que te mueve a elegir', summary: 'Últimas cinco preguntas. ¡Ya casi terminas!' }
];

const root = document.getElementById('form-content');
const title = document.getElementById('panel-title');
const stepLabel = document.getElementById('step-label');
const counter = document.getElementById('step-counter');
const bar = document.getElementById('progress-fill');
const progress = document.getElementById('progress-track');
const answers = {};
let step = -1;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
  });
}
function createCode() {
  const bytes = new Uint8Array(4);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return 'NM-2026-' + Array.from(bytes, function (x) { return x.toString(16).padStart(2, '0'); }).join('').toUpperCase();
}
const surveyCode = createCode();

function setProgress(percent, label, heading, indexText) {
  title.textContent = heading;
  stepLabel.textContent = label;
  counter.textContent = indexText;
  bar.style.width = percent + '%';
  progress.setAttribute('aria-valuenow', String(percent));
}

function navigateTop() {
  const panel = document.getElementById('main');
  if (panel && window.scrollY > panel.getBoundingClientRect().top + window.scrollY - 20) {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderIntro() {
  setProgress(0, 'ENCUESTA ACADÉMICA', 'Tu participación cuenta', 'Inicio');
  root.innerHTML =
    '<div class="consent-intro">' +
      '<span class="welcome-icon" aria-hidden="true">✦</span>' +
      '<h3>¡Gracias por aportar tu opinión!</h3>' +
      '<p>Tu perspectiva nos ayuda a comprender cómo las emociones, el diseño y la publicidad pueden influir en las decisiones de compra.</p>' +
    '</div>' +
    '<div class="info-list">' +
      '<div class="info-item"><span class="info-check">✓</span><span>Participación voluntaria para mayores de 18 años residentes en Valledupar.</span></div>' +
      '<div class="info-item"><span class="info-check">✓</span><span>No solicitamos tu nombre ni datos personales dentro de la encuesta.</span></div>' +
      '<div class="info-item"><span class="info-check">✓</span><span>Las respuestas se usarán con fines académicos y para resultados agrupados. Puedes retirarte en cualquier momento.</span></div>' +
      '<div class="info-item"><span class="info-check">!</span><span>El envío se realiza desde tu WhatsApp: el destinatario podrá ver tu número y, según tu configuración, tu perfil.</span></div>' +
    '</div>' +
    '<div class="consent-box"><p class="consent-question">¿Aceptas participar en este estudio?</p>' +
      '<div class="consent-options">' +
        '<label class="consent-option"><input type="radio" name="consent" value="yes" /> Sí, acepto participar</label>' +
        '<label class="consent-option"><input type="radio" name="consent" value="no" /> No, gracias</label>' +
      '</div></div>' +
    '<div class="form-actions"><button class="btn btn-primary" type="button" data-action="start" disabled>Comenzar encuesta <span aria-hidden="true">→</span></button></div>' +
    '<p class="form-note">Muestreo no probabilístico por conveniencia · 25 participantes previstos · Instrumento de investigación académica.</p>';
}

function renderRefusal() {
  setProgress(0, 'CONSENTIMIENTO', 'Participación voluntaria', 'Finalizado');
  root.innerHTML = '<div class="refusal"><span class="refusal-icon" aria-hidden="true">♡</span><h3>Gracias por tu tiempo</h3>' +
    '<p>Has decidido no participar. No se ha registrado ni enviado ninguna respuesta.</p>' +
    '<div class="form-actions"><button class="btn btn-secondary" type="button" data-action="restart">Volver al inicio</button></div></div>';
}

function renderQuestion(item, index) {
  let choices = '';
  item.options.forEach(function (option, pos) {
    const checked = answers[index] === option ? ' checked' : '';
    choices += '<label class="choice"><input type="radio" name="q' + index + '" value="' + pos + '"' + checked + ' /><span>' + escapeHtml(option) + '</span></label>';
  });
  return '<fieldset class="question" data-question="' + index + '">' +
    '<legend><span class="q-index">' + String(index + 1).padStart(2, '0') + '</span>' + escapeHtml(item.question) + '</legend>' +
    '<div class="choices">' + choices + '</div></fieldset>';
}

function renderSection(index) {
  const section = sections[index];
  setProgress(Math.round((index / 3) * 100), section.kicker, section.title, (index + 1) + ' de 3');
  const start = index * 5;
  const html = questions.slice(start, start + 5).map(function (item, pos) {
    return renderQuestion(item, start + pos);
  }).join('');
  root.innerHTML =
    '<p class="section-intro">' + escapeHtml(section.summary) + '</p>' +
    '<form id="survey-form" novalidate><div class="questions">' + html + '</div>' +
    '<p class="validation-msg" id="validation-msg" role="alert" aria-live="assertive"></p>' +
    '<div class="form-actions">' +
      '<button class="btn btn-secondary" type="button" data-action="back"><span aria-hidden="true">←</span> Atrás</button>' +
      '<button class="btn btn-primary" type="submit">' + (index === 2 ? 'Revisar respuestas' : 'Continuar') + '<span aria-hidden="true">→</span></button>' +
    '</div></form>' +
    '<p class="form-note">Selecciona una respuesta por pregunta antes de avanzar.</p>';
}

function reviewList() {
  return questions.map(function (q, i) {
    return '<div class="review-row"><small>' + String(i + 1).padStart(2, '0') + '. ' + escapeHtml(q.short) + '</small><strong>' +
      escapeHtml(answers[i] || 'Sin responder') + '</strong></div>';
  }).join('');
}

function renderReview() {
  setProgress(100, 'ÚLTIMO PASO · CONFIRMACIÓN', '¡Encuesta completada!', '15 de 15');
  root.innerHTML =
    '<div class="review-intro"><h3>Revisa tus respuestas</h3>' +
    '<p>Tu código de encuesta es <strong>' + escapeHtml(surveyCode) + '</strong>. Puedes volver y corregir cualquier respuesta antes de compartirla.</p></div>' +
    '<div class="review-list">' + reviewList() + '</div>' +
    '<div class="notice"><span class="notice-icon" aria-hidden="true">◉</span><div>' +
      '<strong>Falta enviarla por WhatsApp</strong>' +
      '<p>Al tocar el botón se abrirá una conversación con el número <strong>+57 311 735 0027</strong> y las respuestas ya escritas. <strong>Debes pulsar Enviar en WhatsApp</strong> para que lleguen. WhatsApp podrá mostrar tu número al destinatario.</p>' +
    '</div></div>' +
    '<div class="form-actions">' +
      '<button class="btn btn-secondary" type="button" data-action="back"><span aria-hidden="true">←</span> Corregir</button>' +
      '<button class="btn btn-wapp" type="button" data-action="send">Abrir WhatsApp <span aria-hidden="true">↗</span></button>' +
    '</div>' +
    '<p class="copy-info">¿No abre WhatsApp? <button type="button" data-action="copy">Copiar las respuestas</button></p>';
}

function render() {
  if (step === -2) renderRefusal();
  else if (step === -1) renderIntro();
  else if (step === 3) renderReview();
  else renderSection(step);
}

function validateCurrentSection() {
  const notAnswered = [];
  for (let i = step * 5; i < step * 5 + 5; i += 1) {
    if (!answers[i]) notAnswered.push(i);
  }
  document.querySelectorAll('.question.missing').forEach(function (el) { el.classList.remove('missing'); });
  if (notAnswered.length) {
    notAnswered.forEach(function (i) {
      const el = root.querySelector('[data-question="' + i + '"]');
      if (el) el.classList.add('missing');
    });
    const message = document.getElementById('validation-msg');
    if (message) message.textContent = 'Por favor responde todas las preguntas de esta sección para continuar.';
    const first = root.querySelector('[data-question="' + notAnswered[0] + '"]');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  return true;
}

function buildMessage() {
  const date = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
  const lines = [
    '*ENCUESTA SOBRE NEUROMARKETING Y DECISIONES DE COMPRA*',
    'Fundación Universitaria del Área Andina · Valledupar, 2026',
    '',
    'Código: ' + surveyCode,
    'Fecha: ' + date,
    'Consentimiento: Sí',
    ''
  ];
  questions.forEach(function (q, i) {
    lines.push((i + 1) + '. ' + q.short + ': ' + answers[i]);
  });
  lines.push('', 'Respuestas compartidas voluntariamente con fines académicos.');
  return lines.join('\n');
}

root.addEventListener('change', function (event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.name === 'consent') {
    const btn = root.querySelector('[data-action="start"]');
    if (btn) btn.disabled = false;
    return;
  }
  if (input.name.startsWith('q')) {
    const index = Number(input.name.slice(1));
    if (Number.isInteger(index) && index >= 0 && index < questions.length && questions[index].options[Number(input.value)]) {
      answers[index] = questions[index].options[Number(input.value)];
      const question = input.closest('.question');
      if (question) question.classList.remove('missing');
      const message = document.getElementById('validation-msg');
      if (message) message.textContent = '';
    }
  }
});

root.addEventListener('submit', function (event) {
  event.preventDefault();
  if (step >= 0 && step < 3 && validateCurrentSection()) {
    step += 1;
    render();
    navigateTop();
  }
});

root.addEventListener('click', function (event) {
  const button = event.target.closest('button[data-action]');
  if (!button || button.disabled) return;
  const action = button.getAttribute('data-action');
  if (action === 'start') {
    const choice = root.querySelector('input[name="consent"]:checked');
    if (!choice) return;
    step = choice.value === 'yes' ? 0 : -2;
    render();
    navigateTop();
  } else if (action === 'restart') {
    step = -1;
    render();
  } else if (action === 'back') {
    step = step === 3 ? 2 : Math.max(-1, step - 1);
    render();
    navigateTop();
  } else if (action === 'send' && step === 3) {
    const message = buildMessage();
    window.location.assign('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message));
  } else if (action === 'copy' && step === 3) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(buildMessage()).then(function () {
        button.textContent = '¡Respuestas copiadas!';
      }).catch(function () {
        button.textContent = 'No se pudo copiar. Intenta abrir WhatsApp.';
      });
    } else {
      button.textContent = 'Abre WhatsApp para compartir las respuestas.';
    }
  }
});

render();
