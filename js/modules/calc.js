function calc(){
// * * * * * * * * 
// К А Л Ь К У Л Я Т О Р 
const result = document.querySelector('.calculating__result span'); //получаем место где будет записан результат


//переменные для хранения данных - пока без дефолтных значений
let sex, height, weight, age, ratio; //

 //добавляем проверку - есть ли данные по умолчанию sex в localStorage и если есть - устанавливаем их по дефолту
if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
} else {
    //вручную задаем дефолтные значения
    sex = 'female';
    localStorage.setItem('sex', 'female');  //и устанавливаем дефолтное значение
};
 //добавляем проверку - есть ли данные по умолчанию ratio в localStorage и если есть - устанавливаем их по дефолту
 if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
} else {
    //вручную задаем дефолтные значения
    ratio = '1.375';
    localStorage.setItem('ratio', '1.375');  //и устанавливаем дефолтное значение
};
//функция для задания класса активности дефолтным элементам
function initLocalSettings(selector, activeClass){
    //
    const elements = document.querySelectorAll(selector); //поиск элементов
    elements.forEach(elem => { //перебираем элементы
        elem.classList.remove(activeClass); //убираем класс активности у всех элементов
        if(elem.getAttribute('id') === localStorage.getItem('sex')){ //и если элемент c определенным id строго равен значению из localStorage 
            elem.classList.add(activeClass); //то этому диву мы добавляем класс активности
        }
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){ //если элемент с определенным атрибутом строго равен значению из localStorage 
            elem.classList.add(activeClass); //добавляем класс активности
        }
    });
}
                            
initLocalSettings('#gender div', 'calculating__choose-item_active'); //вызов по селектору + div по id
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); //вызов по селектору + div  по data-ratio
  


function calcTotal(){
    //проверка введенных данных - если хотябы одного из этих значений нет
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent ="мало данных";
        return; //выход из калькулятора
    }
    //если данные есть - 
    //расчет для женщин и мужчин
    if(sex === 'female'){
        result.textContent = Math.round((447.6 + (9.2 *  weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else{
        result.textContent =  Math.round((88.36 + (13.4 *  weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

}

 calcTotal();  //
//получение данных элементов
function getStaticInformation(selector, activeClass){
    //получаем элементы внутри родительского блока - 
    const elements = document.querySelectorAll(selector); //ищем по селектору элементы
    // console.log(`${parentSelector} div`);
    console.log('calcTotal elements'); console.log(elements);
//перебираем элементы //раньше было делегирование событий - но ему мешало межблоковые промежутки
    elements.forEach(elem =>{
        elem.addEventListener('click', (e) =>{
            //если у блока есть атрибут data-ratio - то берем его значение, если такого атрибута нет - берем id
            //e.target - объект события 
            if(e.target.getAttribute('data-ratio')){ //если атрибут есть
                ratio = +e.target.getAttribute('data-ratio'); //мы получаем его значение
                //записываем данные в localStorage = ключ ratio, значение - выбранное поле +e.target.getAttribute('data-ratio')
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id'); //если нет атрибута берем id 
                //записываем данные в localStorage = ключ sex, значение - выбранное поле e.target.getAttribute('id')
                localStorage.setItem('sex', e.target.getAttribute('id')); 
            }
            
            console.log(ratio, sex, height, weight, age); //для проверки
            //работа с классами активности
            elements.forEach(elem =>{ //сначала перебираем все 
                elem.classList.remove(activeClass); //и удаляем у всех элементов класс активности
            });
            e.target.classList.add(activeClass); //добавляем класс активности объекту событий
            calcTotal(); //вызов главной функции для пересчета
        });
        
    });
}
//вызов метода выбора с 2ми разными (строка 1 и строка 3) селекторами и div!!!
getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

//функция по получению данных с инпута
function getDinamucInformation(selector){
    const input = document.querySelector(selector); //получаем инпут
    //событие ввода данных
    input.addEventListener('input', () =>{
        //проверка на корректность данных
        if(input.value.match(/\D/g)){
            input.style.border = '1px solid red';
        }
        else{
            input.style.border = 'none';
        }
        //надо сделать проверку - какому атрибуту соответствует инпут, такое значение и присвоить.
        switch(input.getAttribute('id')){
            case 'height':
                height = +input.value;
                break;
            case 'weight' :
                weight = +input.value;
                break;
            case 'age' :
                age = +input.value;
                break;
        }
        calcTotal(); //вызов главной функции для прересчета
    });
    
}
// вызываем функцию с тремя разными селекторами

getDinamucInformation('#height');
getDinamucInformation('#weight');
getDinamucInformation('#age');


}
module.exports = calc; 