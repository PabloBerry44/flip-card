const diffButton = document.querySelectorAll('.difficulty')
const gameStartView = document.querySelector('.startGame')
const playground = document.querySelector('.playground')

for (const button of diffButton) {
    button.addEventListener('click', () => startGame(button.textContent))
}

function startGame(difficulty){
    let numOfCards
    let gapsSize
    let inRow
    switch(difficulty){
        case 'Easy': numOfCards=8, gapsSize=40, inRow=3; break;
        case 'Medium': numOfCards=16, gapsSize=50, inRow=4; break;
        case 'Hard': numOfCards=36, gapsSize=60, inRow=6; break;
    }

    gameStartView.style.opacity = 0
    setTimeout(()=>{gameStartView.style.display = 'none'}, 100)

    for(q=0; q<numOfCards; q++){
        
        cardWrap = document.createElement('div')
        cardWrap.classList.add('cardWrap')
        cardWrap.style.width = ((650-gapsSize)/inRow) + 'px'
        cardWrap.style.height = ((650-gapsSize)/inRow) + 'px'

        const cardWrapInner = document.createElement('div')
        cardWrapInner.classList.add('cardWrap-inner')

        const cardWrapFront = document.createElement('div')
        cardWrapFront.innerHTML = "?"
        cardWrapFront.classList.add('cardWrap-front')

        const cardWrapBack = document.createElement('div')
        cardWrapBack.classList.add('cardWrap-back')

        playground.appendChild(cardWrap)
        cardWrap.appendChild(cardWrapInner)
        cardWrapInner.appendChild(cardWrapFront)
        cardWrapInner.appendChild(cardWrapBack)

        if(numOfCards==8 && q==4){
            console.log('es')
            cardWrap.style.transform = 'translateY(211px)'
        }

        cardWrap.addEventListener('click', ()=>{
            if(cardWrapInner.classList.contains('flip')){
                cardWrapInner.classList.remove('flip')
            }
            else{
                cardWrapInner.classList.add('flip')
            }
        })
    }

}