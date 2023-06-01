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
        //в переменную res помещаем возвращенный fetch/чем промис
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




    // end
});


