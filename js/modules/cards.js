function cards(){
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
    //ЭТО РАБОЧАЯ ВЕРСИЯ генерации карточек !!!
    // вызов функции геренации карточек из bd.json на основе класса
    getResource('http://localhost:3000/menu')
        .then(data =>{
            data.forEach(({img, alting, title, descr, price}) =>{
                new MenuCard(img, alting, title, descr, price, '.menu .container').render();
            });
        });

}
// //*** БИБЛИОТЕКА Axios
//     //переменная axios идет из подключенной библиотеки
//     axios.get('http://localhost:3000/menu')
    
//      .then(data => {
//         //data.data. -потому что мы обращаемся к тем данным, которые получили, а не к общему объекту 
//         data.data.forEach(({img, alting, title, descr, price}) =>{
//                     new MenuCard(img, alting, title, descr, price, '.menu .container').render();
//                 });
//             });
module.exports = cards;