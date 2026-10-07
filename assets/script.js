/* ------------------------------------------------------------------
   PFP contact details - change them here and nowhere else.
   ------------------------------------------------------------------ */
const PFP = {
  phoneDisplay: '(065) 611-1247',
  phoneTel: '+27656111247',     // dial pad  -> tel:+27656111247
  phoneWa: '27656111247',       // WhatsApp  -> https://wa.me/27656111247
  phoneCopy: '065 611 1247',    // what "Copy number" puts on the clipboard
  email: 'inquires@premiumfuneralplanning.co.za',
  // Every callback request from the website is emailed to PFP.email, by two routes tried in order:
  //   1) mailer   - the site's own mailer (send-enquiry.php, uploaded next to index.html)
  //   2) endpoint - FormSubmit, only used if the mailer can't be reached or can't send
  mailer: 'send-enquiry.php',
  endpoint: 'https://formsubmit.co/ajax/inquires@premiumfuneralplanning.co.za',
  waitMailer: 10000,            // ms to wait for each route before moving on
  waitBackup: 8000,
  waGreeting: "Hello PFP, I'd like to find out more about your Premium Funeral Planning packages."
};

const waLink = (text) => `https://wa.me/${PFP.phoneWa}?text=${encodeURIComponent(text)}`;
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('mobileMenu');
  if(toggle && mobile){
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    mobile.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> mobile.classList.remove('open'));
    });
  }

  // Accordion
  document.querySelectorAll('.acc-header').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.acc-item').forEach(i=>i.classList.remove('active'));
      if(!isActive) item.classList.add('active');
    });
  });

  // Smooth scroll offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top, behavior:'smooth'});
      }
    });
  });

  // Intersection animations
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.package-card, .about-card, .wwd-item, .experience-box, .promise-box, .contact-card').forEach(el=>{
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });

  initContactChooser();
  initPackagePicker();
  initCallbackForm();
});

/* ------------------------------------------------------------------
   Phone number -> "Call or WhatsApp" chooser.
   Any link with class js-contact opens it. The links are real tel:
   links too, so they still dial if this script ever fails to load.
   ------------------------------------------------------------------ */
function initContactChooser(){
  const root = document.getElementById('contactChooser');
  if(!root) return;
  const callA = document.getElementById('ccCall');
  const waA = document.getElementById('ccWa');
  const copyB = document.getElementById('ccCopy');
  let opener = null;

  const focusables = () => Array.from(root.querySelectorAll('a[href],button')).filter(el => !el.disabled);

  function open(trigger){
    opener = trigger || document.activeElement;
    const custom = trigger && trigger.getAttribute('data-wa-text');
    waA.href = waLink(custom || PFP.waGreeting);
    root.hidden = false;
    document.body.classList.add('cc-lock');
    callA.focus({preventScroll:true});
  }
  function close(){
    if(root.hidden) return;
    root.hidden = true;
    document.body.classList.remove('cc-lock');
    if(opener && opener.focus) opener.focus({preventScroll:true});
  }

  document.addEventListener('click', (e)=>{
    const link = e.target.closest && e.target.closest('a.js-contact');
    if(!link) return;
    if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(link);
  });

  root.addEventListener('click', (e)=>{
    if(e.target === root || e.target.closest('[data-cc-close]')) close();
  });

  // once a choice is made the browser hands over to the dialler / WhatsApp
  [callA, waA].forEach(a => a.addEventListener('click', ()=> setTimeout(close, 250)));

  document.addEventListener('keydown', (e)=>{
    if(root.hidden) return;
    if(e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if(e.key === 'Tab'){
      const f = focusables();
      if(!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  copyB.addEventListener('click', async ()=>{
    let done = false;
    try { await navigator.clipboard.writeText(PFP.phoneCopy); done = true; } catch(_){}
    if(!done){
      try {
        const ta = document.createElement('textarea');
        ta.value = PFP.phoneCopy;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(ta);
        ta.select();
        done = document.execCommand('copy');
        ta.remove();
        copyB.focus({preventScroll:true});
      } catch(_){}
    }
    copyB.textContent = done ? 'Number copied ✓' : PFP.phoneDisplay;
    setTimeout(()=>{ copyB.textContent = 'Copy number'; }, 2200);
  });
}

/* ------------------------------------------------------------------
   "Select Package 1 / 2 / 3" pre-selects that package in the form.
   ------------------------------------------------------------------ */
function initPackagePicker(){
  const sel = document.querySelector('#callbackForm select[name="Package"]');
  if(!sel) return;
  document.querySelectorAll('[data-package]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const n = btn.getAttribute('data-package');
      const opt = Array.from(sel.options).find(o => o.text.trim().indexOf('Package ' + n + ' ') === 0);
      if(!opt) return;
      sel.value = opt.value;
      sel.classList.remove('select-flash');
      void sel.offsetWidth;
      sel.classList.add('select-flash');
      setTimeout(()=> sel.classList.remove('select-flash'), 1700);
    });
  });
}

/* ------------------------------------------------------------------
   Request a Callback -> emailed to PFP.email.
   Route 1: the site's own mailer (send-enquiry.php) - answers in about a second.
   Route 2: FormSubmit, only if route 1 can't be reached or can't send.
   Success is read from the reply BODY (FormSubmit answers 200 with
   success:"false" until its one-time activation link has been clicked),
   so a request is never reported as sent unless a route confirmed it.
   If both routes fail the visitor gets WhatsApp / email buttons that
   already contain their details, so no enquiry is lost.
   ------------------------------------------------------------------ */
function initCallbackForm(){
  const form = document.getElementById('callbackForm');
  if(!form) return;
  const btn = form.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');
  const phone = form.elements['Phone Number'];
  const idleLabel = btn.textContent;
  let busy = false;

  const val = (name) => (form.elements[name].value || '').trim();

  // POST with a hard time limit. Never throws: always resolves to {ok, status, body, error?}.
  function post(url, init, ms){
    return new Promise((resolve)=>{
      let done = false, timer;
      const ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
      const finish = (r)=>{ if(done) return; done = true; clearTimeout(timer); resolve(r); };
      timer = setTimeout(()=>{
        if(ctrl){ try { ctrl.abort(); } catch(_){} }
        finish({ok:false, status:0, body:{}, error:'timeout'});
      }, ms);
      try {
        fetch(url, Object.assign({method:'POST'}, init, ctrl ? {signal: ctrl.signal} : {}))
          .then((res)=> res.json().catch(()=>({})).then((body)=> finish({ok:res.ok, status:res.status, body: body || {}})))
          .catch(()=> finish({ok:false, status:0, body:{}, error:'network'}));
      } catch(_){ finish({ok:false, status:0, body:{}, error:'network'}); }
    });
  }

  function setStatus(type, html){
    status.className = 'form-status ' + type;
    status.innerHTML = html;
    status.hidden = false;
    try { status.scrollIntoView({block:'nearest', behavior:'smooth'}); } catch(_){}
  }
  function clearStatus(){
    status.hidden = true;
    status.className = 'form-status';
    status.innerHTML = '';
  }
  function stamp(){
    try {
      return new Date().toLocaleString('en-ZA', {
        timeZone:'Africa/Johannesburg', weekday:'short', day:'numeric', month:'short',
        year:'numeric', hour:'2-digit', minute:'2-digit', hour12:false
      }) + ' (SA time)';
    } catch(_){ return new Date().toISOString(); }
  }
  function showFallback(d){
    const text = [
      "Hello PFP, I'd like to request a callback.", '',
      'Name: ' + d['Full Name'],
      'Phone: ' + d['Phone Number'],
      'Package: ' + d['Package'],
      'Age band: ' + d['Age Band']
    ].join('\n');
    const mail = 'mailto:' + PFP.email +
      '?subject=' + encodeURIComponent('Callback request: ' + d['Package'].split(' - ')[0]) +
      '&body=' + encodeURIComponent(text);
    setStatus('err',
      '<strong>We couldn\u2019t send your request automatically</strong>' +
      'Please send it to us directly \u2014 your details are already filled in for you.' +
      '<div class="fs-actions">' +
        '<a class="fs-btn wa" href="' + escAttr(waLink(text)) + '" target="_blank" rel="noopener noreferrer"><svg class="ic"><use href="#i-wa"/></svg>WhatsApp</a>' +
        '<a class="fs-btn" href="' + escAttr(mail) + '"><svg class="ic"><use href="#i-mail"/></svg>Email</a>' +
      '</div>' +
      '<div class="fs-or">Or call us on <a class="js-contact" href="tel:' + PFP.phoneTel + '">' + PFP.phoneDisplay + '</a></div>'
    );
  }

  phone.addEventListener('input', ()=> phone.setCustomValidity(''));

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(busy) return;

    // spam trap: bots fill the hidden field, people never see it
    if(form.elements['_honey'] && form.elements['_honey'].value) return;

    const digits = val('Phone Number').replace(/\D/g, '');
    if(digits.length < 9 || digits.length > 15){
      phone.setCustomValidity('Please enter a valid phone number.');
      phone.reportValidity();
      return;
    }
    phone.setCustomValidity('');

    const data = {
      'Full Name': val('Full Name'),
      'Phone Number': val('Phone Number'),
      'Package': val('Package'),
      'Age Band': val('Age Band')
    };
    const payload = Object.assign({}, data, {
      'Submitted': stamp(),
      'Page': location.href.split(/[?#]/)[0],
      '_subject': 'New callback request: ' + data['Package'].split(' - ')[0] + ' - ' + data['Full Name'],
      '_template': 'table',
      '_captcha': 'false'
    });

    busy = true;
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';
    clearStatus();

    // route 1: the site's own mailer
    const own = await post(PFP.mailer, {
      headers: {'Accept':'application/json'},
      body: new URLSearchParams({
        name: data['Full Name'], phone: data['Phone Number'], package: data['Package'],
        age: data['Age Band'], page: payload['Page'], _honey: ''
      })
    }, PFP.waitMailer);
    let ok = own.ok && own.body.ok === true;

    // route 2: FormSubmit - whenever the mailer isn't there or couldn't send. Not when it was
    // reached and refused the request itself (bad details / too large / too many requests).
    const mailerSaidNo = typeof own.body.ok === 'boolean' && [400, 413, 422, 429].indexOf(own.status) !== -1;
    let backup = null;
    if(!ok && !mailerSaidNo){
      backup = await post(PFP.endpoint, {
        headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        body: JSON.stringify(payload)
      }, PFP.waitBackup);
      ok = backup.ok && (backup.body.success === true || backup.body.success === 'true');
    }
    if(!ok){
      try { console.warn('[PFP] callback request could not be sent', {mailer: own.status || own.error, backup: backup ? (backup.status || backup.error) : 'not tried'}); } catch(_){}
    }

    busy = false;
    btn.disabled = false;

    if(ok){
      form.reset();
      phone.setCustomValidity('');
      btn.textContent = 'Request Sent \u2713';
      btn.classList.add('is-sent');
      setStatus('ok', '<strong>Request Sent \u2713</strong>Thank you. A PFP consultant will contact you shortly. Every detail with care.');
      setTimeout(()=>{ btn.classList.remove('is-sent'); btn.textContent = idleLabel; }, 4000);
    } else {
      btn.textContent = idleLabel;
      showFallback(data);
    }
  });
}
