let deckId;
const drawCardBtn = document.querySelector(".draw");
const shuffleDeckBtn = document.querySelector(".new-deck");
const winnerBanner = document.querySelector(".winner-banner");
const remainingCards = document.querySelector(".remaining-cards");
let computerScore = 0;
let playerScore = 0;

shuffleDeckBtn.addEventListener("click", fetchDeck);
drawCardBtn.addEventListener("click", handleDrawClick);

function fetchDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => {
      if (!response.ok) throw new Error("Network response not ok");
      return response.json();
    })
    .then((data) => {
      deckId = data.deck_id;
      fetchRemainingCards(data);
    })
    .catch(err, console.log(err));
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
      fetchRemainingCards(data);

      data.remaining === 10
        ? (drawCardBtn.style.color = "red")
        : data.remaining === 0
        ? (drawCardBtn.disabled = true)
        : null;

      if (data.remaining === 0) {
        if (playerScore > computerScore) {
          winnerBanner.innerHTML = "You Win!!!";
        } else if (playerScore === computerScore) {
          winnerBanner.innerText = "Draw!";
        } else {
          winnerBanner.innerText = "Computer Wins :(";
        }
      }
    })
    .catch(err, console.log(err));
}

function renderCards(data) {
  const slot1WrapperChild = document.querySelector(".slot1").children;
  const slot2WrapperChild = document.querySelector(".slot2").children;

  console.log(slot1WrapperChild);

  slot1WrapperChild[1].innerHTML = `
  <img src="${data.cards[0].image}">
  `;

  slot2WrapperChild[1].innerHTML = `
  <img src="${data.cards[1].image}">
  `;

  winnerBanner.innerText = getWinner(data.cards[0].value, data.cards[1].value);
}

function fetchRemainingCards(data) {
  if (deckId) {
    remainingCards.textContent = `Remaining Cards: ${data.remaining}`;
    remainingCards.style.opacity = "1";
    drawCardBtn.style.opacity = "1";

    if (data.remaining < 6) {
      remainingCards.style.color = "red";
    } else if (data.remaining < 16) {
      remainingCards.style.color = "orangered";
    }
  }
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
    computerScore++;
    document.querySelector(
      ".slot1 h3"
    ).innerText = `Computer: ${computerScore}`;
    return "Computer Wins";
  } else if (slot1Value === slot2Value) {
    return "WAR!";
  } else {
    playerScore++;
    document.querySelector(".slot2 h3").innerText = `You: ${playerScore}`;
    return "You Win!";
  }
}

// const cardValues = [2,3,4,5,6,7,8,9,10,JACK, QUEEN, KING, ACE]

// function getWinner(slot1, slot2) {
//   let slot1Index = cardValues.indexOf(slot1)
//   let slot2Index = cardValues.indexOf(slot2)

//   console.log(slot1Index)
//   console.log(slot2Index)
// }
