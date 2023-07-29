let deckId;

document.getElementById('fetch-new-deck-btn').addEventListener('click', fetchDeck)
document.getElementById('draw-cards').addEventListener('click', handleDrawClick)

function fetchDeck() {
    fetch(" https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(response => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json()
    })
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(deckId)
    })
}

function handleDrawClick() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response not ok")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            renderCards(data)
        })
}

// I did it using array indexes instead of a for loop because I will only be using 2 cards.

function renderCards(data) {
    const cardContainer = document.querySelector('.cards-container')
        let imageOne = data.cards[0].image;
        let imageTwo = data.cards[1].image;
        let cardSuitOne = data.cards[0].suit
        let cardSuitTwo = data.cards[1].suit
        let cardHtml = `
        <h2>${cardSuitOne}</h2>
        <img src="${imageOne}">
        <h2>${cardSuitTwo}</h2>
        <img src="${imageTwo}">
        `
        cardContainer.innerHTML = cardHtml
}