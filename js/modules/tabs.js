// ТАБЫ
function tabs(){
        //табы
        const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');
    function hideTabeContent(){
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        })
        tabsContent.forEach(item =>{
            item.style.display = 'none';
        });
    }
    function showTabContent(i = 0){
        tabsContent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabeContent();
    showTabContent();
        
    tabsParent.addEventListener('click', (event)=>{
    const target = event.target;
    if(target&&target.classList.contains('tabheader__item')){
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

module.exports = tabs; 