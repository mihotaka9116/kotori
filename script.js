document.addEventListener('DOMContentLoaded', () => {
  // 初期設定：JS読み込み完了フラグ
  document.documentElement.classList.add('js-ready');

  /* ==========================================
     1. 商品データの生成
     ========================================== */
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
  }

  /* ==========================================
     2. お知らせ (News) の挿入
     ========================================== */
  const newsData = [
    { date: '2026.03.15', cat: '季節限定', title: '春の新作「さくらと苺のマフィン」が登場しました。' },
    { date: '2026.03.01', cat: 'お知らせ', title: 'ホワイトデー限定ギフトセットのご予約受付開始。' }
  ];
  const newsList = document.getElementById('news-list');
  if (newsList) {
    newsData.forEach(item => {
      newsList.innerHTML += `
        <div class="news-item">
          <span class="news-date">${item.date}</span>
          <span class="news-cat">${item.cat}</span>
          <span class="news-title">${item.title}</span>
        </div>`;
    });
  }

  /* ==========================================
     3. カレンダー生成 (2026年3月)
     ========================================== */
  const calGrid = document.getElementById('calendar-grid');
  const days = ['日','月','火','水','木','金','土'];
  const holidays = [2, 9, 16, 23, 30]; // 月曜定休

  if (calGrid) {
    days.forEach(d => calGrid.innerHTML += `<div class="calendar-day-head">${d}</div>`);
    for (let i = 1; i <= 31; i++) {
      const isHoliday = holidays.includes(i) ? 'is-holiday' : '';
      calGrid.innerHTML += `<div class="calendar-date ${isHoliday}">${i}</div>`;
    }
  }

  /* ==========================================
     4. インスタグラム風画像
     ========================================== */
  const instaGrid = document.getElementById('insta-grid');
  if (instaGrid) {
    for (let i = 1; i <= 8; i++) {
      instaGrid.innerHTML += `
        <div class="insta-img">
          <img src="https://picsum.photos/400/400?random=${i}" alt="instagram" loading="lazy">
        </div>`;
    }
  }

  /* ==========================================
     5. ナビゲーション・UI制御
     ========================================== */
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

  const toggleMenu = (isOpen) => {
    mobileMenu?.classList.toggle('open', isOpen);
    overlay?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle?.addEventListener('click', () => toggleMenu(true));
  mobileClose?.addEventListener('click', () => toggleMenu(false));
  overlay?.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // スクロールフェードインアニメーション
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ==========================================
     6. 注文フォーム（ファイル添付対応）
     ========================================== */
  const orderForm = document.getElementById('orderForm');
  const formMsg   = document.getElementById('formMsg');

  orderForm?.addEventListener('submit', e => {
    e.preventDefault();
    
    // FormDataを使用してファイルを含む全データを取得
    const formData = new FormData(orderForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const file = formData.get('attachment');

    if (!name || !email) {
      formMsg.textContent = 'お名前とメールアドレスは必須です。';
      formMsg.style.color = '#c0392b';
      return;
    }

    // 送信シミュレーション
    console.log('送信データ:', Object.fromEntries(formData));
    if (file && file.size > 0) console.log('添付ファイル受領:', file.name);

    formMsg.textContent = 'ご注文ありがとうございます！確認メールをお送りします。';
    formMsg.style.color = 'var(--caramel)';
    orderForm.reset();
  });
});
