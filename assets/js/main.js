/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* ===========================
   SHOPPING CART
=========================== */

let cart = []; let paymentDone = false;

function addToCart(name, price) {

    let found = cart.find(item => item.name === name);

    if (found) {
        found.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();
    alert(name + " added to cart!");

}

function updateCart() {

    let cartItems = document.getElementById("cart-items");

    let total = 0;

    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        count += item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                ₹${item.price}

            </div>

            <div>

                <button onclick="decreaseQty(${index})">−</button>

                ${item.qty}

                <button onclick="increaseQty(${index})">+</button>

            </div>

        </div>
        `;

    });

    document.getElementById("cart-total").innerHTML = total;

    document.getElementById("cart-count").innerHTML = count;

}

function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

function decreaseQty(index){

    cart[index].qty--;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    updateCart();

}

function toggleCart(){

    document.getElementById("cart").classList.toggle("show");

}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
  

let customerName = document.getElementById("customer-name").value.trim();
let phone = document.getElementById("customer-phone").value.trim();
let address = document.getElementById("customer-address").value.trim();

if (!customerName || !phone || !address) {
    alert("Please fill in all customer details.");
    return;
} 
if (!paymentDone) {
    alert("Please complete payment using 'Pay Now' before placing order.");
    return;
}

    let message = "🍽️ Spice & Sip Order\n\n";

    message += "👤 Name: " + customerName + "\n";
    message += "📞 Mobile: " + phone + "\n";
    message += "📍 Address: " + address + "\n\n";

    message += "🛒 My Order:\n\n";

    let total = 0;

    cart.forEach(item => {
        message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
        total += item.price * item.qty;
    });

    message += `\n💰 Total: ₹${total}`;

    let url = "https://api.whatsapp.com/send?phone=918484949151&text=" + encodeURIComponent(message);

console.log(url);

window.open(url, "_blank");

// Wait 2 seconds, then clear the cart
setTimeout(() => {
    cart = [];
    updateCart();

    document.getElementById("customer-name").value = "";
    document.getElementById("customer-phone").value = "";
    document.getElementById("customer-address").value = "";

    document.getElementById("cart").classList.remove("show");

    paymentDone = false; // ✅ ADD THIS
}, 2000);
}

// =======================
// UPI PAYMENT
// =======================

function payNow() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
    });

    let upiId = "patilsohan404@ibl";   

    let upiLink =
        "upi://pay?pa=" + upiId +
        "&pn=Spice%20%26%20Sip" +
        "&am=" + total +
        "&cu=INR";

    paymentDone = true;

    window.location.href = upiLink;
}