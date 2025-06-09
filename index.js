let products = [];

document.getElementById('boost').addEventListener('input', function () {
  document.getElementById('boostValue').innerText = `${this.value}%`;
});

document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const basePrice = parseFloat(document.getElementById('basePrice').value);
  const condition = document.getElementById('condition').value;
  const boost = parseInt(document.getElementById('boost').value);

  let finalPrice = basePrice;

  if (condition === "used") {
    finalPrice *= 0.6; // تخفيض 40% للمنتجات المستعملة
  }

  // إنشاء المنتج
  const product = {
    name,
    basePrice,
    finalPrice: finalPrice.toFixed(2),
    condition,
    boost
  };

  products.push(product);
  displayProducts();
  this.reset();
  document.getElementById('boostValue').innerText = '5%';
});

function displayProducts() {
  const container = document.getElementById('productList');
  container.innerHTML = "";

  // ترتيب المنتجات حسب boost من الأعلى إلى الأدنى
  products.sort((a, b) => b.boost - a.boost);

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>الحالة: ${product.condition === "new" ? "جديد" : "مستعمل"}</p>
      <p>السعر: ${product.finalPrice} ر.س</p>
      <p>نسبة الظهور: ${product.boost}%</p>
    `;
    container.appendChild(card);
  });
}