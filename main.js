// --- Grammar-Based Parts ---
const subjects = [
    "mi gato hacker", "el espíritu de mi bisabuelo comunista", "un mapache con sombrero de copa", 
    "la mafia de las palomas", "mi doble de otra dimensión", "un algoritmo deprimido", 
    "el presidente de la comunidad de vecinos", "mi tostadora consciente", "una tribu de gnomos de jardín",
    "el fantasma de Steve Jobs", "un viajero del tiempo sin pantalones", "mi asistente de voz malvado",
    "un ejército de hormigas radioactivas", "mi propio reflejo en el espejo"
];

const verbs = [
    "secuestró", "demandó a", "se comió", "borró", "invocó a", 
    "declaró ilegal", "abdujo a", "convirtió en NFT a", 
    "hipnotizó a", "teletransportó", "incendió metafóricamente", 
    "retó a un duelo de baile a", "envió a la edad media a"
];

const objects = [
    "mi router", "mis ganas de vivir", "mi coche", "tu regalo de cumpleaños", 
    "las llaves de casa", "el servidor de Google", "mi sentido de la responsabilidad", 
    "la batería de mi móvil", "mis pantalones favoritos", "el concepto del tiempo",
    "la puerta de mi casa"
];

const contexts = [
    "mientras sonaba música de ascensor", "en un ritual satánico involuntario", 
    "durante un eclipse lunar", "porque Mercurio estaba retrógrado", 
    "para evitar el apocalipsis fiscal", "siguiendo instrucciones de TikTok",
    "en el metaverso", "bajo los efectos de un té caducado",
    "por razones de seguridad nacional", "en una protesta nudista"
];

const btnSalvarme = document.getElementById('salvarmeBtn');
const reasonInput = document.getElementById('reasonInput');
const container = document.getElementById('excusaContainer');
const historyList = document.getElementById('historyList');
const btnClear = document.getElementById('clearHistory');

// Cargar historial
function loadHistory() {
  const history = JSON.parse(localStorage.getItem('excuseHistory')) || [];
  historyList.innerHTML = '';
  history.forEach(excusa => {
    addHistoryItem(excusa);
  });
}

function addHistoryItem(text) {
  const li = document.createElement('li');
  // Add highlight/animation to new item
  li.style.animation = "fadeIn 0.5s";
  li.textContent = text;
  // Insert at top
  historyList.insertBefore(li, historyList.firstChild);
}

function saveExcuse(text) {
  const history = JSON.parse(localStorage.getItem('excuseHistory')) || [];
  history.unshift(text); // Add to beginning
  if (history.length > 20) history.pop(); // Keep last 20
  localStorage.setItem('excuseHistory', JSON.stringify(history));
}

function generateRandomExcuse() {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    const o = objects[Math.floor(Math.random() * objects.length)];
    const c = contexts[Math.floor(Math.random() * contexts.length)];
    
    return `${s} ${v} ${o} ${c}`;
}

async function generateExcuse() {
  // Capture value immediately
  const currentInput = document.getElementById('reasonInput');
  const reason = currentInput ? currentInput.value.trim() : "";

  // Efecto de carga
  container.innerHTML = '<p class="placeholder">Calculando variables de causalidad...</p>';
  btnSalvarme.disabled = true;

  // Artificial processing delay for dramatic effect
  await new Promise(r => setTimeout(r, 600));

  let excusaBase = generateRandomExcuse();

  // Ensure lowercase start for template
  excusaBase = excusaBase.charAt(0).toLowerCase() + excusaBase.slice(1);

  let finalExcuse = "";
  if (reason) {
      finalExcuse = `Mira, lo de ${reason}... es que ${excusaBase}`;
  } else {
      finalExcuse = excusaBase;
  }
  
  // Capitalize sentence
  finalExcuse = finalExcuse.charAt(0).toUpperCase() + finalExcuse.slice(1);
  
  container.innerHTML = `<p class="excusa-text">"${finalExcuse}"</p>`;
  saveExcuse(finalExcuse);
  addHistoryItem(finalExcuse);
  btnSalvarme.disabled = false;
}

btnSalvarme.addEventListener('click', generateExcuse);
// Allow Enter key in input
reasonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateExcuse();
});

btnClear.addEventListener('click', () => {
    localStorage.removeItem('excuseHistory');
    loadHistory();
});

// Init
loadHistory();
