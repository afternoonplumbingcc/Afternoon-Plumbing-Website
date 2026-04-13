const today = new Date().toISOString().slice(0,10);
const stateKey = 'chris-scoreboard-v1';
const store = JSON.parse(localStorage.getItem(stateKey) || '{}');
store.days ||= {};
store.days[today] ||= { mobility:null, workout:null, snacks:null, notes:'' };

const day = store.days[today];
const fmt = new Date().toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});
document.getElementById('dateLine').textContent = `Today: ${fmt}`;

function save(){ localStorage.setItem(stateKey, JSON.stringify(store)); render(); }

for (const card of document.querySelectorAll('.card[data-key]')) {
  const key = card.dataset.key;
  const buttons = card.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => { day[key] = btn.dataset.val; save(); });
  });
}

document.getElementById('notes').value = day.notes || '';
document.getElementById('notes').addEventListener('input', (e)=>{ day.notes = e.target.value; save(); });

function calcStreak() {
  let streak = 0;
  for (let i=0; i<365; i++) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const k = d.toISOString().slice(0,10);
    const rec = store.days[k];
    if (!rec) break;
    const win = ['mobility','workout','snacks'].every(x => rec[x] === 'yes');
    if (win) streak++; else break;
  }
  return streak;
}

function render() {
  for (const card of document.querySelectorAll('.card[data-key]')) {
    const key = card.dataset.key;
    card.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('active','ok','bad');
      if (day[key] === btn.dataset.val) {
        btn.classList.add('active', btn.dataset.val === 'yes' ? 'ok' : 'bad');
      }
    });
  }
  const score = ['mobility','workout','snacks'].filter(k => day[k]==='yes').length;
  document.getElementById('scoreLine').textContent = `Score: ${score}/3`;
  document.getElementById('streakLine').textContent = `Current streak: ${calcStreak()} days (all 3 wins)`;
}

render();