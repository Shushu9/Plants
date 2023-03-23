console.log("Самопроверка Plants-part2\n1. Ширина экрана 768px +24\n2. Ширина экрана 380px +24\n3. Не появляется горизонтальная полоса прокрутки +15\n4. Адаптивное меню +22\nИтого: 85 баллов");

// HAMBURGER IN HEADER


const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger'),
    navOverlay = document.querySelector('.nav__overlay');

function toggleMenu() {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
    navOverlay.classList.toggle('nav__overlay_active')
};


hamburger.addEventListener('click', toggleMenu);

menuItem.forEach(item => {
    item.addEventListener('click', toggleMenu);
});

navOverlay.addEventListener('click', toggleMenu);




// TABS AND CARDS  IN SERVICE SECTION

const serviceCards = document.querySelectorAll('.card'),
    serviceTabs = document.querySelectorAll('.service__btn');

let activeTabsCount = 0; // need it if we want to be active 2 or less tabs



serviceTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {

        if (e.target.classList.contains('service__btn-active')) {
            e.target.classList.remove('service__btn-active');

            activeTabsCount -= 1;

            if (activeTabsCount == 0) { //IF WE HAVE 0 ACTIVE TABS - MAKE ALL CARDS ACTIVE
                serviceCards.forEach(card => {
                    card.classList.remove('card-unactive');
                })
            } else {
                serviceCards.forEach(card => { //IF WE HAVE 1 ACTIVE TAB - MAKE ACTIVE CARDS THAT NAMED LIKE ACTIVE TAB. OTHER WILL BE UNACTIVE
                    if (e.target.dataset.name == card.dataset.name) {
                        card.classList.add('card-unactive');
                    }
                })
            }

        } else if (activeTabsCount < 2) { //condition to have max 2 active tabs
            e.target.classList.add('service__btn-active');

            activeTabsCount += 1;

            if (activeTabsCount == 1) { //IF WE HAVE 1 ACTIVE TAB - MAKE ACTIVE CARDS THAT NAMED LIKE ACTIVE TAB. OTHER WILL BE UNACTIVE
                serviceCards.forEach(card => {
                    if (e.target.dataset.name !== card.dataset.name) {
                        card.classList.add('card-unactive');
                    }
                })
            } else {
                serviceCards.forEach(card => { // IF WE ACTIVE ANOTHER TAB - REMOVE UNACTIVE CLASS FFROM CARDS, THAT NAMED LIKE THIS TAB
                    if (e.target.dataset.name == card.dataset.name) {
                        card.classList.remove('card-unactive');
                    }
                })
            }
        }
    });
});





// PRICES ACCORDEON


const pricesCards = document.querySelectorAll('.prices__card');

pricesCards.forEach(elem => {

    elem.addEventListener('click', (e) => {

        if (!e.target.classList.contains('prices__order')) { //if we click on button - left card open

            if (elem.classList.contains('prices__card-active')) {
                elem.classList.remove('prices__card-active')
            } else {
                removeActive()
                elem.classList.add('prices__card-active');
            }

        }
    })
});


function removeActive() {
    pricesCards.forEach(elem => {
        elem.classList.remove('prices__card-active');
    });
}



// CONTACTS SELECT AND CARDS


const contactsMenu = document.querySelector('.contacts__nav'),
    contactsHead = document.querySelector('.contacts__head'),
    contactsMenuItems = document.querySelectorAll('.contacts__city'),
    contactsOverlay = document.querySelector('.contacts__overlay'),
    cardInner = document.querySelector('.card_inner'),
    cityName = document.querySelector('.contacts__name');

let cardNumber = 0;

function toggleContacts() {
    contactsMenu.classList.toggle('contacts__nav-active');
    contactsOverlay.classList.toggle('contacts__overlay-active');
};

contactsHead.addEventListener('click', toggleContacts);

contactsMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleContacts();

        for (let i = 0; i < adressCards.length; i++) {
            if (adressCards[i].city == item.textContent) {
                cardNumber = i;
                break
            }
        }

        renderCard()

        cityName.innerHTML = `${adressCards[cardNumber].city}`
    });
});

contactsOverlay.addEventListener('click', toggleContacts);


contactsMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        contactsHead.style.background = '#C1E698';
        cityName.style.fontSize = '16px';
    }, { once: true });
});

function renderCard() {
    cardInner.innerHTML = `
    <div class="contacts__card">
        <div class="contacts__wrap">
            <div class="contacts__info">City:</div>
            <div class="contacts__text">${adressCards[cardNumber].city}</div>
        </div>

        <div class="contacts__wrap">
            <div class="contacts__info">Phone:</div>
            <div class="contacts__text">${adressCards[cardNumber].phone}</div>
        </div>

        <div class="contacts__wrap">
            <div class="contacts__info">Office adress:</div>
            <div class="contacts__text">${adressCards[cardNumber].officeAdress}</div>
        </div>

        <a href="tel:${adressCards[cardNumber].phone.replace(/ /g, '')}" class="contacts__link" target="_blank">
            <div class="btn contacts__btn">Call us</div>
        </a>
    
    </div>
    `;
}


const adressCards = [
    {
        city: 'Canandaigua, NY',
        phone: '+1  585  393 0001',
        officeAdress: '151 Charlotte Street'
    },
    {
        city: 'New York City',
        phone: '+1  212 456 0002',
        officeAdress: '9 East 91st Street'
    },
    {
        city: 'Yonkers, NY',
        phone: '+1  914 678 0003',
        officeAdress: '511 Warburton Ave'
    },
    {
        city: 'Sherrill, NY',
        phone: '+1  315 908 0004',
        officeAdress: '14 WEST Noyes BLVD'
    },
];
