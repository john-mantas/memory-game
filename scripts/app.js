const newGameStart = document.getElementById('start_new_game');
const aboutStart = document.getElementById('start_about');
const aboutClose = document.getElementById('modal_about_close');
const menuGame = document.getElementById('menu_game');
const pauseBtn = document.getElementById('pause');
const restartBtn = document.getElementById('restart');
const movesCounter = document.getElementById('moves_counter');
const starsCounter = document.getElementById('stars_rating');
const timerSeconds = document.getElementById('timer_seconds');
const timerMinutes = document.getElementById('timer_minutes');
const deck = document.getElementById('deck');
const newGameComplete = document.getElementById('complete_new_game');
const homeComplete = document.getElementById('complete_home');
let fragment = document.createDocumentFragment();
let openCurrent = [];
let move = 0,
    stars = 0,
    pairs = 0,
    timer =0,
    seconds = 0,
    minutes = 0;
let paused = false;

/**
* @constant {array} cards
*/
// Initializing cards array with transportation icons
// cards = [car, motorcycle, boat, airplane, walk, truck, subway, tram]
const cards = ['&#xE531;', '&#xE91B;', '&#xE532;', '&#xE195;', '&#xE536;', '&#xE558;', '&#xE56F;', '&#xE571;', '&#xE531;', '&#xE91B;', '&#xE532;', '&#xE195;', '&#xE536;', '&#xE558;', '&#xE56F;', '&#xE571;'];

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {Array} array - Array containing the cards icons
* @returns {Array} - Shuffled array of the cards icons 
*/
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

/**
* @description Creating the html for the entire deck
*/
function createDeck() {
    deck.innerHTML = '';
    let cardCollection = shuffle(cards);
    for (let i=0;i<cardCollection.length;i++) {
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
    startTimer();
}

/**
* @description Flip the card
*/
function flipCard(card) {
    if (card.classList.contains('card')) {
        card.classList.toggle('open');
    }
}

/**
* @description Adding which cards are open
* @param {node} card - Card element
*/
function openedCards(card) {
    let cardSum = {
        id: 0,
        content: '0'
    };
    if (card.classList.contains('open') && openCurrent.length<2) {
        cardSum.id = card.id;
        cardSum.content = card.dataset.card;
        openCurrent.push(cardSum);
    } 
}

/**
* @description Check for matching cards
*/
function matchCards() {
    if (openCurrent[0].content === openCurrent[1].content) {
        correctMatch();
        openCurrent = [];
        move++;
        starRating();
        pairs++;
        pairsCheck();
    } else {
        wrongMatch();
        openCurrent = [];
        move++;
        starRating();
    }
}

/**
* @description When the cards are matching
*/
function correctMatch() {
    for (let i=0;i<openCurrent.length;i++) {
        document.getElementById(openCurrent[i].id).classList.add('match');
    }
}

/**
* @description When the cards don't match
*/
function wrongMatch() {
    for (let i=0;i<openCurrent.length;i++) {
        let wrongCard = document.getElementById(openCurrent[i].id);
        wrongCard.classList.add('wrong');
        window.setTimeout(function(){
            flipCard(wrongCard);
            wrongCard.classList.remove('wrong');
        },700);
    }
}

/**
* @description Moves Counter
* @param {number} m - Total moves count
*/
function movesCount(m) {
    movesCounter.textContent = m;
}

/**
* @description Star rating system
*/
function starRating() {
    if (move >= 26) {
        starsCounter.firstElementChild.nextElementSibling.innerHTML = '&#xE83A;';
        stars = 1;
    } else if (move >= 16) {
        starsCounter.lastElementChild.innerHTML = '&#xE83A;';
        stars = 2;
    } else {
        stars = 3;
    }
}

function restartStars() {
    let starItems = starsCounter.children;
    for (let i = 1; i < starItems.length; i++) {
        starItems[i].innerHTML = '&#xE838;';
    }
}

/**
* @description Check how many pairs are made
*/
function pairsCheck() {
    if (pairs === (cards.length/2)){
        document.getElementById('complete_moves').textContent = move;
        document.getElementById('complete_stars').textContent = stars;
        document.getElementById('complete_time').textContent = `${minutes}:${seconds}`;
        document.getElementById('complete_stars-icons').innerHTML = starsCounter.innerHTML;
        toggleScreen('screen_complete', 'is-open');
        stopTimer();
    }
}

/**
* @description Timer handling functions
*/
function clock() {
    if (seconds > 59) {
        seconds = 0;
        minutes>=9?timerMinutes.textContent = ++minutes:timerMinutes.textContent = `0${++minutes}`;
    }
    seconds>9?timerSeconds.textContent = seconds++:timerSeconds.textContent = `0${seconds++}`;
}

function startTimer() {
    timer = setInterval(clock, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

/**
* @description Display/hide a full screen
* @param {string} screenId - The element the function has to select
* @param {string} isClass - The class the function has to toggle
*/
function toggleScreen(screenId, isClass) {
    document.getElementById(screenId).classList.toggle(isClass);
}

/**
* @description Initialize everything and start a new game
*/
function newGame() {
    stopTimer();
    openCurrent = [];
    move = 0;
    stars = 0;
    restartStars();
    pairs = 0;
    timer = 0;
    seconds = 0;
    minutes = 0;
    timerSeconds.textContent = '00';
    timerMinutes.textContent = '00';
    movesCount(0);
    createDeck(cards);
}

/**
* @description Pause or continue the game
*/
function playPause() {
    paused = !paused;
    if (paused) {
        stopTimer();
        deck.classList.add('deck--paused');
        pauseBtn.innerHTML = "&#xE037";
    } else {
        deck.classList.remove('deck--paused');
        startTimer();
        pauseBtn.innerHTML = "&#xE034;";
    }
}

// Buttons event listeners
newGameStart.addEventListener('click', function() {
    toggleScreen('screen_start', 'is-hidden');
    newGame();
});

aboutStart.addEventListener('click', function() {
    toggleScreen('modal_about', 'is-open');
});

aboutClose.addEventListener('click', function() {
    toggleScreen('modal_about', 'is-open');
});

menuGame.addEventListener('click', function() {
    menuGame.nextElementSibling.classList.toggle('is-open');
});

pauseBtn.addEventListener('click', function() {
    playPause();
    menuGame.nextElementSibling.classList.toggle('is-open');
});

restartBtn.addEventListener('click', function() {
    if (paused) {
        deck.classList.remove('deck--paused');
    }
    newGame();
    menuGame.nextElementSibling.classList.toggle('is-open');
});

newGameComplete.addEventListener('click', function() {
    toggleScreen('screen_complete', 'is-open');
    newGame();
});

homeComplete.addEventListener('click', function() {
    toggleScreen('screen_complete', 'is-open');
    toggleScreen('screen_start', 'is-hidden');
});

deck.addEventListener('click', function(event) {
    let card = event.target.parentNode;
    if (!card.classList.contains('open')) {
        if (!card.classList.contains('match')) {
            flipCard(card);
            openedCards(card);
            if (openCurrent.length === 2) {
                matchCards();
                movesCount(move);
            }
        }
    }
});
