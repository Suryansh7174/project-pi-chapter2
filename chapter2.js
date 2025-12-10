/* Chapter 2 — Shadow Hallway
   - Particle ambience
   - 12 questions (riddles, story, logic)
   - scoring & reveal
   - global submitAnswers() for safety
*/

(function(){
  // particle ambient
  const pCount = 36;
  function spawnParticles(){
    const layer = document.getElementById('particles');
    if(!layer) return;
    layer.innerHTML = '';
    for(let i=0;i<pCount;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      const size = (Math.random()*3+1).toFixed(2);
      el.style.width = el.style.height = size + 'px';
      el.style.left = (Math.random()*100) + '%';
      el.style.top = (Math.random()*100) + '%';
      el.style.opacity = (Math.random()*0.6+0.05).toString();
      layer.appendChild(el);
      const dx = (Math.random()-0.5)*70;
      const dy = (Math.random()-0.5)*70;
      el.animate([{transform:'translate(0,0)'},{transform:`translate(${dx}px,${dy}px)`}],{duration:12000+Math.random()*10000,iterations:Infinity,direction:'alternate'});
    }
  }
  spawnParticles();

  // questions (12)
  const questions = [
    { q:"Riddle — I repeat my steps and grow; petals, shells, and wolves know. What sequence am I?", A:"Arithmetic", B:"Fibonacci", C:"Geometric", D:"Prime", correct:"B" },
    { q:"Story — The hallway's repeated shadow matched which classroom object?", A:"The clock's hand", B:"A stack of books", C:"The teacher's chair", D:"A pencil box", correct:"A" },
    { q:"Story — Who first heard footsteps when no one walked?", A:"Sia", B:"Aarav", C:"Vaishnav", D:"Suryansh", correct:"C" },
    { q:"Observation — The shadows formed 9 pulses; nine corresponds to which single digit sum (digital root) of 18?", A:"1", B:"9", C:"8", D:"0", correct:"B" },
    { q:"Logic — Sequence: 2, 4, 8, 16. What's next?", A:"18", B:"20", C:"32", D:"24", correct:"C" },
    { q:"Riddle — I circle but I'm not whole, you call me a portion and eat me like a soul. What am I?", A:"Segment", B:"Sector", C:"Slice", D:"Arc", correct:"C" },
    { q:"Pattern — The flicker repeated in cycles of which number often tied to musical beats?", A:"3", B:"4", C:"7", D:"5", correct:"B" },
    { q:"Inference — A torn page showed 'N = N-1 + N-2'. This is the rule of which series?", A:"Arithmetic", B:"Fibonacci", C:"Factorial", D:"Prime", correct:"B" },
    { q:"Critical — The corridor mirror reflected a number '8' that looked like a pair of circles. Which concept does 8 hint at? (in base 2 it's 1000)", A:"Cube of 2", B:"Power of 2", C:"Evenness", D:"Infinity", correct:"B" },
    { q:"Story — The sutra fragment warned: 'Do not follow the echo before ___.' Fill blank.", A:"Noon", B:"Midnight", C:"Dawn", D:"Sunset", correct:"B" },
    { q:"Observation — Which character lit a phone screen to see better in the corridor?", A:"Aarav", B:"Sia", C:"Suryansh", D:"Vaishnav", correct:"A" },
    { q:"Wrap — The hallway's final motif resembled which shape?", A:"Spiral", B:"Broken circle", C:"Staircase", D:"Cross", correct:"B" }
  ];

  // render function
  function render(){
    const area = document.getElementById('questionArea');
    if(!area) return;
    area.innerHTML = '';
    questions.forEach((it, idx)=>{
      const block = document.createElement('div');
      block.className = 'question';
      let html = `<p>${it.q}</p>`;
      ['A','B','C','D'].forEach(letter=>{
        html += `<label><input type="radio" name="q${idx}" value="${letter}"> ${letter}) ${it[letter]}</label>`;
      });
      block.innerHTML = html;
      area.appendChild(block);
    });
  }

  // begin button -> show quiz
  const beginBtn = document.getElementById('beginBtn');
  const intro = document.getElementById('intro');
  const quiz = document.getElementById('quiz');
  if(beginBtn){
    beginBtn.addEventListener('click', ()=>{
      if(intro) intro.classList.add('hidden');
      if(quiz) quiz.classList.remove('hidden');
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  } else {
    render();
  }

  // scoring + reveal
  function computeScore(){
    let score = 0;
    questions.forEach((it, idx)=>{
      const sel = document.querySelector(`input[name="q${idx}"]:checked`);
      if(sel && sel.value === it.correct) score++;
    });
    return score;
  }

  function revealFact(){
    const facts = [
      "Shadow pulses often mask repeating mathematical patterns — the corridor used a rhythm to encode a clue.",
      "The corridor's motifs (broken circle) echo the theme of missing slices — a metaphor for questions left unanswered.",
      "Fibonacci appears twice — Chapter 1 and 2 both hint that natural patterns underlie the rift."
    ];
    const fact = facts[Math.floor(Math.random()*facts.length)];
    const ft = document.getElementById('factText');
    if(ft) ft.innerText = fact;
    const factSection = document.getElementById('fact');
    if(factSection) factSection.classList.remove('hidden');
    const next = document.getElementById('nextLink');
    if(next) next.style.display = 'inline-block';
    try{ localStorage.setItem('projectpi_ch2_solved','1'); }catch(e){}
  }

  // expose global submitAnswers
  window.submitAnswers = function(){
    const score = computeScore();
    const txt = document.getElementById('scoreText');
    if(txt) txt.innerText = `Score: ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%)`;
    if(score >= Math.ceil(questions.length * 0.6)){
      revealFact();
    } else {
      if(txt) txt.style.color = '#ffd1d1';
      const g = document.querySelector('.glitch');
      if(g) g.animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:380,iterations:1});
    }
  };

  // attach submit button
  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn) submitBtn.addEventListener('click', ()=>{ window.submitAnswers(); });

  // reset
  const resetBtn = document.getElementById('resetBtn');
  if(resetBtn) resetBtn.addEventListener('click', ()=>{
    document.querySelectorAll('input[type=radio]').forEach(el=>el.checked=false);
    const t = document.getElementById('scoreText');
    if(t){ t.innerText=''; t.style.color=''; }
  });

  // auto-load solved
  try{
    if(localStorage.getItem('projectpi_ch2_solved') === '1'){
      render();
      if(intro) intro.classList.add('hidden');
      if(quiz) quiz.classList.remove('hidden');
      revealFact();
    }
  }catch(e){}
})();
