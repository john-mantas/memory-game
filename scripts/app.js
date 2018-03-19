const deck = document.getElementById('deck');

deck.addEventListener('click', function(event) {
    if (event.target.parentNode.classList.contains('card')) {
        event.target.parentNode.classList.toggle('open');
    }
});