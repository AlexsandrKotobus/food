import { closeModal, openModal } from "./modal";
import { postData } from "../services/services"; 

function forms(formSelector, modalTimerId){ //добавляем аргументы вместо селектора и +таймер-аргумент
    //forms 
    const forms = document.querySelectorAll(formSelector); //ищем все формы по переданному аргументу-селектору
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
        openModal('.modal', modalTimerId); //ф-ция открытия модального окна - с агрументами селектор, и идентификатор таймера
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
        closeModal('.modal'); //и закрываем модальное окно по селектору
        },  4000);
    }


}

export default forms; 