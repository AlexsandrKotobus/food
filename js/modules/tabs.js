// ТАБЫ
function tabs(tabsSelector, tabsContentSeelctor, tabsParentSelector, activeclass){
        //табы - агрументы пункты меню для переключения, тексты, весь блок меню, класс активности
        const tabs = document.querySelectorAll(tabsSelector), //меню-для переключения
        tabsContent = document.querySelectorAll(tabsContentSeelctor), //текстовая часть
        tabsParent = document.querySelector(tabsParentSelector); //блок с меню для переключения
    function hideTabeContent(){
        tabs.forEach(item=>{
            item.classList.remove(activeclass); //класс активности
        })
        tabsContent.forEach(item =>{
            item.style.display = 'none';
        });
    }
    function showTabContent(i = 0){
        tabsContent[i].style.display = "block";
        tabs[i].classList.add(tabsParentSelector)
    }

    hideTabeContent();
    showTabContent();
        
    tabsParent.addEventListener('click', (event)=>{
    const target = event.target;
    if(target&&target.classList.contains(tabsSelector.slice(1))){ //! класс активности минус точка
        tabs.forEach((item, i)=>{
            if(target==item){
                //console.log(item);
                hideTabeContent();
                showTabContent(i);
            } 
        });
    }
    });
}

export default  tabs; 