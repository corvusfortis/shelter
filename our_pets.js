import pets from './pets.js';


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

    const wrapper = document.querySelector('.friends__cards');
    const modal = document.querySelector('.pets__modal');
    const blackout = document.querySelector('.blackout');

    function showModal(event){
        let name = event.target.closest('.friends__card').querySelector('.friends__card-title').textContent;
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

(function(){
    
    const names = document.querySelectorAll('.friends__card-title');
    const pics = document.querySelectorAll('.friends__card-image');
    const leftPointer = document.querySelector('#left');
    const rightPointer = document.querySelector('#right');
    const leftDblPointer = document.querySelector('#left-dbl');
    const rightDblPointer = document.querySelector('#right-dbl');
    const pagNum = document.querySelector('.friends__page-num');
    let param = 8;
    

    if(window.innerWidth <= 320){
        param = 3;
    }else if(window.innerWidth <= 768){
        param = 6;
    }

    let num = 1;
    let arr = [];
    let base = [];

    function createArray(){
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7];
        let result = [];

        // for(let i = 0; i < param; i++){
        //     indexes.push(i);
        // }

        // console.log(indexes);
        

        for(let i = 0; i < 6; i++){
            indexes.sort(() => 0.5 - Math.random());
            result.push(...indexes);
        }

        return result;

    }

    function sliceArr(n){
        let temp = [];

        for (let i = 0; i < 48; i += param) {
            temp.push(n.slice(i, i + param));
        }

        n = temp;

        return n;
    }

    function setParam(){
        if(window.innerWidth <= 320){
            param = 3;
        }else if(window.innerWidth <= 768){
            param = 6;
        }else{
            param = 8;
        }
    }

    function fillFriends(){


        for(let i = 0; i < param; i++){
           pics[i].src = pets[arr[num - 1][i]].img;
           pics[i].alt = pets[arr[num - 1][i]].name;
           names[i].textContent = pets[arr[num - 1][i]].name;
        }
    }

    function refill(){
        leftDblPointer.click();



        arr = base;
        arr = sliceArr(arr);
        fillFriends();
    }

    base = createArray();
    arr = base;
    console.log(arr);
    arr = sliceArr(arr);
    console.log(arr);
    fillFriends();



    function goLeft(){
        num > 1 ? num-- : num;

        pagNum.textContent = num;

        if(num === 1){
            leftDblPointer.classList.add('pointer__greyed');
            leftDblPointer.disabled = true;
            leftPointer.classList.add('pointer__greyed');
            leftPointer.disabled = true;
        }else if(num === (48 / param) - 1){
            rightDblPointer.classList.remove('pointer__greyed');
            rightDblPointer.disabled = false;
            rightPointer.classList.remove('pointer__greyed');
            rightPointer.disabled = false;
        }

        pagNum.textContent = num;
        fillFriends();

    }

    function goRight(){
        num < (48 / param) ? num++ : num;

        pagNum.textContent = num;

        if(num === 2){
            leftDblPointer.classList.remove('pointer__greyed');
            leftDblPointer.disabled = false;
            leftPointer.classList.remove('pointer__greyed');
            leftPointer.disabled = false;
        }else if(num === 48 / param){
            rightDblPointer.classList.add('pointer__greyed');
            rightDblPointer.disabled = true;
            rightPointer.classList.add('pointer__greyed');
            rightPointer.disabled = true;
        }

        pagNum.textContent = num;
        fillFriends();

    }

    function toTheVeryBeginning(){

        num = 1;
        pagNum.textContent = num;


        leftDblPointer.classList.add('pointer__greyed');
        leftDblPointer.disabled = true;
        leftPointer.classList.add('pointer__greyed');
        leftPointer.disabled = true;

        rightDblPointer.classList.remove('pointer__greyed');
        rightDblPointer.disabled = false;
        rightPointer.classList.remove('pointer__greyed');
        rightPointer.disabled = false;

        pagNum.textContent = num;
        fillFriends();
    }

    function toTheEdge(){

        num = 48 / param;
        pagNum.textContent = num;

        rightDblPointer.classList.add('pointer__greyed');
        rightDblPointer.disabled = true;
        rightPointer.classList.add('pointer__greyed');
        rightPointer.disabled = true;

        leftDblPointer.classList.remove('pointer__greyed');
        leftDblPointer.disabled = false;
        leftPointer.classList.remove('pointer__greyed');
        leftPointer.disabled = false;

        pagNum.textContent = num;
        fillFriends();
    }

    leftPointer.addEventListener('click', goLeft);
    rightPointer.addEventListener('click', goRight);
    leftDblPointer.addEventListener('click', toTheVeryBeginning);
    rightDblPointer.addEventListener('click', toTheEdge);
    window.addEventListener('resize', refill);
    window.addEventListener('resize', setParam);

    // window.addEventListener('load', fillFriends);

})();