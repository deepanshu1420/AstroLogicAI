// --- Star Background Logic ---
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

const initStars = () => {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<80; i++) {
        stars.push({ 
            x: Math.random()*canvas.width, 
            y: Math.random()*canvas.height, 
            size: Math.random()*3 + 1, 
            speed: Math.random()*0.4 
        });
    }
}

const drawStars = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? "white" : "indigo";
    stars.forEach(s => {
        ctx.globalAlpha = 0.4; 
        ctx.beginPath(); 
        ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); 
        ctx.fill();
        s.y -= s.speed; 
        if(s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(drawStars);
}

initStars(); 
drawStars();
window.onresize = initStars;

// --- Zodiac Logic ---
const zodiacMap = {
    Aries: { icon: "♈", hi: "मेष" }, Taurus: { icon: "♉", hi: "वृषभ" }, Gemini: { icon: "♊", hi: "मिथुन" },
    Cancer: { icon: "♋", hi: "कर्क" }, Leo: { icon: "♌", hi: "सिंह" }, Virgo: { icon: "♍", hi: "कन्या" },
    Libra: { icon: "♎", hi: "तुला" }, Scorpio: { icon: "♏", hi: "वृश्चिक" }, Sagittarius: { icon: "♐", hi: "धनु" },
    Capricorn: { icon: "♑", hi: "मकर" }, Aquarius: { icon: "♒", hi: "कुंभ" }, Pisces: { icon: "♓", hi: "मीन" }
};

const getZodiac = (dateStr) => {
    if(!dateStr || dateStr === "00-00-0000") return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    const m = date.getMonth() + 1, d = date.getDate();
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
};

const updateZodiacUI = (dateStr) => {
    const sign = getZodiac(dateStr);
    if(!sign) { 
        document.getElementById('zodiacHeader').classList.add('hidden'); 
        return; 
    }
    const data = zodiacMap[sign];
    document.getElementById('zodiacHeader').classList.remove('hidden');
    document.getElementById('zodiacIconMain').textContent = data.icon;
    document.getElementById('zodiacEn').textContent = sign;
    document.getElementById('zodiacHi').textContent = data.hi;
}

// --- Pickers Initialization ---
const dobPicker = flatpickr("#dob", { 
    dateFormat: "Y-m-d", 
    disableMobile: "true", 
    onChange: (sd, ds) => {
        const el = document.getElementById('dob');
        ds ? el.classList.remove('is-placeholder') : el.classList.add('is-placeholder');
        updateZodiacUI(ds);
    },
    onReady: (sd, ds, instance) => { instance.input.value = "00-00-0000"; }
});

const timePicker = flatpickr("#time", { 
    enableTime: true, 
    noCalendar: true, 
    dateFormat: "h:i K", 
    disableMobile: "true",
    onOpen: () => { document.getElementById('time').classList.add('ring-2', 'ring-purple-400/50'); },
    onClose: () => { document.getElementById('time').classList.remove('ring-2', 'ring-purple-400/50'); },
    onChange: (sd, ds) => {
        const el = document.getElementById('time');
        ds ? el.classList.remove('is-placeholder') : el.classList.add('is-placeholder');
    },
    onReady: (sd, ds, instance) => { instance.input.value = "0:00"; }
});

// --- Page Load Initial State ---
window.addEventListener('load', () => {
    document.getElementById('dob').value = "00-00-0000";
    document.getElementById('time').value = "0:00";
    document.getElementById('dob').classList.add('is-placeholder');
    document.getElementById('time').classList.add('is-placeholder');
});

// --- UI Button Handlers ---
document.getElementById('refreshBtn').addEventListener('click', () => {
    document.getElementById('name').value = "";
    document.getElementById('location').value = "";
    dobPicker.clear();
    timePicker.clear();
    const d = document.getElementById('dob');
    const t = document.getElementById('time');
    d.value = "00-00-0000";
    t.value = "0:00";
    d.classList.add('is-placeholder');
    t.classList.add('is-placeholder');
    document.getElementById('zodiacHeader').classList.add('hidden');
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const captureArea = document.getElementById('captureArea');
    html2canvas(captureArea, {
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: null,
        windowWidth: captureArea.scrollWidth,
        windowHeight: captureArea.scrollHeight,
        onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById('captureArea');
            el.style.paddingBottom = "40px";
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `AstroLogic-Predictions.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    });
});

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    themeIcon.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

const formContainer = document.getElementById('formContainer');
const resultWrapper = document.getElementById('resultWrapper');
const backBtn = document.getElementById('backBtn');
const userNameSpan = document.getElementById('userNameSpan');

backBtn.addEventListener('click', () => { 
    resultWrapper.classList.add('hidden'); 
    formContainer.classList.remove('hidden'); 
});

// --- Sidebar & History Logic ---
const sidebar = document.getElementById('historySidebar');
const overlay = document.getElementById('sidebarOverlay');
const historyList = document.getElementById('historyList');
const toggleBtn = document.getElementById('toggleHistoryBtn');

function openSidebar() {
    sidebar.classList.remove('hidden'); 
    overlay.classList.remove('hidden');
    setTimeout(() => { 
        sidebar.classList.remove('-translate-x-[110%]', 'opacity-0'); 
        overlay.classList.remove('opacity-0'); 
    }, 10);
    updateHistoryUI();
}

function closeSidebar() {
    sidebar.classList.add('-translate-x-[110%]', 'opacity-0'); 
    overlay.classList.add('opacity-0');
    setTimeout(() => { 
        sidebar.classList.add('hidden'); 
        overlay.classList.add('hidden'); 
    }, 300);
}

toggleBtn.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    sidebar.classList.contains('hidden') ? openSidebar() : closeSidebar(); 
});

document.getElementById('closeHistoryBtn').addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
document.getElementById('clearSessionBtn').addEventListener('click', () => { 
    sessionStorage.removeItem('astroHistory'); 
    updateHistoryUI(); 
});

function updateHistoryUI() {
    const history = JSON.parse(sessionStorage.getItem('astroHistory') || '[]');
    if (history.length === 0) { 
        historyList.innerHTML = '<p class="text-sm opacity-60 text-center mt-4">No readings yet.</p>'; 
        return; 
    }
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-card bg-white/20 dark:bg-white/5 border border-white/20 rounded-xl p-4 text-sm cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all text-left" data-index="${index}">
            <div class="flex flex-col gap-2">
                <div class="font-bold text-indigo-900 dark:text-purple-300 text-base">${item.name}</div>
                <div class="flex items-center gap-3 opacity-80 text-xs text-indigo-800 dark:text-white">
                    <span>📅 ${item.dob}</span><span class="opacity-30">|</span><span>⏰ ${item.time}</span>
                </div>
                <div class="opacity-80 text-xs text-indigo-800 dark:text-white">📍 ${item.location}</div>
            </div>
        </div>`).join('');
}

historyList.addEventListener('click', (e) => {
    const card = e.target.closest('.history-card');
    if (!card) return; 
    
    const index = parseInt(card.getAttribute('data-index'), 10);
    const history = JSON.parse(sessionStorage.getItem('astroHistory') || '[]');
    const item = history[index];
    
    if (item) {
        const nameEl = document.getElementById('name');
        const locEl = document.getElementById('location');
        const dobEl = document.getElementById('dob');
        const timeEl = document.getElementById('time');
        
        nameEl.value = item.name;
        locEl.value = item.location;
        
        if (dobEl._flatpickr) dobEl._flatpickr.setDate(item.dob, true);
        else dobEl.value = item.dob; 
        
        if (timeEl._flatpickr) timeEl._flatpickr.setDate(item.time, true);
        else timeEl.value = item.time;
        
        dobEl.classList.remove('is-placeholder');
        timeEl.classList.remove('is-placeholder');
        
        updateZodiacUI(item.dob);
        resultWrapper.classList.add('hidden');
        formContainer.classList.remove('hidden');
        closeSidebar();
    }
});

// --- API Submission Logic ---
// --- Custom Toast ---
function showToast(msg) {
    const toast = document.getElementById('customToast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

document.getElementById('astroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');

    const nameVal = document.getElementById('name').value.trim();
    const dobVal = document.getElementById('dob').value;
    const timeVal = document.getElementById('time').value;
    const locationVal = document.getElementById('location').value.trim();

    if (!nameVal)                           { showToast("Please fill out your Full Name"); return; }
    if (!dobVal || dobVal === "00-00-0000") { showToast("Please fill out your Date of Birth"); return; }
    if (!timePicker.selectedDates.length)   { showToast("Please fill out your Birth Time"); return; }
    if (!locationVal)                       { showToast("Please fill out your Birth Place"); return; }

    btn.disabled = true; 
    formContainer.classList.add('hidden'); 
    resultWrapper.classList.add('hidden'); 
    loading.classList.replace('hidden', 'flex');
    
    const payload = { 
        name: document.getElementById('name').value, 
        dob: document.getElementById('dob').value, 
        time: document.getElementById('time').value, 
        location: document.getElementById('location').value 
    };

    try {
    const API_URL = window.location.hostname === "localhost"
        ? "http://localhost:3000/api/predict"
        : "/.netlify/functions/predict";

    const response = await fetch(API_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
    });

    const data = await response.json();

        if (response.ok) {
            let history = JSON.parse(sessionStorage.getItem('astroHistory') || '[]');
            history.unshift(payload); 
            sessionStorage.setItem('astroHistory', JSON.stringify(history));
            
            userNameSpan.textContent = payload.name.split(' ')[0] || "Seeker";
            
            const createCard = (title, icon, items) => `
                <div class="bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/20 rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all text-left">
                    <h3 class="text-xl font-bold text-indigo-900 dark:text-purple-200 mb-4 flex items-center gap-2"><span>${icon}</span> ${title}</h3>
                    <ul class="space-y-3 text-sm leading-relaxed text-blue-900 dark:text-blue-100">${items.map(i => `<li>• ${i}</li>`).join('')}</ul>
                </div>`;

            resultContainer.innerHTML = 
                createCard('Personality', '🎭', data.personality) + 
                createCard('Career', '💼', data.career) + 
                createCard('Love', '❤️', data.love) + 
                createCard('Improvement', '🌱', data.improvements);

            loading.classList.replace('flex', 'hidden'); 
            resultWrapper.classList.remove('hidden');
        } else { 
            alert("Error: " + data.error); 
            loading.classList.replace('flex', 'hidden'); 
            formContainer.classList.remove('hidden'); 
        }
    } catch (err) { 
        alert("Failed to connect to server."); 
        loading.classList.replace('flex', 'hidden'); 
        formContainer.classList.remove('hidden'); 
    } finally { 
        btn.disabled = false; 
    }
});