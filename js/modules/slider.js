function slider({container, slide, nextArrow, prevArror, totalCounter, curentCounter, wrapper, field}){
// **********************************
//           СЛАЙДЕР №2 -карусель


const   slides = document.querySelectorAll(slide),    // слайд
        slider = document.querySelector(container),   //все слайды - с индикаторами и слайдами
        prev = document.querySelector(prevArror),   //кнопка пред
        next = document.querySelector(nextArrow),   //кнопка следующий
        total= document.querySelector(totalCounter),                // общее кол-во слайдов      
        current = document.querySelector(curentCounter),           //индекс текущего слайда
        slidesWrapper = document.querySelector(wrapper), //главная обертка
        slidesField = document.querySelector(field),     //обертка слайдов

        //переменная будет хранить шрину внешнего блока .offer__slider-wrapper,  .match(/\d/g) - возвращает массив чисел, join('') - объединяет числа 
        // width = +(window.getComputedStyle(slidesWrapper).width).match(/\d/g).join('');  
        width = +(window.getComputedStyle(slidesWrapper).width).replace(/\D/g, '');  
        //!!!регулярными выражениями можно было бы еще сделать замену всех НЕ чисел на пустоту
        //width.replace(/\D/g, ''); - такое выражение вернет сразу число

   

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
   
    if(offset == width * (slides.length -1)){
        offset = 0;
    }
    else{
        offset += width;
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
        offset = width * (slides.length -1);
    }
    //если слайд не первый - мы отнимаем ширину слайда
    else{
        offset -= width;
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
        offset = width * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo 
        /*** offset = +width.slice(0, width.length - 2) * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo offset = +width.slice(0, width.length - 2) * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo offset = +width.slice(0, width.length - 2) * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo offset = +width.slice(0, width.length - 2) * (slideTo -1); //устанавливаем смещение - по формуле но число берем = slideTo  
        */
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
       
}
export default slider; 