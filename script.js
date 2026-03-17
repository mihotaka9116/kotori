document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 商品データの生成
    const products = [
        { name: "バタークリームマフィン", price: "¥450", img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400" },
        { name: "チョコレートマドレーヌ", price: "¥380", img: "https://images.unsplash.com/photo-1574085448211-321a9d5620ca?auto=format&fit=crop&q=80&w=400" },
        { name: "くまのマドレーヌ", price: "¥420", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400" },
        { name: "季節のクッキー缶", price: "¥2,400", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400" }
    ];

    const grid = document.getElementById('productsGrid');
    products.forEach(p => {
        const item = document.createElement('div');
        item.className = 'product-card fade-up';
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
        `;
        grid.appendChild(item);
    });

    // 2. ヘッダーのスクロール演出
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. ハンバーガーメニュー
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const mainNav = document.getElementById('mainNav');

    navToggle.addEventListener('click', () => mainNav.classList.add('active'));
    navClose.addEventListener('click', () => mainNav.classList.remove('active'));
    
    // メニューリンククリック時に閉じる
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mainNav.classList.remove('active'));
    });

    // 4. フェードインアニメーション（Intersection Observer）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
