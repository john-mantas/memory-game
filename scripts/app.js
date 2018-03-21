let fragment = document.createDocumentFragment();
const restartBtn = document.getElementById('restart');
const deck = document.getElementById('deck');
const movesCounter = document.getElementById('moves_counter');
let openCurrent = [];
let move = 0,
    pairs = 0;

// Initializing cards array with transportation icons
// cards = [car, motorcycle, boat, airplane, walk, truck, subway, tram]
const cards = ['&#xE531;', '&#xE91B;', '&#xE532;', '&#xE195;', '&#xE536;', '&#xE558;', '&#xE56F;', '&#xE571;', '&#xE531;', '&#xE91B;', '&#xE532;', '&#xE195;', '&#xE536;', '&#xE558;', '&#xE56F;', '&#xE571;'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Creating the html for the entire deck
function createDeck(cards) {
    deck.innerHTML = '';
    let cardCollection = shuffle(cards);
    for (let i=0;i<cardCollection.length;i++){
        let cardDiv = document.createElement('DIV');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('id', i);
        cardDiv.dataset.card = cardCollection[i];
        fragment.appendChild(cardDiv);
        let frontDiv = document.createElement('DIV');
        frontDiv.classList.add('card__front');
        cardDiv.appendChild(frontDiv);
        let backDiv = document.createElement('DIV');
        backDiv.classList.add('card__back');
        cardDiv.appendChild(backDiv);
        let iconDiv = document.createElement('I');
        iconDiv.classList.add('material-icons');
        iconDiv.innerHTML = cardCollection[i];
        frontDiv.appendChild(iconDiv);
    }
    deck.appendChild(fragment);
}

//Flip the card
function flipCard(card) {
    if (card.classList.contains('card')) {
        card.classList.toggle('open');
    };
};

//Adding which cards are open
function openedCards(card) {
    let cardSum = {
        id: 0,
        content: '0'
    };
    if (card.classList.contains('open') && openCurrent.length<2){
        cardSum.id = card.id;
        cardSum.content = card.dataset.card;
        openCurrent.push(cardSum);
    } 
};

//Check for matching cards
function matchCards() {
    let theyMatch = false;
    if (openCurrent[0].content === openCurrent[1].content) {
        theyMatch = true;
        correctMatch();
        openCurrent = [];
        move++;
        pairs++;
        console.log(theyMatch);
    } else {
        theyMatch = false;
        wrongMatch();
        openCurrent = [];
        move++;
        console.log(theyMatch);
    }
    return theyMatch;
};

//When the cards are matching
function correctMatch() {
    for (let i=0;i<openCurrent.length;i++) {
        document.getElementById(openCurrent[i].id).classList.add('match');
    }
};

//When the cards don't match
function wrongMatch() {
    for (let i=0;i<openCurrent.length;i++) {
        let wrongCard = document.getElementById(openCurrent[i].id);
        wrongCard.classList.add('wrong');
        window.setTimeout(function(){
            flipCard(wrongCard);
            wrongCard.classList.remove('wrong');
        },700);
    }
};

//Moves Counter
function movesCount() {
    movesCounter.textContent = move;
};

//Check how many pairs are made
function pairsCheck() {
    if (pairs === (cards.length/2)){
        document.getElementById('complete_moves').textContent = move;
        toggleScreen('screen_complete', 'is-open');
    }
}

//Display/hide a full screen
function toggleScreen(screenId, isClass) {
    window.setTimeout(function() {
        document.getElementById(screenId).classList.toggle(isClass);
    },1000);
}

//*** HELPERS - Possibly will change !!!
deck.addEventListener('click', function(event) {
    let card = event.target.parentNode;
    
    flipCard(card);
    openedCards(card);
    if (openCurrent.length === 2) {
        matchCards();
        movesCount();
        pairsCheck();
    };
    console.log(openCurrent);
});

restartBtn.addEventListener('click', function() {
    createDeck(cards);
});

document.onload = createDeck(cards);