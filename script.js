/* ═══════════════════════════════════════════════════════════
   PPF Athletics — Enhanced Interactive JavaScript
   script.js
   ═══════════════════════════════════════════════════════════ */

/* ── Cinematic Intro ──────────────────────────────────────── */
(function(){
  const intro = document.querySelector('.cinematic-intro');
  const bar = document.querySelector('.intro-bar span');
  if(!intro) return;
  let progress = 0;
  const tick = setInterval(()=>{
    progress += Math.random()*8 + 3;
    if(progress > 100) progress = 100;
    if(bar) bar.style.width = progress + '%';
    if(progress >= 100){
      clearInterval(tick);
      setTimeout(()=> intro.classList.add('done'), 1000);
    }
  },200);
  window.addEventListener('load',()=>{
    progress = 100;
    if(bar) bar.style.width = '100%';
    setTimeout(()=> intro.classList.add('done'), 1400);
  });
})();

/* ── Scroll Progress Bar ─────────────────────────────────── */
(function(){
  const bar = document.querySelector('.scroll-progress');
  if(!bar) return;
  function update(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, {passive:true});
  update();
})();

/* ── Particle Canvas ─────────────────────────────────────── */
(function(){
  const canvas = document.getElementById('particle-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 60;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for(let i = 0; i < COUNT; i++){
    particles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.8 + 0.4,
      dx: (Math.random()-0.5)*0.3,
      dy: (Math.random()-0.5)*0.3,
      o: Math.random()*0.5 + 0.1
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.dx; p.y += p.dy;
      if(p.x < 0) p.x = w;
      if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = h;
      if(p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,106,0,' + p.o + ')';
      ctx.fill();
    }
    // Draw connections
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 140){
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(255,106,0,' + (0.08*(1-dist/140)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Nav Scroll Effect ───────────────────────────────────── */
(function(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  function check(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', check, {passive:true});
  check();
})();

/* ── Animated Counters ───────────────────────────────────── */
(function(){
  const counters = document.querySelectorAll('[data-count]');
  if(!counters.length) return;

  function animateCounter(el){
    const target = el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const isFloat = target.includes('.');
    const end = parseFloat(target.replace(/,/g,''));
    const duration = 2000;
    const start = performance.now();

    function step(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      let current = eased * end;
      if(isFloat){
        el.textContent = prefix + current.toFixed(2) + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.3});
  counters.forEach(el=> obs.observe(el));
})();

/* ── 3D Card Tilt Effect (base — enhanced version loaded later) ── */

/* ── Data Arrays (preserved exactly from original) ───────── */
const playerPhotos = {
  "Shawn Williams": "Shawn.williams.alumni.jpeg",
  "Nathan Cottrell": "Nate.Cottrell.jpeg",
  "Shannon Smith": "Shannon.Smith.alumni.jpeg",
  "Jalen Camp": "Jalen.Camp.alumni.jpeg",
  "CJ Windham": "CJ.Windham.alumni.jpeg",
  "Tae Daley": "Tae.Daley.jpeg",
  "Jack Coco": "Jack.Coco.png",
  "Tobias Oliver": "Tobias.Oliver.jpeg",
  "Travis Bell": "Travis.Bell.2.jpeg",
  "Robert Cooper": "Robert.Cooper.jpeg",
  "Martez Manuel": "Martez.Manuel.jpeg",
  "Abraham Beauplan": "AbrahamBeauplan.jpeg",
  "Ahmarean Brown": "AB.Brown.png",
  "AJ Mealing": "AJ.Mealing.jpeg",
  "Kyler Baugh": "Kyler.Baugh.jpeg",
  "Robert Kennedy": "Robert Kenneddy.jpeg",
  "Sam Pinckney": "Sam.Pinckney.new.jpg",
  "DK Kaufman": "Dk Kaufman.jpeg",
  "Torricelli Simpkins": "Torricelli.Simpkins.alumni.new.jpg",
  "Cam Bright": "Cam.bright.jpeg",
  "AJ Lewis": "AJ.Lewis.jpeg",
  "Dymere Miller": "Dymere.Miller.alumni.jpeg",
  "Zeke Correll": "Zeke.Correll.new.jpg",
  "Markel Linzer": "Markel.Linzer.jpeg",
  "Michel Dukes": "Micheal Dukes.jpeg",
  "Mike Allen": "Mike Allen.jpeg",
  "Richard Jordan Jr.": "richard Jordan Jr.jpeg",
  "T'sai McDaniel": "T'sai McDaniel.jpeg",
  "Deshon Stoudemire": "Deshon Stoudermire.jpeg",
  "Deontay Campbell": "Deontay Campbell.jpeg",
  "Dontavious Nash": "Dontavious Nash.jpeg",
  "Dezmond Tell": "Dezmond Tell.jpeg",
  "Dakereon Joyner": "Dakeron Joyner.jpeg",
  "Darius Green": "Darius Green.jpeg",
  "Darius Meeks": "Darius Meeks.jpeg",
  "De'Rickey Wright": "De'Rickey Wright.jpeg",
  "Ajani Kerr": "Ajani Kerr.jpeg",
  "Earl Stoudemire Jr.": "Earl Stoudermire Jr.jpeg",
  "Elin Jones": "Elin Jones.jpg.webp",
  "EJ Jackson": "EJ Jackson.jpeg",
  "Jabari Brooks": "Jabari Brooks.jpeg",
  "Braelen Oliver": "Braelen Oliver.jpeg",
  "Brandon Frazier": "Brandon Frazier.jpeg",
  "Amipeleasi Langi Jr.": "Amipeleasi Langi Jr..jpeg",
  "Koby Drake": "Koby Drake.jpeg",
  "Javon Denis": "Javon Denis.jpeg",
  "Omari Thomas": "Omari Thomas.jpg.webp",
  "Omarion Dollison": "7c46366d-87fd-4f79-81f2-f22e4c704154.png",
  "Taleeq Robbins": "Taleeq Robbins.jpeg",
  "Carlos Dunovant Jr.": "Carlos Dunovant.jpeg",
  "Michael Fitzgerald": "Micheal Fitzgerald.jpeg",
  "Jacorey Crawford": "Jacorey Crawford.jpeg",
  "Makhari Sibblis": "Mikhari Sibblis.jpeg",
  "Sean Martin": "Sean Martin.jpeg",
  "Josh Carlin": "Josh Carlin.jpeg",
  "Isaac Foster": "962093a7-d345-442a-8140-1de21316e184.png",
  "Tayvonn Kyle": "9b25fd22-72f6-4f96-873a-ff306d2cadb6.png"
};

const alumni = [
  {
    "name": "Shawn Williams",
    "position": "S",
    "school": "Georgia",
    "team": "Cincinnati Bengals",
    "photo": "Shawn.williams.alumni.jpeg"
  },
  {
    "name": "Nathan Cottrell",
    "position": "RB",
    "school": "Georgia Tech",
    "team": "Jacksonville Jaguars",
    "photo": "Nate.Cottrell.jpeg"
  },
  {
    "name": "Shannon Smith",
    "position": "WR",
    "school": "West Georgia",
    "team": "Ottawa Redblacks",
    "photo": "Shannon.Smith.alumni.jpeg"
  },
  {
    "name": "Jalen Camp",
    "position": "WR",
    "school": "Georgia Tech",
    "team": "Jacksonville Jaguars • Houston Texans",
    "photo": "Jalen.Camp.alumni.jpeg"
  },
  {
    "name": "CJ Windham",
    "position": "WR",
    "school": "Middle Tennessee State",
    "team": "Vegas Knight Hawks • XFL",
    "photo": "CJ.Windham.alumni.jpeg"
  },
  {
    "name": "Tae Daley",
    "position": "S",
    "school": "Vanderbilt • Virginia Tech",
    "team": "Arizona Cardinals",
    "photo": "Tae.Daley.jpeg"
  },
  {
    "name": "Jack Coco",
    "position": "LS",
    "school": "Georgia Tech",
    "team": "Green Bay Packers",
    "photo": "Jack.Coco.png"
  },
  {
    "name": "Tobias Oliver",
    "position": "DB",
    "school": "Georgia Tech",
    "team": "New York Giants",
    "photo": "Tobias.Oliver.jpeg"
  },
  {
    "name": "Travis Bell",
    "position": "DT",
    "school": "Kennesaw State",
    "team": "Chicago Bears • Atlanta Falcons",
    "photo": "Travis.Bell.2.jpeg"
  },
  {
    "name": "Robert Cooper",
    "position": "DT",
    "school": "Florida State",
    "team": "Seattle Seahawks • Miami Dolphins",
    "photo": "Robert.Cooper.jpeg"
  },
  {
    "name": "Martez Manuel",
    "position": "S",
    "school": "Missouri",
    "team": "Kansas City Chiefs",
    "photo": "Martez.Manuel.jpeg"
  },
  {
    "name": "Cam Bright",
    "position": "LB",
    "school": "Pittsburgh • Washington",
    "team": "Seattle Seahawks • Cleveland Browns",
    "photo": "Cam.bright.jpeg"
  },
  {
    "name": "Abraham Beauplan",
    "position": "LB",
    "school": "Marshall",
    "team": "Minnesota Vikings",
    "photo": "AbrahamBeauplan.jpeg"
  },
  {
    "name": "Ahmarean Brown",
    "position": "WR",
    "school": "Georgia Tech • South Carolina",
    "team": "Cleveland Browns • Buffalo Bills",
    "photo": "AB.Brown.png"
  },
  {
    "name": "AJ Lewis",
    "position": "WR",
    "school": "Alabama State",
    "team": "Houston Roughnecks",
    "photo": "AJ.Lewis.jpeg"
  },
  {
    "name": "AJ Mealing",
    "position": "WR",
    "school": "Georgia Tech",
    "team": "Potsdam Royals",
    "photo": "AJ.Mealing.jpeg"
  },
  {
    "name": "Kyler Baugh",
    "position": "DT",
    "school": "Houston Christian • Minnesota",
    "team": "New Orleans Saints",
    "photo": "Kyler.Baugh.jpeg"
  },
  {
    "name": "Robert Kennedy",
    "position": "DB",
    "school": "NC State",
    "team": "San Diego Chargers",
    "photo": "Robert Kenneddy.jpeg"
  },
  {
    "name": "Sam Pinckney",
    "position": "WR",
    "school": "Georgia State • Coastal Carolina",
    "team": "Carolina Panthers",
    "photo": "Sam.Pinckney.new.jpg"
  },
  {
    "name": "DK Kaufman",
    "position": "DB",
    "school": "Vanderbilt • Auburn • NC State",
    "team": "Seattle Seahawks",
    "photo": "Dk Kaufman.jpeg"
  },
  {
    "name": "Dymere Miller",
    "position": "WR",
    "school": "Monmouth • Rutgers",
    "team": "New York Jets",
    "photo": "Dymere.Miller.alumni.jpeg"
  },
  {
    "name": "Zeke Correll",
    "position": "OL",
    "school": "Notre Dame • NC State",
    "team": "Minnesota Vikings",
    "photo": "Zeke.Correll.new.jpg"
  },
  {
    "name": "Torricelli Simpkins",
    "position": "OL",
    "school": "North Carolina Central • South Carolina",
    "team": "New Orleans Saints",
    "photo": "Torricelli.Simpkins.alumni.new.jpg"
  },
  {
    "name": "Omarion Dollison",
    "position": "WR",
    "school": "South Florida • James Madison",
    "team": "Jacksonville Sharks",
    "photo": "7c46366d-87fd-4f79-81f2-f22e4c704154.png"
  }
];

const roomBoard = [
  {
    "name": "Ajani Kerr",
    "position": "DB",
    "school": "Georgia Tech \u2022 Tulane",
    "team": "Secondary movement profile",
    "photo": "Ajani Kerr.jpeg"
  },
  {
    "name": "Anthony Wilson",
    "position": "S",
    "school": "West Virginia University",
    "team": "Safety range and transition profile",
    "photo": "Anthony.Wilson.png"
  },
  {
    "name": "Jerome Jolly Jr.",
    "position": "LB",
    "school": "Liberty University",
    "team": "Linebacker size and movement profile",
    "photo": "Jerome.Jolly.Jr.png"
  },
  {
    "name": "Michel Dukes",
    "position": "RB",
    "school": "Clemson • South Florida • Georgia State",
    "team": "Explosive running-back profile",
    "photo": "Micheal Dukes.jpeg"
  },
  {
    "name": "Braelen Oliver",
    "position": "LB",
    "school": "Minnesota \u2022 Georgia Tech",
    "team": "Linebacker speed and reaction profile",
    "photo": "Braelen Oliver.jpeg"
  },
  {
    "name": "Brandon Frazier",
    "position": "TE",
    "school": "Auburn",
    "team": "Size-and-catch-radius tight end profile",
    "photo": "Brandon Frazier.jpeg"
  },
  {
    "name": "Dakereon Joyner",
    "position": "ATH",
    "school": "South Carolina",
    "team": "Skill movement and open-field profile",
    "photo": "Dakeron Joyner.jpeg"
  },
  {
    "name": "Darius Green",
    "position": "DB",
    "school": "Minnesota",
    "team": "Safety movement and transition profile",
    "photo": "Darius Green.jpeg"
  },
  {
    "name": "Darius Meeks",
    "position": "OL",
    "school": "Grambling State \u2022 Charleston Southern",
    "team": "Big-man power and anchor profile",
    "photo": "Darius Meeks.jpeg"
  },
  {
    "name": "De'Rickey Wright",
    "position": "S",
    "school": "Vanderbilt",
    "team": "Range, size, and hybrid second-level profile",
    "photo": "De'Rickey Wright.jpeg"
  },
  {
    "name": "Deontay Campbell",
    "position": "TE",
    "school": "Missouri Southern \u2022 Highland C.C.",
    "team": "Tight end size-speed profile",
    "photo": "Deontay Campbell.jpeg"
  },
  {
    "name": "Deshon Stoudemire",
    "position": "WR",
    "school": "Iowa Western C.C. \u2022 Troy",
    "team": "Vertical-speed receiver profile",
    "photo": "Deshon Stoudermire.jpeg"
  },
  {
    "name": "Dezmond Tell",
    "position": "DL",
    "school": "Louisville",
    "team": "Front-line power profile",
    "photo": "Dezmond Tell.jpeg"
  },
  {
    "name": "Dontavious Nash",
    "position": "DB",
    "school": "North Carolina \u2022 East Carolina \u2022 Michigan State",
    "team": "Length and speed on the back end",
    "photo": "Dontavious Nash.jpeg"
  },
  {
    "name": "Earl Stoudemire Jr.",
    "position": "RB",
    "school": "Kentucky Christian \u2022 Morehead State",
    "team": "Backfield burst and acceleration",
    "photo": "Earl Stoudermire Jr.jpeg"
  },
  {
    "name": "EJ Jackson",
    "position": "S",
    "school": "App State",
    "team": "DB range and downhill profile",
    "photo": "EJ Jackson.jpeg"
  },
  {
    "name": "Elin Jones",
    "position": "EDGE",
    "school": "Johnson C. Smith \u2022 Western Kentucky",
    "team": "Edge size, range, and rush profile",
    "photo": "Elin Jones.jpg.webp"
  },
  {
    "name": "Jabari Brooks",
    "position": "OL",
    "school": "Samford \u2022 UCF",
    "team": "Interior line power and movement",
    "photo": "Jabari Brooks.jpeg"
  },
  {
    "name": "Markel Linzer",
    "position": "DB",
    "school": "Southeastern Louisiana \u2022 Grambling State",
    "team": "Corner and safety versatility",
    "photo": "Markel.Linzer.jpeg"
  },
  {
    "name": "Mike Allen",
    "position": "DL",
    "school": "Wake Forest \u2022 Western Kentucky",
    "team": "Defensive-front power profile",
    "photo": "Mike Allen.jpeg"
  },
  {
    "name": "Richard Jordan Jr.",
    "position": "LB",
    "school": "Missouri Southern State",
    "team": "Second-level size and strike profile",
    "photo": "richard Jordan Jr.jpeg"
  },
  {
    "name": "T'sai McDaniel",
    "position": "CB",
    "school": "UAB",
    "team": "Cover speed and transition profile",
    "photo": "T'sai McDaniel.jpeg"
  },
  {
    "name": "Amipeleasi Langi Jr.",
    "position": "DT",
    "school": "Houston \u2022 Texas State",
    "team": "Interior size and leverage profile",
    "photo": "Amipeleasi Langi Jr..jpeg"
  },
  {
    "name": "Koby Drake",
    "position": "WR",
    "school": "Memphis",
    "team": "Receiver burst and tracking profile",
    "photo": "Koby Drake.jpeg"
  },
  {
    "name": "Javon Denis",
    "position": "DL",
    "school": "Georgia State \u2022 Memphis",
    "team": "Interior-disruption profile",
    "photo": "Javon Denis.jpeg"
  },
  {
    "name": "Omari Thomas",
    "position": "DL",
    "school": "Tennessee",
    "team": "Heavy-body movement and trench power",
    "photo": "Omari Thomas.jpg.webp"
  },
  {
    "name": "Omarion Dollison",
    "position": "WR",
    "school": "South Florida \u2022 James Madison",
    "team": "Receiver pace and space profile",
    "photo": "7c46366d-87fd-4f79-81f2-f22e4c704154.png"
  },
  {
    "name": "Sean Martin",
    "position": "DL",
    "school": "West Virginia",
    "team": "NFL Combine participant \u2022 4.88 forty \u2022 28 reps",
    "photo": "Sean Martin.jpeg"
  },
  {
    "name": "Jacorey Crawford",
    "position": "DB",
    "school": "Georgia State",
    "team": "39.0\u2033 vertical \u2022 218 lbs",
    "photo": "Jacorey Crawford.jpeg"
  },
  {
    "name": "Makhari Sibblis",
    "position": "DL",
    "school": "Ball State",
    "team": "36.0\u2033 vertical \u2022 254 lbs",
    "photo": "Mikhari Sibblis.jpeg"
  },
  {
    "name": "Josh Carlin",
    "position": "OL",
    "school": "UCLA",
    "team": "28 bench reps \u2022 big-man output",
    "photo": "Josh Carlin.jpeg"
  },
  {
    "name": "Taleeq Robbins",
    "position": "EDGE",
    "school": "Ole Miss \u2022 Houston \u2022 Troy",
    "team": "Front-line edge profile",
    "photo": "Taleeq Robbins.jpeg"
  },
  {
    "name": "Carlos Dunovant Jr.",
    "position": "DB",
    "school": "Louisiana Tech \u2022 Morehouse",
    "team": "Cover speed and transition profile",
    "photo": "Carlos Dunovant.jpeg"
  },
  {
    "name": "Michael Fitzgerald",
    "position": "WR",
    "school": "UMass \u2022 Central Missouri \u2022 Wyoming",
    "team": "Length and catch-radius receiver profile",
    "photo": "Micheal Fitzgerald.jpeg"
  }

  ,{
    "name": "Isaac Foster",
    "position": "WR",
    "school": "Kennesaw State",
    "team": "Wide-receiver movement profile",
    "photo": "962093a7-d345-442a-8140-1de21316e184.png"
  },
  {
    "name": "Tayvonn Kyle",
    "position": "CB",
    "school": "Iowa State • Virginia",
    "team": "Cornerback movement and transition profile",
    "photo": "9b25fd22-72f6-4f96-873a-ff306d2cadb6.png"
  }
];

/* ── Card Rendering ──────────────────────────────────────── */
function initials(name){
  return name.split(' ').filter(function(p){ return p.length > 0; }).slice(0,2).map(function(part){ return part[0]; }).join('');
}

function esc(str){
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str || ''));
  return d.innerHTML;
}

function makeCard(item){
  var div = document.createElement('article');
  div.className = 'directory-item';
  var safeName = esc(item.name);
  var safePos = esc(item.position);
  var safeSchool = esc(item.school);
  var safeTeam = esc(item.team);
  var safePhoto = esc(item.photo);
  var thumb = item.photo
    ? '<div class="directory-thumb"><img src="' + safePhoto + '" alt="' + safeName + '"></div>'
    : '<div class="directory-thumb"><div class="avatar">' + initials(item.name) + '</div></div>';
  var title = item.link
    ? '<h4><a class="inline hot" href="' + esc(item.link) + '" target="_blank" rel="noopener noreferrer">' + safeName + '</a></h4>'
    : '<h4>' + safeName + '</h4>';
  div.innerHTML =
    thumb +
    '<div class="directory-copy">' +
      title +
      '<p>' + (item.position ? safePos + ' \u2022 ' : '') + (safeSchool || '\u2014') + '<br>' + (safeTeam || '') + '</p>' +
      '<div class="badges">' +
        (item.position ? '<span class="badge">' + safePos + '</span>' : '') +
        (item.school && item.school !== '\u2014' ? '<span class="badge">' + safeSchool + '</span>' : '') +
      '</div>' +
    '</div>';
  return div;
}

function uniqueByName(data){
  var seen = new Set();
  return data.filter(function(item){
    var key = (item.name || '').toLowerCase();
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const thumbStyleMap = {
  "Shannon Smith": { fit: "cover", position: "center 24%" },
  "Shawn Williams": { fit: "cover", position: "center 10%" },
  "Nathan Cottrell": { fit: "cover", position: "center 10%" },
  "Jalen Camp": { fit: "cover", position: "60% center" },
  "CJ Windham": { fit: "cover", position: "center 24%" },
  "Sam Pinckney": { fit: "cover", position: "center 18%" },
  "Zeke Correll": { fit: "cover", position: "center 18%" },
  "Torricelli Simpkins": { fit: "cover", position: "center 18%" },
  "Omarion Dollison": { fit: "contain", position: "center center", background: "linear-gradient(180deg,#f5f7fb 0%,#e8edf6 100%)", padding: "0" },
  "Jerome Jolly Jr.": { fit: "cover", position: "center 20%" },
  "Anthony Wilson": { fit: "cover", position: "center 16%" }
};

function applyThumbStyles(targetId){
  var grid = document.getElementById(targetId);
  if(!grid) return;
  grid.querySelectorAll('.directory-item').forEach(function(card){
    var name = card.querySelector('h4');
    name = name ? name.textContent.trim() : null;
    var img = card.querySelector('.directory-thumb img');
    var wrap = card.querySelector('.directory-thumb');
    if(!name || !img || !wrap) return;
    var cfg = thumbStyleMap[name];
    wrap.style.background = cfg && cfg.background ? cfg.background : 'transparent';
    img.style.objectFit = cfg && cfg.fit ? cfg.fit : 'cover';
    img.style.objectPosition = cfg && cfg.position ? cfg.position : 'center center';
    img.style.padding = cfg && cfg.padding ? cfg.padding : '0';
    img.style.background = 'transparent';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
  });
}

function renderGrid(data, targetId){
  var grid = document.getElementById(targetId);
  if(!grid) return;
  grid.innerHTML = '';
  uniqueByName(data).forEach(function(item){ grid.appendChild(makeCard(item)); });
  applyThumbStyles(targetId);
}
renderGrid(alumni,'alumniGrid');
renderGrid(roomBoard,'roomGrid');

/* ── Search ──────────────────────────────────────────────── */
function attachSearch(inputId, data, targetId){
  var input = document.getElementById(inputId);
  if(!input) return;
  input.addEventListener('input', function(e){
    var q = e.target.value.toLowerCase().trim();
    var filtered = data.filter(function(item){
      return [item.name,item.position,item.school,item.team].join(' ').toLowerCase().includes(q);
    });
    renderGrid(filtered,targetId);
  });
}
attachSearch('alumniSearch', alumni, 'alumniGrid');
attachSearch('roomSearch', roomBoard, 'roomGrid');

/* ── Tab Switching ───────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var tab = btn.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(function(panel){ panel.classList.add('hidden'); });
    document.getElementById('tab-' + tab).classList.remove('hidden');
  });
});

/* ── Intersection Observer (reveal on scroll) ────────────── */
(function(){
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });
})();

/* ── Draft Countdown ─────────────────────────────────────── */
(function(){
  var target = new Date('2027-04-27T20:00:00-04:00').getTime();
  var ids = {
    days: document.getElementById('draft-days'),
    hours: document.getElementById('draft-hours'),
    minutes: document.getElementById('draft-minutes'),
    seconds: document.getElementById('draft-seconds')
  };
  function pad(n){ return String(Math.max(0,n)).padStart(2,'0'); }
  function updateDraftCountdown(){
    var now = Date.now();
    var diff = target - now;
    if(diff < 0) diff = 0;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000) / 60000);
    var seconds = Math.floor((diff % 60000) / 1000);
    if(ids.days) ids.days.textContent = String(days);
    if(ids.hours) ids.hours.textContent = pad(hours);
    if(ids.minutes) ids.minutes.textContent = pad(minutes);
    if(ids.seconds) ids.seconds.textContent = pad(seconds);
  }
  updateDraftCountdown();
  setInterval(updateDraftCountdown, 1000);
})();

/* ── Contact Form with Draft Chime ───────────────────────── */
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  var audio = new Audio('nfl-draft-chime.mp3');
  audio.preload = 'auto';
  var submitted = false;

  function submitForm(){
    if(submitted) return;
    submitted = true;
    HTMLFormElement.prototype.submit.call(form);
  }

  form.addEventListener('submit', function(e){
    if(submitted) return;
    e.preventDefault();
    var finished = false;
    var continueSubmit = function(){
      if(finished) return;
      finished = true;
      submitForm();
    };
    try{
      audio.pause();
      audio.currentTime = 0;
      var playPromise = audio.play();
      audio.onended = continueSubmit;
      setTimeout(continueSubmit, 1600);
      if(playPromise && typeof playPromise.then === 'function'){
        playPromise.catch(function(){ continueSubmit(); });
      }
    }catch(err){
      continueSubmit();
    }
  });
})();

/* ── Active Nav Link Tracking ────────────────────────────── */
(function(){
  var links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  var brand = document.querySelector('.brand[href="#top"]');
  var nav = document.querySelector('.nav');
  var sections = links
    .map(function(link){
      var id = link.getAttribute('href').slice(1);
      return { link:link, section:document.getElementById(id), id:id };
    })
    .filter(function(item){ return item.section; });

  function setActive(id){
    sections.forEach(function(item){
      item.link.classList.toggle('active', item.id === id);
    });
  }

  function navHeight(){
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  function updateActive(){
    var probeY = window.scrollY + navHeight() + (window.innerHeight * 0.30);
    var current = sections.length ? sections[0].id : null;
    sections.forEach(function(item){
      if(probeY >= item.section.offsetTop) current = item.id;
    });
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2 && sections.length){
      current = sections[sections.length - 1].id;
    }
    if(current) setActive(current);
  }

  links.forEach(function(link){
    link.addEventListener('click', function(){
      var id = this.getAttribute('href').slice(1);
      setActive(id);
    });
  });

  if(brand){
    brand.addEventListener('click', function(e){
      e.preventDefault();
      window.scrollTo({ top:0, behavior:'smooth' });
      if(sections.length) setActive(sections[0].id);
    });
  }

  window.addEventListener('scroll', updateActive, {passive:true});
  window.addEventListener('resize', updateActive);
  window.addEventListener('load', updateActive);
  updateActive();
})();

/* ── Mobile Nav Toggle ───────────────────────────────────── */
(function(){
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelectorAll('.nav-links a');
  if(!nav || !toggle) return;

  var closeMenu = function(){
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.forEach(function(link){
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function(){
    if(window.innerWidth > 980) closeMenu();
  });
})();

/* ── Cursor Glow Effect ─────────────────────────────────── */
(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  var glow = document.getElementById('cursor-glow');
  if(!glow) return;
  var mx = 0, my = 0, cx = 0, cy = 0;
  var active = false;

  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if(!active){ active = true; glow.classList.add('active'); }
  });
  document.addEventListener('mouseleave', function(){
    active = false; glow.classList.remove('active');
  });

  function animate(){
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── Magnetic Button Effect ─────────────────────────────── */
(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  var btns = document.querySelectorAll('.btn, .tab-btn, .social-icon');
  btns.forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + x * 0.15 + 'px,' + y * 0.15 + 'px) translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function(){
      btn.style.transform = '';
    });
  });
})();

/* ── Smooth Parallax on Hero Elements ───────────────────── */
(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  var hero = document.querySelector('.hero');
  var heroTitle = document.querySelector('.hero-title');
  var heroCard = document.querySelector('.hero-card');
  var statsGrid = document.querySelector('.stats-grid');
  if(!hero) return;

  var ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y = window.scrollY;
        if(y < window.innerHeight * 1.2){
          if(heroTitle) heroTitle.style.transform = 'translateY(' + y * 0.04 + 'px)';
          if(heroCard) heroCard.style.transform = 'translateY(' + y * -0.02 + 'px)';
          if(statsGrid) statsGrid.style.transform = 'translateY(' + y * 0.015 + 'px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();

/* ── Enhanced 3D Card Tilt ──────────────────────────────── */
(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  var cards = document.querySelectorAll('.athlete-card, .system-card, .metric-card, .quote-card, .stat, .service-card, .combine-note, .leader-card, .pos-guide-card, .dr-card, .facility-card, .recovery-modality-card, .path-card');
  cards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(900px) rotateY(' + x * 5 + 'deg) rotateX(' + (-y * 5) + 'deg) translateY(-5px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(function(){ card.style.transition = ''; }, 500);
    });
  });
})();

/* ── Animated Counter Enhancement ───────────────────────── */
(function(){
  var stats = document.querySelectorAll('.stat strong');
  stats.forEach(function(el){
    el.style.fontVariantNumeric = 'tabular-nums';
  });
})();

/* ── Tab Panel Smooth Transition ────────────────────────── */
(function(){
  var panels = document.querySelectorAll('.tab-panel');
  panels.forEach(function(panel){
    panel.style.transition = 'opacity .35s cubic-bezier(0.16,1,0.3,1)';
  });
  
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      panels.forEach(function(panel){
        if(!panel.classList.contains('hidden')){
          panel.style.opacity = '1';
        }
      });
    });
  });
})();

/* ── Ticker Number Flip Animation ───────────────────────── */
(function(){
  var units = document.querySelectorAll('.ticker-unit strong');
  units.forEach(function(el){
    var observer = new MutationObserver(function(){
      el.style.transition = 'none';
      el.style.transform = 'translateY(-2px)';
      el.style.opacity = '0.7';
      requestAnimationFrame(function(){
        el.style.transition = 'transform .3s cubic-bezier(0.16,1,0.3,1), opacity .3s cubic-bezier(0.16,1,0.3,1)';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });
    });
    observer.observe(el, { childList: true, characterData: true, subtree: true });
  });
})();

/* ── Particle Canvas Enhancement ────────────────────────── */
(function(){
  var canvas = document.getElementById('particle-canvas');
  if(!canvas) return;
  canvas.style.opacity = '0.45';
})();

/* ══════════════════════════════════════════════════════════
   NEW INTERACTIVE FEATURES
   ══════════════════════════════════════════════════════════ */

/* ── RAS Bar Scroll Animation ────────────────────────────── */
(function(){
  var bars = document.querySelectorAll('.ras-bar');
  if(!bars.length) return;
  bars.forEach(function(bar){
    var score = parseFloat(bar.getAttribute('data-score')) || 0;
    bar.style.setProperty('--ras-pct', Math.min(score * 10, 100));
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.3});
  bars.forEach(function(bar){ obs.observe(bar); });
})();

/* ── Position Filter Buttons ─────────────────────────────── */
(function(){
  function setupFilter(containerId, data, gridId, searchId){
    var container = document.getElementById(containerId);
    if(!container) return;
    var btns = container.querySelectorAll('.filter-btn');
    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        btns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        var searchInput = document.getElementById(searchId);
        var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        var filtered = data.filter(function(item){
          var matchFilter = filter === 'all' || item.position === filter;
          var matchSearch = !q || [item.name,item.position,item.school,item.team].join(' ').toLowerCase().includes(q);
          return matchFilter && matchSearch;
        });
        renderGrid(filtered, gridId);
      });
    });
  }
  setupFilter('alumniFilters', alumni, 'alumniGrid', 'alumniSearch');
  setupFilter('roomFilters', roomBoard, 'roomGrid', 'roomSearch');
})();

/* ── Multi-Step Onboarding Form ──────────────────────────── */
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  var steps = form.querySelectorAll('.form-step');
  var progressSteps = document.querySelectorAll('.progress-step');
  var currentStep = 1;

  function showStep(n){
    steps.forEach(function(s){ s.classList.remove('active'); });
    var target = document.getElementById('form-step-' + n);
    if(target) target.classList.add('active');
    progressSteps.forEach(function(ps){
      var sn = parseInt(ps.getAttribute('data-step'));
      ps.classList.remove('active','completed');
      if(sn === n) ps.classList.add('active');
      else if(sn < n) ps.classList.add('completed');
    });
    currentStep = n;
    if(n === 4) buildReview();
  }

  function buildReview(){
    var summary = document.getElementById('review-summary');
    if(!summary) return;
    var path = document.getElementById('form-selected-path');
    var name = document.getElementById('form-name');
    var email = document.getElementById('form-email');
    var phone = document.getElementById('form-phone');
    var level = document.getElementById('form-level');
    var focus = document.getElementById('form-focus');
    var msg = document.getElementById('form-message');
    summary.innerHTML =
      '<div class="review-row"><strong>Path</strong><span>' + (path ? path.value : '') + '</span></div>' +
      '<div class="review-row"><strong>Name</strong><span>' + (name ? name.value : '') + '</span></div>' +
      '<div class="review-row"><strong>Email</strong><span>' + (email ? email.value : '') + '</span></div>' +
      '<div class="review-row"><strong>Phone</strong><span>' + (phone ? phone.value : '—') + '</span></div>' +
      '<div class="review-row"><strong>Level</strong><span>' + (level ? level.value : '') + '</span></div>' +
      '<div class="review-row"><strong>Focus</strong><span>' + (focus ? focus.value : '—') + '</span></div>' +
      '<div class="review-row"><strong>Message</strong><span>' + (msg ? msg.value : '') + '</span></div>';
  }

  // Next/Back buttons
  form.addEventListener('click', function(e){
    var btn = e.target.closest('.form-next');
    if(btn){
      var next = parseInt(btn.getAttribute('data-next'));
      if(next === 2){
        var pathInput = document.getElementById('form-selected-path');
        if(!pathInput || !pathInput.value){ return; }
      }
      if(next === 3){
        var nameEl = document.getElementById('form-name');
        var emailEl = document.getElementById('form-email');
        if(!nameEl.value.trim() || !emailEl.value.trim()){
          nameEl.reportValidity();
          emailEl.reportValidity();
          return;
        }
      }
      showStep(next);
      return;
    }
    var back = e.target.closest('.form-back');
    if(back){
      showStep(parseInt(back.getAttribute('data-back')));
      return;
    }
    var pathBtn = e.target.closest('.form-path-btn');
    if(pathBtn){
      form.querySelectorAll('.form-path-btn').forEach(function(b){ b.classList.remove('selected'); });
      pathBtn.classList.add('selected');
      var val = pathBtn.getAttribute('data-value');
      var pathHidden = document.getElementById('form-selected-path');
      if(pathHidden) pathHidden.value = val;
      var levelSelect = document.getElementById('form-level');
      if(levelSelect){
        for(var i=0;i<levelSelect.options.length;i++){
          if(levelSelect.options[i].text === val){
            levelSelect.selectedIndex = i;
            break;
          }
        }
      }
      var nextBtn = form.querySelector('#form-step-1 .form-next');
      if(nextBtn) nextBtn.disabled = false;
    }
  });

  // Draft chime on submit
  var audio = new Audio('nfl-draft-chime.mp3');
  audio.preload = 'auto';
  var submitted = false;
  function submitForm(){
    if(submitted) return;
    submitted = true;
    HTMLFormElement.prototype.submit.call(form);
  }
  form.addEventListener('submit', function(e){
    if(submitted) return;
    e.preventDefault();
    var finished = false;
    var continueSubmit = function(){
      if(finished) return;
      finished = true;
      submitForm();
    };
    try{
      audio.pause();
      audio.currentTime = 0;
      var playPromise = audio.play();
      audio.onended = continueSubmit;
      setTimeout(continueSubmit, 1600);
      if(playPromise && typeof playPromise.then === 'function'){
        playPromise.catch(function(){ continueSubmit(); });
      }
    }catch(err){
      continueSubmit();
    }
  });
})();

/* ── Find Your Path ──────────────────────────────────────── */
(function(){
  var cards = document.querySelectorAll('.path-card');
  var result = document.getElementById('path-result');
  if(!cards.length) return;

  var messages = {
    'middle-school': 'Foundation training at PPF builds the movement quality, coordination, and athletic habits that separate athletes early. Start building the base now.',
    'high-school': 'Speed, strength, and position-specific development to prepare for college recruiting, camps, and next-level competition. The work starts here.',
    'college': 'Advanced performance training, measurable development, and position work for athletes competing at the collegiate level and preparing for evaluation.',
    'draft-prep': 'Full-cycle combine and pro day preparation — verified testing, measurable gains, and a profile built to hold up when the room is watching.',
    'adult': 'Structured performance training with elite-level programming, accountability, and results. Built for adults who train with purpose.',
    'recovery-only': 'Access our full recovery suite — compression, PEMF, red light, infrared sauna, and cold plunge — on your schedule.',
    'parent': 'We welcome family conversations. Learn about our programs, tour the facility, and see what structured development looks like at PPF.'
  };

  cards.forEach(function(card){
    card.addEventListener('click', function(){
      cards.forEach(function(c){ c.classList.remove('selected'); });
      card.classList.add('selected');
      var path = card.getAttribute('data-path');
      if(result && messages[path]){
        result.innerHTML = '<div class="path-message">' + messages[path] + ' <a href="#contact" class="btn primary" style="margin-top:16px;display:inline-flex">Start Your Application</a></div>';
      }
    });
  });
})();

/* ── RAS Score Simulator → PPF Performance Lab ───────────── */
(function(){
  var calcBtn = document.getElementById('lab-calculate');
  var resultEl = document.getElementById('lab-results');
  if(!calcBtn) return;

  var selectedPos = 'WR';

  // Position benchmarks: [min(worst), max(best)] for each metric at each position
  // These are approximate combine ranges used to normalize scores
  var benchmarks = {
    WR: {height:[69,77],weight:[170,225],forty:[4.25,4.75],twenty:[2.45,2.80],ten:[1.45,1.65],bench:[8,25],vert:[30,42],broad:[114,134],shuttle:[3.95,4.40],cone:[6.50,7.20]},
    DB: {height:[68,76],weight:[175,215],forty:[4.28,4.65],twenty:[2.48,2.75],ten:[1.46,1.62],bench:[10,22],vert:[32,42],broad:[118,136],shuttle:[3.95,4.35],cone:[6.55,7.15]},
    RB: {height:[67,74],weight:[190,235],forty:[4.30,4.70],twenty:[2.50,2.78],ten:[1.47,1.63],bench:[14,28],vert:[30,40],broad:[112,130],shuttle:[4.05,4.45],cone:[6.70,7.30]},
    LB: {height:[71,77],weight:[220,260],forty:[4.40,4.85],twenty:[2.55,2.88],ten:[1.50,1.68],bench:[18,33],vert:[30,40],broad:[112,130],shuttle:[4.10,4.50],cone:[6.80,7.40]},
    EDGE:{height:[73,79],weight:[240,275],forty:[4.45,4.90],twenty:[2.58,2.90],ten:[1.52,1.70],bench:[18,30],vert:[30,39],broad:[112,130],shuttle:[4.15,4.55],cone:[6.85,7.45]},
    OL: {height:[74,80],weight:[290,340],forty:[4.85,5.50],twenty:[2.80,3.15],ten:[1.65,1.85],bench:[22,38],vert:[24,34],broad:[100,120],shuttle:[4.40,5.00],cone:[7.20,8.00]},
    DL: {height:[73,79],weight:[275,330],forty:[4.70,5.30],twenty:[2.70,3.05],ten:[1.58,1.80],bench:[20,35],vert:[26,36],broad:[104,124],shuttle:[4.25,4.80],cone:[7.00,7.70]},
    TE: {height:[74,79],weight:[235,265],forty:[4.40,4.85],twenty:[2.55,2.88],ten:[1.50,1.68],bench:[15,28],vert:[30,39],broad:[112,128],shuttle:[4.15,4.55],cone:[6.85,7.45]},
    S:  {height:[69,76],weight:[190,220],forty:[4.30,4.65],twenty:[2.48,2.78],ten:[1.46,1.62],bench:[10,22],vert:[32,42],broad:[118,134],shuttle:[3.98,4.38],cone:[6.55,7.20]},
    CB: {height:[68,75],weight:[170,205],forty:[4.28,4.60],twenty:[2.45,2.75],ten:[1.44,1.62],bench:[8,20],vert:[33,43],broad:[120,138],shuttle:[3.92,4.35],cone:[6.45,7.10]}
  };

  // Position importance order for display
  var posImportance = {
    WR: ['ten','forty','vert','broad','shuttle','cone','height','weight','bench','twenty'],
    DB: ['forty','vert','shuttle','cone','ten','height','weight','bench','broad','twenty'],
    RB: ['ten','shuttle','cone','broad','vert','forty','height','weight','bench','twenty'],
    LB: ['shuttle','cone','ten','forty','broad','vert','height','weight','bench','twenty'],
    EDGE:['ten','broad','vert','cone','shuttle','forty','height','weight','bench','twenty'],
    OL: ['height','weight','shuttle','cone','ten','bench','vert','broad','forty','twenty'],
    DL: ['ten','broad','shuttle','vert','height','weight','bench','cone','forty','twenty'],
    TE: ['forty','vert','broad','cone','shuttle','height','weight','ten','bench','twenty'],
    S:  ['forty','vert','shuttle','cone','ten','height','weight','bench','broad','twenty'],
    CB: ['forty','vert','shuttle','cone','ten','height','weight','bench','broad','twenty']
  };

  var metricLabels = {
    height:'Height',weight:'Weight',forty:'40-Yard Dash',twenty:'20-Yard Split',
    ten:'10-Yard Split',bench:'Bench Press',vert:'Vertical Jump',broad:'Broad Jump',
    shuttle:'Short Shuttle',cone:'3-Cone Drill'
  };

  var ppfAthletes = [
    {name:'Jack Coco',score:9.92,pos:'LS'},{name:'Jalen Camp',score:9.78,pos:'WR'},
    {name:'Sean Martin',score:9.68,pos:'DL'},{name:'DK Kaufman',score:9.35,pos:'S'},
    {name:'Dymere Miller',score:9.01,pos:'WR'},{name:'Kyler Baugh',score:8.56,pos:'DT'},
    {name:'Cam Bright',score:8.45,pos:'LB'},{name:'Omar Dollison',score:8.35,pos:'WR'},
    {name:'Travis Bell',score:8.27,pos:'DT'},{name:'Mike Allen',score:8.09,pos:'DL'},
    {name:'Dezmond Tell',score:7.91,pos:'DT'},{name:'Robert Kennedy',score:7.63,pos:'DB'},
    {name:'Tobias Oliver',score:7.26,pos:'DB'},{name:'Ajani Kerr',score:7.21,pos:'DB'}
  ];

  // Position selector
  document.querySelectorAll('.lab-pos-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.lab-pos-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      selectedPos = btn.getAttribute('data-pos');
    });
  });

  function scoreMetric(key, val, pos){
    var b = benchmarks[pos] || benchmarks.WR;
    var range = b[key];
    if(!range) return null;
    var mn = range[0], mx = range[1];
    var inverted = ['forty','twenty','ten','shuttle','cone'].indexOf(key) !== -1;
    var raw;
    if(inverted){
      raw = (mx - val) / (mx - mn);
    } else {
      raw = (val - mn) / (mx - mn);
    }
    return Math.max(0, Math.min(10, raw * 10));
  }

  calcBtn.addEventListener('click', function(){
    var htFt = parseFloat(document.getElementById('lab-height-ft').value) || 0;
    var htIn = parseFloat(document.getElementById('lab-height-in').value) || 0;
    var height = htFt * 12 + htIn;
    var weight = parseFloat(document.getElementById('lab-weight').value) || 0;
    var forty = parseFloat(document.getElementById('lab-forty').value) || 0;
    var twenty = parseFloat(document.getElementById('lab-twenty').value) || 0;
    var ten = parseFloat(document.getElementById('lab-ten').value) || 0;
    var bench = parseFloat(document.getElementById('lab-bench').value) || 0;
    var vert = parseFloat(document.getElementById('lab-vert').value) || 0;
    var broad = parseFloat(document.getElementById('lab-broad').value) || 0;
    var shuttle = parseFloat(document.getElementById('lab-shuttle').value) || 0;
    var cone = parseFloat(document.getElementById('lab-cone').value) || 0;

    var inputs = {height:height,weight:weight,forty:forty,twenty:twenty,ten:ten,bench:bench,vert:vert,broad:broad,shuttle:shuttle,cone:cone};
    var scores = {};
    var count = 0;

    Object.keys(inputs).forEach(function(k){
      if(inputs[k] > 0){
        var s = scoreMetric(k, inputs[k], selectedPos);
        if(s !== null){
          scores[k] = s;
          count++;
        }
      }
    });

    if(count < 1){
      resultEl.innerHTML = '<p class="lab-message lab-message-error">Please enter at least one measurable to calculate your profile.</p>';
      return;
    }

    var total = 0;
    Object.keys(scores).forEach(function(k){ total += scores[k]; });
    var composite = total / count;
    composite = Math.min(10, Math.max(0, composite));

    var needsMore = count < 6;
    var percentile = Math.round(composite * 10);

    // Build results HTML
    var html = '';

    // Score Hero
    html += '<div class="lab-score-hero">';
    html += '<div class="lab-score-number">' + composite.toFixed(2) + '</div>';
    html += '<div class="lab-score-label">Estimated RAS • ' + selectedPos + ' position group • ' + count + ' of 10 measurements</div>';
    if(needsMore){
      html += '<div class="lab-message lab-message-warning">⚠ Official RAS requires at least 6 of 10 measurements. Add more for a complete profile.</div>';
    }
    html += '<div class="lab-score-percentile">Top ' + (100 - percentile) + '% of ' + selectedPos + ' position group</div>';
    html += '</div>';

    // Metric Breakdown
    html += '<h3 class="lab-gaps-title">Metric Breakdown</h3>';
    html += '<div class="lab-breakdown">';
    var order = posImportance[selectedPos] || Object.keys(metricLabels);
    order.forEach(function(k){
      if(scores[k] !== undefined){
        var s = scores[k];
        var cls = s >= 8 ? 'elite' : s >= 6 ? 'good' : s >= 4 ? 'average' : 'below';
        var tier = s >= 9 ? 'Elite' : s >= 7.5 ? 'Great' : s >= 6 ? 'Good' : s >= 4 ? 'Average' : 'Develop';
        html += '<div class="lab-metric-item">';
        html += '<div class="lab-metric-name">' + metricLabels[k] + '</div>';
        html += '<div class="lab-metric-bar"><div class="lab-metric-fill ' + cls + '" style="--fill-w:' + (s * 10) + '%"></div></div>';
        html += '<div class="lab-metric-value">' + s.toFixed(2) + ' / 10.00 <span class="lab-metric-rank">(' + tier + ')</span></div>';
        html += '</div>';
      }
    });
    html += '</div>';

    // Development Gaps
    var gaps = [];
    order.forEach(function(k){
      if(scores[k] !== undefined && scores[k] < 6){
        gaps.push({key:k, score:scores[k]});
      }
    });
    var missing = [];
    Object.keys(metricLabels).forEach(function(k){
      if(scores[k] === undefined) missing.push(k);
    });

    if(gaps.length > 0 || missing.length > 0){
      html += '<div class="lab-gaps">';
      html += '<h3 class="lab-gaps-title">🎯 What to Improve Next</h3>';
      gaps.forEach(function(g){
        html += '<div class="lab-gap-item"><span class="lab-gap-icon">📈</span><div class="lab-gap-text"><strong>' + metricLabels[g.key] + '</strong> scored ' + g.score.toFixed(2) + ' — prioritize this to raise your overall profile.</div></div>';
      });
      if(missing.length > 0){
        html += '<div class="lab-gap-item"><span class="lab-gap-icon">📋</span><div class="lab-gap-text">Missing data: <strong>' + missing.map(function(k){ return metricLabels[k]; }).join(', ') + '</strong> — add these to get a complete RAS.</div></div>';
      }
      html += '</div>';
    }

    // PPF Comparison
    html += '<div class="lab-comparison">';
    html += '<h3 class="lab-comp-title">Where You Rank Among PPF Athletes</h3>';
    html += '<div class="lab-comp-list">';
    var placed = false;
    ppfAthletes.forEach(function(a){
      if(!placed && composite >= a.score){
        html += '<div class="lab-comp-athlete is-you"><strong>You — ' + composite.toFixed(2) + '</strong></div>';
        placed = true;
      }
      html += '<div class="lab-comp-athlete">' + a.name + ' (' + a.pos + ') — <strong>' + a.score.toFixed(2) + '</strong></div>';
    });
    if(!placed){
      html += '<div class="lab-comp-athlete is-you"><strong>You — ' + composite.toFixed(2) + '</strong></div>';
    }
    html += '</div></div>';

    resultEl.innerHTML = html;

    // Animate metric bars via CSS class
    setTimeout(function(){
      resultEl.querySelectorAll('.lab-metric-fill').forEach(function(el){
        el.classList.add('animate-in');
      });
    }, 50);

    // Scroll to results
    resultEl.scrollIntoView({behavior:'smooth', block:'start'});
  });
})();

/* ── Persona Overlay ─────────────────────────────────────── */
(function(){
  var overlay = document.getElementById('persona-overlay');
  var skip = document.getElementById('persona-skip');
  if(!overlay) return;

  // Wait for cinematic intro to finish
  var intro = document.querySelector('.cinematic-intro');
  if(intro){
    if(intro.classList.contains('done')){
      overlay.style.display = 'flex';
    } else {
      var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          if(m.type === 'attributes' && intro.classList.contains('done')){
            observer.disconnect();
            overlay.style.display = 'flex';
          }
        });
      });
      observer.observe(intro, {attributes:true, attributeFilter:['class']});
    }
  } else {
    overlay.style.display = 'flex';
  }

  function closeOverlay(){
    overlay.classList.add('done');
  }

  if(skip) skip.addEventListener('click', closeOverlay);

  document.querySelectorAll('.persona-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var persona = btn.getAttribute('data-persona');
      // Store selected persona
      document.body.setAttribute('data-persona', persona);
      closeOverlay();

      // Auto-scroll to relevant section based on persona
      var targets = {
        'middle-school':'#find-path',
        'high-school':'#find-path',
        'college':'#system',
        'draft-prep':'#draft-room',
        'adult':'#find-path',
        'recovery':'#recovery',
        'parent':'#contact'
      };
      var target = targets[persona];
      if(target && target !== '#top'){
        setTimeout(function(){
          var el = document.querySelector(target);
          if(el) el.scrollIntoView({behavior:'smooth'});
        }, 900);
      }
    });
  });
})();

/* ── Draft Room — PPF Scout Console ──────────────────────── */
(function(){

/* ── Enhanced Draft Data ──────────────────────────────────── */
var draftData = [
  {name:'Jalen Camp',pos:'WR',school:'Georgia Tech',photo:'Jalen.Camp.alumni.jpeg',
   ras:9.78,forty:4.39,split:1.52,vert:39.5,broad:126,bench:30,weight:228,
   classYear:'2021',proOutcome:'Houston Texans',
   bestTrait:'Elite burst-to-size ratio',devEdge:'Ball tracking under pressure',
   summary:'Size-speed combination at receiver is rare. Camp posted elite RAS numbers across the board with verified 40 speed and upper-body output that translated to an NFL opportunity.',
   why:'This profile matters because it proves that combine-caliber measurables built through focused preparation create real NFL pipeline value.'},
  {name:'Jack Coco',pos:'LS',school:'Georgia Tech',photo:'Jack.Coco.png',
   ras:9.92,forty:null,split:null,vert:null,broad:null,bench:null,weight:245,
   classYear:'2022',proOutcome:'NFL Active',
   bestTrait:'Positional RAS dominance',devEdge:'Specialist consistency',
   summary:'Top-tier RAS profile among long snappers in modern NFL Combine history. Precision specialist with verified athletic output well beyond positional norms.',
   why:'This profile matters because elite specialist value at the next level is driven by athletic upside that translates to coverage units and special teams versatility.'},
  {name:'Sean Martin',pos:'DL',school:'West Virginia',photo:'Sean Martin.jpeg',
   ras:9.68,forty:4.88,split:1.68,vert:34,broad:118,bench:28,weight:293,
   classYear:'2024',proOutcome:'NFL Combine Invite',
   bestTrait:'Interior explosion at size',devEdge:'First-step leverage',
   summary:'NFL Combine participant with rare size-speed combination for interior defensive line. Bench press output, forty time, and overall RAS confirm front-line physical tools.',
   why:'This profile matters because verified combine measurables at 293 pounds show a projection window that most interior linemen never reach.'},
  {name:'DK Kaufman',pos:'DB',school:'NC State',photo:'Dk Kaufman.jpeg',
   ras:9.35,forty:4.45,split:1.53,vert:38,broad:122,bench:16,weight:198,
   classYear:'2024',proOutcome:'Pro Day Standout',
   bestTrait:'Vertical explosion and range',devEdge:'Transitional burst in coverage',
   summary:'Elite vertical jump and top-shelf RAS score confirm a secondary profile built on explosion and coverage range. Movement tools project at the next level.',
   why:'This profile matters because 38-inch vertical paired with sub-4.5 speed creates a rare coverage ceiling that scouts prioritize at the safety and nickel positions.'},
  {name:'Dymere Miller',pos:'WR',school:'Rutgers',photo:'Dymere.Miller.alumni.jpeg',
   ras:9.01,forty:4.32,split:1.48,vert:37,broad:124,bench:12,weight:185,
   classYear:'2023',proOutcome:'Professional Opportunity',
   bestTrait:'Verified top-tier speed',devEdge:'Route separation burst',
   summary:'4.32 forty and 9.01 RAS confirm a rare speed profile at receiver. Separation ability is the foundation of professional-level route running.',
   why:'This profile matters because verified sub-4.35 speed is an elite threshold that creates schematic advantages at every level of football.'},
  {name:'Kyler Baugh',pos:'DT',school:'Minnesota',photo:'Kyler.Baugh.jpeg',
   ras:8.56,forty:4.91,split:1.71,vert:33.5,broad:112,bench:34,weight:303,
   classYear:'2024',proOutcome:'Pro Day Standout',
   bestTrait:'Upper-body power at premium weight',devEdge:'Anchor strength and interior push',
   summary:'34 bench reps at 303 pounds with a 4.91 forty. Rare power output combined with movement ability for a true interior presence. RAS confirms well-rounded physical tools.',
   why:'This profile matters because 34 reps at 300+ pounds represents front-line power that translates directly to interior dominance at the professional level.'},
  {name:'Cam Bright',pos:'LB',school:'Pittsburgh',photo:'Cam.bright.jpeg',
   ras:8.45,forty:4.58,split:1.58,vert:35,broad:119,bench:33,weight:238,
   classYear:'2023',proOutcome:'Professional Opportunity',
   bestTrait:'Upper-body output for position',devEdge:'Strike power and block shedding',
   summary:'33 bench reps at the linebacker position puts Bright in rare territory for upper-body output. Physical tools and RAS confirm a profile built for contact.',
   why:'This profile matters because linebacker bench press output at this level signals the kind of play strength that defines a defensive front.'},
  {name:'Omar Dollison',pos:'WR',school:'James Madison',photo:'7c46366d-87fd-4f79-81f2-f22e4c704154.png',
   ras:8.35,forty:4.46,split:1.55,vert:36.5,broad:121,bench:14,weight:192,
   classYear:'2024',proOutcome:'Pro Opportunity',
   bestTrait:'Speed and vertical burst',devEdge:'Downfield tracking and adjustment',
   summary:'4.46 speed and 8.35 RAS create a receiver profile with verified pace and vertical ability. Measurable tools confirm a skill set built for separation.',
   why:'This profile matters because the speed-to-RAS combination projects as a reliable route runner with enough burst to threaten vertically.'},
  {name:'Travis Bell',pos:'DT',school:'Kennesaw State',photo:'Travis.Bell.2.jpeg',
   ras:8.27,forty:5.05,split:1.75,vert:30,broad:108,bench:30,weight:315,
   classYear:'2023',proOutcome:'Professional Opportunity',
   bestTrait:'Rare size with bench output',devEdge:'Anchor presence at point of attack',
   summary:'30 bench reps at 315 pounds with a strong RAS. Interior mass combined with power output makes this a projection profile for trench dominance.',
   why:'This profile matters because size-and-power at this weight class is the foundation for run defense at the professional level.'},
  {name:'Mike Allen',pos:'DL',school:'Western Kentucky',photo:'Mike Allen.jpeg',
   ras:8.09,forty:4.82,split:1.66,vert:32,broad:114,bench:24,weight:278,
   classYear:'2023',proOutcome:'Pro Opportunity',
   bestTrait:'Versatile front-line tools',devEdge:'Pass rush motor and technique ceiling',
   summary:'8.09 RAS at 278 pounds with verified athletic testing puts Mike Allen in the conversation as a versatile defensive lineman with professional physical tools.',
   why:'This profile matters because defensive line depth requires exactly this blend of size, movement, and verified measurable output.'},
  {name:'Ahmarean Brown',pos:'WR',school:'Georgia Tech',photo:'AB.Brown.png',
   ras:null,forty:4.29,split:1.46,vert:38,broad:125,bench:10,weight:180,
   classYear:'2023',proOutcome:'Pro Opportunity',
   bestTrait:'Elite verified speed',devEdge:'Explosive first step off the line',
   summary:'4.29 forty confirms one of the fastest verified receiver profiles in the PPF system. Speed at this level is a game-changer for offensive design.',
   why:'This profile matters because 4.29 speed is an elite threshold that creates immediate value as a vertical threat at any level of professional football.'},
  {name:'Robert Cooper',pos:'DT',school:'Florida State',photo:'Robert.Cooper.jpeg',
   ras:null,forty:5.1,split:1.78,vert:28,broad:104,bench:26,weight:320,
   classYear:'2024',proOutcome:'Developmental',
   bestTrait:'True interior mass',devEdge:'Power-at-weight projection',
   summary:'320 pounds with verified strength output. Interior presence at this size creates natural advantages at the point of attack. Development projection is built on frame and power.',
   why:'This profile matters because true-size defensive tackles with bench output are the rarest commodity in professional football pipeline development.'},
  {name:'Nathan Cottrell',pos:'RB',school:'Georgia Tech',photo:'Nate.Cottrell.jpeg',
   ras:null,forty:4.38,split:1.5,vert:36,broad:122,bench:29,weight:205,
   classYear:'2020',proOutcome:'Jacksonville Jaguars',
   bestTrait:'Speed-and-power backfield profile',devEdge:'Contact balance at speed',
   summary:'4.38 forty, 29 bench reps, and an NFL roster appearance confirm a running back profile with rare dual-threat measurables. Speed and power in one frame.',
   why:'This profile matters because running backs who combine sub-4.4 speed with near-30 bench reps carry a projection floor that translates to professional rosters.'},
  {name:'Shawn Williams',pos:'S',school:'Georgia',photo:'Shawn.williams.alumni.jpeg',
   ras:null,forty:4.52,split:1.56,vert:36.5,broad:120,bench:18,weight:212,
   classYear:'2013',proOutcome:'Cincinnati Bengals (9 seasons)',
   bestTrait:'NFL-proven safety profile',devEdge:'Range and instincts over numbers',
   summary:'Nine NFL seasons with the Cincinnati Bengals validate a safety profile that combined physical tools with elite football intelligence. PPF pipeline verified at the highest level.',
   why:'This profile matters because it is the ultimate proof of concept — a PPF-connected athlete who built a long professional career on verified preparation.'},
  {name:'Martez Manuel',pos:'S',school:'Missouri',photo:'Martez.Manuel.jpeg',
   ras:null,forty:4.47,split:1.54,vert:37,broad:122,bench:16,weight:210,
   classYear:'2024',proOutcome:'Pro Day Standout',
   bestTrait:'Downhill speed and range',devEdge:'Hybrid safety-linebacker versatility',
   summary:'4.47 speed at 210 pounds with a verified vertical and broad confirm a safety profile that plays bigger than listed size. Movement tools project across multiple defensive roles.',
   why:'This profile matters because safeties who test with both speed and explosion create scheme flexibility that professional defensive coordinators value.'},
  {name:'Torricelli Simpkins',pos:'OL',school:'South Carolina',photo:'Torricelli.Simpkins.alumni.new.jpg',
   ras:null,forty:5.2,split:1.82,vert:29,broad:102,bench:24,weight:312,
   classYear:'2023',proOutcome:'Professional Opportunity',
   bestTrait:'Big-man movement at size',devEdge:'Lateral reach and anchor width',
   summary:'312 pounds with verified vertical and bench output. Offensive line profiles at this weight with documented athletic testing show the kind of movement that translates to protection.',
   why:'This profile matters because offensive linemen who test with verified measurables at 310+ carry higher projection ceilings than size-only prospects.'},
  {name:'Zeke Correll',pos:'OL',school:'Notre Dame',photo:'Zeke.Correll.new.jpg',
   ras:null,forty:5.15,split:1.8,vert:27,broad:100,bench:22,weight:305,
   classYear:'2023',proOutcome:'Professional Opportunity',
   bestTrait:'Pedigree and technique base',devEdge:'Interior awareness and combination blocking',
   summary:'Notre Dame offensive line pedigree with verified size and documented professional interest. Interior line development backed by elite coaching and program background.',
   why:'This profile matters because Power 5 offensive line experience combined with documented measurables and program background create a professional floor.'}
];

/* ── Position Intel Data ──────────────────────────────────── */
var positionIntel = {
  'WR': [
    {trait:'40-yard dash',why:'Separation speed'},
    {trait:'10-yard split',why:'Route burst'},
    {trait:'Vertical jump',why:'Catch radius'},
    {trait:'Broad jump',why:'Explosion off the line'},
    {trait:'Weight',why:'Press release power'},
    {trait:'RAS',why:'Overall athletic profile'}
  ],
  'DB': [
    {trait:'40-yard dash',why:'Recovery speed'},
    {trait:'Vertical jump',why:'Ball-high play ability'},
    {trait:'10-yard split',why:'Transitional burst'},
    {trait:'Broad jump',why:'Range and explosion'},
    {trait:'Weight',why:'Tackle reliability'},
    {trait:'RAS',why:'Complete movement profile'}
  ],
  'DL': [
    {trait:'10-yard split',why:'First-step explosion'},
    {trait:'Bench press',why:'Hand power at contact'},
    {trait:'Weight',why:'Point-of-attack anchor'},
    {trait:'Broad jump',why:'Lower-body explosion'},
    {trait:'40-yard dash',why:'Pursuit speed'},
    {trait:'RAS',why:'Size-speed confirmation'}
  ],
  'DT': [
    {trait:'Bench press',why:'Interior push power'},
    {trait:'Weight',why:'Anchor mass'},
    {trait:'10-yard split',why:'Gap penetration burst'},
    {trait:'Vertical jump',why:'Lower-body drive'},
    {trait:'Broad jump',why:'Explosion at size'},
    {trait:'RAS',why:'Rare athletic DT profile'}
  ],
  'OL': [
    {trait:'Bench press',why:'Blocking power'},
    {trait:'Weight',why:'Anchor and frame'},
    {trait:'10-yard split',why:'Lateral movement'},
    {trait:'Broad jump',why:'Lower-body drive'},
    {trait:'Vertical jump',why:'Athletic upside'},
    {trait:'RAS',why:'Movement at size'}
  ],
  'LB': [
    {trait:'10-yard split',why:'Downhill burst'},
    {trait:'Bench press',why:'Block shedding power'},
    {trait:'40-yard dash',why:'Sideline-to-sideline range'},
    {trait:'Vertical jump',why:'Stack-and-shed explosion'},
    {trait:'Weight',why:'Contact surface'},
    {trait:'RAS',why:'Complete LB profile'}
  ],
  'RB': [
    {trait:'40-yard dash',why:'Breakaway speed'},
    {trait:'10-yard split',why:'Hole burst'},
    {trait:'Bench press',why:'Contact balance'},
    {trait:'Weight',why:'Between-the-tackles power'},
    {trait:'Broad jump',why:'Explosion through the line'},
    {trait:'RAS',why:'Dual-threat confirmation'}
  ],
  'S': [
    {trait:'40-yard dash',why:'Range and pursuit'},
    {trait:'Vertical jump',why:'Ball-high ability'},
    {trait:'10-yard split',why:'Trigger speed'},
    {trait:'Broad jump',why:'Closing explosion'},
    {trait:'Weight',why:'Tackle reliability'},
    {trait:'RAS',why:'Complete safety profile'}
  ],
  'LS': [
    {trait:'RAS',why:'Special teams athleticism'},
    {trait:'40-yard dash',why:'Coverage unit speed'},
    {trait:'Weight',why:'Blocking at the line'},
    {trait:'Bench press',why:'Protection power'},
    {trait:'Vertical jump',why:'Athletic ceiling'},
    {trait:'Broad jump',why:'Lower-body explosion'}
  ]
};

/* ── Badge Logic ──────────────────────────────────────────── */
function getBadges(a){
  var badges = [];
  if(a.forty !== null && a.forty <= 4.4) badges.push({cls:'dr-badge-verified-speed',label:'Verified Speed'});
  if(a.vert !== null && a.vert >= 38) badges.push({cls:'dr-badge-elite-burst',label:'Elite Burst'});
  if(a.bench !== null && a.bench >= 28) badges.push({cls:'dr-badge-rare-power',label:'Rare Power'});
  if(a.weight !== null && a.weight >= 290) badges.push({cls:'dr-badge-front-line-size',label:'Front-Line Size'});
  if(a.ras !== null && a.ras >= 9.0) badges.push({cls:'dr-badge-high-carryover',label:'High-Carryover Profile'});
  if(a.ras !== null && a.ras >= 8.0 && a.ras < 9.0) badges.push({cls:'dr-badge-specialist',label:'Specialist Value'});
  if(a.forty !== null && a.broad !== null && a.forty <= 4.5 && a.broad >= 120) badges.push({cls:'dr-badge-explosive-profile',label:'Explosive Profile'});
  return badges;
}

function renderBadgesHTML(badges){
  return badges.map(function(b){
    return '<span class="dr-badge ' + b.cls + '">\u25CF ' + b.label + '</span>';
  }).join('');
}

/* ── Pressure Trait Scoring ───────────────────────────────── */
function traitScore(a, trait){
  switch(trait){
    case 'speed':
      var s = 0;
      if(a.forty !== null) s += (5.2 - a.forty) / (5.2 - 4.2) * 50;
      if(a.split !== null) s += (1.85 - a.split) / (1.85 - 1.4) * 30;
      if(a.broad !== null) s += (a.broad - 95) / (130 - 95) * 20;
      return s;
    case 'explosion':
      var s = 0;
      if(a.vert !== null) s += (a.vert - 24) / (42 - 24) * 40;
      if(a.broad !== null) s += (a.broad - 95) / (130 - 95) * 35;
      if(a.split !== null) s += (1.85 - a.split) / (1.85 - 1.4) * 25;
      return s;
    case 'power':
      var s = 0;
      if(a.bench !== null) s += a.bench / 40 * 50;
      if(a.weight !== null) s += (a.weight - 170) / (330 - 170) * 30;
      if(a.broad !== null) s += (a.broad - 95) / (130 - 95) * 20;
      return s;
    case 'size':
      var s = 0;
      if(a.weight !== null) s += (a.weight - 170) / (330 - 170) * 60;
      if(a.bench !== null) s += a.bench / 40 * 25;
      if(a.broad !== null) s += (a.broad - 95) / (130 - 95) * 15;
      return s;
    case 'movement':
      var s = 0;
      if(a.forty !== null) s += (5.2 - a.forty) / (5.2 - 4.2) * 30;
      if(a.split !== null) s += (1.85 - a.split) / (1.85 - 1.4) * 30;
      if(a.vert !== null) s += (a.vert - 24) / (42 - 24) * 20;
      if(a.broad !== null) s += (a.broad - 95) / (130 - 95) * 20;
      return s;
    case 'positional':
      var s = 0;
      if(a.ras !== null) s += a.ras * 7;
      var nflKeywords = ['NFL','Texans','Jaguars','Bengals','Redblacks','Active'];
      if(a.proOutcome){
        for(var k = 0; k < nflKeywords.length; k++){
          if(a.proOutcome.indexOf(nflKeywords[k]) !== -1){ s += 20; break; }
        }
      }
      return s;
    default: return 0;
  }
}

/* ── DOM References ───────────────────────────────────────── */
var entryOverlay  = document.getElementById('dr-entry-overlay');
var enterBtn      = document.getElementById('dr-enter-btn');
var enterWrap     = document.getElementById('dr-enter-wrap');
var console_el    = document.getElementById('dr-console');
var exitBtn       = document.getElementById('dr-exit-btn');
var section       = document.getElementById('draft-room');
var boardGrid     = document.getElementById('dr-board-grid');
var heatmapWrap   = document.getElementById('dr-heatmap-wrap');
var buildTiers    = document.getElementById('dr-build-tiers');
var buildSource   = document.getElementById('dr-build-source-grid');
var insightText   = document.getElementById('dr-insight-text');
var compareCount  = document.getElementById('dr-compare-count');
var compareTrigger = document.getElementById('dr-compare-trigger');
var compareOverlay = document.getElementById('dr-compare-overlay');
var comparePanel  = document.getElementById('dr-compare-panel');
var compareBackdrop= document.getElementById('dr-compare-backdrop');
var dossierOverlay = document.getElementById('dr-dossier-overlay');
var dossierPanel  = document.getElementById('dr-dossier-panel');
var dossierBackdrop= document.getElementById('dr-dossier-backdrop');
var rightIntel    = document.getElementById('dr-right-intel');
var rightCompare  = document.getElementById('dr-right-compare');
var intelContent  = document.getElementById('dr-intel-content');

if(!boardGrid) return;

/* ── State ────────────────────────────────────────────────── */
var currentFilter = 'all';
var currentTrait  = null;
var currentView   = 'board';
var selected      = [];
var focusedAthlete = null;
var tierData = {};
var placedNames = new Set();

/* Tier definitions */
var tierDefs = [
  {id:'tier1',name:'Tier 1 \u2014 Top of Board'},
  {id:'tier2',name:'Tier 2 \u2014 Strong Projection'},
  {id:'day3',name:'Day 3 Upside'},
  {id:'explosive',name:'Explosive Profile'},
  {id:'sizeSpeed',name:'Size-Speed Outlier'},
  {id:'power',name:'Power Marker'},
  {id:'specialist',name:'Specialist Value'}
];
tierDefs.forEach(function(t){ tierData[t.id] = []; });

var VERDICT_THRESHOLD = 3;

/* ── Sound Cue ────────────────────────────────────────────── */
var draftChime = null;
try { draftChime = new Audio('nfl-draft-chime.mp3'); draftChime.volume = 0.3; } catch(e){}

/* ── XSS Protection ───────────────────────────────────────── */
function drEsc(str){
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str || ''));
  return d.innerHTML;
}

/* ── Entry Transition ─────────────────────────────────────── */
function enterDraftRoom(){
  if(entryOverlay){
    entryOverlay.classList.add('active');
    var bar = entryOverlay.querySelector('.dr-entry-bar span');
    var prog = 0;
    var tick = setInterval(function(){
      prog += Math.random() * 15 + 8;
      if(prog > 100) prog = 100;
      if(bar) bar.style.width = prog + '%';
      if(prog >= 100){
        clearInterval(tick);
        setTimeout(function(){
          entryOverlay.classList.remove('active');
          if(enterWrap) enterWrap.style.display = 'none';
          if(console_el) console_el.classList.remove('hidden');
          if(section) section.classList.add('dr-active');
          if(draftChime) draftChime.play().catch(function(){});
          renderBoard();
          updateInsight('Board loaded. ' + getFilteredData().length + ' athletes on the board. Select a profile to begin evaluation.');
        }, 600);
      }
    }, 80);
  } else {
    if(enterWrap) enterWrap.style.display = 'none';
    if(console_el) console_el.classList.remove('hidden');
    if(section) section.classList.add('dr-active');
    renderBoard();
  }
}

function exitDraftRoom(){
  if(console_el) console_el.classList.add('hidden');
  if(enterWrap) enterWrap.style.display = '';
  if(section) section.classList.remove('dr-active');
  selected = [];
  focusedAthlete = null;
  updateCompareCount();
  resetRightPanel();
}

if(enterBtn) enterBtn.addEventListener('click', enterDraftRoom);
if(exitBtn) exitBtn.addEventListener('click', exitDraftRoom);

/* ── Filtering ────────────────────────────────────────────── */
function getFilteredData(){
  var fortyMax = parseFloat(document.getElementById('dr-forty-range').value);
  var vertMin  = parseFloat(document.getElementById('dr-vert-range').value);
  var benchMin = parseInt(document.getElementById('dr-bench-range').value);
  var weightMin= parseInt(document.getElementById('dr-weight-range').value);
  var rasMin   = parseFloat(document.getElementById('dr-ras-range').value);

  return draftData.filter(function(a){
    if(currentFilter !== 'all' && a.pos !== currentFilter) return false;
    if(a.forty !== null && a.forty > fortyMax) return false;
    if(vertMin > 25 && (a.vert === null || a.vert < vertMin)) return false;
    if(benchMin > 0 && (a.bench === null || a.bench < benchMin)) return false;
    if(weightMin > 170 && (a.weight === null || a.weight < weightMin)) return false;
    if(rasMin > 0 && (a.ras === null || a.ras < rasMin)) return false;
    return true;
  });
}

function getSortedData(data){
  if(!currentTrait) return data;
  var sorted = data.slice().sort(function(a, b){
    return traitScore(b, currentTrait) - traitScore(a, currentTrait);
  });
  return sorted;
}

/* ── Board Rendering ──────────────────────────────────────── */
function renderBoard(){
  var data = getSortedData(getFilteredData());
  boardGrid.innerHTML = '';
  if(data.length === 0){
    boardGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--soft);padding:40px;font-size:13px;">No athletes match current filters. Adjust your criteria above.</p>';
    return;
  }
  data.forEach(function(a){
    var card = document.createElement('div');
    card.className = 'dr-card';
    var idx = draftData.indexOf(a);
    card.setAttribute('data-idx', idx);
    if(selected.indexOf(idx) !== -1) card.classList.add('selected');

    var badges = getBadges(a);
    var statsHTML = '';
    if(a.ras !== null) statsHTML += '<span class="dr-stat highlight">' + a.ras.toFixed(2) + ' RAS</span>';
    if(a.forty !== null) statsHTML += '<span class="dr-stat">' + a.forty.toFixed(2) + '</span>';
    if(a.vert !== null) statsHTML += '<span class="dr-stat">' + a.vert + '\u2033</span>';
    if(a.bench !== null) statsHTML += '<span class="dr-stat">' + a.bench + ' reps</span>';
    if(a.weight !== null) statsHTML += '<span class="dr-stat">' + a.weight + ' lbs</span>';

    card.innerHTML =
      '<div class="dr-card-check">\u2713</div>' +
      '<button class="dr-card-dossier-btn" data-dossier="' + idx + '" type="button" title="Open dossier">\u2295</button>' +
      '<img class="dr-card-photo" src="' + a.photo + '" alt="' + drEsc(a.name) + '" loading="lazy">' +
      '<div class="dr-card-body">' +
        '<div class="dr-card-name">' + drEsc(a.name) + '</div>' +
        '<span class="dr-card-pos">' + drEsc(a.pos) + '</span>' +
        '<div class="dr-card-school">' + drEsc(a.school) + '</div>' +
        '<div class="dr-card-stats">' + statsHTML + '</div>' +
        (badges.length ? '<div class="dr-card-badges">' + renderBadgesHTML(badges) + '</div>' : '') +
      '</div>';

    // Selection click
    card.addEventListener('click', function(e){
      if(e.target.closest('.dr-card-dossier-btn')) return;
      var i = parseInt(card.getAttribute('data-idx'));
      var pos = selected.indexOf(i);
      if(pos !== -1){
        selected.splice(pos, 1);
        card.classList.remove('selected');
      } else if(selected.length < 2){
        selected.push(i);
        card.classList.add('selected');
      }
      if(selected.length > 0){
        focusedAthlete = draftData[selected[selected.length - 1]];
        renderPlayerIntel(focusedAthlete);
      } else {
        focusedAthlete = null;
        resetRightPanel();
      }
      updateCompareCount();
      updateInsightForSelection();
    });

    // Dossier button
    var dossierBtn = card.querySelector('.dr-card-dossier-btn');
    if(dossierBtn){
      dossierBtn.addEventListener('click', function(e){
        e.stopPropagation();
        openDossier(draftData[parseInt(dossierBtn.getAttribute('data-dossier'))]);
      });
    }

    // Magnetic tilt
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });

    boardGrid.appendChild(card);
  });
}

/* ── Compare Count ────────────────────────────────────────── */
function updateCompareCount(){
  if(compareCount) compareCount.textContent = selected.length;
  if(compareTrigger) compareTrigger.disabled = selected.length !== 2;
}

/* ── Right Panel ──────────────────────────────────────────── */
function resetRightPanel(){
  if(rightIntel){
    rightIntel.innerHTML =
      '<div class="dr-intel-empty">' +
        '<div class="dr-intel-empty-icon">\u25C6</div>' +
        '<p>Click any athlete card to see their scouting breakdown here.</p>' +
      '</div>';
  }
}

function renderPlayerIntel(a){
  if(!rightIntel) return;
  var badges = getBadges(a);
  var idx = draftData.indexOf(a);

  var statsGrid = '';
  var metrics = [
    {val:a.ras,label:'RAS',fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'}, glow: a.ras !== null && a.ras >= 8.5},
    {val:a.forty,label:'40-Yard',fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'}, glow: a.forty !== null && a.forty <= 4.45},
    {val:a.split,label:'10-Split',fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'}, glow: a.split !== null && a.split <= 1.55},
    {val:a.vert,label:'Vertical',fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'}, glow: a.vert !== null && a.vert >= 36},
    {val:a.broad,label:'Broad',fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'}, glow: a.broad !== null && a.broad >= 122},
    {val:a.bench,label:'Bench',fmt:function(v){return v !== null ? v + ' reps' : '\u2014'}, glow: a.bench !== null && a.bench >= 26},
    {val:a.weight,label:'Weight',fmt:function(v){return v !== null ? v + ' lbs' : '\u2014'}, glow: false},
    {val:a.classYear,label:'Class',fmt:function(v){return v || '\u2014'}, glow: false}
  ];

  metrics.forEach(function(m){
    statsGrid += '<div class="dr-intel-stat' + (m.glow ? ' glow' : '') + '">' +
      '<div class="dr-intel-stat-val">' + m.fmt(m.val) + '</div>' +
      '<div class="dr-intel-stat-label">' + m.label + '</div>' +
    '</div>';
  });

  // Radar data (normalized 0-100)
  var radarData = {
    Speed: a.forty !== null ? Math.min(100, ((5.2 - a.forty) / (5.2 - 4.2)) * 100) : 0,
    Explosion: a.vert !== null ? Math.min(100, ((a.vert - 24) / (42 - 24)) * 100) : 0,
    Power: a.bench !== null ? Math.min(100, (a.bench / 38) * 100) : 0,
    Size: a.weight !== null ? Math.min(100, ((a.weight - 170) / (330 - 170)) * 100) : 0,
    Movement: a.split !== null ? Math.min(100, ((1.85 - a.split) / (1.85 - 1.4)) * 100) : 0
  };

  rightIntel.innerHTML =
    '<div class="dr-player-intel">' +
      '<img class="dr-intel-photo" src="' + a.photo + '" alt="' + drEsc(a.name) + '">' +
      '<div class="dr-intel-name">' + drEsc(a.name) + '</div>' +
      '<div class="dr-intel-pos-school">' + drEsc(a.pos) + ' \u2022 ' + drEsc(a.school) + (a.proOutcome ? ' \u2022 ' + drEsc(a.proOutcome) : '') + '</div>' +
      (badges.length ? '<div class="dr-intel-badges">' + renderBadgesHTML(badges) + '</div>' : '') +
      '<div class="dr-intel-stat-grid">' + statsGrid + '</div>' +
      '<div class="dr-radar-wrap"><canvas class="dr-radar-canvas" id="dr-radar-canvas" width="200" height="200"></canvas></div>' +
      '<div class="dr-intel-best-trait">' +
        '<div class="dr-intel-best-label">Best Trait</div>' +
        '<div class="dr-intel-best-val">' + drEsc(a.bestTrait) + '</div>' +
      '</div>' +
      '<div class="dr-intel-summary">' +
        '<div class="dr-intel-summary-title">Profile Summary</div>' +
        drEsc(a.summary) +
      '</div>' +
      '<button class="dr-intel-dossier-link" data-dossier="' + idx + '" type="button">View Full Dossier \u2192</button>' +
    '</div>';

  // Draw radar
  drawRadar(radarData);

  // Dossier link
  var link = rightIntel.querySelector('.dr-intel-dossier-link');
  if(link) link.addEventListener('click', function(){ openDossier(a); });
}

/* ── Radar Chart ──────────────────────────────────────────── */
function drawRadar(data){
  var canvas = document.getElementById('dr-radar-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var cx = 100, cy = 100, r = 75;
  var keys = Object.keys(data);
  var n = keys.length;
  var step = (Math.PI * 2) / n;

  ctx.clearRect(0, 0, 200, 200);

  // Grid circles
  for(var level = 1; level <= 4; level++){
    ctx.beginPath();
    var gr = r * (level / 4);
    for(var i = 0; i <= n; i++){
      var angle = -Math.PI / 2 + step * i;
      var gx = cx + gr * Math.cos(angle);
      var gy = cy + gr * Math.sin(angle);
      if(i === 0) ctx.moveTo(gx, gy);
      else ctx.lineTo(gx, gy);
    }
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.04 + level * 0.02) + ')';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Axis lines
  for(var i = 0; i < n; i++){
    var angle = -Math.PI / 2 + step * i;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  for(var i = 0; i < n; i++){
    var val = Math.max(0, Math.min(100, data[keys[i]]));
    var angle = -Math.PI / 2 + step * i;
    var dr = r * (val / 100);
    var dx = cx + dr * Math.cos(angle);
    var dy = cy + dr * Math.sin(angle);
    if(i === 0) ctx.moveTo(dx, dy);
    else ctx.lineTo(dx, dy);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,106,0,0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,106,0,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Data points and labels
  for(var i = 0; i < n; i++){
    var val = Math.max(0, Math.min(100, data[keys[i]]));
    var angle = -Math.PI / 2 + step * i;
    var dr = r * (val / 100);
    var dx = cx + dr * Math.cos(angle);
    var dy = cy + dr * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,106,0,0.9)';
    ctx.fill();

    // Labels
    var lx = cx + (r + 14) * Math.cos(angle);
    var ly = cy + (r + 14) * Math.sin(angle);
    ctx.font = '600 8px Inter,system-ui,sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(keys[i], lx, ly);
  }
}

/* ── Player Dossier ───────────────────────────────────────── */
function openDossier(a){
  if(!dossierOverlay || !dossierPanel) return;
  var badges = getBadges(a);

  var measurablesHTML = '';
  var dossierMetrics = [
    {val:a.ras,label:'RAS',fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'}, glow: a.ras !== null && a.ras >= 8.5},
    {val:a.forty,label:'40-Yard',fmt:function(v){return v !== null ? v.toFixed(2) + 's' : '\u2014'}, glow: a.forty !== null && a.forty <= 4.45},
    {val:a.split,label:'10-Split',fmt:function(v){return v !== null ? v.toFixed(2) + 's' : '\u2014'}, glow: a.split !== null && a.split <= 1.55},
    {val:a.vert,label:'Vertical',fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'}, glow: a.vert !== null && a.vert >= 36},
    {val:a.broad,label:'Broad',fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'}, glow: a.broad !== null && a.broad >= 122},
    {val:a.bench,label:'Bench',fmt:function(v){return v !== null ? v + ' reps' : '\u2014'}, glow: a.bench !== null && a.bench >= 26},
    {val:a.weight,label:'Weight',fmt:function(v){return v !== null ? v + ' lbs' : '\u2014'}, glow: false},
    {val:a.classYear,label:'Class Year',fmt:function(v){return v || '\u2014'}, glow: false}
  ];
  dossierMetrics.forEach(function(m){
    measurablesHTML += '<div class="dr-dossier-stat' + (m.glow ? ' glow' : '') + '">' +
      '<div class="dr-dossier-stat-val">' + m.fmt(m.val) + '</div>' +
      '<div class="dr-dossier-stat-label">' + m.label + '</div>' +
    '</div>';
  });

  // Profile Strength Bars
  var traits = [
    {label:'Speed', pct: a.forty !== null ? Math.min(100, ((5.2 - a.forty) / (5.2 - 4.2)) * 100) : 0},
    {label:'Explosion', pct: a.vert !== null ? Math.min(100, ((a.vert - 24) / (42 - 24)) * 100) : 0},
    {label:'Power', pct: a.bench !== null ? Math.min(100, (a.bench / 38) * 100) : 0},
    {label:'Size', pct: a.weight !== null ? Math.min(100, ((a.weight - 170) / (330 - 170)) * 100) : 0},
    {label:'Movement', pct: a.split !== null ? Math.min(100, ((1.85 - a.split) / (1.85 - 1.4)) * 100) : 0}
  ];
  var traitBarsHTML = traits.map(function(t){
    var p = Math.round(t.pct);
    return '<div class="dr-dossier-trait-row">' +
      '<div class="dr-dossier-trait-label">' + t.label + '</div>' +
      '<div class="dr-dossier-trait-bar"><div class="dr-dossier-trait-fill" style="width:0%" data-width="' + p + '%"></div></div>' +
      '<div class="dr-dossier-trait-pct">' + p + '%</div>' +
    '</div>';
  }).join('');

  dossierPanel.innerHTML =
    '<button class="dr-dossier-close" type="button">\u2715</button>' +
    '<img class="dr-dossier-hero" src="' + a.photo + '" alt="' + drEsc(a.name) + '">' +
    '<div class="dr-dossier-body">' +
      '<div class="dr-dossier-name">' + drEsc(a.name) + '</div>' +
      '<div class="dr-dossier-pos-school">' + drEsc(a.pos) + ' \u2022 ' + drEsc(a.school) + (a.proOutcome ? ' \u2022 ' + drEsc(a.proOutcome) : '') + '</div>' +
      (badges.length ? '<div class="dr-dossier-badges">' + renderBadgesHTML(badges) + '</div>' : '') +
      '<div class="dr-dossier-measurables">' + measurablesHTML + '</div>' +
      '<div class="dr-dossier-section">' +
        '<div class="dr-dossier-section-title">Profile Strength</div>' +
        traitBarsHTML +
      '</div>' +
      '<div class="dr-dossier-section">' +
        '<div class="dr-dossier-section-title">Best Trait</div>' +
        '<div class="dr-dossier-text" style="font-weight:800;color:#fff;font-size:15px;margin-bottom:6px">' + drEsc(a.bestTrait) + '</div>' +
        '<div class="dr-dossier-text">' + drEsc(a.devEdge) + '</div>' +
      '</div>' +
      '<div class="dr-dossier-section">' +
        '<div class="dr-dossier-section-title">Profile Summary</div>' +
        '<div class="dr-dossier-text">' + drEsc(a.summary) + '</div>' +
      '</div>' +
      '<div class="dr-dossier-why">' +
        '<div class="dr-dossier-why-title">Why This Profile Matters</div>' +
        '<div class="dr-dossier-why-text">' + drEsc(a.why) + '</div>' +
      '</div>' +
    '</div>';

  dossierOverlay.classList.add('active');
  dossierOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Animate trait bars
  setTimeout(function(){
    var fills = dossierPanel.querySelectorAll('.dr-dossier-trait-fill');
    fills.forEach(function(f){ f.style.width = f.getAttribute('data-width'); });
  }, 100);

  // Close
  var closeBtn = dossierPanel.querySelector('.dr-dossier-close');
  if(closeBtn) closeBtn.addEventListener('click', closeDossier);
}

function closeDossier(){
  if(dossierOverlay){
    dossierOverlay.classList.remove('active');
    dossierOverlay.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
}
if(dossierBackdrop) dossierBackdrop.addEventListener('click', closeDossier);

/* ── Compare Command Center ───────────────────────────────── */
function openCompare(){
  if(selected.length !== 2 || !compareOverlay || !comparePanel) return;
  var a = draftData[selected[0]];
  var b = draftData[selected[1]];

  var metrics = [
    {label:'RAS',aVal:a.ras,bVal:b.ras,fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'},higher:true},
    {label:'40-Yard',aVal:a.forty,bVal:b.forty,fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'},higher:false},
    {label:'10-Split',aVal:a.split,bVal:b.split,fmt:function(v){return v !== null ? v.toFixed(2) : '\u2014'},higher:false},
    {label:'Vertical',aVal:a.vert,bVal:b.vert,fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'},higher:true},
    {label:'Broad',aVal:a.broad,bVal:b.broad,fmt:function(v){return v !== null ? v + '\u2033' : '\u2014'},higher:true},
    {label:'Bench',aVal:a.bench,bVal:b.bench,fmt:function(v){return v !== null ? v + ' reps' : '\u2014'},higher:true},
    {label:'Weight',aVal:a.weight,bVal:b.weight,fmt:function(v){return v !== null ? v + ' lbs' : '\u2014'},higher:true}
  ];

  var metricsHTML = metrics.map(function(m){
    var aWin = '', bWin = '';
    if(m.aVal !== null && m.bVal !== null){
      if(m.higher){
        if(m.aVal > m.bVal) aWin = ' winner';
        else if(m.bVal > m.aVal) bWin = ' winner';
      } else {
        if(m.aVal < m.bVal) aWin = ' winner';
        else if(m.bVal < m.aVal) bWin = ' winner';
      }
    }
    return '<div class="dr-compare-metric">' +
      '<div class="dr-compare-val' + aWin + '">' + m.fmt(m.aVal) + '</div>' +
      '<div class="dr-compare-metric-label">' + m.label + '</div>' +
      '<div class="dr-compare-val' + bWin + '">' + m.fmt(m.bVal) + '</div>' +
    '</div>';
  }).join('');

  // Verdict
  var verdicts = [
    {label:'Speed Edge', trait:'speed'},
    {label:'Explosion Edge', trait:'explosion'},
    {label:'Power Edge', trait:'power'},
    {label:'Size Edge', trait:'size'},
    {label:'Overall Profile', trait:'movement'}
  ];
  var verdictHTML = verdicts.map(function(v){
    var sa = traitScore(a, v.trait);
    var sb = traitScore(b, v.trait);
    var cls = 'edge-tie';
    var winner = 'Tie';
    if(sa > sb + VERDICT_THRESHOLD){ cls = 'edge-a'; winner = a.name.split(' ').pop(); }
    else if(sb > sa + VERDICT_THRESHOLD){ cls = 'edge-b'; winner = b.name.split(' ').pop(); }
    return '<div class="dr-verdict-item ' + cls + '">' + v.label + ': ' + winner + '</div>';
  }).join('');

  comparePanel.innerHTML =
    '<button class="dr-compare-close" type="button">\u2715</button>' +
    '<div class="dr-compare-header">' +
      '<div class="dr-compare-title">Command Center</div>' +
      '<div class="dr-compare-subtitle">Head-to-Head Evaluation</div>' +
    '</div>' +
    '<div class="dr-compare-athletes">' +
      '<div class="dr-compare-athlete">' +
        '<img class="dr-compare-athlete-photo" src="' + a.photo + '" alt="' + drEsc(a.name) + '">' +
        '<div class="dr-compare-athlete-name">' + drEsc(a.name) + '</div>' +
        '<span class="dr-card-pos">' + drEsc(a.pos) + '</span>' +
      '</div>' +
      '<div class="dr-compare-vs">VS</div>' +
      '<div class="dr-compare-athlete">' +
        '<img class="dr-compare-athlete-photo" src="' + b.photo + '" alt="' + drEsc(b.name) + '">' +
        '<div class="dr-compare-athlete-name">' + drEsc(b.name) + '</div>' +
        '<span class="dr-card-pos">' + drEsc(b.pos) + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="dr-compare-metrics">' + metricsHTML + '</div>' +
    '<div class="dr-verdict-strip">' +
      '<div class="dr-verdict-title">Verdict</div>' +
      '<div class="dr-verdict-items">' + verdictHTML + '</div>' +
    '</div>';

  compareOverlay.classList.add('active');
  compareOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  var closeBtn = comparePanel.querySelector('.dr-compare-close');
  if(closeBtn) closeBtn.addEventListener('click', closeCompare);
}

function closeCompare(){
  if(compareOverlay){
    compareOverlay.classList.remove('active');
    compareOverlay.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
}
if(compareTrigger) compareTrigger.addEventListener('click', openCompare);
if(compareBackdrop) compareBackdrop.addEventListener('click', closeCompare);

/* ── Heatmap ──────────────────────────────────────────────── */
function renderHeatmap(){
  if(!heatmapWrap) return;
  var data = getSortedData(getFilteredData());
  var cols = [
    {key:'forty',label:'40',lower:true,min:4.2,max:5.2},
    {key:'split',label:'Split',lower:true,min:1.4,max:1.85},
    {key:'vert',label:'Vert',lower:false,min:24,max:42},
    {key:'broad',label:'Broad',lower:false,min:95,max:130},
    {key:'bench',label:'Bench',lower:false,min:0,max:38},
    {key:'weight',label:'Weight',lower:false,min:170,max:330},
    {key:'ras',label:'RAS',lower:false,min:0,max:10}
  ];

  var gridCols = 'minmax(120px,1fr) ' + cols.map(function(){ return '80px'; }).join(' ');
  var html = '<div class="dr-heatmap" style="grid-template-columns:' + gridCols + '">';

  // Header
  html += '<div class="dr-hm-cell dr-hm-cell-header">Athlete</div>';
  cols.forEach(function(c){
    html += '<div class="dr-hm-cell dr-hm-cell-header">' + c.label + '</div>';
  });

  // Rows
  data.forEach(function(a){
    html += '<div class="dr-hm-cell dr-hm-cell-name">' + drEsc(a.name) + '</div>';
    cols.forEach(function(c){
      var val = a[c.key];
      var display = '\u2014';
      if(val !== null){
        if(c.key === 'ras') display = val.toFixed(2);
        else if(c.key === 'forty' || c.key === 'split') display = val.toFixed(2);
        else display = val;
      }
      var glow = '';
      if(val !== null){
        var norm;
        if(c.lower) norm = (c.max - val) / (c.max - c.min);
        else norm = (val - c.min) / (c.max - c.min);
        norm = Math.max(0, Math.min(1, norm));
        if(norm >= 0.85) glow = ' dr-hm-glow-4';
        else if(norm >= 0.65) glow = ' dr-hm-glow-3';
        else if(norm >= 0.45) glow = ' dr-hm-glow-2';
        else if(norm >= 0.25) glow = ' dr-hm-glow-1';
      }
      html += '<div class="dr-hm-cell dr-hm-cell-value' + glow + '">' + display + '</div>';
    });
  });

  html += '</div>';
  heatmapWrap.innerHTML = html;
}

/* ── Build Board ──────────────────────────────────────────── */
function renderBuildBoard(){
  if(!buildTiers || !buildSource) return;
  buildTiers.innerHTML = '';
  tierDefs.forEach(function(t){
    var tier = document.createElement('div');
    tier.className = 'dr-build-tier';
    tier.setAttribute('data-tier', t.id);
    var count = tierData[t.id] ? tierData[t.id].length : 0;
    tier.innerHTML =
      '<div class="dr-build-tier-header">' +
        '<div class="dr-build-tier-name">' + t.name + '</div>' +
        '<div class="dr-build-tier-count">' + count + ' athlete' + (count !== 1 ? 's' : '') + '</div>' +
      '</div>' +
      '<div class="dr-build-tier-cards" data-tier="' + t.id + '"></div>';

    var cardsContainer = tier.querySelector('.dr-build-tier-cards');

    if(tierData[t.id]){
      tierData[t.id].forEach(function(a){
        var chip = createBuildChip(a, t.id);
        cardsContainer.appendChild(chip);
      });
    }

    tier.addEventListener('dragover', function(e){
      e.preventDefault();
      tier.classList.add('drag-over');
    });
    tier.addEventListener('dragleave', function(){
      tier.classList.remove('drag-over');
    });
    tier.addEventListener('drop', function(e){
      e.preventDefault();
      tier.classList.remove('drag-over');
      var name = e.dataTransfer.getData('text/plain');
      var athlete = draftData.find(function(a){ return a.name === name; });
      if(athlete && !placedNames.has(name)){
        placedNames.add(name);
        if(!tierData[t.id]) tierData[t.id] = [];
        tierData[t.id].push(athlete);
        renderBuildBoard();
        updateInsight(drEsc(name) + ' placed in ' + t.name + '. ' + placedNames.size + ' athletes ranked on your board.');
      }
    });

    buildTiers.appendChild(tier);
  });

  buildSource.innerHTML = '';
  draftData.forEach(function(a){
    var chip = document.createElement('div');
    chip.className = 'dr-build-source-chip' + (placedNames.has(a.name) ? ' placed' : '');
    chip.setAttribute('draggable', 'true');
    chip.innerHTML = '<img src="' + a.photo + '" alt="' + drEsc(a.name) + '"> ' + drEsc(a.name);
    chip.addEventListener('dragstart', function(e){
      e.dataTransfer.setData('text/plain', a.name);
    });
    buildSource.appendChild(chip);
  });
}

function createBuildChip(a, tierId){
  var chip = document.createElement('div');
  chip.className = 'dr-build-chip';
  chip.innerHTML =
    '<img src="' + a.photo + '" alt="' + drEsc(a.name) + '">' +
    '<span>' + drEsc(a.name) + '</span>' +
    '<button class="dr-build-chip-remove" type="button">\u2715</button>';
  chip.querySelector('.dr-build-chip-remove').addEventListener('click', function(){
    placedNames.delete(a.name);
    tierData[tierId] = tierData[tierId].filter(function(x){ return x.name !== a.name; });
    renderBuildBoard();
  });
  return chip;
}

/* ── Position Intel Panel ─────────────────────────────────── */
function renderPositionIntel(pos){
  if(!intelContent) return;
  var intel = positionIntel[pos];
  if(!intel){
    intelContent.innerHTML = '<p class="dr-intel-placeholder">Select a specific position to see trait priorities</p>';
    return;
  }
  intelContent.innerHTML = intel.map(function(item, i){
    return '<div class="dr-intel-item">' +
      '<div class="dr-intel-rank">' + (i + 1) + '</div>' +
      '<div class="dr-intel-trait">' + item.trait + '</div>' +
      '<div class="dr-intel-why">' + item.why + '</div>' +
    '</div>';
  }).join('');
}

/* ── Insight Engine ───────────────────────────────────────── */
function updateInsight(text){
  if(insightText) insightText.textContent = text;
}

function updateInsightForSelection(){
  if(selected.length === 0){
    updateInsight('Board active with ' + getFilteredData().length + ' athletes. Click a card to begin evaluation.');
    return;
  }
  if(selected.length === 1){
    var a = draftData[selected[0]];
    var reasons = [];
    if(a.ras !== null && a.ras >= 9.0) reasons.push('elite RAS');
    if(a.forty !== null && a.forty <= 4.4) reasons.push('verified speed');
    if(a.bench !== null && a.bench >= 28) reasons.push('upper-body output');
    if(a.vert !== null && a.vert >= 37) reasons.push('vertical explosion');
    if(a.weight !== null && a.weight >= 290) reasons.push('front-line size');
    if(reasons.length > 0){
      updateInsight(a.name + ' \u2014 this profile rises because ' + reasons.join(', ') + ' show up together.');
    } else {
      updateInsight(a.name + ' \u2014 ' + a.bestTrait + '. Select a second athlete to activate the compare command center.');
    }
    return;
  }
  if(selected.length === 2){
    var a = draftData[selected[0]];
    var b = draftData[selected[1]];
    updateInsight(a.name + ' vs ' + b.name + ' loaded. Click Compare to open the head-to-head command center.');
  }
}

/* ── Event Listeners ──────────────────────────────────────── */

// Position filter buttons
document.querySelectorAll('.dr-pos-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.dr-pos-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-drpos');
    selected = [];
    focusedAthlete = null;
    updateCompareCount();
    resetRightPanel();
    renderPositionIntel(currentFilter);
    applyCurrentView();
    updateInsight(currentFilter === 'all' ? 'All positions loaded. ' + getFilteredData().length + ' athletes on the board.' : currentFilter + ' position selected. ' + getFilteredData().length + ' athletes match.');
  });
});

// Range filters
['dr-forty-range','dr-vert-range','dr-bench-range','dr-weight-range','dr-ras-range'].forEach(function(id){
  var el = document.getElementById(id);
  if(!el) return;
  var valId = id.replace('-range', '-val');
  el.addEventListener('input', function(){
    var valEl = document.getElementById(valId);
    if(valEl) valEl.textContent = el.value;
    applyCurrentView();
    updateInsight('Filters updated. ' + getFilteredData().length + ' athletes match current criteria.');
  });
});

// Pressure trait buttons
document.querySelectorAll('.dr-trait-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var trait = btn.getAttribute('data-trait');
    if(currentTrait === trait){
      currentTrait = null;
      btn.classList.remove('active');
    } else {
      document.querySelectorAll('.dr-trait-btn').forEach(function(b){ b.classList.remove('active'); });
      currentTrait = trait;
      btn.classList.add('active');
    }
    applyCurrentView();
    if(currentTrait){
      updateInsight('Board reordered by ' + currentTrait + '. Top profiles for this trait are now prioritized.');
    } else {
      updateInsight('Pressure trait cleared. Board returned to default order.');
    }
  });
});

// View tabs
document.querySelectorAll('.dr-view-tab').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.dr-view-tab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    currentView = btn.getAttribute('data-view');
    applyCurrentView();
  });
});

function applyCurrentView(){
  var boardView = document.getElementById('dr-view-board');
  var heatmapView = document.getElementById('dr-view-heatmap');
  var buildView = document.getElementById('dr-view-build');
  if(boardView) boardView.classList.toggle('hidden', currentView !== 'board');
  if(heatmapView) heatmapView.classList.toggle('hidden', currentView !== 'heatmap');
  if(buildView) buildView.classList.toggle('hidden', currentView !== 'build');

  if(currentView === 'board') renderBoard();
  else if(currentView === 'heatmap') renderHeatmap();
  else if(currentView === 'build') renderBuildBoard();
}

// Right panel tabs
document.querySelectorAll('.dr-right-tab').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.dr-right-tab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var tab = btn.getAttribute('data-rtab');
    if(rightIntel) rightIntel.classList.toggle('hidden', tab !== 'intel');
    if(rightCompare) rightCompare.classList.toggle('hidden', tab !== 'compare');
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    if(dossierOverlay && dossierOverlay.classList.contains('active')){
      closeDossier();
    } else if(compareOverlay && compareOverlay.classList.contains('active')){
      closeCompare();
    }
  }
});

})();

/* ── Performance Intelligence Section ────────────────────── */
(function(){

  /* ── Video Player: always reset to 0:00 on play ─────────── */
  var video = document.getElementById('pi-hero-video');
  var overlay = document.getElementById('pi-video-overlay');
  var playBtn = document.getElementById('pi-play-btn');
  if(video && overlay && playBtn){
    function startVideo(){
      video.currentTime = 0;
      video.play().catch(function(){});
      overlay.classList.add('hidden');
    }
    overlay.addEventListener('click', startVideo);
    video.addEventListener('ended', function(){
      overlay.classList.remove('hidden');
    });
    video.addEventListener('pause', function(){
      if(video.ended) return;
      overlay.classList.remove('hidden');
    });
  }

  /* ── Count-Up Animation ─────────────────────────────────── */
  var countUpEls = document.querySelectorAll('[data-countup]');
  var countUpDone = new Set();

  function animateCountUp(el){
    var target = parseFloat(el.getAttribute('data-countup'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = performance.now();

    function tick(now){
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      var current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if(progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var countUpObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && !countUpDone.has(entry.target)){
        countUpDone.add(entry.target);
        animateCountUp(entry.target);
      }
    });
  }, {threshold: 0.3});

  countUpEls.forEach(function(el){ countUpObserver.observe(el); });

  /* ── Verified Tag Flicker on Reveal ────────────────────── */
  var verifiedTags = document.querySelectorAll('.pi-metric-card .pi-verified-tag');
  var tagsDone = new Set();

  var tagObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && !tagsDone.has(entry.target)){
        tagsDone.add(entry.target);
        var tag = entry.target.querySelector('.pi-verified-tag');
        if(tag){
          tag.style.animation = 'none';
          tag.offsetHeight;
          tag.style.animation = 'pi-tag-flicker .6s ease forwards';
        }
      }
    });
  }, {threshold: 0.2});

  document.querySelectorAll('.pi-metric-card').forEach(function(card){
    tagObserver.observe(card);
  });

  /* ── Position Intelligence Toggle ──────────────────────── */
  var posData = {
    WR: [
      {metric: '10-Yard Split', why: 'Burst off the line — creates initial separation'},
      {metric: '40-Yard Dash', why: 'Top-end speed — deep threat separation'},
      {metric: 'Vertical / Broad', why: 'Explosive playmaking — high-point ability'},
      {metric: 'Shuttle / 3-Cone', why: 'Route efficiency — lateral quickness'},
      {metric: 'Size / Frame', why: 'Matchup value — press resistance'},
      {metric: 'Bench Press', why: 'Upper-body strength at the point of attack'}
    ],
    DB: [
      {metric: '10-Yard Split', why: 'Reaction burst — break on the ball'},
      {metric: '40-Yard Dash', why: 'Recovery speed — deep coverage'},
      {metric: 'Shuttle / 3-Cone', why: 'Change of direction — mirror ability'},
      {metric: 'Vertical / Broad', why: 'Closing explosion — ball skills at the catch point'},
      {metric: 'Size / Frame', why: 'Length and physicality in press'},
      {metric: 'Bench Press', why: 'Tackle strength — run support'}
    ],
    RB: [
      {metric: '10-Yard Split', why: 'Burst through the hole — first-level speed'},
      {metric: '40-Yard Dash', why: 'Breakaway speed — home run ability'},
      {metric: 'Shuttle / 3-Cone', why: 'Lateral agility — cutback ability'},
      {metric: 'Broad Jump', why: 'Explosive first step — power through contact'},
      {metric: 'Bench Press', why: 'Contact balance — pass protection'},
      {metric: 'Size / Weight', why: 'Durability — between-the-tackles presence'}
    ],
    LB: [
      {metric: 'Shuttle / 3-Cone', why: 'Lateral range — sideline-to-sideline speed'},
      {metric: '40-Yard Dash', why: 'Pursuit speed — chase-down ability'},
      {metric: '10-Yard Split', why: 'Downhill burst — closing on the ball'},
      {metric: 'Bench Press', why: 'Stack and shed — taking on blockers'},
      {metric: 'Vertical / Broad', why: 'Explosive closing — blitz pressure'},
      {metric: 'Size / Frame', why: 'Anchor and physicality at the point of attack'}
    ],
    OL: [
      {metric: 'Size / Frame', why: 'Anchor and length — base for everything'},
      {metric: 'Shuttle / 3-Cone', why: 'Lateral agility — mirror and adjust'},
      {metric: '10-Yard Split', why: 'Set speed — pass protection timing'},
      {metric: 'Bench Press', why: 'Strike and sustain power — drive blocking'},
      {metric: 'Vertical / Broad', why: 'Lower-body power — second-level movement'},
      {metric: '40-Yard Dash', why: 'Overall athleticism for the position'}
    ],
    DL: [
      {metric: 'Bench Press', why: 'Hand violence — bull rush and control'},
      {metric: '10-Yard Split', why: 'First-step explosion — gap penetration'},
      {metric: 'Shuttle / 3-Cone', why: 'Counter moves — inside rush agility'},
      {metric: 'Size / Weight', why: 'Anchor against double teams'},
      {metric: 'Vertical / Broad', why: 'Lower-body explosion — leverage and power'},
      {metric: '40-Yard Dash', why: 'Pursuit and chase ability downfield'}
    ]
  };

  var posToggleContainer = document.getElementById('pi-pos-toggles');
  var priorityStack = document.getElementById('pi-priority-stack');

  function renderPriority(pos){
    if(!posData[pos] || !priorityStack) return;
    priorityStack.innerHTML = '';
    posData[pos].forEach(function(item, i){
      var div = document.createElement('div');
      div.className = 'pi-priority-item';
      div.style.animationDelay = (i * 0.08) + 's';
      div.innerHTML =
        '<div class="pi-priority-rank">' + (i + 1) + '</div>' +
        '<div class="pi-priority-info">' +
          '<div class="pi-priority-metric">' + item.metric + '</div>' +
          '<div class="pi-priority-why">' + item.why + '</div>' +
        '</div>';
      priorityStack.appendChild(div);
    });
  }

  if(posToggleContainer){
    posToggleContainer.addEventListener('click', function(e){
      var btn = e.target.closest('.pi-pos-btn');
      if(!btn) return;
      posToggleContainer.querySelectorAll('.pi-pos-btn').forEach(function(b){
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderPriority(btn.getAttribute('data-pos'));
    });
    renderPriority('WR');
  }

  /* ── Compare Profile Tool ──────────────────────────────── */
  var compareBenchmarks = {
    WR:  {forty:[4.25,4.75], ten:[1.45,1.65], vert:[30,42], broad:[115,132], bench:[10,27], shuttle:[3.95,4.45]},
    DB:  {forty:[4.30,4.75], ten:[1.45,1.65], vert:[32,42], broad:[118,134], bench:[10,22], shuttle:[3.95,4.35]},
    RB:  {forty:[4.30,4.70], ten:[1.46,1.64], vert:[30,40], broad:[115,130], bench:[14,28], shuttle:[4.00,4.45]},
    LB:  {forty:[4.40,4.90], ten:[1.50,1.72], vert:[28,40], broad:[112,128], bench:[18,34], shuttle:[4.05,4.55]},
    OL:  {forty:[4.80,5.60], ten:[1.60,1.90], vert:[22,34], broad:[96,118], bench:[20,38], shuttle:[4.30,5.00]},
    DL:  {forty:[4.50,5.20], ten:[1.52,1.82], vert:[26,38], broad:[104,124], bench:[20,38], shuttle:[4.10,4.70]}
  };

  var ppfTopMarks = {
    WR:  {forty:4.29, ten:1.48, vert:39.5, broad:128, bench:30, shuttle:4.05},
    DB:  {forty:4.38, ten:1.50, vert:38,   broad:126, bench:22, shuttle:4.02},
    RB:  {forty:4.35, ten:1.49, vert:37,   broad:124, bench:26, shuttle:4.10},
    LB:  {forty:4.48, ten:1.54, vert:36,   broad:122, bench:30, shuttle:4.15},
    OL:  {forty:5.05, ten:1.72, vert:30,   broad:108, bench:34, shuttle:4.55},
    DL:  {forty:4.72, ten:1.60, vert:33.5, broad:116, bench:34, shuttle:4.30}
  };

  var compareRunBtn = document.getElementById('pi-compare-run');
  var compareResult = document.getElementById('pi-compare-result');
  var compareBarsEl = document.getElementById('pi-compare-bars');
  var radarCanvas = document.getElementById('pi-radar-canvas');

  if(compareRunBtn){
    compareRunBtn.addEventListener('click', function(){
      var pos = document.getElementById('pi-compare-pos').value;
      var bench = compareBenchmarks[pos];
      var top = ppfTopMarks[pos];
      var inputs = document.querySelectorAll('#pi-compare-inputs input');
      var userData = {};
      var hasData = false;

      inputs.forEach(function(inp){
        var key = inp.getAttribute('data-metric');
        var val = parseFloat(inp.value);
        if(!isNaN(val)){
          userData[key] = val;
          hasData = true;
        }
      });

      if(!hasData){
        compareResult.style.display = 'none';
        return;
      }

      compareResult.style.display = 'block';

      var metrics = ['forty','ten','vert','broad','bench','shuttle'];
      var labels = ['40-Yard','10-Split','Vertical','Broad','Bench','Shuttle'];
      var inverted = {forty:true, ten:true, shuttle:true};

      /* Bar comparison */
      var barsHTML = '';
      var userScores = [];
      var benchScores = [];

      metrics.forEach(function(key, i){
        var range = bench[key];
        var mn = range[0], mx = range[1];
        var userVal = userData[key];
        var topVal = top[key];

        var userPct = 0, topPct = 0;
        if(inverted[key]){
          if(userVal !== undefined) userPct = Math.max(0, Math.min(100, ((mx - userVal) / (mx - mn)) * 100));
          topPct = Math.max(0, Math.min(100, ((mx - topVal) / (mx - mn)) * 100));
        } else {
          if(userVal !== undefined) userPct = Math.max(0, Math.min(100, ((userVal - mn) / (mx - mn)) * 100));
          topPct = Math.max(0, Math.min(100, ((topVal - mn) / (mx - mn)) * 100));
        }

        userScores.push(userVal !== undefined ? userPct : 0);
        benchScores.push(topPct);

        var displayVal = userVal !== undefined ? userVal : '—';
        barsHTML +=
          '<div class="pi-compare-bar-row">' +
            '<div class="pi-compare-bar-label">' + labels[i] + '</div>' +
            '<div class="pi-compare-bar-track">' +
              '<div class="pi-compare-bar-fill benchmark" style="width:' + topPct + '%"></div>' +
              (userVal !== undefined ? '<div class="pi-compare-bar-fill user" style="width:0%"></div>' : '') +
            '</div>' +
            '<div class="pi-compare-bar-val">' + displayVal + '</div>' +
          '</div>';
      });

      compareBarsEl.innerHTML = barsHTML;

      /* Animate bars in */
      setTimeout(function(){
        compareBarsEl.querySelectorAll('.pi-compare-bar-fill.user').forEach(function(bar, i){
          bar.style.width = userScores[i] + '%';
        });
      }, 50);

      /* Radar chart */
      if(radarCanvas){
        drawRadar(radarCanvas, labels, userScores, benchScores);
      }
    });
  }

  function drawRadar(canvas, labels, userData, benchData){
    var ctx = canvas.getContext('2d');
    var size = canvas.width;
    var cx = size / 2, cy = size / 2;
    var radius = size * 0.36;
    var n = labels.length;
    var angleStep = (Math.PI * 2) / n;
    var startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, size, size);

    /* Grid rings */
    for(var ring = 1; ring <= 5; ring++){
      var r = (radius / 5) * ring;
      ctx.beginPath();
      for(var j = 0; j <= n; j++){
        var angle = startAngle + j * angleStep;
        var x = cx + Math.cos(angle) * r;
        var y = cy + Math.sin(angle) * r;
        if(j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.04 + ring * 0.02) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    /* Axes */
    for(var k = 0; k < n; k++){
      var angle = startAngle + k * angleStep;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.stroke();

      /* Labels */
      var lx = cx + Math.cos(angle) * (radius + 18);
      var ly = cy + Math.sin(angle) * (radius + 18);
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[k], lx, ly);
    }

    /* Benchmark shape */
    ctx.beginPath();
    for(var m = 0; m < n; m++){
      var bAngle = startAngle + m * angleStep;
      var bR = (benchData[m] / 100) * radius;
      var bx = cx + Math.cos(bAngle) * bR;
      var by = cy + Math.sin(bAngle) * bR;
      if(m === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* User shape */
    ctx.beginPath();
    for(var u = 0; u < n; u++){
      var uAngle = startAngle + u * angleStep;
      var uR = (userData[u] / 100) * radius;
      var ux = cx + Math.cos(uAngle) * uR;
      var uy = cy + Math.sin(uAngle) * uR;
      if(u === 0) ctx.moveTo(ux, uy); else ctx.lineTo(ux, uy);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,106,0,.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,106,0,.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* User dots */
    for(var d = 0; d < n; d++){
      var dAngle = startAngle + d * angleStep;
      var dR = (userData[d] / 100) * radius;
      var dx = cx + Math.cos(dAngle) * dR;
      var dy = cy + Math.sin(dAngle) * dR;
      ctx.beginPath();
      ctx.arc(dx, dy, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,106,0,.9)';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /* ── Micro-particle motion on metric cards ─────────────── */
  document.querySelectorAll('.pi-metric-card').forEach(function(card){
    card.addEventListener('mouseenter', function(){
      for(var p = 0; p < 6; p++){
        var particle = document.createElement('span');
        particle.className = 'pi-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 0.3) + 's';
        card.appendChild(particle);
        (function(el){
          setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 1200);
        })(particle);
      }
    });
  });

})();

/* ── Sound Toggle ────────────────────────────────────────── */
(function(){
  var toggle = document.getElementById('sound-toggle');
  if(!toggle) return;
  var soundOn = false;
  toggle.addEventListener('click', function(){
    soundOn = !soundOn;
    toggle.classList.toggle('active', soundOn);
  });
})();

/* ═══════════════════════════════════════════════════════════
   SIGNATURE CANVAS FX ENGINE
   6 unique performance-signature animations for metric cards
   ═══════════════════════════════════════════════════════════ */
(function(){
  var cards = document.querySelectorAll('.pi-metric-card');
  if(!cards.length) return;

  /* ── Utility helpers ──────────────────────────────────── */
  function rand(a,b){return a+Math.random()*(b-a)}
  function randInt(a,b){return Math.floor(rand(a,b+1))}
  function lerp(a,b,t){return a+(b-a)*t}
  function clamp(v,lo,hi){return v<lo?lo:v>hi?hi:v}
  function dist(x1,y1,x2,y2){var dx=x2-x1,dy=y2-y1;return Math.sqrt(dx*dx+dy*dy)}
  var TAU = Math.PI*2;

  /* ── Renderer registry ────────────────────────────────── */
  var Registry = {
    speed:    SpeedFX,
    vertical: VerticalFX,
    power:    PowerFX,
    ras:      RASFX,
    electric: ElectricFX,
    gravity:  GravityFX
  };

  /* ── Bootstrap each card ──────────────────────────────── */
  cards.forEach(function(card){
    var sig = card.getAttribute('data-signature');
    var fxDiv = card.querySelector('.pi-signature-fx');
    if(!fxDiv || !Registry[sig]) return;

    var cvs = document.createElement('canvas');
    cvs.className = 'pi-sig-canvas';
    fxDiv.appendChild(cvs);
    var ctx = cvs.getContext('2d');
    var Ctor = Registry[sig];
    var fx = new Ctor(ctx, cvs, card);
    var rafId = null, running = false, t0 = 0;

    function resize(){
      var r = Math.min(window.devicePixelRatio||1, 2);
      var w = card.offsetWidth, h = card.offsetHeight;
      cvs.width  = w*r; cvs.height = h*r;
      cvs.style.width = w+'px'; cvs.style.height = h+'px';
      ctx.setTransform(r,0,0,r,0,0);
      fx.w = w; fx.h = h;
    }

    function loop(ts){
      if(!running) return;
      var dt = Math.min(ts-t0, 50)/1000;
      t0 = ts;
      ctx.clearRect(0,0, cvs.width, cvs.height);
      ctx.save();
      fx.update(dt);
      fx.draw();
      ctx.restore();
      rafId = requestAnimationFrame(loop);
    }

    function start(){
      if(running) return;
      running = true;
      resize();
      fx.init();
      card.classList.add('pi-fx-active');
      t0 = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    function stop(){
      running = false;
      if(rafId) cancelAnimationFrame(rafId);
      card.classList.remove('pi-fx-active');
      card.classList.remove('pi-touch-active');
      fx.destroy();
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);

    /* Touch toggle */
    card.addEventListener('touchstart', function(e){
      e.preventDefault();
      if(running){stop();}
      else{card.classList.add('pi-touch-active'); start();}
    }, {passive:false});
  });

  /* ═══════════════════════════════════════════════════════
     1. SPEED FX — "Afterburner"
     Horizontal light streaks accelerate across the card
     with glowing tips and layered depth.
     ═══════════════════════════════════════════════════════ */
  function SpeedFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  SpeedFX.prototype.init = function(){
    this.time = 0;
    this.streaks = [];
    for(var i=0;i<24;i++) this.streaks.push(this._spawn(true));
    this.mach = {x:-20, opacity:0};
  };

  SpeedFX.prototype._spawn = function(scatter){
    return {
      x: scatter ? rand(-this.w*0.5, this.w) : rand(-200,-40),
      y: rand(4, this.h-4),
      vx: rand(220,900),
      len: rand(30,180),
      thick: rand(0.4,2.8),
      alpha: rand(0.06,0.45),
      hue: rand(15,42)
    };
  };

  SpeedFX.prototype.update = function(dt){
    this.time += dt;
    for(var i=0;i<this.streaks.length;i++){
      var s = this.streaks[i];
      s.vx += rand(10,60)*dt; /* accelerate */
      s.x += s.vx*dt;
      if(s.x-s.len > this.w) this.streaks[i] = this._spawn(false);
    }
    /* Mach cone appears briefly */
    this.mach.x += 600*dt;
    this.mach.opacity = this.mach.x < this.w*0.4
      ? clamp(this.mach.opacity+dt*3,0,0.12)
      : clamp(this.mach.opacity-dt*2,0,0.12);
  };

  SpeedFX.prototype.draw = function(){
    var ctx = this.ctx, w = this.w, h = this.h;
    /* Streaks */
    for(var i=0;i<this.streaks.length;i++){
      var s = this.streaks[i];
      var g = ctx.createLinearGradient(s.x-s.len, s.y, s.x, s.y);
      g.addColorStop(0,'rgba(255,106,0,0)');
      g.addColorStop(0.5,'hsla('+s.hue+',100%,55%,'+s.alpha*0.5+')');
      g.addColorStop(0.85,'hsla('+s.hue+',100%,70%,'+s.alpha+')');
      g.addColorStop(1,'rgba(255,255,255,'+s.alpha*0.7+')');
      ctx.beginPath(); ctx.strokeStyle=g; ctx.lineWidth=s.thick; ctx.lineCap='round';
      ctx.moveTo(s.x-s.len, s.y); ctx.lineTo(s.x, s.y); ctx.stroke();
    }
    /* Mach-cone V-shape */
    if(this.mach.opacity>0.01){
      var mx = clamp(this.mach.x,0,w);
      ctx.save(); ctx.globalAlpha = this.mach.opacity;
      ctx.beginPath(); ctx.moveTo(mx,h*0.5);
      ctx.lineTo(mx-80, h*0.5-60); ctx.lineTo(mx-80, h*0.5+60);
      ctx.closePath();
      var mg = ctx.createRadialGradient(mx,h*0.5,0, mx,h*0.5,90);
      mg.addColorStop(0,'rgba(255,200,100,0.3)');
      mg.addColorStop(1,'rgba(255,106,0,0)');
      ctx.fillStyle = mg; ctx.fill(); ctx.restore();
    }
    /* Ambient heat glow at trailing edge */
    var rg = ctx.createRadialGradient(w*0.85,h*0.5,0, w*0.85,h*0.5,w*0.45);
    rg.addColorStop(0,'rgba(255,106,0,0.04)');
    rg.addColorStop(1,'rgba(255,106,0,0)');
    ctx.fillStyle=rg; ctx.fillRect(0,0,w,h);
  };

  SpeedFX.prototype.destroy = function(){this.streaks=[];};

  /* ═══════════════════════════════════════════════════════
     2. VERTICAL FX — "Altitude Ascent"
     Rising measurement grid, climbing altitude bar,
     and anti-gravity luminous particles drifting upward.
     ═══════════════════════════════════════════════════════ */
  function VerticalFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  VerticalFX.prototype.init = function(){
    this.time = 0; this.barPct = 0;
    this.gridOffset = 0;
    this.particles = [];
    for(var i=0;i<18;i++) this.particles.push(this._spawn());
    this.ticks = [];
    for(var t=0;t<12;t++) this.ticks.push({y:t/12, label:(t*4)+'″', alpha:0});
  };

  VerticalFX.prototype._spawn = function(){
    return {
      x:rand(10,this.w-10), y:rand(0,this.h),
      vy:rand(-30,-80), vx:rand(-5,5),
      r:rand(1,3.5), alpha:rand(0.15,0.6),
      wobble: rand(0,TAU), wobbleSpd: rand(1,3)
    };
  };

  VerticalFX.prototype.update = function(dt){
    this.time += dt;
    this.barPct = clamp(this.barPct + dt*0.9, 0, 0.82); /* climb to ~39.5/48 */
    this.gridOffset = (this.gridOffset + 30*dt) % 20;
    for(var i=0;i<this.particles.length;i++){
      var p = this.particles[i];
      p.wobble += p.wobbleSpd*dt;
      p.x += p.vx*dt + Math.sin(p.wobble)*0.3;
      p.y += p.vy*dt;
      if(p.y < -10) this.particles[i] = this._spawn();
      if(this.particles[i] === p) this.particles[i].y = p.y;
      else this.particles[i].y = this.h + 5;
    }
    for(var j=0;j<this.ticks.length;j++){
      var tgt = (j/12 < this.barPct) ? 0.7 : 0.1;
      this.ticks[j].alpha = lerp(this.ticks[j].alpha, tgt, dt*3);
    }
  };

  VerticalFX.prototype.draw = function(){
    var ctx=this.ctx, w=this.w, h=this.h;
    /* Rising grid lines */
    ctx.save(); ctx.globalAlpha = 0.06;
    ctx.strokeStyle = 'rgba(255,106,0,1)'; ctx.lineWidth = 0.5;
    for(var gy = -20 + this.gridOffset; gy < h; gy += 20){
      ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(w,gy); ctx.stroke();
    }
    ctx.restore();

    /* Altitude bar on left edge */
    var barW = 4, barH = h*this.barPct;
    var bg = ctx.createLinearGradient(0, h, 0, h-barH);
    bg.addColorStop(0,'rgba(255,106,0,0.6)');
    bg.addColorStop(0.7,'rgba(255,170,50,0.4)');
    bg.addColorStop(1,'rgba(255,255,255,0.15)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, h-barH, barW, barH);
    /* Bar glow */
    ctx.save(); ctx.globalAlpha = 0.3;
    ctx.shadowColor = 'rgba(255,106,0,0.8)'; ctx.shadowBlur = 10;
    ctx.fillRect(0, h-barH, barW, 3); ctx.restore();

    /* Tick marks */
    ctx.font = '600 9px system-ui, sans-serif';
    for(var t=0;t<this.ticks.length;t++){
      var tk = this.ticks[t];
      var ty = h - (tk.y*h);
      ctx.save(); ctx.globalAlpha = tk.alpha;
      ctx.fillStyle = '#ff8c3a';
      ctx.fillRect(0, ty, 12, 0.5);
      ctx.fillText(tk.label, 14, ty+3);
      ctx.restore();
    }

    /* Floating luminous particles */
    for(var i=0;i<this.particles.length;i++){
      var p = this.particles[i];
      ctx.save(); ctx.globalAlpha = p.alpha * clamp((h-p.y)/h,0,1);
      var pg = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
      pg.addColorStop(0,'rgba(255,180,80,0.8)');
      pg.addColorStop(0.5,'rgba(255,106,0,0.3)');
      pg.addColorStop(1,'rgba(255,106,0,0)');
      ctx.fillStyle = pg;
      ctx.fillRect(p.x-p.r*3,p.y-p.r*3,p.r*6,p.r*6);
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,TAU);
      ctx.fillStyle = 'rgba(255,220,180,0.9)'; ctx.fill();
      ctx.restore();
    }
  };

  VerticalFX.prototype.destroy = function(){this.particles=[];this.barPct=0;};

  /* ═══════════════════════════════════════════════════════
     3. POWER FX — "Seismic Heartbeat"
     Concentric shockwave rings pulse rhythmically from
     center. Equalizer bars vibrate. Ground rumble.
     ═══════════════════════════════════════════════════════ */
  function PowerFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  PowerFX.prototype.init = function(){
    this.time = 0; this.pulseTimer = 0;
    this.rings = [];
    this.bars = [];
    for(var i=0;i<16;i++){
      this.bars.push({x:0, h:rand(5,20), target:rand(5,25), speed:rand(3,8)});
    }
    this.debris = [];
  };

  PowerFX.prototype.update = function(dt){
    this.time += dt;
    this.pulseTimer += dt;
    /* New ring every beat */
    if(this.pulseTimer > 0.65){
      this.pulseTimer = 0;
      this.rings.push({r:0, maxR:Math.max(this.w,this.h)*0.9, alpha:0.5, speed:rand(180,280)});
      /* Debris burst */
      for(var d=0;d<8;d++){
        var ang = rand(0,TAU);
        this.debris.push({
          x:this.w*0.5, y:this.h*0.5,
          vx:Math.cos(ang)*rand(40,120), vy:Math.sin(ang)*rand(40,120),
          life:1, decay:rand(0.8,1.5), r:rand(1,2.5)
        });
      }
    }
    /* Update rings */
    for(var i=this.rings.length-1;i>=0;i--){
      var rn = this.rings[i];
      rn.r += rn.speed*dt;
      rn.alpha = clamp(0.5*(1 - rn.r/rn.maxR),0,0.5);
      if(rn.r > rn.maxR) this.rings.splice(i,1);
    }
    /* Equalizer bars */
    for(var b=0;b<this.bars.length;b++){
      var bar = this.bars[b];
      bar.h = lerp(bar.h, bar.target, bar.speed*dt);
      if(Math.abs(bar.h - bar.target)<1) bar.target = rand(4,30 + Math.sin(this.time*5)*10);
    }
    /* Debris */
    for(var j=this.debris.length-1;j>=0;j--){
      var db = this.debris[j];
      db.x += db.vx*dt; db.y += db.vy*dt;
      db.vy += 60*dt; /* gravity */
      db.life -= db.decay*dt;
      if(db.life<=0) this.debris.splice(j,1);
    }
  };

  PowerFX.prototype.draw = function(){
    var ctx=this.ctx, w=this.w, h=this.h, cx=w*0.5, cy=h*0.5;

    /* Shockwave rings */
    for(var i=0;i<this.rings.length;i++){
      var rn = this.rings[i];
      ctx.save(); ctx.globalAlpha = rn.alpha;
      ctx.beginPath(); ctx.arc(cx,cy,rn.r,0,TAU);
      ctx.strokeStyle = 'rgba(255,106,0,0.7)'; ctx.lineWidth = 2;
      ctx.stroke();
      /* Inner glow ring */
      ctx.beginPath(); ctx.arc(cx,cy,rn.r*0.95,0,TAU);
      ctx.strokeStyle = 'rgba(255,180,100,0.3)'; ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    }

    /* Center pulse glow */
    var pulse = 0.5 + 0.5*Math.sin(this.time * TAU / 0.65);
    ctx.save(); ctx.globalAlpha = 0.08 + pulse*0.06;
    var cg = ctx.createRadialGradient(cx,cy,0,cx,cy,60);
    cg.addColorStop(0,'rgba(255,106,0,0.5)');
    cg.addColorStop(1,'rgba(255,106,0,0)');
    ctx.fillStyle = cg; ctx.fillRect(cx-60,cy-60,120,120);
    ctx.restore();

    /* Equalizer bars at bottom */
    var barW = (w-32)/ this.bars.length;
    ctx.save();
    for(var b=0;b<this.bars.length;b++){
      var bar = this.bars[b];
      var bx = 16 + b*barW;
      var bh = bar.h;
      var bbg = ctx.createLinearGradient(bx, h, bx, h-bh);
      bbg.addColorStop(0,'rgba(255,106,0,0.35)');
      bbg.addColorStop(1,'rgba(255,106,0,0.05)');
      ctx.fillStyle = bbg;
      ctx.fillRect(bx+1, h-bh, barW-2, bh);
    }
    ctx.restore();

    /* Debris particles */
    for(var j=0;j<this.debris.length;j++){
      var db = this.debris[j];
      ctx.save(); ctx.globalAlpha = db.life*0.7;
      ctx.beginPath(); ctx.arc(db.x,db.y,db.r,0,TAU);
      ctx.fillStyle='rgba(255,150,50,0.8)'; ctx.fill(); ctx.restore();
    }
  };

  PowerFX.prototype.destroy = function(){this.rings=[];this.debris=[];};

  /* ═══════════════════════════════════════════════════════
     4. RAS FX — "Scoring Arc"
     Circular arc fills clockwise to 97.8%.
     Tick segments light up. Radar sweep. Inner rings.
     ═══════════════════════════════════════════════════════ */
  function RASFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  RASFX.prototype.init = function(){
    this.time = 0; this.arcPct = 0;
    this.sweepAngle = -Math.PI*0.5;
    this.trailParticles = [];
    this.innerPulse = 0;
    this.segments = [];
    for(var i=0;i<10;i++) this.segments.push({lit:false, alpha:0});
  };

  RASFX.prototype.update = function(dt){
    this.time += dt;
    this.arcPct = clamp(this.arcPct + dt*0.7, 0, 0.978);
    this.sweepAngle += dt*1.8;
    this.innerPulse = 0.3 + 0.2*Math.sin(this.time*3);

    /* Light up segments as arc fills */
    for(var i=0;i<10;i++){
      var segPct = (i+1)/10;
      var lit = segPct <= this.arcPct;
      this.segments[i].lit = lit;
      var tgt = lit ? 0.7 : 0.08;
      this.segments[i].alpha = lerp(this.segments[i].alpha, tgt, dt*4);
    }

    /* Trail particles at arc head */
    if(this.arcPct < 0.978){
      var a = -Math.PI*0.5 + this.arcPct*TAU;
      this.trailParticles.push({
        x: 0, y: 0, angle: a,
        r: rand(0.5,2), life: 1, decay: rand(1.5,3),
        drift: rand(-8,8)
      });
    }
    for(var j=this.trailParticles.length-1;j>=0;j--){
      this.trailParticles[j].life -= this.trailParticles[j].decay*dt;
      if(this.trailParticles[j].life<=0) this.trailParticles.splice(j,1);
    }
  };

  RASFX.prototype.draw = function(){
    var ctx=this.ctx, w=this.w, h=this.h;
    var cx=w*0.5, cy=h*0.5;
    var R = Math.min(w,h)*0.38;
    var startA = -Math.PI*0.5;
    var endA = startA + this.arcPct*TAU;

    /* Outer scoring arc */
    ctx.save();
    ctx.lineCap = 'round';

    /* Background ring */
    ctx.beginPath(); ctx.arc(cx,cy,R,0,TAU);
    ctx.strokeStyle = 'rgba(255,106,0,0.06)'; ctx.lineWidth=4;
    ctx.stroke();

    /* Filled arc */
    if(this.arcPct > 0.001){
      ctx.beginPath(); ctx.arc(cx,cy,R,startA,endA);
      var ag = ctx.createLinearGradient(cx-R,cy,cx+R,cy);
      ag.addColorStop(0,'rgba(255,106,0,0.7)');
      ag.addColorStop(0.5,'rgba(255,170,50,0.8)');
      ag.addColorStop(1,'rgba(255,220,100,0.9)');
      ctx.strokeStyle = ag; ctx.lineWidth = 4; ctx.stroke();

      /* Arc head glow */
      var hx = cx + R*Math.cos(endA), hy = cy + R*Math.sin(endA);
      var hg = ctx.createRadialGradient(hx,hy,0,hx,hy,12);
      hg.addColorStop(0,'rgba(255,200,100,0.6)');
      hg.addColorStop(1,'rgba(255,106,0,0)');
      ctx.fillStyle = hg; ctx.fillRect(hx-12,hy-12,24,24);
    }

    /* Segment tick marks */
    for(var i=0;i<10;i++){
      var seg = this.segments[i];
      var a = startA + ((i+0.5)/10)*TAU;
      var tx1 = cx + (R-10)*Math.cos(a), ty1 = cy + (R-10)*Math.sin(a);
      var tx2 = cx + (R+6)*Math.cos(a), ty2 = cy + (R+6)*Math.sin(a);
      ctx.save(); ctx.globalAlpha = seg.alpha;
      ctx.beginPath(); ctx.moveTo(tx1,ty1); ctx.lineTo(tx2,ty2);
      ctx.strokeStyle = seg.lit ? 'rgba(255,180,50,0.9)' : 'rgba(255,106,0,0.4)';
      ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    }

    /* Inner concentric rings pulse */
    for(var ring=1;ring<=3;ring++){
      ctx.save(); ctx.globalAlpha = this.innerPulse * (0.12 / ring);
      ctx.beginPath(); ctx.arc(cx,cy,R*(0.3+ring*0.15),0,TAU);
      ctx.strokeStyle = 'rgba(255,170,50,1)'; ctx.lineWidth=0.5; ctx.stroke();
      ctx.restore();
    }

    /* Radar sweep line */
    var sweepEndX = cx + R*1.05*Math.cos(this.sweepAngle);
    var sweepEndY = cy + R*1.05*Math.sin(this.sweepAngle);
    ctx.save(); ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(sweepEndX,sweepEndY);
    ctx.strokeStyle = 'rgba(255,200,100,1)'; ctx.lineWidth=1; ctx.stroke();
    ctx.restore();

    /* Trail particles */
    for(var j=0;j<this.trailParticles.length;j++){
      var tp = this.trailParticles[j];
      var px = cx + (R+tp.drift)*Math.cos(tp.angle);
      var py = cy + (R+tp.drift)*Math.sin(tp.angle);
      ctx.save(); ctx.globalAlpha = tp.life*0.5;
      ctx.beginPath(); ctx.arc(px,py,tp.r,0,TAU);
      ctx.fillStyle='rgba(255,200,120,0.9)'; ctx.fill(); ctx.restore();
    }

    /* Center glow when near complete */
    if(this.arcPct > 0.9){
      var cIntensity = (this.arcPct-0.9)/0.078;
      ctx.save(); ctx.globalAlpha = cIntensity * 0.08;
      var cgg = ctx.createRadialGradient(cx,cy,0,cx,cy,R*0.4);
      cgg.addColorStop(0,'rgba(255,200,80,1)');
      cgg.addColorStop(1,'rgba(255,106,0,0)');
      ctx.fillStyle=cgg; ctx.fillRect(cx-R*0.4,cy-R*0.4,R*0.8,R*0.8);
      ctx.restore();
    }

    ctx.restore();
  };

  RASFX.prototype.destroy = function(){this.trailParticles=[];this.arcPct=0;};

  /* ═══════════════════════════════════════════════════════
     5. ELECTRIC FX — "Lightning Storm"
     Branching lightning bolts crackle across the card.
     Spark particles. Initial flash. Electric static.
     ═══════════════════════════════════════════════════════ */
  function ElectricFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  ElectricFX.prototype.init = function(){
    this.time = 0; this.boltTimer = 0; this.flashAlpha = 0.35;
    this.bolts = [];
    this.sparks = [];
    this.staticNoise = [];
    /* Initial bolt */
    this._spawnBolt();
  };

  ElectricFX.prototype._spawnBolt = function(){
    var w=this.w, h=this.h;
    /* Start from random edge */
    var side = randInt(0,3);
    var sx,sy,ex,ey;
    if(side===0){sx=0;sy=rand(h*0.2,h*0.8);ex=w;ey=rand(h*0.2,h*0.8);}
    else if(side===1){sx=w;sy=rand(h*0.2,h*0.8);ex=0;ey=rand(h*0.2,h*0.8);}
    else if(side===2){sx=rand(w*0.2,w*0.8);sy=0;ex=rand(w*0.2,w*0.8);ey=h;}
    else{sx=rand(w*0.2,w*0.8);sy=h;ex=rand(w*0.2,w*0.8);ey=0;}
    var points = this._buildBolt(sx,sy,ex,ey,6);
    this.bolts.push({points:points, life:1, decay:rand(1.2,2.5), width:rand(1.5,3)});

    /* Branch bolts */
    if(points.length > 4){
      var bIdx = randInt(2, Math.min(points.length-2, 6));
      var bp = points[bIdx];
      var bex = bp[0]+rand(-80,80), bey = bp[1]+rand(-80,80);
      var bPoints = this._buildBolt(bp[0],bp[1],bex,bey,3);
      this.bolts.push({points:bPoints, life:0.8, decay:rand(2,4), width:rand(0.8,1.8)});
    }

    /* Sparks at endpoints */
    for(var s=0;s<12;s++){
      var ang = rand(0,TAU);
      this.sparks.push({
        x:ex, y:ey, vx:Math.cos(ang)*rand(30,150), vy:Math.sin(ang)*rand(30,150),
        life:1, decay:rand(2,5), r:rand(0.5,2)
      });
    }
  };

  ElectricFX.prototype._buildBolt = function(sx,sy,ex,ey,segments){
    var pts = [[sx,sy]];
    var dx=(ex-sx)/segments, dy=(ey-sy)/segments;
    for(var i=1;i<segments;i++){
      var jitter = 20 + (segments-i)*5;
      pts.push([sx+dx*i+rand(-jitter,jitter), sy+dy*i+rand(-jitter,jitter)]);
    }
    pts.push([ex,ey]);
    return pts;
  };

  ElectricFX.prototype.update = function(dt){
    this.time += dt;
    this.boltTimer += dt;
    this.flashAlpha = clamp(this.flashAlpha - dt*2, 0, 0.35);

    /* New bolt periodically */
    if(this.boltTimer > rand(0.3,0.7)){
      this.boltTimer = 0;
      this._spawnBolt();
      this.flashAlpha = 0.12;
    }

    /* Decay bolts */
    for(var i=this.bolts.length-1;i>=0;i--){
      this.bolts[i].life -= this.bolts[i].decay*dt;
      if(this.bolts[i].life<=0) this.bolts.splice(i,1);
    }

    /* Sparks */
    for(var j=this.sparks.length-1;j>=0;j--){
      var sp = this.sparks[j];
      sp.x += sp.vx*dt; sp.y += sp.vy*dt;
      sp.vy += 40*dt;
      sp.life -= sp.decay*dt;
      if(sp.life<=0) this.sparks.splice(j,1);
    }

    /* Static noise */
    if(Math.random()<0.3){
      this.staticNoise.push({
        x:rand(0,this.w), y:rand(0,this.h),
        w:rand(2,30), h:rand(0.5,1.5), life:1, decay:rand(6,12)
      });
    }
    for(var k=this.staticNoise.length-1;k>=0;k--){
      this.staticNoise[k].life -= this.staticNoise[k].decay*dt;
      if(this.staticNoise[k].life<=0) this.staticNoise.splice(k,1);
    }
  };

  ElectricFX.prototype.draw = function(){
    var ctx=this.ctx, w=this.w, h=this.h;

    /* Flash overlay */
    if(this.flashAlpha>0.005){
      ctx.save(); ctx.globalAlpha = this.flashAlpha;
      ctx.fillStyle = 'rgba(180,200,255,1)';
      ctx.fillRect(0,0,w,h); ctx.restore();
    }

    /* Lightning bolts */
    for(var i=0;i<this.bolts.length;i++){
      var b = this.bolts[i];
      /* Core bolt */
      ctx.save(); ctx.globalAlpha = b.life;
      ctx.beginPath();
      ctx.moveTo(b.points[0][0], b.points[0][1]);
      for(var p=1;p<b.points.length;p++){
        ctx.lineTo(b.points[p][0], b.points[p][1]);
      }
      ctx.strokeStyle = 'rgba(180,200,255,0.9)'; ctx.lineWidth = b.width;
      ctx.shadowColor = 'rgba(100,150,255,0.6)'; ctx.shadowBlur = 8;
      ctx.stroke();

      /* Glow layer */
      ctx.beginPath();
      ctx.moveTo(b.points[0][0], b.points[0][1]);
      for(var q=1;q<b.points.length;q++){
        ctx.lineTo(b.points[q][0], b.points[q][1]);
      }
      ctx.strokeStyle = 'rgba(255,106,0,0.4)'; ctx.lineWidth = b.width*3;
      ctx.shadowColor = 'rgba(255,106,0,0.3)'; ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }

    /* Sparks */
    for(var j=0;j<this.sparks.length;j++){
      var sp = this.sparks[j];
      ctx.save(); ctx.globalAlpha = sp.life;
      ctx.beginPath(); ctx.arc(sp.x,sp.y,sp.r,0,TAU);
      ctx.fillStyle = 'rgba(200,220,255,0.9)'; ctx.fill();
      ctx.restore();
    }

    /* Static noise lines */
    for(var k=0;k<this.staticNoise.length;k++){
      var sn = this.staticNoise[k];
      ctx.save(); ctx.globalAlpha = sn.life*0.15;
      ctx.fillStyle = 'rgba(180,200,255,1)';
      ctx.fillRect(sn.x, sn.y, sn.w, sn.h);
      ctx.restore();
    }
  };

  ElectricFX.prototype.destroy = function(){this.bolts=[];this.sparks=[];this.staticNoise=[];};

  /* ═══════════════════════════════════════════════════════
     6. GRAVITY FX — "Mass Field"
     Particles orbit and spiral inward toward a central
     gravity well. Concentric force rings contract.
     Gravitational lensing distortion.
     ═══════════════════════════════════════════════════════ */
  function GravityFX(ctx,cvs,card){this.ctx=ctx;this.cvs=cvs;this.card=card;this.w=0;this.h=0;}

  GravityFX.prototype.init = function(){
    this.time = 0;
    this.particles = [];
    var cx=this.w*0.5, cy=this.h*0.5;
    for(var i=0;i<30;i++){
      var ang = rand(0,TAU);
      var orbitR = rand(30,Math.min(this.w,this.h)*0.48);
      this.particles.push({
        angle: ang, orbitR: orbitR, startR: orbitR,
        speed: rand(0.5,2) * (Math.random()>0.5?1:-1),
        r: rand(1,3), alpha: rand(0.2,0.7),
        spiralRate: rand(3,12)
      });
    }
    this.forceRings = [];
    for(var j=0;j<5;j++){
      this.forceRings.push({r: 20+j*25, targetR: 20+j*25, alpha:0.15-j*0.02});
    }
    this.coreGlow = 0;
  };

  GravityFX.prototype.update = function(dt){
    this.time += dt;
    this.coreGlow = 0.1 + 0.05*Math.sin(this.time*2);

    for(var i=this.particles.length-1;i>=0;i--){
      var p = this.particles[i];
      p.angle += p.speed*dt;
      p.orbitR -= p.spiralRate*dt;
      if(p.orbitR < 3){
        /* Reset particle to outer edge */
        p.orbitR = p.startR;
        p.angle = rand(0,TAU);
      }
    }

    /* Contracting force rings */
    for(var j=0;j<this.forceRings.length;j++){
      var fr = this.forceRings[j];
      fr.r -= 15*dt;
      if(fr.r < 8){
        fr.r = fr.targetR + 10;
      }
    }
  };

  GravityFX.prototype.draw = function(){
    var ctx=this.ctx, w=this.w, h=this.h, cx=w*0.5, cy=h*0.5;

    /* Dark gravitational well center */
    ctx.save();
    var dg = ctx.createRadialGradient(cx,cy,0,cx,cy,40);
    dg.addColorStop(0,'rgba(0,0,0,0.3)');
    dg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = dg; ctx.fillRect(cx-40,cy-40,80,80);
    ctx.restore();

    /* Force field rings (contracting) */
    for(var j=0;j<this.forceRings.length;j++){
      var fr = this.forceRings[j];
      ctx.save(); ctx.globalAlpha = fr.alpha * clamp(fr.r/fr.targetR,0.2,1);
      ctx.beginPath(); ctx.arc(cx,cy,fr.r,0,TAU);
      ctx.strokeStyle = 'rgba(255,106,0,0.5)'; ctx.lineWidth = 0.8;
      ctx.setLineDash([3,5]); ctx.stroke();
      ctx.restore();
    }

    /* Orbiting particles with trails */
    for(var i=0;i<this.particles.length;i++){
      var p = this.particles[i];
      var px = cx + p.orbitR*Math.cos(p.angle);
      var py = cy + p.orbitR*Math.sin(p.angle);
      var closeness = 1 - clamp(p.orbitR/p.startR,0,1);

      /* Trail (small arc behind particle) */
      ctx.save();
      ctx.globalAlpha = p.alpha * 0.3 * (1+closeness);
      ctx.beginPath();
      var trailAng = p.speed > 0 ? -0.3 : 0.3;
      ctx.arc(cx,cy,p.orbitR, p.angle+trailAng, p.angle);
      ctx.strokeStyle = 'rgba(255,150,50,0.6)';
      ctx.lineWidth = p.r*0.8; ctx.stroke(); ctx.restore();

      /* Particle dot */
      ctx.save();
      var pAlpha = p.alpha * (0.5 + closeness*0.5);
      ctx.globalAlpha = pAlpha;
      ctx.beginPath(); ctx.arc(px,py,p.r*(1+closeness*0.5),0,TAU);
      ctx.fillStyle = closeness > 0.7
        ? 'rgba(255,220,150,0.9)'
        : 'rgba(255,140,50,0.8)';
      ctx.fill();
      /* Glow */
      if(closeness > 0.5){
        var gg = ctx.createRadialGradient(px,py,0,px,py,p.r*4);
        gg.addColorStop(0,'rgba(255,180,80,0.3)');
        gg.addColorStop(1,'rgba(255,106,0,0)');
        ctx.fillStyle=gg; ctx.fillRect(px-p.r*4,py-p.r*4,p.r*8,p.r*8);
      }
      ctx.restore();
    }

    /* Core accretion glow */
    ctx.save(); ctx.globalAlpha = this.coreGlow;
    var cg = ctx.createRadialGradient(cx,cy,0,cx,cy,20);
    cg.addColorStop(0,'rgba(255,180,60,0.7)');
    cg.addColorStop(0.5,'rgba(255,106,0,0.3)');
    cg.addColorStop(1,'rgba(255,106,0,0)');
    ctx.fillStyle = cg; ctx.fillRect(cx-20,cy-20,40,40);
    ctx.restore();

    /* Compression lines (horizontal, heavier near center) */
    ctx.save(); ctx.globalAlpha = 0.04;
    ctx.strokeStyle = 'rgba(255,106,0,1)'; ctx.lineWidth = 0.5;
    for(var cl=0;cl<8;cl++){
      var cly = cy + (cl-3.5)*12;
      var squeeze = 1 - Math.abs(cl-3.5)/4;
      ctx.globalAlpha = 0.03 + squeeze*0.04;
      ctx.beginPath(); ctx.moveTo(cx-50*squeeze,cly); ctx.lineTo(cx+50*squeeze,cly);
      ctx.stroke();
    }
    ctx.restore();
  };

  GravityFX.prototype.destroy = function(){this.particles=[];};

})();
