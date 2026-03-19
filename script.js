document.addEventListener('DOMContentLoaded', () => {
  // 商品リストの挿入
  const products = [
    { name: "バタークリームマフィン", price: "¥280", img: "maffin.jpg" },
    { name: "チョコメイドレン", price: "¥220", img: "madrane.jpg" }
  ];

  const pList = document.getElementById('products-list');
  if (pList) {
    pList.innerHTML = products.map(p => `
      <div class="product-card fade-up">
        <div class="h-48 bg-gray-200"><img src="${p.img}" class="w-full h-full object-cover"></div>
        <div class="p-6">
          <h3 class="text-lg mb-2">${p.name}</h3>
          <p class="text-caramel font-bold">${p.price}</p>
        </div>
      </div>
    `).join('');
  }

  // スクロール監視（フェードイン用）
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
