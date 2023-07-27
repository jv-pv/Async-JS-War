const fetchDeckBtn = document.getElementById('fetch-new-deck-btn');

fetchDeckBtn.addEventListener('click', fetchDeck)

function fetchDeck() {
    fetch(" https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(response => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
}

