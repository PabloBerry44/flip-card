const diffButton = document.querySelectorAll('.difficulty')
const gameStartView = document.querySelector('.startGame')
const playground = document.querySelector('.playground')

for (const button of diffButton) {
    button.addEventListener('click', () => createGame(button.textContent))
}

function createGame(difficulty){
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

        const cardImage = document.createElement('img')
        cardImage.classList.add('cardImage')

        playground.appendChild(cardWrap)
        cardWrap.appendChild(cardWrapInner)
        cardWrapInner.appendChild(cardWrapFront)
        cardWrapInner.appendChild(cardWrapBack)
        cardWrapBack.appendChild(cardImage)

        if(numOfCards==8 && q==4){
            cardWrap.style.transform = 'translateY(211px)'
        }
    }

    //place images on the cards

    let savedCardIndexes = []
    let savedImageIndexes = []
    let imageIndex = Math.floor(Math.random() * (numOfCards/2))
    let cardIndex = 0
    const cardImages = document.querySelectorAll('.cardImage')
    for(e=0; e<numOfCards; e++){

        if(e%2==0){
            while(savedImageIndexes.includes(imageIndex)){
                imageIndex = Math.floor(Math.random() * (numOfCards/2))
            }
            savedImageIndexes.push(imageIndex)
        }

        while(savedCardIndexes.includes(cardIndex)){
            cardIndex = Math.floor(Math.random() * numOfCards)
        }
        savedCardIndexes.push(cardIndex)

        cardImages[cardIndex].src = './card_images/img'+imageIndex+'.webp'
    }

    startGame()
}

function startGame(){
    const cards = document.querySelectorAll('.cardWrap')

    let flipCount = 0
    for (const card of cards) {
        card.addEventListener('click', ()=>{

            card.children[0].classList.add('flip')

            if(flipCount==0){
                srcAttribute1 = card.children[0].children[1].children[0].src
                flipCount++
            }
            else if(flipCount==1){
                if(srcAttribute1 == card.children[0].children[1].children[0].src){
                    for (const card of cards) {
                        if(card.children[0].classList.contains('flip')){
                            setTimeout(()=>{
                                card.style.opacity = '0.3'
                            },1000)
                            
                        }
                    }
                }
                else{
                    for (const card of cards) {
                        if(card.children[0].classList.contains('flip') && card.style.opacity!='0.3')
                        setTimeout(()=>{
                            card.children[0].classList.remove('flip')
                        },1000)
                        flipCount=0
                    }
                }
            }
        })
    }
}