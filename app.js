const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "REVLON",
    price: 999,
    colors: [
      {
        code: "#A91D3A",
        img: "img/revlon.png",
        description: "Revlon Super Lustrous Lipstick - Rum Raisin (4.2g)",
      },
      {
        code: "#973131",
        img: "img/revlon2.png",
        description: "Revlon Super Lustrous Lipstick - Chocolate Velvety (4.2g)",
      },
    ],
  },
  {
    id: 2,
    title: "SUGAR",
    price: 599,
    colors: [
      {
        code: "#E6B9A6",
        img: "img/sugar.png",
        description: "Rage For Coverage Foundation 10 Latte (Light, Warm Undertone)",
      },
      {
        code: "#E0A75E",
        img: "img/sugar2.png",
        description: "Rage For Coverage Foundation 20 Galão (Light Medium Golden Undertone)",
      },
    ],
  },
  {
    id: 3,
    title: "NYKAA",
    price: 499,
    colors: [
      {
        code: "brown",
        img: "img/nykaa.png",
        description: "Nykaa Matte to Last! Transfer Proof Liquid Lipstick - Jhumki 14 (5ml)",
      },
      {
        code: "lightpink",
        img: "img/nykaa2.png",
        description: "Nykaa Matte to Last! Transfer Proof Liquid Lipstick - Bombae 01 (5ml)",
      },
    ],
  },
  {
    id: 4,
    title: "MAMAEARTH",
    price: 490,
    colors: [
      {
        code: "#EFBC9B",
        img: "img/mamaearth.png",
        description: "Glow Oil Control Compact With SPF 30 - 9g |Ivory Glow",
      },
      {
        code: "#BE7B72",
        img: "img/mamaearth2.png",
        description: "Glow Oil Control Compact With SPF 30 - 9g | Almond Glow",
      },
    ],
  },
  {
    id: 5,
    title: "LAKME",
    price: 499,
    colors: [
      {
        code: "#A34343",
        img: "img/lakme.png",
        description: "LAKMĒ ULTIMATE GLAM 4 IN 1 LIP STACK ",
      },
      {
        code: "#FB9AD1",
        img: "img/lakme2.png",
        description: "LAKMĒ ULTIMATE GLAM 4 IN 1 LIP STACK ",
      },
    ],
  },
];

let choosenProduct = products[0];
let currentSlide = 0;
let autoScrollInterval;

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductDesc = document.querySelector(".productDesc");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    choosenProduct = products[index];

    // Change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₹" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;
    currentProductDesc.textContent = choosenProduct.colors[0].description || "";

    // Assign new colors
    currentProductColors.forEach((color, index) => {
      if (choosenProduct.colors[index]) {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      }
    });

    // Stop auto-scroll on manual selection
    clearInterval(autoScrollInterval);
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
    currentProductDesc.textContent = choosenProduct.colors[index].description || "";
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
  const menuItems = document.querySelectorAll(".menuItem");
  const indicator = document.querySelector(".indicator");

  function updateIndicator() {
    const activeItem = document.querySelector(".menuItem.active");
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect();
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${activeItem.offsetLeft}px`;
    }
  }

  menuItems.forEach(item => {
    item.addEventListener("click", function() {
      document.querySelector(".menuItem.active")?.classList.remove("active");
      item.classList.add("active");
      updateIndicator();
    });
  });

  window.addEventListener("resize", updateIndicator);

  // Set the initial active menu item
  if (menuItems.length > 0) {
    menuItems[0].classList.add("active");
    updateIndicator();
  }

  // Auto-scroll functionality
  function autoScroll() {
    currentSlide = (currentSlide + 1) % products.length;
    wrapper.style.transform = `translateX(${-100 * currentSlide}vw)`;

    // Update the active menu item
    document.querySelector(".menuItem.active")?.classList.remove("active");
    menuItems[currentSlide].classList.add("active");
    updateIndicator();

    // Change the chosen product
    choosenProduct = products[currentSlide];
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₹" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;
    currentProductDesc.textContent = choosenProduct.colors[0].description || "";

    // Assign new colors
    currentProductColors.forEach((color, index) => {
      if (choosenProduct.colors[index]) {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      }
    });
  }

  autoScrollInterval = setInterval(autoScroll, 2500);

});
