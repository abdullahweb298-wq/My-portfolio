const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$('#year').textContent = new Date().getFullYear();

// Mobile navigation
$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach(link => link.addEventListener('click', () => {
  $$('#navLinks a').forEach(item => item.classList.remove('active'));
  link.classList.add('active');
  $('#navLinks').classList.remove('open');
}));

// Theme toggle
$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  $('#themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.classList.add('light');
  $('#themeToggle').textContent = '☾';
}

// Typing animation
const roles = ['Web App Developer', 'Creative Problem Solver', 'Digital Experience Builder'];
let roleIndex = 0, charIndex = roles[0].length, deleting = true;
const typingEl = $('#typingText');
function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    charIndex--;
    typingEl.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    setTimeout(typeRole, 45);
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typingEl.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) { deleting = true; setTimeout(typeRole, 1700); }
    else setTimeout(typeRole, 75);
  }
}
setTimeout(typeRole, 1800);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.section-heading, .glass-card, .skill-card, .project-card, .stat, .contact-card, .contact-cta, .ai-section').forEach((el, index) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(index % 4) * 70}ms`;
  observer.observe(el);
});

// Demo assistant: scripted responses only; connect an AI API for real AI.
const messages = $('#chatMessages');
function addMessage(text, type) {
  const item = document.createElement('div');
  item.className = `message ${type === 'user' ? 'user-message' : 'bot-message'}`;
  item.textContent = text;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}
function assistantReply(question) {
  const q = question.toLowerCase();
  if (q.includes('who') || q.includes('about') || q.includes('abdullah')) {
    return "Abdullah Tanveer is a Web App Developer from Pakistan who enjoys building modern, user-friendly digital experiences. 👋";
  }
  if (q.includes('skill') || q.includes('technology') || q.includes('tech')) {
    return "The skills section is editable. It currently lists HTML, CSS, JavaScript, React, Node.js, databases, Git/GitHub and AI tools—keep only the ones Abdullah knows well. 💻";
  }
  if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
    return "Check out the Featured Projects section! The cards are placeholders—replace their names, descriptions, tech tags, demo links and source-code links with your real projects. 🚀";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
    return "You can reach Abdullah using the contact section. Update YOUR_EMAIL@example.com and the social profile links in index.html first. ✉️";
  }
  if (q.includes('ai')) {
    return "This is a demo chatbot powered by simple JavaScript responses, not a live AI model. To enable real AI, connect a backend endpoint and an AI API key securely. 🤖";
  }
  return "Thanks for your message! I'm a portfolio demo assistant. Try asking about Abdullah, his skills, projects, or contact details. ✨";
}
function sendQuestion(text) {
  const question = text.trim();
  if (!question) return;
  addMessage(question, 'user');
  $('#chatInput').value = '';
  setTimeout(() => addMessage(assistantReply(question), 'bot'), 350);
}
$('#chatForm').addEventListener('submit', event => {
  event.preventDefault();
  sendQuestion($('#chatInput').value);
});
$$('.ai-suggestions button').forEach(button => button.addEventListener('click', () => sendQuestion(button.dataset.question)));

// Small fun interaction
$$('.float-emoji').forEach(emoji => emoji.addEventListener('click', () => {
  emoji.animate([{transform:'scale(1)'},{transform:'scale(1.5) rotate(18deg)'},{transform:'scale(1)'}], {duration:450});
  $('#toast').classList.add('show');
  setTimeout(() => $('#toast').classList.remove('show'), 1700);
}));
