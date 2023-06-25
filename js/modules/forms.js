function forms(){

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

}

module.exports = forms; 