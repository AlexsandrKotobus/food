    //Функция для работы с сервером
    //создадим переменную - postData, отвечающую за отправку данных
    //а в ней агрументы - url - для fetch, и data - данные, которые будут поститься
    //async - означает, что внутри функции у нас будет асинхронный код 
    const postData = async (url, data) =>{
        //в переменную res помещаем возвращенный fetch/чем промиc 
        //настраиваем 
        //парный оператор await - ставиться перед теми операциями, которые необходимо дождаться
        let res = await fetch(url, {
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

        //функция получения данных для карточек с сервера
        async function getResource (url){
            // мы делаем запрос по url
            let res = await fetch(url);
            if(!res.ok){
                //добавим объект ошибки 
                // Если мы выбрасываем ошибку в ручном режиме, у нас срабатывает блок кода catch()
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
           //дожидаемся его окончания и ттрансформируем  его в объект
            return await res.json();
        };

    export {postData};
    export {getResource};