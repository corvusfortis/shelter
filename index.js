import pets from './pets.js';

//burger menu start


(function(){

    let burgerIcon = document.querySelector('.header__navbar-burger');
    let burgerMenu = document.querySelector('.header__navbar');
    let blackout = document.querySelector('.blackout');
    let navlinks = document.querySelectorAll('.navlink');

function toggleMenu(){
    burgerIcon.classList.toggle('rotate__burger');
    burgerMenu.classList.toggle('navbar__shown');
    blackout.classList.toggle('invisible');
    document.querySelector('body').classList.toggle('stop__scroll');
}

function removeMenu(){
    burgerIcon.classList.remove('rotate__burger');
    burgerMenu.classList.remove('navbar__shown');
    blackout.classList.add('invisible');
    document.querySelector('body').classList.remove('stop__scroll');
}


burgerIcon.addEventListener('click', toggleMenu);
navlinks.forEach(e => e.addEventListener('click', removeMenu));
document.querySelector('.blackout').addEventListener('click', removeMenu);
})();


(function(){

    let currentPack = [];
    let nextPack = [];
    let prevPack = [];

    function fillPack(pack){
        let num = Math.floor(Math.random() * 8);

        for(let i = 0; i < 3; i++){
            while(pack.some(e => e === num) || currentPack.some(e => e === num)){
                num = Math.floor(Math.random() * 8);
            }
            
            pack.push(num);
            
        }

    }

    fillPack(currentPack);
    fillPack(nextPack);
    fillPack(prevPack);

    const cardContainers = document.querySelectorAll('.pets__card-container');
    const scrollBtns = document.querySelectorAll('.scroll-btn');
    
    function fillContainer(container, pack){
            let names = container.querySelectorAll('.pets__card-title');
            let pics = container.querySelectorAll('.pets__card-image');

            for(let i = 0; i < 3; i++){
               pics[i].src = pets[pack[i]].img;
               pics[i].alt = pets[pack[i]].name;
               names[i].textContent = pets[pack[i]].name;
            }
    }

    function initialFill(){
        fillContainer(cardContainers[0], prevPack);
        fillContainer(cardContainers[1], currentPack);
        fillContainer(cardContainers[2], nextPack);
    }

    function moveSlider(event){
                if(event.target.classList.contains('pets__cards-left') || event.target.alt === "left"){
                    cardContainers.forEach(e => e.classList.add('transition-left'));
                }else{
                    cardContainers.forEach(e => e.classList.add('transition-right'));
                    
                }
            }

    function cycleSlider(event){
        if(event.target.classList.contains('transition-left')){
            cardContainers[2].innerHTML = cardContainers[1].innerHTML;
            cardContainers[1].innerHTML = cardContainers[0].innerHTML;
            currentPack = prevPack;
            prevPack = [];
            console.log(currentPack);
            fillPack(prevPack);
            console.log(prevPack);
            fillContainer(cardContainers[0], prevPack);
        }else if(event.target.classList.contains('transition-right')){
            cardContainers[0].innerHTML = cardContainers[1].innerHTML;
            cardContainers[1].innerHTML = cardContainers[2].innerHTML;
            currentPack = nextPack;
            console.log(currentPack);
            nextPack = [];
            fillPack(nextPack);
            console.log(nextPack);
            fillContainer(cardContainers[2], nextPack);
            
        }
            cardContainers.forEach(e => e.classList.remove('transition-left'));
            cardContainers.forEach(e => e.classList.remove('transition-right'));


    }

    window.addEventListener('load', initialFill);
    scrollBtns.forEach(e => e.addEventListener('click', moveSlider));
    cardContainers.forEach(e => e.addEventListener('animationend', cycleSlider));
})();

(function(){

    const wrapper = document.querySelector('.pets__card-container-wrapper');
    // const cardsContainer = document.querySelectorAll('.pets__card-container');
    // const cards = document.querySelectorAll('.pets__card');
    const modal = document.querySelector('.pets__modal');
    const blackout = document.querySelector('.blackout');

    function showModal(event){
        let name = event.target.closest('.pets__card').querySelector('.pets__card-title').textContent;
        console.log(name);

        let pet;

        pets.forEach(e => {
            if(e.name === name){
                pet = e;
            }
        })

        console.log(pet);

        document.querySelector('.pets__modal-image').src = pet.img;
        document.querySelector('.pets__modal-image').alt = pet.name;
        document.querySelector('.pets__modal-header').textContent = pet.name;
        document.querySelector('.pets__modal-subheader').textContent = pet.type + ' - ' +pet.breed;
        document.querySelector('.pets__modal-content').textContent = pet.description;
        document.querySelector('#age').textContent = pet.age;
        document.querySelector('#ino').textContent = pet.inoculations;
        document.querySelector('#dis').textContent = pet.diseases;
        document.querySelector('#para').textContent = pet.parasites;


        modal.classList.remove('disabled');
        blackout.classList.remove('invisible');
        document.querySelector('body').classList.add('stop__scroll');
    }

    function hideModal(){
        modal.classList.add('disabled');
        blackout.classList.add('invisible');
        document.querySelector('body').classList.remove('stop__scroll');
    }

    // cards.forEach(e => e.addEventListener('click', showModal));
    wrapper.addEventListener('click', showModal);
    blackout.addEventListener('click', hideModal);
    document.querySelector('.modal-close').addEventListener('click', hideModal);





})();


