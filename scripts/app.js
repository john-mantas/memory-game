let fragment = document.createDocumentFragment();
const restartBtn = document.getElementById('restart');
const deck = document.getElementById('deck');

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


//*** HELPERS - Possibly will change !!!
deck.addEventListener('click', function(event) {
    if (event.target.parentNode.classList.contains('card')) {
        event.target.parentNode.classList.toggle('open');
    };
});

restartBtn.addEventListener('click', function() {
    createDeck(cards);
});

document.onload = createDeck(cards);