let menu = document.querySelector('#bars');
let navbar = document.querySelector('.menu');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}


var swiper = new Swiper(".home-slider", {
    spaceBetween: 130,
    centeredSlides: true,
    simulateTouch: false,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    simulateTouch: false,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

function calcScrollWidth() {
    const block = document.createElement('div')
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.overflowY = 'scroll';
    document.body.appendChild(block);
    let scrollWidth = block.offsetWidth - block.clientWidth;
    block.remove();
    return scrollWidth;
}

const modals = () => {

    function bindModal(triggersSelector, modalSelector, closeSelector, closeOverlay = true, basket = false) {
        const triggers = document.querySelectorAll(triggersSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const body = document.body;
        const header = document.querySelector('header');


        triggers.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                const widthScroll = calcScrollWidth();
                header.style.marginRight = `${widthScroll}px`;
                body.style.marginRight = `${widthScroll}px`;
                body.classList.add('modal-open');
                modal.style.display = 'block';
                if (basket) {
                    renderBasket();
                    printSum()
                }
            })
        });

        close.addEventListener('click', () => {
            header.style.marginRight = `0px`;
            body.style.marginRight = `0px`;
            body.classList.remove('modal-open');
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeOverlay) {
                header.style.marginRight = `0px`;
                body.style.marginRight = `0px`;
                body.classList.remove('modal-open');
                modal.style.display = 'none';
            }
        });
    };

    bindModal('#triggerModal', '.modal', '.modal-close', true, true);

}

const BASE_PRODUCTS = [
    { id: 1, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/burger-removebg-preview-removebg-preview.png', price: '10.00', },
    { id: 2, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/chicken-nuggets-1.png', price: '20.00', },
    { id: 3, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/pngtree-pizza-pepperoni-png-image_9057057.png', price: '16.00', },
    { id: 4, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/fried-potatoes-french-fries-isolated-white-background.jpg', price: '17.00', },
    { id: 5, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/ramen.png', price: '21.99', },
    { id: 6, title: 'Tasty food', page: 'dishes', counter: 1, basket: false, img: '/static/Yummy/images/fried-chicken-french-fries-white-plate.jpg', price: '10.00', },
    { id: 7, title: 'delicious food', page: 'menu', counter: 1, basket: false, img: '/static/Yummy/images/hawaiian-salmon-fish-poke-bowl-with-rice-radish-cucumber-tomato-sesame-seeds-seaweeds-buddha-bowl-diet-food.jpg', price: '18.00', },
    { id: 8, title: 'delicious food', page: 'menu', counter: 1, basket: false, img: '/static/Yummy/images/fried-potatoes-french-fries-isolated-white-background.jpg', price: '18.00', },
    { id: 9, title: 'delicious food', page: 'menu', counter: 1, basket: false, img: '/static/Yummy/images/maki-sushi-isolated-on-white_2829-7304.avif', price: '18.00', },
    { id: 10, title: 'delicious food', page: 'menu', counter: 1, basket: false, img: '/static/Yummy/images/baked-chicken-wings-with-teriyaki-sauce.jpg', price: '18.00', },
    { id: 11, title: 'delicious food', page: 'menu', counter: 1, basket: false, img: '/static/Yummy/images/mexican-tacos-with-chicken-bell-peppers-black-beans-fresh-vegetables_2829-20049.jpg', price: '18.00', },
];

function getTemplateForBasket(card) {
    return `
        <div class="box" style="display:flex;">
            <div class="box-column" style="text-align:center;">
                <img
                    src="${card.img}"
                    alt=""
                    height="100px"
                    width="100px"
                />
            </div>
            <div class="box-column box-text">
                <h3>${card.title}</h3>
                <span class="price">$${card.price}</span>
            </div>
            <div class="box-column box-counter center" >
                <button data-id=${card.id} class="btn btn-minus">-</button>
                <span data-counter-id="${card.id}" class="counter">${card.counter}</span>
                <button data-id=${card.id} class="btn btn-plus">+</button>
            </div>
            <div class="box-column center">
                <button data-id=${card.id} data-toggleCart class="btn btn-delete">Delete</button>
            </div>
        </div>
        `;
};

function getTemplateForDishes(card) {
    return `
        <div class="box" style="${card.page === 'dishes' ? '' : 'display: none;'}">
            <img
                src="${card.img}"
                alt=""
                height="200px"
                width="250px"
            />
            <h3>${card.title}</h3>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <span>$${card.price}</span>
            <a href="#" data-toggleCart data-id="${card.id}" class="btns">${card.basket ? "Remove from cart" : "Add to cart "}</a>
        </div>
        `;
};

function getTemplateForMenu(card) {
    return `
        <div class="box" style="${card.page === 'menu' ? '' : 'display: none'}">
            <div class="image">
                <img src="${card.img}" alt="" height="200px" width="250px">
            </div>
            <div class="content">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h3>${card.title}</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, commodi.</p>
                <a href="#" data-toggleCart data-id="${card.id}" class="btns">${card.basket ? "Remove from cart" : "Add to cart "}</a>
                <span class="pice">$${card.price}</span>
            </div>
        </div>
        `;
};

function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : BASE_PRODUCTS

};

function renderCards() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return

    let template;
    switch (currentPage) {
        case 'dishes': template = getTemplateForDishes;
            break;
        case 'menu': template = getTemplateForMenu;
            break;
    }

    render('#wrapper-products', getProducts(), template);

}

function renderBasket() {
    render('.modal-body', getProducts(), getTemplateForBasket, true)
}

function render(containerSelector, products, template, basket = false) {
    const container = document.querySelector(containerSelector);

    let items = basket ? products.filter(product => product.basket) : products;
    container.innerHTML = items.map(template).join('');

};

function printSum() {
    const products = getProducts();
    const basketProducts = products.filter(product => product.basket);
    const totalSum = basketProducts.reduce((acc, product) => acc += parseFloat(product.price) * parseFloat(product.counter), 0).toFixed(2);

    document.querySelector('.total').textContent = `total: ${totalSum}`;

}

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('[data-toggleCart]')) {
        e.preventDefault();
        const id = parseInt(target.dataset.id);
        const products = getProducts();
        const product = products.find(product => product.id === id);
        product.counter = 1;
        product.basket = !product.basket;
        localStorage.setItem('products', JSON.stringify(products));
        renderCards();
        renderBasket();
        printSum()
    }

    if (target.classList.contains('btn-order')) {
        window.location.href = '/order/'
    }

})

function initCounter(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener('click', (e) => {
        const target = e.target;
        const btnMinus = target.closest('.btn-minus');
        const btnPlus = target.closest('.btn-plus');

        if (!btnMinus && !btnPlus) return;

        const id = parseInt(target.dataset.id);
        if (isNaN(id)) return;

        const products = getProducts();
        const product = products.find(p => p.id === id);
        if (!product) return;

        if (typeof product.counter !== 'number') {
            product.counter = 1;
        }

        if (btnMinus && product.counter > 1) {
            product.counter -= 1;
        } else if (btnPlus) {
            product.counter += 1;
        }

        localStorage.setItem('products', JSON.stringify(products));
        updateProductCounter(id, product.counter);
        printSum()
    });
}

function updateProductCounter(productId, count) {
    const counterElements = document.querySelectorAll(`[data-counter-id="${productId}"]`);
    counterElements.forEach(el => {
        el.textContent = count;
    });
}

function fillingForm() {
    const orders = document.querySelector('#orders')
    const numberOfOrders = document.querySelector('#numberOfOrders')
    if (!orders && !numberOfOrders) return

    const value = []
    const products = getProducts()
    const basketProducts = products.filter(p => p.basket)

    basketProducts.forEach(p => {
        value.push(`${p.title};`)
    })

    const count = basketProducts.reduce((acc, p) => acc += p.counter, 0)

    orders.value = value.join(' ')
    numberOfOrders.value = count
}



document.addEventListener('DOMContentLoaded', () => {
    modals();
    renderCards();
    initCounter('.modal-body')
    fillingForm()
});