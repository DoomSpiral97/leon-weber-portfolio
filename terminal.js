(function(){
  const body   = document.getElementById('termBody');
  const input  = document.getElementById('termInput');
  const PROMPT = 'leon@portfolio:~$ ';

  // ── Command responses ──────────────────────────────────────────
  const COMMANDS = {
    whoami: () => [
      line('out', 'Leon Weber — Software Development Trainee (Fachinformatiker AE)')
    ],

    'cat profile.json': () => [
      line('json', '{'),
      line('json', '  <span class="jk">"training"</span>:   <span class="jv">"Fachinformatiker für Anwendungsentwicklung, ends Q2 2027"</span>,'),
      line('json', '  <span class="jk">"stack"</span>:     <span class="jv">["HTML/CSS", "JavaScript", "Three.js", "Node.js", "SQL", "Docker"]</span>,'),
      line('json', '  <span class="jk">"location"</span>:  <span class="jv">"Karlsruhe, Germany"</span>,'),
      line('json', '  <span class="jk">"available"</span>: <span class="jv">"internship — immediate"</span>,'),
      line('json', '  <span class="jk">"languages"</span>: <span class="jv">["de-DE native", "en-GB B2"]</span>'),
      line('json', '}'),
    ],

    'cat projects.json': () => [
      line('json', '['),
      line('json', '  { <span class="jk">"name"</span>: <span class="jv">"TaskFlow"</span>,       <span class="jk">"type"</span>: <span class="jv">"Full-stack web app"</span>,          <span class="jk">"stack"</span>: <span class="jv">"Node / Express / SQL"</span> },'),
      line('json', '  { <span class="jk">"name"</span>: <span class="jv">"Server Monitor"</span>,  <span class="jk">"type"</span>: <span class="jv">"Data visualisation dashboard"</span>, <span class="jk">"stack"</span>: <span class="jv">"JS / Chart.js"</span>       },'),
      line('json', '  { <span class="jk">"name"</span>: <span class="jv">"MediaHub"</span>,       <span class="jk">"type"</span>: <span class="jv">"Self-hosted infra"</span>,           <span class="jk">"stack"</span>: <span class="jv">"Docker / Linux"</span>      }'),
      line('json', ']'),
    ],

    'cat contact.json': () => [
      line('json', '{'),
      line('json', '  <span class="jk">"email"</span>:    <span class="jv">"leon.weber@web.de"</span>,'),
      line('json', '  <span class="jk">"github"</span>:   <span class="jv">"github.com/DoomSpiral97"</span>,'),
      line('json', '  <span class="jk">"linkedin"</span>: <span class="jv">"linkedin.com/in/your-profile"</span>'),
      line('json', '}'),
    ],

    help: () => [
      line('comment', '# Available commands:'),
      line('out', '  whoami            — who is Leon?'),
      line('out', '  cat profile.json  — skills, stack, availability'),
      line('out', '  cat projects.json — selected work'),
      line('out', '  cat contact.json  — get in touch'),
      line('out', '  clear             — clear the terminal'),
    ],

    clear: () => { body.innerHTML = ''; return []; },
  };

  // ── Helpers ───────────────────────────────────────────────────
  function line(type, html) {
    const el = document.createElement('div');
    el.className = 'tline tline--' + type;
    el.innerHTML = html;
    return el;
  }

  function printPromptLine(cmd) {
    const el = document.createElement('div');
    el.className = 'tline tline--cmd';
    el.innerHTML = '<span class="tp">' + PROMPT + '</span><span class="tc">' + escHtml(cmd) + '</span>';
    body.appendChild(el);
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
      body.appendChild(line('err', 'command not found: ' + escHtml(cmd) + ' &nbsp; (try <span class="jv">help</span>)'));
    }
    scrollBottom();
  }

  function scrollBottom() {
    const t = document.querySelector('.terminal');
    if (t) t.scrollTop = t.scrollHeight;
  }

  // ── Typewriter auto-intro ─────────────────────────────────────
  function typewriter(text, onDone, speed = 42) {
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
        el.removeAttribute('id');
        tw.removeAttribute('id');
        setTimeout(onDone, 380);
      }
    }, speed);
  }

  function autoRun(cmd, onDone) {
    typewriter(cmd, () => {
      const handler = COMMANDS[cmd];
      if (handler) {
        const lines = handler();
        lines.forEach(el => { if(el) body.appendChild(el); });
        scrollBottom();
      }
      setTimeout(onDone, 200);
    });
  }

  // ── Boot sequence ─────────────────────────────────────────────
  function boot() {
    body.appendChild(line('comment', '# Welcome. Type <span class="jv">help</span> for available commands.'));
    setTimeout(() => {
      autoRun('whoami', () => {
        setTimeout(() => {
          autoRun('cat profile.json', () => {});
        }, 500);
      });
    }, 600);
  }

  // ── Input handling ────────────────────────────────────────────
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  // Click anywhere on terminal focuses input
  document.querySelector('.terminal').addEventListener('click', () => input.focus());

  // ── Init ──────────────────────────────────────────────────────
  boot();
  setTimeout(() => input.focus(), 2800);
})();
