window.addEventListener('DOMContentLoaded', ()=>{


    //табы
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader');

    // console.log(tabs.length);
    // console.log(tabsContent.length);

function hideTabeContent(){
    tabs.forEach(item=>{
        item.classList.remove('tabheader__item_active');
    })
    tabsContent.forEach(item =>{
        item.style.display = 'none';
    });
}


function showTabContent(i = 0){
    tabsContent[i].style.display = "block";
    tabs[i].classList.add('tabheader__item_active')
// console.log(tabs[i]);
// console.log(tabsContent[i]);
// console.log(i);
}

hideTabeContent();
showTabContent();
    
tabsParent.addEventListener('click', (event)=>{
const target = event.target;
if(target&&target.classList.contains('tabheader__item')){
    tabs.forEach((item, i)=>{
        if(target==item){
            //console.log(item);
            hideTabeContent();
            showTabContent(i);
        } 
    });
}
});
// end табы
// * * * * * * * * * * * * * * * * * 
//таймер
const deadline   = '01 05 2023'; //начальная точка - !месяц - день - год!, строку в таком формате часто возвращают инпуты
//Функция, определяющая разницу между deadline и текущим временем
const tInM = Date.parse(deadline), //парсим строку 
tInUsualFormat =  new Date(tInM); //выводим из миллисек дату
//console.log(tInUsualFormat); 

const data = new Date();
//console.log(data);
function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()), //количество миллисекунд
    days =  Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor - округление до целого числа, (1000 * 60 * 60 * 24) = количество суток
    hours = Math.floor((t / 1000 / 60 / 60) % 24), // 1000*60*60) % 24 - высчитываем часы, обязательно остаток от деления - он покажет округленный часть суток - часы, которые поместим в таймере
    minutes = Math.floor((t / 1000 / 60) % 60), // остаток от деления  показывает минуты
    seconds = Math.floor((t / 1000) % 60); //остаток от деления  показывает секунды
    
//соберем данные в объект
    return {
        'total': t, 
        days, //равносильно  'days': days,
        hours, //равносильно 'hours': hours,
        minutes,  //равносильно  'minutes':minutes,
        seconds   //равносильно  'seconds': seconds
    };
}

//эта функция для исправления формата времени - чтоб всегда показывалось не 1 число а 2 - 0*
function getZero(num){
    if(num >= 0 && num < 10){
        return `0${num}`; //тут уже не число а строка
    }
    else return num;
}

//установка таймера на страницу
function setClock(selector, endtime){
    const timer = document.querySelector(selector), // selector = классу .timer 
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds= timer.querySelector('#seconds'),
    //
    timeInterval = setInterval(updateClock, 1000);
// от мигания версти! - если таймер вверху страницы или пользовательобновит страницу это мигание видно.
//исправить это можно вручную вызвав функцию обновления часов
updateClock();
function updateClock(){
    const t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML =  getZero(t.hours);
    minutes.innerHTML =  getZero(t.minutes);
    seconds.innerHTML =  getZero(t.seconds);
        if(t.total <=0){
            clearInterval(timeInterval);
            days.innerHTML = ' -';
            hours.innerHTML =  ' -';
            minutes.innerHTML =  ' -';
            seconds.innerHTML =  ' -';
        }
    }

}

setClock('.timer', deadline);



// end таймер
// * * * * * * * * * * * * * * * * * 
// модальное окно
 
const modalTrigger = document.querySelectorAll('[data-modal]'), // кнопки вызывающие модальное окно
modal = document.querySelector('.modal'); //само модальное окно
//modalCloseBtn = document.querySelector('[data-close]'); //кнопка закрытия модального окна УДАЛИЛИ для делегирования
 

function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //фиксируем страницу
}

//открытие модального окна
modalTrigger.forEach(btn=>{
btn.addEventListener('click', openModal);
});
//функция для вызова модального окна черезопределенный момент времени




function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //разрешает скроллить страницу вновь
    clearInterval(modalTimerId); //очистит таймер при  открытии модального окна
}

//закрытие модального окна
// modalCloseBtn.addEventListener('click', closeModal); //!! функцию тут не вызвваем ,а просто передаем УДАЛИЛИ для делегирования
   
modal.addEventListener('click', (e)=>{
    if(e.target === modal || e.target.getAttribute('data-close')==""){
        closeModal(); //
     }
    });

document.addEventListener('keydown', (e)=>{
    if(e.code ==='Escape'){  //e.code ==='Escape'  - проверяем кнопку, проверяем открыто ли окно - оно открыто если содержит класс show 
        // && modal.classList.contains('show')
        closeModal(); //
    }

});

//функция для вызова модального окна через ... секунд
// 
const modalTimerId = setTimeout(openModal, 50000);

function showModalByScroll(){
    //window.pageYOffset  - прокрученная часть 
        // + document.documentElement.clientHeight  - видимая часть экрана в данный момент без прокрутки
        // >=document.documentElement.scrollHeight - высота скорлла
    
    if(window.pageYOffset + document.documentElement.clientHeight >=document.documentElement.scrollHeight){
        openModal(); //первый раз показываем модальное окно
        window.removeEventListener('scroll', showModalByScroll); //удаляем обработчик событий
    }
}


    window.addEventListener('scroll', showModalByScroll);



















    // ******************************************
    // КЛАССЫ ДЛЯ КАРТОЧЕК
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector){
            //картинка
            this.src = src;
            this.alt= alt;
            this.title  = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector); //тут именно родитель!
            this.transfer = 10; //тут пока статическое число\
            this.changeToYuan(); //вызов нашего новосозданного метода
        }
        
        changeToYuan(){
            return this.price = this.transfer * this.price;
    
        }
        //метод render - формируетверстку
        render(){
            const element = document.createElement('div');
            
            element.innerHTML =`
                    <div class="menu__item">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                        </div>
                    </div>       
            
            `;
            //добавляем в конец
            this.parent.append(element);
        }
    }

    //функция получения данных для карточек с сервера
    const getResource = async (url) =>{
        // мы делаем запрос по url
        const res = await fetch(url);
        if(!res.ok){
            //добавим объект ошибки 
            // Если мы выбрасываем ошибку в ручном режиме, у нас срабатывает блок кода catch()
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
       //дожидаемся его окончания и ттрансформируем  его в объект
        return await res.json();
    };




    // //ЭТО РАБОЧАЯ ВЕРСИЯ генерации карточек !!!
    // // вызов функции геренации карточек из bd.json на основе класса
    // getResource('http://localhost:3000/menu')
    //     .then(data =>{
    //         data.forEach(({img, alting, title, descr, price}) =>{
    //             new MenuCard(img, alting, title, descr, price, '.menu .container').render();
    //         });
    //     });
     
    //*** БИБЛИОТЕКА Axios
    //переменная axios идет из подключенной библиотеки
    axios.get('http://localhost:3000/menu')
    
     .then(data => {
        //data.data. -потому что мы обращаемся к тем данным, которые получили, а не к общему объекту 
        data.data.forEach(({img, alting, title, descr, price}) =>{
                    new MenuCard(img, alting, title, descr, price, '.menu .container').render();
                });
            });
    
// * * * 
//053
    //forms   - ответы JS_step_13
    const forms = document.querySelectorAll('form'); //ищем все формы по тегу form 
    //message ответы
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! мы скоро с вами свяжемся',
        fail: 'что-то пошло не так'
    };
    //для каждой forms вызываем функцию postData()
    forms.forEach(item =>{
        bindpostData(item);
    });

    //Функция для работы с сервером
    //создадим переменную - postData, отвечающую за отправку данных
    //а в ней агрументы - url - для fetch, и data - данные, которые будут поститься
    //async - означает, что внутри функции у нас будет асинхронный код 
    const postData = async (url, data) =>{
        //в переменную res помещаем возвращенный fetch/чем промиc 
        //настраиваем 
        //парный оператор await - ставиться перед теми операциями, которые необходимо дождаться
        const res = await fetch(url, {
            method: "POST",
            headers: {
                //все будем постит в формате json (тк json-сервер)
                'Content-type': 'application/json'
            },
            //data - данные, которые будут поститься
            body: data
        } );
        //из ф-ции возвращаем res в json формате
        //тут await чтобы получить json из промиса и только потом возратить его из функции
        return await res.json();
    };


    
    //функция постинга данных - bindpostDate с параметром form - для дальнейшей привязки к обработчику событий
    function bindpostData(form){
        //событие submit срабатывает когда мы пытаемся отправить запол форму. 
        //Есть встроенное поведение кнопки формы с типом submit - с перезагрузкой страницы, но мы отключим его для своей программы действий
        form.addEventListener('submit', (e)=>{
            e.preventDefault(); //отмена перезагрузки страницы
            //динамически создаем элемент для сообщения о работе ссистемы
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading; //или можно установить через  setAttribute
            statusMessage.style.cssText =`
                display: block;
                margin: auto;
            `; //стили для спиннера
            //form.append(statusMessage); //добавляем на страницу
            form.insertAdjacentElement('afterend', statusMessage); //добавляем на страницу ПОСЛЕ формы
            //***
           
            
            
       
            //создадим экземпляр объекта formData от параметра form
            const formData = new FormData(form);
            //для преобразования объекта formData в JSON методом entries и fromEntries
            //entries позволит получить данные формы в формате массивов
            //fromEntries - из массива в классический объект
            const json = JSON.stringify(Object.fromEntries(formData.entries())); 
           
              //вызов функции постинга
            postData('http://localhost:3000/requests', json)
            //блок успешного выполнения
                .then(data => {
                //data - данные, которые вернулись из промиса
                console.log(data);
                showThanksModal(message.success); //'Спасибо! мы скоро с вами свяжемся'
                
                statusMessage.remove();
                         // удаляем сообщение  statusMessage 
            })
            //блок обработки ошибок
            .catch(()=>{
                showThanksModal(message.fail); //’что-то пошло не так’
            })
            //блок 
            .finally(()=>{
                form.reset(); //спец метод формы очищающий ее
            });
//
           
        });
    }
//end 053


    //054
    //функция модального окна "Спасибо"
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog'); //находим модальное окно (с текстом)
        prevModalDialog.classList.add('hide'); //скрываем окно имеющимся классом 
        //теперь открываем пустой блок модального окна 
        openModal(); //ф-ция открытия модального окна
        //создание контента модального окна спасибо
        const thanksModal = document.createElement('div'); 
        thanksModal.classList.add('modal__dialog');
        //div class="modal__content" - класс обертка, ✖ - для закрытия, modal-title - заголовок, в которые мы должны поместить состояние загрузки
        //с ✖ созданный динамически не будет реагировать на те действия, которые были созданны для него ранее
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class='modal__close' data-close>✖</div>
                <div class='modal__title'>${message}</div>
        </div>
        `;
        //получаем модальное окно и добавл на страницу
        document.querySelector('.modal').append(thanksModal);
        //удаляем окно-спасибо через 4с
        setTimeout(()=>{thanksModal.remove();
        prevModalDialog.classList.add('show'); //показываем модальное окно
        prevModalDialog.classList.remove('hide'); //удаляем класс сокрытия модальное окно
        closeModal(); //и закрываем модальное окно
        },  4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));





//******************************
//        СЛАЙДЕР #1
//получаем элементы со страницы
// const   slides = document.querySelectorAll('.offer__slide'), //количество слайдов
//         prev = document.querySelector('.offer__slider-prev'),   //кнопка пред
//         next = document.querySelector('.offer__slider-next'),   //кнопка следующий
//         total= document.querySelector('#total'),            // общее кол-во слайдов      
//         current = document.querySelector('#current');       //индекс текущего слайда

//     // индекс, определяющий начальное положение в слайдере 
//     let slideIndex = 1; 
// //первоначальное инициирование слайда
//     showSlides(slideIndex);
// //Подстановка количества файлов
// //total - всего, если меньше 10 то добавляем 0 сначала
// //поместить сюда проверку надо потому, чтобы не мигала при перезагрузке цифра
//     if(slides.length < 0){
//         total.textContent = `0${slides.length}`;
//     }
//     //если больше 10 то оставляем так
//     else{ total.textContent = slides.length;}


//     //функция по показу и сокрытию слайдов
//     //n = slideIndex
//     function showSlides(n){
//         //учет граничного значения - если индекс станет больше длины псевдомассива слайдов
//         if(n > slides.length){
//             slideIndex = 1; //идем в начало слайдов
//         }
//         //учет граничного значения - если индекс станет меньше длины псевдомассива слайдов
//         if(n < 1){
//             slideIndex = slides.length; //идем в конец слайдов
//         }
//         //скрываем все слайды и отображаем нужный
//         slides.forEach(item => item.style.display = 'none'); //скрываем все слайды
//         slides[slideIndex -  1].style.display = 'block'; //показываем слайд с текущим индексом (-1 - мы компенсируем номер)
//         // изменение числа-индекса текущего слайда
//         if(slides.length < 0){
//             current.textContent = `0${slideIndex}`;
//         }
//         //если больше 10 то оставляем так
//         else{ current.textContent = slideIndex}
//     }
//     //функция изменения слайд-индекса
// function plusSlide(n){
//     showSlides(slideIndex += n)
// }
// prev.addEventListener('click', () => {
//     console.log(111111111111);
//     plusSlide(-1);
// });
// next.addEventListener('click', () => {
//     console.log(22222222222);
//     plusSlide(1);
// }); 
//конец слайдера №1

// **********************************
//           СЛАЙДЕР №2 -карусель

const   slides = document.querySelectorAll('.offer__slide'), //количество слайдов
        slider = document.querySelector('.offer__slider'),  //весь слайд - с индикаторами и слайдами
        prev = document.querySelector('.offer__slider-prev'),   //кнопка пред
        next = document.querySelector('.offer__slider-next'),   //кнопка следующий
        total= document.querySelector('#total'),            // общее кол-во слайдов      
        current = document.querySelector('#current'),       //индекс текущего слайда
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), //главная обертка
        slidesField = document.querySelector('.offer__slider-inner'),     //обертка слайдов
        width = window.getComputedStyle(slidesWrapper).width;   //переменная будет хранить шрину внешнего блока .offer__slider-wrapper

//  
   let slideIndex = 1;  //для цифры №слайда в окошке
   let offset = 0; //считает отступ вправо или лево
   //НАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ
   //Номера слайдов для подстановки на страницу - 
   if(slides.length < 0){
    total.textContent = `0${slides.length}`; //итого слайдов
    current.textContent = `0${slideIndex}`;  //текущий
}
//если больше 10 то оставляем так
else{ total.textContent = slides.length; //итого слайдов
    current.textContent = slideIndex;    //текущий
}

slidesField.style.width = 100 * slides.length + '%'; //установим блоку ширину, знак % - для css
slidesField.style.display = 'flex'; //выравниваем все слайды по горизонтали
slidesField.style.transition = '0.5s all';  
slidesWrapper.style.overflow = 'hidden'; //скрываем все "торчащие" из окна слайды

slides.forEach(slide =>{
    slide.style.width = width; //устанавливаем каждому слайду одинаковую ширину
    

});
//доработка ДЛЯ точек
slider.style.position = 'relative';  //установка для всего слайда позиции
const   indicators = document.createElement('ol'), //создаем обертку для точек
        dots  = [];  //создаем массив для точек (которые создадим далее)
indicators.classList.add('carusel-indicator');  //создаем класс
//создаем динамически стили классу carusel-indicator
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`
slider.append(indicators); //добавляем на страницу
//в цикле создаем точку, атрибут и 
for(let i = 0; i < slides.length; i++){//перебираем все точки 
    const dot = document.createElement('li'); //создаем элемент
    dot.setAttribute('data-slide-to', i+1); //добавляем ему атрибут с уникальным номером
    dot.style.cssText  =`
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `
    if(i == 0){
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);   //пушим точки в массив
}





//нажали на кнопку назад
next.addEventListener('click', ()=>{
    //предусматриваем конечный вариант - когда дошли до края - возврашаем слайдер в начаьное положение
    // +width.slice(0, width.length - 2)  - плюс перед width меняет формат на числовой, а метод slice вырезает все нужное - с 0-вого элемента до длина width - 2 последних символа.
    if(offset == +width.slice(0, width.length - 2) * (slides.length -1)){
        offset = 0;
    }
    else{
        offset += +width.slice(0, width.length - 2);
    }
    caruselMove(offset); //смещаем карусель слайдов
   
    //меняем индекс слайда
    if(slideIndex == slides.length){ //если мы дошли до конца - то иди в слайд номер 1
        slideIndex = 1;
    }
    else{
        slideIndex++; //или +1 слайд
    }
    
    currentSl(slides.length, current, slideIndex); // изменение текущего индикатора
    dotActive(slideIndex); //выделение активной точки
   
});

//нажали на кнопку назад
prev.addEventListener('click', ()=>{
    //предусматриваем граничный вариант - когда дошли до первого -то следующим возврашаем слайдер в конечное, последее положение
    //если offset равен 0, (причем мы сравниваем ==, а не присваиваем =)
    // +width.slice(0, width.length - 2)  - плюс перед width меняет формат на числовой, а метод slice вырезает все нужное - с 0-вого элемента до длина width - 2 последних символа.
    if(offset == 0){
        //то в offset записываем последний слайд
        offset = +width.slice(0, width.length - 2) * (slides.length -1);
    }
    //если слайд не первый - мы отнимаем ширину слайда
    else{
        offset -= +width.slice(0, width.length - 2);
    }

    caruselMove(offset); //смещаем карусель слайдов

    //изменение индекса текущего слайда
    if(slideIndex == 1){ //если мы на первом слайде - то иди в последний слайд
        slideIndex = slides.length;
    }
    else{
        slideIndex--; //или -1 слайд
    }
    currentSl(slides.length, current, slideIndex); // изменение текущего индикатора
    dotActive(slideIndex); //выделение активной точки
   
});
   
//Перещелкивание слайдов при нажатии на точку
dots.forEach(dot =>{
    dot.addEventListener('click', (e) =>{
        //будет получать атрибут 'data-slide-to', i+1) с уникальным номером
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo; //устанавливаем слайд индекс
        offset = +width.slice(0, width.length - 2) * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo 
        caruselMove(offset); //смещаем карусель слайдов
      
        currentSl(slides.length, current, slideIndex); // изменение текущего индикатора
        dotActive(slideIndex); //выделение активной точки

    })
})

function dotActive(ind){ //выделение активной точки
    dots.forEach(dot => dot.style.opacity = '0.5'); //стили точкам - всем
    dots[ind -1].style.opacity = '1';    //стиль активной точке
};

function caruselMove(moveStep){ //расчет сдвига карусели
    slidesField.style.transform = `translateX(-${moveStep}px)`; //смещаем карусель слайдов
}

function currentSl(slLenght, cur, slIn){
        // изменение текущего индикатора
        if(slLenght < 10){
            cur.textContent = `0${slIn}`; //с подставлением 0 для однозначного числа
        }
        else{
            cur.textContent = slIn; //для двухзначного числа
        }

}
        













    // end
});


