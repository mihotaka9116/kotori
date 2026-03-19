document.addEventListener('DOMContentLoaded', () => {
  // --- 1. 商品一覧データの生成 ---
  const products = [
    { en: "Butter Cream Muffin", ja: "バタークリームマフィン", price: "¥280", desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。", img: "maffin.jpg" },
    { en: "Chocolate Madeleine", ja: "チョコレートマドレーヌ", price: "¥220", desc: "カカオたっぷりのしっとりとした濃厚な風味。", img: "madrane.jpg" },
    { en: "Bear Madeleine", ja: "くまのマドレーヌ", price: "¥280", desc: "くま型のキュートな形。贈り物にも大人気です。", img: "bear.jpg" }
  ];
  const pContainer = document.getElementById('products-list');
  if (pContainer) {
    products.forEach(p => {
      pContainer.innerHTML += `
        <div class="product-card">
          <div class="product-img-wrap"><img src="${p.img}" alt="${p.ja}" loading="lazy"></div>
          <div class="product-body">
            <p class="product-en">${p.en}</p>
            <h3 class="product-name">${p.ja}</h3>
            <p class="product-desc">${p.desc}</p>
            <p class="product-price">${p.price}</p>
            <a href="#order" class="btn-order">注文する</a>
          </div>
        </div>`;
    });
  }

  // --- 2. お知らせ (News) の生成 ---
  const news = [
    { date: "2026.03.15", cat: "季節限定", title: "春の新作「さくらと苺のマフィン」が登場しました。" },
    { date: "2026.03.01", cat: "お知らせ", title: "ホワイトデー限定ギフトセットのご予約受付開始。" }
  ];
  const nList = document.getElementById('news-list');
  if (nList) {
    news.forEach(item => {
      nList.innerHTML += `
        <div class="flex flex-col md:flex-row py-6 border-b border-caramel/10 group cursor-pointer hover:bg-white/50 transition-all px-2">
          <div class="flex gap-4 mb-2 md:mb-0 md:w-64 shrink-0">
            <span class="font-en text-gray text-sm">${item.date}</span>
            <span class="text-[0.65rem] bg-warm text-caramel px-2 py-0.5 rounded tracking-widest">${item.cat}</span>
          </div>
          <p class="font-ja text-[0.92rem] text-brown group-hover:text-caramel transition-colors">${item.title}</p>
        </div>`;
    });
  }

  // --- 3. カレンダーの生成 (2026.03) ---
  const calGrid = document.getElementById('calendar-grid');
  const holidays = [2, 9, 16, 23, 30]; // 3月の月曜定休
  if (calGrid) {
    ['日','月','火','水','木','金','土'].forEach(d => calGrid.innerHTML += `<div class="text-[0.7rem] text-gray mb-2 font-ja">${d}</div>`);
    for (let i = 1; i <= 31; i++) {
      const isHoli = holidays.includes(i) ? 'bg-caramel text-white shadow-sm' : 'text-brown hover:bg-warm';
      calGrid.innerHTML += `<div class="py-2 text-sm font-en rounded-full transition-colors cursor-default ${isHoli}">${i}</div>`;
    }
  }

  // --- 4. インスタグラム (Lorem Picsumを利用) ---
  const instaGrid = document.getElementById('insta-grid');
  if (instaGrid) {
    for (let i = 1; i <= 8; i++) {
      instaGrid.innerHTML += `
        <div class="aspect-square rounded-lg overflow-hidden shadow-sm group">
          <img src="https://picsum.photos/400/400?random=${i}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        </div>`;
    }
  }

  // --- UI制御：スクロールヘッダー & フェードイン ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 80);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // --- フォーム送信シミュレーション ---
  const orderForm = document.getElementById('orderForm');
  orderForm?.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    if (msg) msg.textContent = "メッセージを送信しました。ありがとうございます！";
    orderForm.reset();
  });
});
