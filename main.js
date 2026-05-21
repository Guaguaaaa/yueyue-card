const translations = {
  en: {
    greeting: "Hi, I'm Songyi",
    tagline: 'Creative · Curious · Connected',
    bio: "Nice to meet you!<br>Pick your favourite app to stay in touch.",
    title_social: 'Social',
    title_professional: 'Professional',
    btn_wechat: 'WeChat',
    btn_email: 'Email Me',
    btn_save_contact: 'Save Contact',
    copied_text: 'ID Copied!',
  },
  zh: {
    greeting: '你好，我是松仪',
    tagline: '创意 · 好奇 · 连接',
    bio: "很高兴认识你！<br>选择你最常用的 App 来联系我吧。",
    title_social: '社交媒体',
    title_professional: '专业平台',
    btn_wechat: '微信',
    btn_email: '发送邮件',
    btn_save_contact: '保存联系人',
    copied_text: 'ID 已复制！',
  },
  es: {
    greeting: 'Hola, soy Songyi',
    tagline: 'Creativa · Curiosa · Conectada',
    bio: "¡Encantada de conocerte!<br>Elige tu app favorita para estar en contacto.",
    title_social: 'Redes Sociales',
    title_professional: 'Profesional',
    btn_wechat: 'WeChat',
    btn_email: 'Envíame un Email',
    btn_save_contact: 'Guardar Contacto',
    copied_text: '¡ID Copiado!',
  },
  ko: {
    greeting: '안녕하세요, Songyi입니다',
    tagline: '크리에이티브 · 호기심 · 연결',
    bio: "반갑습니다!<br>편하신 앱으로 연락주세요.",
    title_social: '소셜 미디어',
    title_professional: '전문 플랫폼',
    btn_wechat: 'WeChat',
    btn_email: '이메일',
    btn_save_contact: '연락처 저장',
    copied_text: 'ID가 복사되었습니다!',
  },
};

function changeLanguage(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
      if (el.tagName === 'SPAN') {
        el.setAttribute('data-original-text', translations[lang][key]);
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('preferredLanguage', lang);
}

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const icon = element.querySelector('i');
    const span = element.querySelector('span');
    if (!icon || !span) return;

    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const originalText = span.getAttribute('data-original-text');
    const originalIconClass = icon.className;

    icon.className = 'fa-solid fa-check';
    span.textContent = translations[currentLang].copied_text || 'Copied!';
    element.classList.add('copied-success');

    setTimeout(() => {
      icon.className = originalIconClass;
      span.textContent = originalText;
      element.classList.remove('copied-success');
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved && translations[saved]) {
    changeLanguage(saved);
    return;
  }
  const browser = navigator.language.split('-')[0];
  changeLanguage(translations[browser] ? browser : 'en');
});
