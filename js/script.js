import tabs  from './modules/tabs';
import calc   from './modules/calc';
import cards  from './modules/cards';
import forms  from './modules/forms';
import modal  from './modules/modal';
import slider  from './modules/slider';
import timer  from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', ()=>{
//функция для вызова модального окна через ... секунд
//переменная которая записывает в себя уникальный идентификатор таймер, который будет выполнен 
//через определенный проомежуток времени и тут будет запускаться функция openModal
const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 2000);   

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    cards();
    forms('form', 'modalTimerId'); 
    modal('[data-modal]', '.modal', 'modalTimerId'); 
    slider({
        nextArrow: '.offer__slider-next',
        prevArror: '.offer__slider-prev',
        container: '.offer__slider',
        slide: '.offer__slide',
        totalCounter: '#total',
        curentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    }); //передаем настройки, которые деструктуризировались в slider.js Порядок свойчтв НЕ имеет значения
    timer('.timer', '06 30 2023' );
    
});



