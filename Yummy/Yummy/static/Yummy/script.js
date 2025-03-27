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

// =============calcScrollWidth=======================
function calcScrollWidth() {
    const block = document.createElement('div')
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.overflowY = 'scroll'
    document.body.appendChild(block)
    let scrollWidth = block.offsetWidth - block.clientWidth
    block.remove()
    return scrollWidth;
}


// ================modals==============================
const modals = () => {

    function bindModal(triggersSelector, modalSelector, closeSelector, closeOverlay = true, favorite = false) {
        const triggers = document.querySelectorAll(triggersSelector)
        const modal = document.querySelector(modalSelector)
        const close = document.querySelector(closeSelector)
        const body = document.body
        const header = document.querySelector('header')
        const widthScroll = calcScrollWidth()


        triggers.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                header.style.marginRight = `${widthScroll}px`;
                body.style.marginRight = `${widthScroll}px`;
                body.classList.add('modal-open');
                modal.style.display = 'block';
                if (favorite) {
                    renderFavorite();
                }
            })
        })

        close.addEventListener('click', () => {
            header.style.marginRight = `0px`;
            body.style.marginRight = `0px`
            body.classList.remove('modal-open')
            modal.style.display = 'none'
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeOverlay) {
                header.style.marginRight = `0px`;
                body.style.marginRight = `0px`;
                body.classList.remove('modal-open')
                modal.style.display = 'none'
            }
        })
    }

    bindModal('#triggerModal', '.modal', '.modal-close', true, true)

}

modals()

// ================favorite==============================
function cards() {
    const body = document.body.getAttribute('data-page')

    function getTemplateProducts() {
        return [
            { id: 1, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/burger-removebg-preview-removebg-preview.png', price: '10.00', },
            { id: 2, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/chicken-nuggets-1.png', price: '20.00', },
            { id: 3, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/pngtree-pizza-pepperoni-png-image_9057057.png', price: '16.00', },
            { id: 4, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/fried-potatoes-french-fries-isolated-white-background.jpg', price: '17.00', },
            { id: 5, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/ramen.png', price: '21.99', },
            { id: 6, title: 'Tasty food', page: 'dishes', favorite: false, viewed: false, img: '/static/Yummy/images/fried-chicken-french-fries-white-plate.jpg', price: '10.00', },
            { id: 7, title: 'delicious food', page: 'menu', favorite: false, viewed: false, img: '/static/Yummy/images/hawaiian-salmon-fish-poke-bowl-with-rice-radish-cucumber-tomato-sesame-seeds-seaweeds-buddha-bowl-diet-food.jpg', price: '18.00', },
            { id: 8, title: 'delicious food', page: 'menu', favorite: false, viewed: false, img: '/static/Yummy/images/fried-potatoes-french-fries-isolated-white-background.jpg', price: '18.00', },
            { id: 9, title: 'delicious food', page: 'menu', favorite: false, viewed: false, img: '/static/Yummy/images/maki-sushi-isolated-on-white_2829-7304.avif', price: '18.00', },
            { id: 10, title: 'delicious food', page: 'menu', favorite: false, viewed: false, img: '/static/Yummy/images/baked-chicken-wings-with-teriyaki-sauce.jpg', price: '18.00', },
            { id: 11, title: 'delicious food', page: 'menu', favorite: false, viewed: false, img: '/static/Yummy/images/mexican-tacos-with-chicken-bell-peppers-black-beans-fresh-vegetables_2829-20049.jpg', price: '18.00', },
        ]
    }

    function getTemplateForDishes(card) {
        return `
            <div class="box" style="${body !== card.page ? 'display: none;' : ''}">
                <a href="#" id="heart" data-id="${card.id}" class="fas fa-heart heart-icon"></a>
                <a href="#" data-id="${card.id}" class="fas fa-eye eye-icon ${card.viewed ? 'active' : ''}"></a>
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
                <a href="#" class="btns">Add to cart</a>
            </div>
            `
    }

    function getTemplateForMenu(card) {
        return `
            <div class="box" style="${body !== card.page ? 'display: none;' : ''}">
                <div class="image">
                    <img src="${card.img}" alt="" height="200px" width="250px">
                    <a href="#" data-id="${card.id}" class="fas fa-heart heart-icon"></a>
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
                    <a href="#" class="btns">add to cart</a>
                    <span class="pice">$${card.price}</span>
                </div>
            </div>
            `
    }

    const wrapper = document.querySelector('#wrapper-products')

    let products = localStorage.getItem('cards');
    if (products !== null) {
        products = JSON.parse(products);
        products = products.map(product => {
            if (product.viewed === undefined) {
                return {...product, viewed: false};
            }
            return product;
        });
    } else {
        products = getTemplateProducts();
    }

    let template;
    switch (body) {
        case 'dishes': template = getTemplateForDishes
            break
        case 'menu': template = getTemplateForMenu
            break
        default: return
    }
    const prod = products.map(template)

try {
    wrapper.innerHTML = prod.join('')
    wrapper.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        
        if (target.classList.contains('heart-icon')) {
            const id = parseInt(target.getAttribute('data-id'))
            let products = localStorage.getItem('cards');
            if (products !== null) {
                products = JSON.parse(products);
                const product = products.find(item => item.id === id)
                product.favorite = !product.favorite
                localStorage.setItem('cards', JSON.stringify(products))
                target.classList.toggle('active');
            } else {
                products = getTemplateProducts();
                const product = products.find(item => item.id === id)
                product.favorite = !product.favorite
                localStorage.setItem('cards', JSON.stringify(products))
                target.classList.toggle('active');
            }
        }
        
        if (target.classList.contains('eye-icon')) {
            const id = parseInt(target.getAttribute('data-id'))
            let products = localStorage.getItem('cards');
            if (products !== null) {
                products = JSON.parse(products);
                if (!products.some(item => item.hasOwnProperty('viewed'))) {
                    products = products.map(item => ({...item, viewed: false}));
                }
                const product = products.find(item => item.id === id)
                product.viewed = !product.viewed
                localStorage.setItem('cards', JSON.stringify(products))
                target.classList.toggle('active');
            } else {
                products = getTemplateProducts();
                const product = products.find(item => item.id === id)
                product.viewed = !product.viewed
                localStorage.setItem('cards', JSON.stringify(products))
                target.classList.toggle('active');
            }
        }
    })
} catch (e) { }

}
cards()


// =========favorite==============
function renderFavorite() {
    const modalBody = document.querySelector('.modal-body')

    let products = localStorage.getItem('cards');
    if (products !== null) {
        products = JSON.parse(products);
        const isFavorite = products
            .filter(item => item.favorite === true)
            .map(item => {
                return `
            <div class="box" style="display:flex;">
                <div style="flex:1 0 30%; text-align:center;">
                    <img
                        src="${item.img}"
                        alt=""
                        height="100px"
                        width="125px"
                    />
                </div>
                <div class="box-text" style="flex:1 0 40%">
                    <h3>${item.title}</h3>
                    <span class="price">$${item.price}</span>
                </div>
                <div style="flex:1 0 30%; text-align:center;">
                    <button data-id=${item.id} class="btns" style="transform: translate(0px, 50%)">Delete</button>
                </div>
            </div>
            `
            })

        modalBody.innerHTML = isFavorite.join('');
    } else {
        modalBody.innerHTML = 'Empty'
    }
}

function favorite() {
    const modalBody = document.querySelector('.modal-body')

    modalBody.addEventListener('click', (e) => {
        const target = e.target
        if (target.matches('button[data-id]')) {
            const id = parseInt(target.getAttribute('data-id'))
            let products = localStorage.getItem('cards');
            if (products !== null) {
                products = JSON.parse(products);
                const product = products.find(item => item.id === id)
                product.favorite = !product.favorite
                localStorage.setItem('cards', JSON.stringify(products))

                const heartIcons = document.querySelectorAll(`.heart-icon[data-id="${id}"]`);
                heartIcons.forEach(icon => {
                    if (product.favorite) {
                        icon.classList.add('active');
                    } else {
                        icon.classList.remove('active');
                    }
                });
                renderFavorite()
            }

        }
    })
}
favorite()

function updateHeartIcons() {
    let products = localStorage.getItem('cards');
    if (products !== null) {
        products = JSON.parse(products);
        
        const heartIcons = document.querySelectorAll('.heart-icon');
        heartIcons.forEach(icon => {
            const id = parseInt(icon.getAttribute('data-id'));
            const product = products.find(item => item.id === id);
            if (product && product.favorite) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });

        const eyeIcons = document.querySelectorAll('.eye-icon');
        eyeIcons.forEach(icon => {
            const id = parseInt(icon.getAttribute('data-id'));
            const product = products.find(item => item.id === id);
            
            if (product && product.viewed) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateHeartIcons();
    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('heart-icon') || 
            event.target.classList.contains('eye-icon')) {
            event.preventDefault();
        }
    });
});