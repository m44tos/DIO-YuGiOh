const cardData = [
    { name: "Magician", type: "rock", img: "./src/assets/icons/magician.png" },
    { name: "Dragon", type: "paper", img: "./src/assets/icons/dragon.png" },
    { name: "Exodia", type: "scissors", img: "./src/assets/icons/exodia.png" }
];

const cardBackImg = "./src/assets/icons/card-back.png";

const playerCardsContainer = document.getElementById("player-cards");
const computerCardsContainer = document.getElementById("computer-cards");
const cardImage = document.getElementById("card-image");
const cardName = document.getElementById("card-name");
const cardType = document.getElementById("card-type");
const drawCardButton = document.getElementById("draw-card");
const playerFieldCard = document.getElementById("player-field-card");
const computerFieldCard = document.getElementById("computer-field-card");
const nextDuelButton = document.getElementById("next-duel");
const scorePoints = document.getElementById("score_points");
const playerInfoPanel = document.querySelector(".card_details");

let playerWins = 0;
let computerWins = 0;

function createComputerCard() {
    const cardElement = document.createElement("img");
    cardElement.src = cardBackImg;
    cardElement.alt = "Card Back";
    cardElement.className = "card";
    computerCardsContainer.appendChild(cardElement);
}

for (let i = 0; i < 5; i++) {
    createComputerCard();
}

function createCardElement(card, container, isPlayerCard = false) {
    const cardElement = document.createElement("img");
    cardElement.src = isPlayerCard ? cardBackImg : card.img;
    cardElement.alt = card.name;
    cardElement.className = "card";
    cardElement.addEventListener("click", () => handleCardSelection(card, isPlayerCard));
    cardElement.addEventListener("mouseover", () => handleCardMouseOver(card));
    cardElement.addEventListener("mouseout", handleCardMouseOut);

    if (container) {
        container.appendChild(cardElement);
    } else {
        console.error("Container not found");
    }
}

function displayCardDetails(card) {
    cardImage.src = card.img;
    cardName.innerText = card.name;
    cardType.innerText = "Tipo: " + card.type;
}

function drawComputerCard() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    const computerCard = cardData[randomIndex];
    return computerCard;
}

function resetGame() {
    playerCardsContainer.innerHTML = "";
    computerCardsContainer.innerHTML = "";
    cardImage.src = "";
    cardName.innerText = "";
    cardType.innerText = "";
    playerFieldCard.src = "";
    computerFieldCard.src = "";
}

function updateScore() {
    scorePoints.innerText = `Win: ${playerWins} | Lose: ${computerWins}`;
}

for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    const playerCard = cardData[randomIndex];
    createCardElement(playerCard, playerCardsContainer, true);
}

function handleCardSelection(card, isPlayerCard) {
    if (isPlayerCard) {
        resetGame();

        const computerCard = drawComputerCard();

        playerFieldCard.src = card.img;
        computerFieldCard.src = cardBackImg;

        determineWinner(card, computerCard);
    }
}
const audioWin = new Audio(`./src/assets/audios/win.wav`);
const audioLose = new Audio(`./src/assets/audios/lose.wav`);

function determineWinner(playerCard, computerCard) {
    if (playerCard.type === computerCard.type) {
        // Empate
        nextDuelButton.innerText = "Empate!";
    } else if (
        (playerCard.type === "rock" && computerCard.type === "scissors") ||
        (playerCard.type === "paper" && computerCard.type === "rock") ||
        (playerCard.type === "scissors" && computerCard.type === "paper")
    ) {
        // Vitória do jogador
        nextDuelButton.innerText = "Você ganhou!";
        playerWins++;
        audioWin.play();
    } else {
        // Vitória do computador
        nextDuelButton.innerText = "Você perdeu!";
        computerWins++;
        audioLose.play();
    }

    updateScore();

    computerCardsContainer.style.visibility = "visible";
    computerFieldCard.src = computerCard.img;
    nextDuelButton.style.display = "block";
}

function resetDuel() {
    nextDuelButton.style.display = "none";
    resetGame();

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * cardData.length);
        const playerCard = cardData[randomIndex];
        createCardElement(playerCard, playerCardsContainer, true);
    }

    for (let i = 0; i < 5; i++) {
        createComputerCard();
    }
}

function handleCardMouseOver(card) {
    displayCardDetails(card);
}
function handleCardMouseOut() {

}