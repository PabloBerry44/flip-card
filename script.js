const innerFlip = document.querySelector('.cardWrap-inner')
let flipped = false

innerFlip.addEventListener('click', ()=>{
    if(flipped){
        innerFlip.classList.remove('flip')
        flipped = false
    }
    else{
        innerFlip.classList.add('flip')
        flipped = true
    }
})