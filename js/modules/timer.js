function timer(){
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
}
module.exports = timer();