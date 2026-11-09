const projects = [
  { id: 241098961, slug: 'MUEBLES-EL-CHOLLAZO', title: 'Muebles El Chollazo', category: 'Campañas', tags: ['campanas', 'social'], description: 'Selección de trabajos para la marca de mobiliario. Diseño de piezas comerciales y creación de contenido de producto para campañas.' },
  { id: 241098375, slug: 'PATROCINADOR-PRINCIPAL-UDB-ALFAFAR-%28JR-VALLE-CUPRA%29', title: 'UDB Alfafar × CUPRA', category: 'Audiovisual · Deporte', tags: ['audiovisual', 'campanas'], description: 'Pieza de presentación de JR Valle CUPRA como patrocinador principal de UDB Alfafar.' },
  { id: 241096839, slug: 'SERVICIOS-ACTIVACION-ECONOMICA-DANA', title: 'Activación económica DANA', category: 'Comunicación', tags: ['campanas'], description: 'Proyecto de comunicación sobre los servicios de activación económica tras la DANA.' },
  { id: 227531879, slug: 'Muestra-social-media-%28creacion-de-contenido%29', title: 'Muestra de social media', category: 'Social media', tags: ['social'], description: 'Muestra de piezas y formatos creados para redes sociales.' },
  { id: 197473855, slug: 'MUESTRA-FOTOGRAFICA', title: 'Muestra fotográfica', category: 'Fotografía', tags: ['fotografia'], description: 'Selección de fotografías publicada en mi archivo de trabajos.' },
  { id: 170755099, slug: 'EHVOL-FASHION-PIEZA-PUBLICITARIA', title: 'EHVOL Fashion', category: 'Publicidad', tags: ['campanas'], description: 'Pieza publicitaria para EHVOL Fashion.' },
  { id: 170754469, slug: 'SECUENCIASTATAUADOR-JONH-CAICEDO-BESTIAL-2023', title: 'Jonh Caicedo · Bestial 2023', category: 'Audiovisual', tags: ['audiovisual'], description: 'Secuencias del tatuador Jonh Caicedo para Bestial 2023.' },
  { id: 170753827, slug: 'INTRODUCCION-EVENTO-CENTRO-93-SUPER-AUDIO', title: 'Super Audio · Centro 93', category: 'Audiovisual', tags: ['audiovisual'], description: 'Pieza de introducción para el evento de Super Audio en Centro 93.' },
  { id: 170753459, slug: 'EVENTO-SUPER-AUDIO-%28PRE-PARTY%29', title: 'Super Audio · Pre-party', category: 'Audiovisual', tags: ['audiovisual'], description: 'Pieza audiovisual del evento previo de Super Audio.' },
  { id: 170752283, slug: 'INTRODUCCION-FUNCIONES-PAGINA-WEB-SUPER-AUDIO-SAS', title: 'Funciones web de Super Audio', category: 'Audiovisual · Web', tags: ['audiovisual'], description: 'Presentación de las funciones de la web de Super Audio SAS.' },
  { id: 170751887, slug: 'DIA-SIN-IVA-SUPER-AUDIO-SAS', title: 'Super Audio · Día sin IVA', category: 'Campañas', tags: ['campanas'], description: 'Pieza de campaña para el Día sin IVA de Super Audio SAS.' },
  { id: 170750955, slug: 'INTRODUCCION-PAGINA-RENOVADA-SUPER-AUDIO', title: 'La nueva web de Super Audio', category: 'Audiovisual · Web', tags: ['audiovisual'], description: 'Introducción a la página renovada de Super Audio.' }
];

const gallery = document.querySelector('#gallery-grid');
const dialog = document.querySelector('#project-dialog');
const coverPath = ({ id }) => `assets/${id}.webp`;
const coverMarkup = (project) => `<img src="${coverPath(project)}" alt="" width="808" height="632" loading="lazy" decoding="async">`;

document.querySelector('#project-list').innerHTML = projects.slice(0, 4).map((project, index) => `
  <button type="button" class="project-card" data-project="${project.id}" aria-haspopup="dialog">
    <span class="project-visual">${coverMarkup(project)}<span class="project-index micro" aria-hidden="true">0${index + 1}</span></span>
    <span class="project-info"><span class="micro">${project.category}</span><strong>${project.title}</strong><span class="summary">${project.description}</span><span class="project-action">Ver proyecto ↗</span></span>
  </button>
`).join('');

function renderGallery(filter) {
  const visibleProjects = filter === 'all' ? projects : projects.filter(project => project.tags.includes(filter));
  gallery.innerHTML = visibleProjects.map(project => `
    <button type="button" class="gallery-item" data-project="${project.id}" aria-haspopup="dialog">
      <span class="gallery-visual">${coverMarkup(project)}</span><span class="gallery-label"><span class="micro">${project.category}</span><strong>${project.title} ↗</strong></span>
    </button>
  `).join('');
  document.querySelector('#gallery-count').textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? 'proyecto' : 'proyectos'}`;
}

renderGallery('all');
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filters [aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    renderGallery(button.dataset.filter);
  });
});

document.querySelector('main').addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (!trigger) return;
  const project = projects.find(item => item.id === Number(trigger.dataset.project));
  document.querySelector('#detail-title').textContent = project.title;
  document.querySelector('#detail-category').textContent = project.category;
  document.querySelector('#detail-description').textContent = project.description;
  document.querySelector('#detail-cover').src = coverPath(project);
  document.querySelector('#detail-link').href = `https://www.behance.net/gallery/${project.id}/${project.slug}`;
  dialog.showModal();
});

const theme = document.querySelector('.theme');
function applyTheme(mode) {
  const light = mode === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  theme.setAttribute('aria-pressed', String(light));
  theme.setAttribute('aria-label', light ? 'Activar modo oscuro' : 'Activar modo claro');
}
try { applyTheme(localStorage.getItem('sm-theme')); } catch { applyTheme('dark'); }
theme.addEventListener('click', () => {
  const mode = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(mode);
  try { localStorage.setItem('sm-theme', mode); } catch { /* Theme remains available for the current page. */ }
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const role = document.querySelector('#role-text');
const roles = ['Diseñador gráfico', 'Realizador audiovisual', 'Especialista en IA aplicada', 'Creador de contenido visual'];
let roleIndex = 0;
let roleTimer;
function animateRoles() {
  clearTimeout(roleTimer);
  if (reduced.matches) {
    role.textContent = roles[0];
    return;
  }
  let erasing = true;
  function type() {
    const fullText = roles[roleIndex];
    if (erasing && !role.textContent) {
      roleIndex = (roleIndex + 1) % roles.length;
      erasing = false;
      roleTimer = setTimeout(type, 150);
      return;
    }
    role.textContent = fullText.slice(0, role.textContent.length + (erasing ? -1 : 1));
    if (!erasing && role.textContent === fullText) {
      erasing = true;
      roleTimer = setTimeout(type, 2300);
    } else {
      roleTimer = setTimeout(type, erasing ? 25 : 48);
    }
  }
  roleTimer = setTimeout(type, 2300);
}
animateRoles();
reduced.addEventListener('change', animateRoles);

const portrait = document.querySelector('#portrait');
const irises = portrait.querySelectorAll('[data-iris]');
const eyes = portrait.querySelectorAll('.gaze');
const stage = document.querySelector('.hero-layout');
const clamp = value => Math.max(-1, Math.min(1, value));
let desired = { x: 0, y: 0 };
let current = { x: 0, y: 0 };
let parallax = { x: 0, y: 0 };
let rendered = { x: 0, y: 0 };
let frame = 0;

function drawGaze() {
  const factor = reduced.matches ? 1 : 0.18;
  const settle = (value, target) => Math.abs(target - value) < 0.015 ? target : value + (target - value) * factor;
  current = { x: settle(current.x, desired.x), y: settle(current.y, desired.y) };
  rendered = { x: settle(rendered.x, parallax.x), y: settle(rendered.y, parallax.y) };
  const intensity = Math.min(1, Math.hypot(current.x / 6, current.y / 4));
  eyes.forEach(eye => { eye.style.opacity = String(intensity); });
  irises.forEach(iris => iris.setAttribute('transform', `translate(${current.x} ${current.y})`));
  portrait.style.setProperty('--portrait-x', `${rendered.x}px`);
  portrait.style.setProperty('--portrait-y', `${rendered.y}px`);
  frame = current.x !== desired.x || current.y !== desired.y || rendered.x !== parallax.x || rendered.y !== parallax.y
    ? requestAnimationFrame(drawGaze) : 0;
}

function scheduleGaze() {
  if (!frame) frame = requestAnimationFrame(drawGaze);
}

function centerGaze() {
  desired = { x: 0, y: 0 };
  parallax = { x: 0, y: 0 };
  scheduleGaze();
}

window.addEventListener('pointermove', event => {
  if (reduced.matches || event.pointerType === 'touch') return;
  const bounds = stage.getBoundingClientRect();
  if (bounds.bottom < 0 || event.clientY > bounds.bottom) {
    centerGaze();
    return;
  }
  const face = portrait.getBoundingClientRect();
  const x = (event.clientX - (face.left + face.width * 0.512)) / (window.innerWidth * 0.36);
  const y = (event.clientY - (face.top + face.height * 0.486)) / (window.innerHeight * 0.34);
  const range = Math.max(1, Math.hypot(x, y));
  desired = { x: x / range * 36, y: y / range * 23 };
  parallax = { x: clamp(x) * 10, y: clamp(y) * 7 };
  scheduleGaze();
}, { passive: true });
document.documentElement.addEventListener('pointerleave', centerGaze);
window.addEventListener('blur', centerGaze);
reduced.addEventListener('change', centerGaze);

const curtain = document.querySelector('.navigation-curtain');
const sectionLinks = [...document.querySelectorAll('.site-header nav a')];
let pendingNavigation;
let navigationTimer;

function updateCurrentLink(hash) {
  sectionLinks.forEach(link => {
    if (link.hash === hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function showDestination({ hash, target, push, focus }) {
  if (push && hash !== location.hash) history.pushState(null, '', hash);
  updateCurrentLink(hash);
  if (target && hash !== '#inicio') target.scrollIntoView({ behavior: 'instant', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
  if (focus && target) {
    const heading = target.querySelector('h1, h2') ?? target;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function startNavigation() {
  if (reduced.matches) {
    showDestination(pendingNavigation);
    pendingNavigation = undefined;
    return;
  }
  curtain.dataset.phase = 'cover';
  navigationTimer = setTimeout(() => {
    showDestination(pendingNavigation);
    pendingNavigation = undefined;
    navigationTimer = setTimeout(() => {
      curtain.dataset.phase = 'reveal';
      navigationTimer = setTimeout(() => {
        curtain.dataset.phase = 'idle';
        if (pendingNavigation) requestAnimationFrame(startQueuedNavigation);
      }, 680);
    }, 80);
  }, 360);
}

function startQueuedNavigation() {
  if (pendingNavigation && curtain.dataset.phase === 'idle') startNavigation();
}

function navigateTo(hash, { push = true, focus = false } = {}) {
  const target = hash ? document.getElementById(hash.slice(1)) : null;
  if (hash && !target) return false;
  pendingNavigation = { hash, target, push, focus };
  startQueuedNavigation();
  return true;
}

updateCurrentLink(location.hash);
history.scrollRestoration = 'manual';
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href^="#"]:not(.skip)');
  if (link && navigateTo(link.hash, { focus: event.detail === 0 })) event.preventDefault();
});
window.addEventListener('popstate', () => navigateTo(location.hash, { push: false }));
reduced.addEventListener('change', () => {
  if (!reduced.matches) return;
  clearTimeout(navigationTimer);
  curtain.dataset.phase = 'idle';
  startQueuedNavigation();
});

window.addEventListener('pointermove', event => {
  if (reduced.matches || event.pointerType === 'touch') return;
  const grid = event.target.closest?.('.pointer-grid');
  if (!grid) return;
  const bounds = grid.getBoundingClientRect();
  grid.style.setProperty('--grid-x', `${event.clientX - bounds.left}px`);
  grid.style.setProperty('--grid-y', `${event.clientY - bounds.top}px`);
}, { passive: true });
document.querySelectorAll('.pointer-grid').forEach(grid => {
  grid.addEventListener('pointerleave', () => {
    grid.style.removeProperty('--grid-x');
    grid.style.removeProperty('--grid-y');
  });
});

const areaRows = [...document.querySelectorAll('.area-list li')].map(row => {
  const words = [];
  row.querySelectorAll('h3, p').forEach(element => {
    const text = element.textContent.trim();
    const accessibleText = document.createElement('span');
    accessibleText.className = 'sr-only';
    accessibleText.textContent = text;
    const visualText = document.createElement('span');
    visualText.setAttribute('aria-hidden', 'true');
    element.replaceChildren(accessibleText, visualText);
    text.split(/\s+/).forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'area-word';
      span.textContent = word;
      if (index) visualText.append(' ');
      visualText.append(span);
      words.push(span);
    });
  });
  return { row, number: row.firstElementChild, words };
});

let areaFrame;
const unitInterval = value => Math.max(0, Math.min(1, value));

function revealAreaWords() {
  areaFrame = 0;
  const height = document.documentElement.clientHeight;
  const positions = areaRows.map(({ row }) => row.getBoundingClientRect());
  areaRows.forEach(({ number, words }, index) => {
    const { top, height: rowHeight } = positions[index];
    const progress = reduced.matches ? 1 : unitInterval((height * 0.9 - top) / (height * 0.65 + rowHeight));
    number.style.opacity = 0.18 + 0.82 * unitInterval(progress / 0.2);
    words.forEach((word, index) => {
      const start = (index + 1) / (words.length + 1) * 0.76;
      word.style.opacity = 0.18 + 0.82 * unitInterval((progress - start) / 0.24);
    });
  });
}

function scheduleAreaReveal() {
  if (!areaFrame) areaFrame = requestAnimationFrame(revealAreaWords);
}

scheduleAreaReveal();
window.addEventListener('scroll', scheduleAreaReveal, { passive: true });
window.addEventListener('resize', scheduleAreaReveal);
reduced.addEventListener('change', scheduleAreaReveal);
