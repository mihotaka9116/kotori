document.addEventListener('DOMContentLoaded', () => {

  // アニメーション有効化
  document.documentElement.classList.add('js-ready');

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
    const card = document.createElement('div');
    card.className = 'product-card fade-up';
    card.innerHTML = `
      <div class="product-img"><img src="${p.img}" alt="${p.ja}" loading="lazy"></div>
      <div class="product-info">
        <p class="section-label" style="font-size:.7rem;">${p.en}</p>
        <h3 style="margin-bottom:10px;font-weight:400;">${p.ja}</h3>
        <p class="body-text" style="font-size:.85rem;margin-bottom:15px;">${p.desc}</p>
        <p style="color:var(--brown);font-weight:bold;">${p.price}</p>
      </div>
    `;
    productsContainer.appendChild(card);
  });

  // 2. ラッピング項目
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

  // 3. ヘッダースクロール効果
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header-scrolled', window.scrollY > 100);
  });

  // 4. ハンバーガーメニュー
  const navToggle = document.getElementById('navToggle');
  const navClose  = document.getElementById('navClose');
  const mainNav   = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => mainNav.classList.add('open'));
  navClose.addEventListener('click',  () => mainNav.classList.remove('open'));
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  // 5. フェードインアニメーション
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // 6. 注文フォーム
  const orderForm = document.getElementById('orderForm');
  const formMsg   = document.getElementById('formMsg');
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
});
