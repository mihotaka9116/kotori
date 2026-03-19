document.addEventListener('DOMContentLoaded', () => {
  
  // 1. スクロール時のフェードイン演出
  const revealElements = document.querySelectorAll('.js-reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // 初期表示チェック

  // 2. ヘッダーのスクロール背景変更
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(44, 26, 14, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // 3. FAQのアコーディオン
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
      
      // 他を閉じる（オプション）
      document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
      
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 4. モバイルメニューの簡易トグル
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    alert('モバイルメニューはCSSメディアクエリとJSでさらに詳細に実装可能です。');
  });
});
