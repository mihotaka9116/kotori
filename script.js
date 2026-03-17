document.addEventListener('DOMContentLoaded', () => {
  // 1. 商品データの挿入
  const products = [
    {
      nameEn: "Butter Cream Muffin",
      name: "バタークリームマフィン",
      desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。毎朝焼き立てをご用意しています。",
      price: "¥280",
      img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=800&q=80"
    },
    {
      nameEn: "Chocolate Madeleine",
      name: "チョコレートマドレーヌ",
      desc: "カカオたっぷりのマドレーヌ。しっとりとした食感と濃厚な風味をお楽しみください。",
      price: "¥220",
      img: "https://images.unsplash.com/photo-1574610190081-370126742613?auto=format&fit=crop&w=800&q=80"
    },
    {
      nameEn: "Bear Madeleine",
      name: "くまのマドレーヌ",
      desc: "くま型のキュートなマドレーヌ。プレーン・チョコの2種類。贈り物にも大人気です。",
      price: "¥280",
      img: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const productsList = document.getElementById('productsList');
  products.forEach(p => {
    const html = `
      <div class="product-card fade-up">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="product-info">
          <p class="section-label" style="font-size:0.7rem;">${p.nameEn}</p>
          <h3 style="margin-bottom:10px;">${p.name}</h3>
          <p class="body-text" style="font-size:0.85rem; margin-bottom:15px;">${p.desc}</p>
          <p style="font-weight:bold; color:var(--brown);">${p.price}</p>
        </div>
      </div>
    `;
    productsList.innerHTML += html;
  });

  // 2. ラッピングリストの挿入
  const wrapItems = [
    'ご注文時にラッピング希望をお選びください',
    'ギフトボックス（+¥200）もご用意しております',
    'のし・メッセージカードは無料で承ります'
  ];
  const wrappingList = document.getElementById('wrappingList');
  wrapItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    wrappingList.appendChild(li);
  });

  // 3. ヘッダーのスクロール制御
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // 4. スクロールアニメーション (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
