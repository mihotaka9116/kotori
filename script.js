document.addEventListener('DOMContentLoaded', () => {
  // --- 1. スクロール監視（ヘッダーの背景変化） ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // --- 2. モバイルメニューの開閉 ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const toggleMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    mobileOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  navToggle.addEventListener('click', () => toggleMenu(true));
  mobileClose.addEventListener('click', () => toggleMenu(false));
  mobileOverlay.addEventListener('click', () => toggleMenu(false));

  // メニューリンククリック時に閉じる
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // --- 3. カレンダー生成ロジック ---
  const generateCalendar = () => {
    const daysContainer = document.getElementById('calendar-days');
    const monthLabel = document.getElementById('calendar-month');
    
    // 現在の日時（2026年3月を想定。動的にする場合は new Date()）
    const year = 2026;
    const month = 2; // JavaScriptは0始まり（2 = 3月）
    
    monthLabel.textContent = `${year}年 ${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 祝日による振替定休日の設定（手動設定用）
    // 例：3月20日（金）が祝日の場合、本来の水曜定休を木曜にずらす等の調整が必要な場合に使用
    const specialClosedDays = []; 

    // 空白を埋める（月初の曜日合わせ）
    for (let i = 0; i < firstDay; i++) {
      const emptySpan = document.createElement('span');
      daysContainer.appendChild(emptySpan);
    }

    // 日付を生成
    for (let date = 1; date <= lastDate; date++) {
      const span = document.createElement('span');
      span.textContent = date;
      
      const dayOfWeek = new Date(year, month, date).getDay();

      // 定休日判定：毎週水曜日 (dayOfWeek === 3) 
      // または specialClosedDays に含まれる日
      if (dayOfWeek === 3 || specialClosedDays.includes(date)) {
        span.classList.add('closed');
      }

      daysContainer.appendChild(span);
    }
  };

  generateCalendar();

  // --- 4. フェードインアニメーション（Intersection Observer） ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => observer.observe(el));

  // 初期化時にJS準備完了クラスを付与
  document.body.classList.add('js-ready');

  // --- 5. お問い合わせフォームの簡易送信シミュレーション ---
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = orderForm.querySelector('.btn-submit');
      const originalText = btn.textContent;
      
      btn.textContent = '送信中...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        alert('お問い合わせありがとうございます。送信が完了しました。');
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        orderForm.reset();
      }, 1500);
    });
  }
});
