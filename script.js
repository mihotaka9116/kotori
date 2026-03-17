// 1. 商品データ
const PRODUCTS = [
  {
    name: "バタークリームマフィン",
    name_en: "Butter Cream Muffin",
    desc: "ふんわり軽い生地に、バターの香りが広がるマフィン。毎朝焼き立てをご用意しています。",
    price: "¥280",
    img: "data:image/jpeg;base64,...(省略)..." 
  }
  // 他の商品データもここに追加
];

// 2. HTMLへの書き出し処理
function displayProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => `
    <div class="product-card fade-up">
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="en">${product.name_en}</p>
      <p class="desc">${product.desc}</p>
      <p class="price">${product.price}</p>
    </div>
  `).join('');
}

// 3. スクロールアニメーション（Intersection Observer）
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// 4. 実行
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();      // まず商品を表示
  initScrollAnimation(); // その後にアニメーション設定
});
