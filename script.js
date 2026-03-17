document.addEventListener('DOMContentLoaded', () => {

  /* ── JS読み込み確認後にアニメーションを有効化 ── */
  document.documentElement.classList.add('js-ready');

  /* ── 1. 商品データ ── */
  const products = [
    {
      en: 'Butter Cream Muffin',
      name: 'バタークリームマフィン',
      desc: 'しっとりとしたバタークリームをたっぷり使ったマフィン。',
      price: '¥450',
      img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400'
    },
    {
      en: 'Chocolate Madeleine',
      name: 'チョコレートマドレーヌ',
      desc: '濃厚なチョコレートを使った贅沢なマドレーヌ。',
      price: '¥380',
      img: 'https://images.unsplash.com/photo-1574085448211-321a9d5620ca?auto=format&fit=crop&q=80&w=400'
    },
    {
      en: 'Bear Madeleine',
      name: 'くまのマドレーヌ',
      desc: 'くま型の可愛らしいマドレーヌ。贈り物にも人気です。',
      price: '¥420',
      img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400'
    },
    {
      en: 'Seasonal Cookie Tin',
      name: '季節のクッキー缶',
      desc: '季節の素材を使ったクッキーを詰め合わせた特製缶。',
      price: '¥2,400',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const grid = document.getElementById('productsGrid');
  if (grid) {
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card fade-up';
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="product-body">
          <p class="product-en">${p.en}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <p class="product-price">${p.price}</p>
          <a href="#order" class="btn-order">注文する</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* ── 2. ヘッダー スクロール ── */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── 3. ハンバーガーメニュー ── */
  const navToggle = document.getElementById('navToggle');
  const navClose  = document.getElementById('navClose');
  const mainNav   = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.add('open'));
  }
  if (navClose && mainNav) {
    navClose.addEventListener('click', () => mainNav.classList.remove('open'));
  }
  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  /* ── 4. フェードイン ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── 5. 注文フォーム ── */
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
