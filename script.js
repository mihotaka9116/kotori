// 1. 商品データ（ここにお持ちのBase64データを戻してください）
const PRODUCTS = [
  {
    name: "バタークリームマフィン",
    name_en: "Butter Cream Muffin",
    desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。毎朝焼き立てをご用意しています。",
    price: "¥280",
    img: "data:image/jpeg;base64,..." 
  },
  {
    name: "チョコレートマドレーヌ",
    name_en: "Chocolate Madeleine",
    desc: "濃厚なカカオの香りと、しっとりした食感が特徴です。",
    price: "¥250",
    img: "data:image/jpeg;base64,..."
  },
  {
    name: "くまのマドレーヌ",
    name_en: "Bear Madeleine",
    desc: "お子様に大人気。見た目も可愛い、やさしい甘さのマドレーヌ。",
    price: "¥300",
    img: "data:image/jpeg;base64,..."
  }
];

// 2. HTMLへの書き出し処理（CSSのクラス名に合わせました）
function displayProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => `
    <div class="product-card fade-up">
      <div class="product-img-wrap">
        <img src="${product.img}" alt="${product.name}">
      </div>
      <div class="product-body">
        <p class="product-en">${product.name_en}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <p class="product-price">${product.price}</p>
        <a href="#order" class="btn-order">注文する</a>
      </div>
    </div>
  `).join('');
}

// 3. スクロールアニメーション
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); // CSSの .is-visible と一致
        entry.target.classList.add('visible');    // 念のため .visible も付与
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// 4. 実行
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  initScrollAnimation();
});
