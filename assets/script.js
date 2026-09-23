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
});

function handleForm(e){
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Request Sent ✓';
  btn.style.background = '#0E0E0E';
  btn.style.color = '#fff';
  setTimeout(()=>{
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
    alert('Thank you. A PFP consultant will contact you shortly. Every detail with care.');
  }, 900);
  return false;
}
