(function(){
  const body  = document.getElementById('termBody');
  const input = document.getElementById('termInput');
  const PROMPT = 'nicholas@portfolio:~$ ';

  function line(type, html) {
    const el = document.createElement('div');
    el.className = 'tline tline--' + type;
    el.innerHTML = html;
    return el;
  }
  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function jk(s){ return '<span class="jk">"' + s + '"</span>'; }
  function jv(s){ return '<span class="jv">"' + s + '"</span>'; }
  function ja(arr){ return '<span class="jv">[' + arr.map(a=>'"'+a+'"').join(', ') + ']</span>'; }

  const COMMANDS = {

    whoami: () => [
      line('out', 'Nicholas Kubbutat — Umschüler Fachinformatiker Anwendungsentwicklung'),
      line('out', 'Standort: Karlsruhe · Verfügbar: sofort (Praktikum / Werkstudent)'),
      line('out', 'Kontakt:  nicholas.kubbutat@protonmail.com · 0152 53945125'),
    ],

    'cat profile.json': () => [
      line('json', '{'),
      line('json', '  '+jk('name')+':        '+jv('Nicholas Kubbutat')+','),
      line('json', '  '+jk('umschulung')+':  '+jv('Fachinformatiker AE — Lutz & Grub Academy, 09.2025 – aktuell')+','),
      line('json', '  '+jk('abschluss')+':   '+jv('voraussichtlich Q2 2027')+','),
      line('json', '  '+jk('fokus')+':       '+ja(['C# / WPF', 'SQL / ADO.NET', 'HTML/CSS/JS', 'Docker', 'Python'])+','),
      line('json', '  '+jk('homelab')+':     '+jv('Linux, Docker, Media-Server, Monitoring')+','),
      line('json', '  '+jk('interessen')+':  '+ja(['AI & agentische Systeme', 'Infrastruktur', 'Webdesign'])+','),
      line('json', '  '+jk('sprachen')+':    '+ja(['Deutsch (Muttersprache)', 'Englisch (B2)'])+','),
      line('json', '  '+jk('standort')+':    '+jv('Kolberger Straße 22C, 76139 Karlsruhe'),),
      line('json', '}'),
    ],

    'cat ausbildung.json': () => [
      line('json', '['),
      line('json', '  {'),
      line('json', '    '+jk('institution')+': '+jv('Lutz & Grub Academy')+','),
      line('json', '    '+jk('zeitraum')+':    '+jv('09.2025 – aktuell')+','),
      line('json', '    '+jk('abschluss')+':   '+jv('Fachinformatiker Anwendungsentwicklung')+','),
      line('json', '    '+jk('inhalte')+': '+ja(['C# & OOP: Klassen, Vererbung, Polymorphie, Events, Lambdas', 'WPF/XAML: Datenbindung, Controls, Layouts, Validierung', 'SQL / ADO.NET: Datenzugriff & Persistenz', 'Projektarbeit: Anforderung bis Deployment (Git/VS Code)'])),
      line('json', '  },'),
      line('json', '  { '+jk('institution')+': '+jv('TAC Office Marketing')+',       '+jk('zeitraum')+': '+jv('05–08/2025')+', '+jk('art')+': '+jv('Praktikum Mediengestaltung Digital')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('PH Karlsruhe')+',                '+jk('zeitraum')+': '+jv('2021–2022')+',  '+jk('studium')+': '+jv('Sport, Gesundheit, Freizeitbildung')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('Hochschule Zittau Görlitz')+',  '+jk('zeitraum')+': '+jv('2019–2020')+',  '+jk('studium')+': '+jv('Kultur und Management')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('TU Ilmenau')+',                  '+jk('zeitraum')+': '+jv('2017')+',        '+jk('studium')+': '+jv('Medien & Kommunikationswissenschaften')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('Kepler Gymnasium Freiburg')+',  '+jk('zeitraum')+': '+jv('2007–2015')+',  '+jk('abschluss')+': '+jv('Abitur')+' }'),
      line('json', ']'),
    ],

    'cat erfahrung.json': () => [
      line('json', '['),
      line('json', '  {'),
      line('json', '    '+jk('firma')+':     '+jv('Easy Ecommerce GbR')+','),
      line('json', '    '+jk('zeitraum')+': '+jv('10/2022 – 02/2025')+','),
      line('json', '    '+jk('rolle')+':    '+jv('Shopify Store Setup & Verwaltung')+','),
      line('json', '    '+jk('aufgaben')+': '+ja(['Store-Einrichtung & Verwaltung', 'Theme- & App-Konfiguration', 'Produktanlage & -pflege', 'Versandzonen & Shop-Einstellungen', 'Kundenkommunikation & Rechnungsstellung'])),
      line('json', '  },'),
      line('json', '  { '+jk('firma')+': '+jv('Teleperformance Görlitz')+',  '+jk('zeitraum')+': '+jv('06–09/2019')+', '+jk('rolle')+': '+jv('Call Center Agent')+' },'),
      line('json', '  {'),
      line('json', '    '+jk('firma')+':        '+jv('EOS-Erlebnispaedagogik e.V.')+','),
      line('json', '    '+jk('zeitraum')+':    '+jv('2018')+','),
      line('json', '    '+jk('rolle')+':       '+jv('Freiwilliges Soziales Jahr')+','),
      line('json', '    '+jk('highlights')+': '+ja(['Webdesign mit WordPress (Avada)', 'Google AdWords & AdSense Zertifikate', 'Google Impact Challenge gewonnen — Projekt: FSJ Integration'])),
      line('json', '  }'),
      line('json', ']'),
    ],

    'cat skills.json': () => [
      line('json', '{'),
      line('json', '  '+jk('programmierung')+': '+ja(['C#', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL'])+','),
      line('json', '  '+jk('frameworks')+':    '+ja(['WPF / XAML', 'ADO.NET'])+','),
      line('json', '  '+jk('tools')+':         '+ja(['Docker', 'Git', 'VS Code', 'Linux', 'WordPress (Avada)'])+','),
      line('json', '  '+jk('zertifikate')+':   '+ja(['Google AdWords', 'Google AdSense'])),
      line('json', '}'),
    ],

    'cat contact.json': () => [
      line('json', '{'),
      line('json', '  '+jk('name')+':     '+jv('Nicholas Kubbutat')+','),
      line('json', '  '+jk('email')+':    '+jv('nicholas.kubbutat@protonmail.com')+','),
      line('json', '  '+jk('telefon')+':  '+jv('0152 53945125')+','),
      line('json', '  '+jk('github')+':   '+jv('github.com/DoomSpiral97')+','),
      line('json', '  '+jk('adresse')+':  '+jv('Kolberger Straße 22C, 76139 Karlsruhe'),),
      line('json', '}'),
    ],

    help: () => [
      line('comment', '# Verfügbare Befehle:'),
      line('out', '  whoami               — wer ist Nicholas?'),
      line('out', '  cat profile.json     — Profil, Stack, Verfügbarkeit'),
      line('out', '  cat ausbildung.json  — vollständiger Bildungsweg'),
      line('out', '  cat erfahrung.json   — Berufserfahrung'),
      line('out', '  cat skills.json      — Fähigkeiten & Tools'),
      line('out', '  cat contact.json     — Kontaktdaten'),
      line('out', '  clear                — Terminal leeren'),
    ],

    clear: () => { body.innerHTML = ''; return []; },
  };

  function printPromptLine(cmd) {
    const el = document.createElement('div');
    el.className = 'tline tline--cmd';
    el.innerHTML = '<span class="tp">' + PROMPT + '</span><span class="tc">' + escHtml(cmd) + '</span>';
    body.appendChild(el);
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    printPromptLine(raw.trim());
    if (!cmd) { scrollBottom(); return; }
    const handler = COMMANDS[cmd];
    if (handler) {
      const lines = handler();
      lines.forEach(el => { if (el) body.appendChild(el); });
    } else {
      body.appendChild(line('err', 'Befehl nicht gefunden: ' + escHtml(cmd) + ' &nbsp;(Tipp: <span class="jv">help</span>)'));
    }
    scrollBottom();
  }

  function scrollBottom() {
    const t = document.querySelector('.terminal');
    if (t) t.scrollTop = t.scrollHeight;
  }

  function typewriter(text, onDone, speed = 40) {
    const el = document.createElement('div');
    el.className = 'tline tline--cmd';
    el.innerHTML = '<span class="tp">' + PROMPT + '</span><span class="tc" id="tw"></span>';
    body.appendChild(el);
    const tw = document.getElementById('tw');
    let i = 0;
    const iv = setInterval(() => {
      tw.textContent += text[i++];
      scrollBottom();
      if (i >= text.length) {
        clearInterval(iv);
        tw.removeAttribute('id');
        setTimeout(onDone, 360);
      }
    }, speed);
  }

  function autoRun(cmd, onDone) {
    typewriter(cmd, () => {
      const handler = COMMANDS[cmd];
      if (handler) {
        const lines = handler();
        lines.forEach(el => { if (el) body.appendChild(el); });
        scrollBottom();
      }
      setTimeout(onDone, 180);
    });
  }

  function boot() {
    body.appendChild(line('comment', '# Willkommen. Tippe <span class="jv">help</span> für alle Befehle.'));
    setTimeout(() => {
      autoRun('whoami', () => {
        setTimeout(() => {
          autoRun('cat profile.json', () => {});
        }, 500);
      });
    }, 600);
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  document.querySelector('.terminal').addEventListener('click', () => input.focus());

  boot();
  setTimeout(() => input.focus(), 2800);
})();
