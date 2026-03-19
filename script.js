document.addEventListener('DOMContentLoaded', () => {
  // --- 1. スクロール監視（ヘッダー背景） ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // --- 2. モバイルメニュー開閉 ---
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

  // リンククリック時に閉じる
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // --- 3. カレンダー生成 (2026年3月) ---
  const generateCalendar = () => {
    const daysContainer = document.getElementById('calendar-days');
    const monthLabel = document.getElementById('calendar-month');
    
    const year = 2026;
    const month = 2; // 3月 (JSは0始まり)
    
    monthLabel.textContent = `${year}年 ${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 振替休日などの特別休業日（例：木曜日を休みにしたい場合などはここに追加）
    const specialClosedDays = []; 

    // 月初の空白
    for (let i = 0; i < firstDay; i++) {
      daysContainer.appendChild(document.createElement('span'));
    }

    // 日付生成
    for (let date = 1; date <= lastDate; date++) {
      const span = document.createElement('span');
      span.textContent = date;
      
      const dayOfWeek = new Date(year, month, date).getDay();

      // 水曜日(3)を定休日に設定
      if (dayOfWeek === 3 || specialClosedDays.includes(date)) {
        span.classList.add('closed');
      }

      daysContainer.appendChild(span);
    }
  };

  generateCalendar();

  // --- 4. フェードイン (Intersection Observer) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // --- 5. フォームシミュレーション ---
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = orderForm.querySelector('.btn-submit');
      btn.textContent = '送信中...';
      setTimeout(() => {
        alert('送信が完了しました。ありがとうございます！');
        btn.textContent = '送信する';
        orderForm.reset();
      }, 1200);
    });
  }
});
