(function(){
  const body  = document.getElementById('termBody');
  const input = document.getElementById('termInput');
  const PROMPT = 'leon@portfolio:~$ ';

  // ── Helpers ───────────────────────────────────────────────
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
  function ja(arr){ return '<span class="jv">[' + arr.map(a => '"'+a+'"').join(', ') + ']</span>'; }

  // ── Commands ──────────────────────────────────────────────
  const COMMANDS = {

    whoami: () => [
      line('out', 'Leon Weber — Umschüler Fachinformatiker Anwendungsentwicklung'),
      line('out', 'Standort: Karlsruhe · Verfügbar: sofort (Praktikum / Ausbildung)'),
    ],

    'cat profile.json': () => [
      line('json', '{'),
      line('json', '  '+jk('umschulung')+':   '+jv('Fachinformatiker AE — Lutz &amp; Grub Academy, 09.2025 – aktuell')+','),
      line('json', '  '+jk('abschluss')+':    '+jv('voraussichtlich Q2 2027')+','),
      line('json', '  '+jk('fokus')+':        '+ja(['C# / WPF', 'SQL / ADO.NET', 'HTML/CSS/JS', 'Docker', 'Python'])+','),
      line('json', '  '+jk('homelab')+':      '+jv('Linux, Container, Media-Server, Monitoring')+','),
      line('json', '  '+jk('interessen')+':   '+ja(['AI & agentische Systeme', 'Infrastruktur', 'Webdesign'])+','),
      line('json', '  '+jk('sprachen')+':     '+ja(['Deutsch (Muttersprache)', 'Englisch (B2'])+','),
      line('json', '  '+jk('standort')+':     '+jv('Karlsruhe, Baden-Württemberg'),),
      line('json', '}'),
    ],

    'cat ausbildung.json': () => [
      line('json', '['),
      line('json', '  {'),
      line('json', '    '+jk('institution')+': '+jv('Lutz &amp; Grub Academy')+','),
      line('json', '    '+jk('zeitraum')+':    '+jv('09.2025 – aktuell')+','),
      line('json', '    '+jk('abschluss')+':   '+jv('Fachinformatiker Anwendungsentwicklung')+','),
      line('json', '    '+jk('inhalte')+':     '+ja(['C# (Klassen, Vererbung, Polymorphie, Events, Lambdas)', 'WPF/XAML (Datenbindung, Controls, Layouts, Validierung)', 'SQL / ADO.NET', 'Python Grundlagen']),),
      line('json', '  },'),
      line('json', '  { '+jk('institution')+': '+jv('TAC Office Marketing')+', '+jk('zeitraum')+': '+jv('05/2025 – 08/2025')+', '+jk('art')+': '+jv('Praktikum Mediengestaltung Digital')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('PH Karlsruhe')+',           '+jk('zeitraum')+': '+jv('2021 – 2022')+', '+jk('studium')+': '+jv('Sport, Gesundheit, Freizeitbildung')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('HS Zittau Görlitz')+',      '+jk('zeitraum')+': '+jv('2019 – 2020')+', '+jk('studium')+': '+jv('Kultur und Management')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('TU Ilmenau')+',              '+jk('zeitraum')+': '+jv('2017')+',        '+jk('studium')+': '+jv('Medien &amp; Kommunikationswissenschaften')+' },'),
      line('json', '  { '+jk('institution')+': '+jv('Kepler Gymnasium Freiburg')+', '+jk('zeitraum')+': '+jv('2007 – 2015')+', '+jk('abschluss')+': '+jv('Abitur')+' }'),
      line('json', ']'),
    ],

    'cat erfahrung.json': () => [
      line('json', '['),
      line('json', '  {'),
      line('json', '    '+jk('firma')+':     '+jv('Easy Ecommerce GbR')+','),
      line('json', '    '+jk('zeitraum')+': '+jv('10/2022 – 02/2025')+','),
      line('json', '    '+jk('rolle')+':    '+jv('Shopify Store Setup &amp; Verwaltung')+','),
      line('json', '    '+jk('aufgaben')+': '+ja(['Store-Einrichtung &amp; Verwaltung', 'Theme- &amp; App-Konfiguration', 'Produktanlage &amp; -pflege', 'Versandzonen &amp; Shop-Einstellungen', 'Kundenkommunikation &amp; Rechnungsstellung']),),
      line('json', '  },'),
      line('json', '  { '+jk('firma')+': '+jv('Teleperformance Görlitz')+', '+jk('zeitraum')+': '+jv('06/2019 – 09/2019')+', '+jk('rolle')+': '+jv('Call Center Agent')+' },'),
      line('json', '  {'),
      line('json', '    '+jk('firma')+':     '+jv('EOS-Erlebnispaedagogik e.V.')+','),
      line('json', '    '+jk('zeitraum')+': '+jv('2018')+','),
      line('json', '    '+jk('rolle')+':    '+jv('Freiwilliges Soziales Jahr')+','),
      line('json', '    '+jk('highlights')+': '+ja(['Webdesign mit WordPress (Avada)', 'Google AdWords &amp; AdSense Zertifikate', 'Google Impact Challenge gewonnen (FSJ Integration)']),),
      line('json', '  }'),
      line('json', ']'),
    ],

    'cat motivation.txt': () => [
      line('comment', '# Persönliches Anschreiben — Auszug'),
      line('out', ''),
      line('out', 'Die Stelle verbindet Hardware und Software — das bietet mir ein'),
      line('out', 'breites, praxisnahes Lernumfeld, das mich sehr anspricht.'),
      line('out', ''),
      line('out', 'Durch meinen früheren Job mit Shopify habe ich Erfahrung mit'),
      line('out', 'Shopsystemen und Warenwirtschaft gesammelt. Vieles lässt sich'),
      line('out', 'auf Shopware übertragen: Steuersätze, Versandzonen,'),
      line('out', 'Lagerbestand, Produktvarianten.'),
      line('out', ''),
      line('out', 'Privat betreibe ich ein Homelab auf Linux-Basis: Container,'),
      line('out', 'Media-Server, Monitoring. Ich verstehe, wie Systeme im'),
      line('out', 'Hintergrund zuverlässig zusammenarbeiten müssen.'),
      line('out', ''),
      line('out', 'Neue Technologien probiere ich gerne aus — besonders AI und'),
      line('out', 'agentische Systeme verfolge ich aktiv.'),
      line('out', ''),
      line('comment', '# → Ich freue mich auf Ihre Rückmeldung.'),
    ],

    'cat skills.json': () => [
      line('json', '{'),
      line('json', '  '+jk('sprachen')+':   '+ja(['C#', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL'])+','),
      line('json', '  '+jk('frameworks')+': '+ja(['WPF / XAML', 'ADO.NET'])+','),
      line('json', '  '+jk('tools')+':      '+ja(['Docker', 'Git', 'Linux', 'WordPress'])+','),
      line('json', '  '+jk('zertifikate')+': '+ja(['Google AdWords', 'Google AdSense']),),
      line('json', '}'),
    ],

    'cat contact.json': () => [
      line('json', '{'),
      line('json', '  '+jk('email')+':    '+jv('leon.weber@web.de')+','),
      line('json', '  '+jk('github')+':   '+jv('github.com/DoomSpiral97')+','),
      line('json', '  '+jk('standort')+': '+jv('Karlsruhe, Baden-Württemberg'),),
      line('json', '}'),
    ],

    help: () => [
      line('comment', '# Verfügbare Befehle:'),
      line('out', '  whoami               — wer ist Leon?'),
      line('out', '  cat profile.json     — Profil, Stack, Verfügbarkeit'),
      line('out', '  cat ausbildung.json  — Bildungsweg'),
      line('out', '  cat erfahrung.json   — Berufserfahrung'),
      line('out', '  cat skills.json      — Fähigkeiten &amp; Tools'),
      line('out', '  cat motivation.txt   — Persönliches Anschreiben'),
      line('out', '  cat contact.json     — Kontakt'),
      line('out', '  clear                — Terminal leeren'),
    ],

    clear: () => { body.innerHTML = ''; return []; },
  };

  // ── Core functions ────────────────────────────────────────────
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

  // ── Typewriter ──────────────────────────────────────────────
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

  // ── Boot ───────────────────────────────────────────────────
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

  // ── Input ───────────────────────────────────────────────────
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
