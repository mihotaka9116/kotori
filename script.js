document.addEventListener('DOMContentLoaded', () => {
  // 1. 商品データ
  const products = [
    {
      en: "Butter Cream Muffin",
      ja: "バタークリームマフィン",
      price: "¥280",
      desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。毎朝焼き立てをご用意しています。",
      img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=800"
    },
    {
      en: "Chocolate Madeleine",
      ja: "チョコレートマドレーヌ",
      price: "¥220",
      desc: "カカオたっぷりのマドレーヌ。しっとりとした食感と濃厚な風味をお楽しみください。",
      img: "https://images.unsplash.com/photo-1574610190081-370126742613?auto=format&fit=crop&w=800"
    },
    {
      en: "Bear Madeleine",
      ja: "くまのマドレーヌ",
      price: "¥280",
      desc: "くま型のキュートなマドレーヌ。プレーン・チョコの2種類。贈り物にも大人気です。",
      img: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800"
    }
  ];

  const productsContainer = document.getElementById('products-list');
  products.forEach(p => {
    const card = `
      <div class="product-card fade-up">
        <div class="product-img"><img src="${p.img}" alt="${p.ja}"></div>
        <div class="product-info">
          <p class="section-label" style="font-size: 0.7rem;">${p.en}</p>
          <h3 style="margin-bottom: 10px; font-weight: 400;">${p.ja}</h3>
          <p class="body-text" style="font-size: 0.85rem; margin-bottom: 15px;">${p.desc}</p>
          <p style="color: var(--brown); font-weight: bold;">${p.price}</p>
        </div>
      </div>
    `;
    productsContainer.innerHTML += card;
  });

  // 2. ラッピング項目の流し込み
  const wrapItems = [
    'ご注文時にラッピング希望をお選びください',
    'ギフトボックス（+¥200）もご用意しております',
    'のし・メッセージカードは無料で承ります'
  ];
  const wrapList = document.getElementById('wrapping-notes');
  wrapItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    wrapList.appendChild(li);
  });

  // 3. ヘッダーのスクロール効果
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('header-scrolled', window.scrollY > 100);
  });

  // 4. スクロールアニメーションの実行
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
