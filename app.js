import { products, categories } from "./data.js";

const app = document.querySelector("#app");
const cartCount = document.querySelector("#cart-count");
const cartDrawer = document.querySelector("#cart-drawer");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const cartTotal = document.querySelector("#cart-total");
const backdrop = document.querySelector("#drawer-backdrop");
const toast = document.querySelector("#toast");
const searchButton = document.querySelector("#search-button");
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

let activeCategory = "All";
let searchTerm = "";
let cart = loadCart();

function loadCart() {
  try { return JSON.parse(localStorage.getItem("morrow-cart") || "[]"); }
  catch (error) { console.error("Unable to load saved cart.", error); return []; }
}

function saveCart() {
  localStorage.setItem("morrow-cart", JSON.stringify(cart));
}

function money(value) { return `$${value.toFixed(2)}`; }
function getProduct(id) { return products.find((product) => product.id === id); }
function filteredProducts() {
  return products.filter((product) => (activeCategory === "All" || product.category === activeCategory) && product.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

function productCard(product) {
  return `<article class="product-card"><a class="product-image-link" href="#/product/${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="" loading="lazy" width="600" height="700"><span class="product-category">${product.category}</span></a><div class="product-card-info"><div><h3><a href="#/product/${product.id}">${product.name}</a></h3><p>${money(product.price)}</p></div><button class="quick-add" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button></div></article>`;
}

function renderHome() {
  app.innerHTML = `<section class="hero"><div class="hero-copy"><p class="eyebrow">The Morrow edit · 2025</p><h1>Small objects.<br><em>Good days.</em></h1><p>Thoughtful things for the rituals that make a life. Made slowly, chosen carefully.</p><a class="button button-dark" href="#/shop">Shop the collection <span aria-hidden="true">→</span></a></div><div class="hero-image"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85" alt="Warmly lit room with carefully arranged home objects" width="1400" height="1000"></div></section><section class="intro-band"><p>We believe the everyday deserves more attention. Morrow is a collection of well-made, useful things designed to become part of your rhythm.</p><a class="text-link" href="#/story">Read our story <span aria-hidden="true">↗</span></a></section><section class="featured container"><div class="section-header"><div><p class="eyebrow">A few favourites</p><h2>Made to be kept.</h2></div><a class="text-link" href="#/shop">View all <span aria-hidden="true">→</span></a></div><div class="product-grid">${products.slice(0, 3).map(productCard).join("")}</div></section>`;
}

function renderShop() {
  app.innerHTML = `<section class="page-heading container"><p class="eyebrow">The collection</p><h1>Useful things,<br><em>beautifully made.</em></h1><p>Explore our considered collection of objects for home, table, ritual, and wear.</p></section><section class="shop container"><div class="shop-toolbar"><div class="category-list" role="group" aria-label="Filter products">${categories.map((category) => `<button class="${activeCategory === category ? "active" : ""}" type="button" data-category="${category}" aria-pressed="${activeCategory === category}">${category}</button>`).join("")}</div><label class="shop-search"><span class="visually-hidden">Search products</span><input id="product-search" type="search" value="${searchTerm}" placeholder="Search collection..."></label></div><div class="product-grid">${filteredProducts().map(productCard).join("") || `<p class="no-results">No pieces match that search.</p>`}</div></section>`;
}

function renderProduct(id) {
  const product = getProduct(id);
  if (!product) { renderNotFound(); return; }
  app.innerHTML = `<div class="container product-detail"><a class="back-link" href="#/shop">← Back to collection</a><div class="detail-layout"><div class="detail-image"><img src="${product.image}" alt="${product.name}" width="1000" height="1200"></div><div class="detail-copy"><p class="eyebrow">${product.category}</p><h1>${product.name}</h1><p class="detail-price">${money(product.price)}</p><p class="detail-description">${product.description}</p><dl class="product-specs"><div><dt>Material</dt><dd>${product.color}</dd></div><div><dt>Shipping</dt><dd>Free over $100</dd></div></dl><button class="button button-dark add-detail" type="button" data-add="${product.id}">Add to bag <span aria-hidden="true">+</span></button><p class="detail-note">Made with intention. Ships within 2–3 working days.</p></div></div></div>`;
}

function renderStory() {
  app.innerHTML = `<section class="story-hero container"><p class="eyebrow">Our story</p><h1>Better things<br><em>take time.</em></h1><p>We started Morrow because the objects around us shape the way we move through a day. The right cup, the warmest blanket, a candle at dusk — small cues to pay attention.</p></section><section class="story-grid"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Quiet living room with natural materials" loading="lazy" width="1200" height="900"><div><p class="eyebrow">Our point of view</p><h2>Choose less.<br>Choose well.</h2><p>Every Morrow piece is selected for its material, its usefulness, and the pleasure it brings to an ordinary moment. We work with makers who care about their process and choose materials that can age with grace.</p><a class="text-link" href="#/shop">Explore the collection <span aria-hidden="true">→</span></a></div></section>`;
}

function renderNotFound() { app.innerHTML = `<section class="not-found container"><p class="eyebrow">404</p><h1>That page wandered off.</h1><a class="button button-dark" href="#/">Return home</a></section>`; }

function route() {
  const path = window.location.hash.slice(1) || "/";
  if (path === "/") renderHome();
  else if (path === "/shop") renderShop();
  else if (path === "/story") renderStory();
  else if (path.startsWith("/product/")) renderProduct(path.split("/")[2]);
  else renderNotFound();
  app.focus();
}

function updateCart() {
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
  cartCount.textContent = quantity;
  cartItems.replaceChildren(...cart.map((item) => {
    const product = getProduct(item.id);
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `<img src="${product.image}" alt="" width="80" height="90"><div><h3>${product.name}</h3><p>${money(product.price)} × ${item.quantity}</p><button type="button" data-remove="${product.id}">Remove</button></div>`;
    return row;
  }));
  cartEmpty.hidden = cart.length > 0;
  cartSummary.hidden = cart.length === 0;
  cartTotal.textContent = money(total);
}

function addToCart(id) {
  const item = cart.find((entry) => entry.id === id);
  if (item) item.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart(); updateCart();
  toast.textContent = `${getProduct(id).name} added to your bag.`;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2500);
}

function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  cartDrawer.setAttribute("aria-hidden", String(!open));
  backdrop.hidden = !open;
  if (open) document.querySelector("#close-cart").focus();
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) addToCart(addButton.dataset.add);
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) { activeCategory = categoryButton.dataset.category; renderShop(); }
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) { cart = cart.filter((item) => item.id !== removeButton.dataset.remove); saveCart(); updateCart(); }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "product-search") { searchTerm = event.target.value; renderShop(); document.querySelector("#product-search").focus(); }
});
window.addEventListener("hashchange", route);
document.querySelector("#cart-button").addEventListener("click", () => toggleCart(true));
document.querySelector("#close-cart").addEventListener("click", () => toggleCart(false));
backdrop.addEventListener("click", () => toggleCart(false));
document.querySelector("#checkout-button").addEventListener("click", () => { toast.textContent = "Checkout is ready for the next integration."; toast.classList.add("visible"); setTimeout(() => toast.classList.remove("visible"), 2500); });
searchButton.addEventListener("click", () => { window.location.hash = "/shop"; setTimeout(() => document.querySelector("#product-search")?.focus(), 0); });
menuButton.addEventListener("click", () => { const expanded = menuButton.getAttribute("aria-expanded") === "true"; menuButton.setAttribute("aria-expanded", String(!expanded)); siteNav.classList.toggle("open", !expanded); });
updateCart();
route();
