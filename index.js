let deckId;
const drawCardBtn = document.getElementById('draw-cards')
const shuffleDeckBtn = document.getElementById('fetch-new-deck-btn')

shuffleDeckBtn.addEventListener("click", fetchDeck);
drawCardBtn.addEventListener("click", handleDrawClick);

function fetchDeck() {
  fetch(" https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => {
      if (!response.ok) throw new Error("Network response not ok");
      return response.json();
    })
    .then((data) => {
      deckId = data.deck_id;
      fetchRemainingCards(data);
    });
}

function handleDrawClick() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderCards(data);
      fetchRemainingCards(data)
      data.remaining === 10 ? drawCardBtn.style.color = "red" :
      data.remaining === 0 ? drawCardBtn.disabled = true : null;
    });
}

// With for loop and element.children

function renderCards(data) {
  const cardContainer = document.querySelector(".cards-container");
  const cardContainerChildren = cardContainer.children;
  for (let i = 0; i < data.cards.length; i++) {
    cardContainerChildren[i].innerHTML = `
        <img src="${data.cards[i].image}">
        `;
    cardContainerChildren[i].classList.remove("card");
    cardContainerChildren[i].classList.add("active");
  }
  //   getWinner(data.cards[0].value, data.cards[1].value);
  document.querySelector(".winner-banner").innerText = getWinner(
    data.cards[0].value,
    data.cards[1].value
  );
}

// function getWinner(slot1Value, slot2Value) {
//   const cardValues = [
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "JACK",
//     "QUEEN",
//     "KING",
//     "ACE",
//   ];
//   const slot1IndexValue = cardValues.indexOf(slot1Value);
//   const slot2IndexValue = cardValues.indexOf(slot2Value);
//   const winnerBannerEl = document.querySelector(".winner-banner");

//   slot1IndexValue === slot2IndexValue
//     ? (winnerBannerEl.textContent = "War!")
//     : slot1IndexValue > slot2IndexValue
//     ? (winnerBannerEl.textContent = "Slot 1 Wins!")
//     : (winnerBannerEl.textContent = "Slot 2 Wins!");
// }

function fetchRemainingCards(data) {
  document.querySelector(
    ".remaining-cards"
  ).textContent = `Remaining Cards: ${data.remaining}`;
}

const cardValue = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  10: 8,
  JACK: 9,
  QUEEN: 10,
  KING: 11,
  ACE: 12,
};

function getWinner(slot1, slot2) {
  let slot1Value = cardValue[slot1];
  let slot2Value = cardValue[slot2];

  if (slot1Value > slot2Value) {
    return "Slot 1 Wins";
  } else if (slot1Value === slot2Value) {
    return "WAR!";
  } else {
    return "Slot 2 Wins!";
  }
}

// I did it using array indexes instead of a for loop because I will only be using 2 cards.

// function renderCards(data) {
//     const cardContainer = document.querySelector('.cards-container')
//         let imageOne = data.cards[0].image;
//         let imageTwo = data.cards[1].image;
//         let cardHtml = `
//         <h2>${data.cards[0].suit}</h2>
//         <img src="${imageOne}">
//         <h2>${data.cards[1].suit}</h2>
//         <img src="${imageTwo}">
//         `
//         cardContainer.innerHTML = cardHtml
// }
