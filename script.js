const diffButton = document.querySelectorAll('.difficulty')
const gameStartView = document.querySelector('.startGame')
const playground = document.querySelector('.playground')
const winView = document.querySelector('.winner')

const cardWrapArray = []
const cardInnerArray = []
const cardBackArray = []
const cardImageArray = []

let numOfCards
let inRow

window.addEventListener('resize', setSize)

for (const button of diffButton) {
    button.addEventListener('click', () => createGame(button.textContent))
}

function createGame(difficulty){

    switch(difficulty){
        case 'Easy': numOfCards=8, inRow=3; break;
        case 'Medium': numOfCards=16, inRow=4; break;
        case 'Hard': numOfCards=36, inRow=6; break;
    }

    gameStartView.style.display = 'none'

    for(q=0; q<numOfCards; q++){
        
        //create cardWrap and set its width and height according to numberofcards
        cardWrap = document.createElement('div')
        cardWrap.classList.add('cardWrap')
        playground.appendChild(cardWrap)
        cardWrapArray.push(cardWrap)

        //create cardWrapInner
        const cardInner = document.createElement('div')
        cardInner.classList.add('cardWrap-inner')
        cardWrap.appendChild(cardInner)
        cardInnerArray.push(cardInner)

        //create front of the card and add '?' to it
        const cardFront = document.createElement('div')
        cardFront.innerHTML = "?"
        cardFront.classList.add('cardWrap-front')
        cardInner.appendChild(cardFront)

        //create back of the card
        const cardBack = document.createElement('div')
        cardBack.classList.add('cardWrap-back')
        cardInner.appendChild(cardBack)
        cardBackArray.push(cardBack)

        //create image
        const cardImage = document.createElement('img')
        cardImage.classList.add('cardImage')
        cardBack.appendChild(cardImage)
        cardImageArray.push(cardImage)
    }
    setSize()

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
    startGame(cardWrapArray, cardImageArray, cardInnerArray)
}

function startGame(wrap, image, inner){
    let movesCount = 0
    let oneCardFlipped = false
    let cardsInMove = false
    for(let w=0; w<wrap.length; w++){
        wrap[w].addEventListener('click', clicked)

        function clicked(){
            if(!cardsInMove){
                //flip the card
                inner[w].classList.add('flip')
                //if none of the cards are flipped
                if(!oneCardFlipped){
                    oneCardFlipped = true
                    card1index = w
                }
                //if one card is flipped
                else if(oneCardFlipped && card1index!=w){
                    movesCount++
                    setTimeout(()=>{document.querySelector('.movesCount').innerHTML = movesCount},1000)
                    card2index = w
                    //if they are the same make them transparent in 1 second
                    if(image[card1index].src == image[card2index].src){
                        cardsInMove = true
                        setTimeout(()=>{
                            wrap[card1index].classList.add('guessed')
                            wrap[card2index].classList.add('guessed')
                            //check if the all cards are guessed
                            winner = true
                                for (const card of wrap) {
                                    if(!(card.classList.contains('guessed'))){
                                        winner = false
                                    }
                                }
                                if(winner){
                                    winView.style.display = 'flex'
                                }
                            cardsInMove = false
                        },1000)
                        oneCardFlipped=false
                        
                    }
                    //if they are not the same flip them back afrer 1 second
                    else if(image[card1index].src != image[card2index].src){
                        cardsInMove = true
                        setTimeout(()=>{
                            inner[card1index].classList.remove('flip')
                            inner[card2index].classList.remove('flip')
                            cardsInMove = false
                        },1000)
                        oneCardFlipped=false
                    }
                }
            }
        }
    }
}

function setSize(){
    gameWidth = document.querySelector('.playground').clientWidth

    let gapSize
    if(cardWrapArray.length!=8){
        gapSize = (Math.sqrt(cardWrapArray.length)+1)*10
    }
    else{
        gapSize = 40
    }

    let cardSize = ((gameWidth-gapSize)/inRow) + 'px'
    for (const card of cardWrapArray) {
        card.style.width = cardSize
    }
}

document.querySelector('.restart').addEventListener('click', ()=>{

    gameStartView.style.display = 'flex'
    winView.style.display = 'none'
        while(playground.firstChild){
            playground.removeChild(playground.lastChild)
        }
})