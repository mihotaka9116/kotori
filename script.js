document.addEventListener('DOMContentLoaded', () => {

  document.documentElement.classList.add('js-ready');

  // 商品データ
  const products = [
    {
      en: "Butter Cream Muffin",
      ja: "バタークリームマフィン",
      price: "¥280",
      desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。毎朝焼き立てをご用意しています。",
      img: "maffin.jpg"
    },
    {
      en: "Chocolate Madeleine",
      ja: "チョコレートマドレーヌ",
      price: "¥220",
      desc: "カカオたっぷりのマドレーヌ。しっとりとした食感と濃厚な風味をお楽しみください。",
      img: "madrane.jpg"
    },
    {
      en: "Bear Madeleine",
      ja: "くまのマドレーヌ",
      price: "¥280",
      desc: "くま型のキュートなマドレーヌ。プレーン・チョコの2種類。贈り物にも大人気です。",
      img: "bear.jpg"
    }
  ];

  const container = document.getElementById('products-list');
  console.log('container:', container);

  if (container) {
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img">
          <img src="${p.img}" alt="${p.ja}" loading="lazy">
        </div>
        <div class="product-info">
          <p class="section-label" style="font-size:.7rem;">${p.en}</p>
          <h3 style="margin-bottom:10px;font-weight:400;">${p.ja}</h3>
          <p class="body-text" style="font-size:.85rem;margin-bottom:15px;">${p.desc}</p>
          <p style="color:var(--brown);font-weight:bold;">${p.price}</p>
        </div>
      `;
      container.appendChild(card);
    });
  } else {
    console.error('products-list が見つかりません');
  }

  // ラッピング項目
  const wrapItems = [
    'ご注文時にラッピング希望をお選びください',
    'ギフトボックス（+¥200）もご用意しております',
    'のし・メッセージカードは無料で承ります'
  ];
  const wrapList = document.getElementById('wrapping-notes');
  if (wrapList) {
    wrapItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      wrapList.appendChild(li);
    });
  }

  // ヘッダースクロール
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('header-scrolled', window.scrollY > 100);
  });

  // ハンバーガーメニュー
  const navToggle   = document.getElementById('navToggle');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const overlay     = document.getElementById('mobileOverlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle)   navToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // フェードイン
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // 注文フォーム
  const orderForm = document.getElementById('orderForm');
  const formMsg   = document.getElementById('formMsg');
  if (orderForm && formMsg) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const name  = orderForm.querySelector('[name="name"]').value.trim();
      const email = orderForm.querySelector('[name="email"]').value.trim();
      if (!name || !email) {
        formMsg.textContent = 'お名前とメールアドレスは必須です。';
        formMsg.style.color = '#c0392b';
        return;
      }
      formMsg.textContent = 'ご注文ありがとうございます！確認メールをお送りします。';
      formMsg.style.color = '';
      orderForm.reset();
    });
  }
});

// --- カレンダー生成機能 ---
  const calDays = document.getElementById('calendar-days');
  const calMonth = document.getElementById('calendar-month');

  if (calDays && calMonth) {
    const now = new Date(); // 2026年の今日
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11

    // 表示を更新 (例: 2026年 3月)
    calMonth.textContent = `${year}年 ${month + 1}月`;

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 空白を埋める
    for (let i = 0; i < firstDay; i++) {
      calDays.appendChild(document.createElement('span'));
    }

    // 日付を入れる
    for (let date = 1; date <= lastDate; date++) {
      const span = document.createElement('span');
      span.textContent = date;
      
      // 水曜日 (getDay() === 3) を定休日に設定
      const dayOfWeek = new Date(year, month, date).getDay();
      if (dayOfWeek === 3) {
        span.classList.add('closed');
      }
      
      calDays.appendChild(span);
    }
  }
