function gamesCarousel (rowId, start, end){
    let row = document.getElementById(rowId);
    for(let i = start; i < end; i++){
        const cardScroll = document.querySelectorAll(".cardProduct")[i];
        let cards = cardCarousel(cardScroll);
        row.appendChild(cards);
    }
}

function cardCarousel(cardScroll){
    let card = document.createElement("div");
    card.className = "card gameCard";
    card.innerHTML = cardScroll.innerHTML;
    return card;
}

function initialize(rowId){
    let slider= document.getElementById(rowId);
    let row = slider.closest('.gamesRow');
    let prevBtn = row.querySelector('.prev-button');
    let nextBtn = row.querySelector('.next-button');
    currentTranslate=0;
    let scrollAmount = cardWidth*3;

    nextBtn.addEventListener('click', ()=>{
        currentTranslate -= scrollAmount;
        currentTranslate = Math.max(currentTranslate, -slider.scrollWidth + row.offsetWidth);
        slider.style.transform = `translateX(${currentTranslate}px)`;
        slider.style.transition = "all 0.5s ease-in-out";
    });

    prevBtn.addEventListener('click', ()=>{
        currentTranslate += scrollAmount;
        currentTranslate = Math.min(currentTranslate, 0);
        slider.style.transform = `translateX(${currentTranslate}px)`;
        slider.style.transition = "all 0.5s ease-in-out";
    });

    }

    document.addEventListener('DOMContentLoaded', () => {
        gamesCarousel('gamesContainer', 0, 6);
        initialize('gamesContainer');
    });