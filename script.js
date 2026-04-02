/* ═══════════════════════════════════════════════════════════
   PPF Athletics — Enhanced Interactive JavaScript
   script.js
   ═══════════════════════════════════════════════════════════ */

/* ── Preloader ───────────────────────────────────────────── */
(function(){
  const preloader = document.querySelector('.preloader');
  const bar = document.querySelector('.preloader-bar span');
  if(!preloader) return;
  let progress = 0;
  const tick = setInterval(()=>{
    progress += Math.random()*18 + 8;
    if(progress > 100) progress = 100;
    if(bar) bar.style.width = progress + '%';
    if(progress >= 100){
      clearInterval(tick);
      setTimeout(()=> preloader.classList.add('done'), 300);
    }
  },120);
  window.addEventListener('load',()=>{
    progress = 100;
    if(bar) bar.style.width = '100%';
    setTimeout(()=> preloader.classList.add('done'), 400);
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
  var cards = document.querySelectorAll('.athlete-card, .system-card, .metric-card, .quote-card, .stat, .service-card, .combine-note, .leader-card');
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
