const MENU = {
  Coffee: [
    ['Espresso', 'Double shot of our house blend, dark chocolate and orange peel.', 140, 'espresso'],
    ['Cappuccino', 'Equal parts espresso, steamed milk and silky microfoam.', 180, 'cappuccino'],
    ['Méra Signature Latte', 'Jaggery caramel, cardamom milk and a hand-poured rosetta.', 220, 'signature']
  ],
  Breakfast: [
    ['Avocado Toast', 'Sourdough, smashed avocado, chilli flakes, poached egg.', 280, 'avocado'],
    ['Truffle Mushroom Toast', 'Wild mushrooms, truffle oil, parmesan and thyme.', 320, 'mushroom']
  ],
  Mains: [
    ['Butter Chicken Pasta', 'Penne in a slow-cooked makhani sauce, charred basil.', 380, 'pasta'],
    ['Paneer Tikka Sandwich', 'Smoked paneer, mint chutney, grilled multigrain.', 320, 'sandwich']
  ],
  Desserts: [
    ['Tiramisu', 'Espresso-soaked savoiardi, mascarpone, cocoa.', 240, 'tiramisu'],
    ['Chocolate Hazelnut Tart', 'Dark chocolate ganache in a buttery hazelnut crust.', 260, 'tart']
  ],
  'Cold Drinks': [
    ['Classic Cold Brew', 'Steeped 18 hours, served over hand-cut ice.', 190, 'coldbrew'],
    ['Orange Espresso Tonic', 'Double espresso, tonic and fresh orange.', 210, 'tonic']
  ]
};

const tabsEl = document.getElementById('tabs');
const listEl = document.getElementById('menuList');

function renderMenu(cat) {
  listEl.innerHTML = MENU[cat].map(([name, desc, price, img]) => `
    <li class="item">
      <img src="assets/images/menu-${img}.svg" alt="${name}" width="96" height="96" loading="lazy">
      <div><h3>${name}</h3><p>${desc}</p></div>
      <b>₹${price}</b>
    </li>`).join('');
}

function switchCategory(cat) {
  tabsEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.cat === cat));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || reduce) return renderMenu(cat);
  gsap.to(listEl.children, {
    opacity: 0, y: -14, duration: 0.3, stagger: 0.04, ease: 'power2.in',
    onComplete() {
      renderMenu(cat);
      gsap.fromTo(listEl.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
    }
  });
}

tabsEl.innerHTML = Object.keys(MENU).map((c, i) =>
  `<button role="tab" data-cat="${c}" aria-selected="${i === 0}">${c}</button>`).join('');
tabsEl.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (btn && btn.getAttribute('aria-selected') !== 'true') switchCategory(btn.dataset.cat);
});
renderMenu('Coffee');
