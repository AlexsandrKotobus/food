function modal(){
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





}
module.exports = modal(); 