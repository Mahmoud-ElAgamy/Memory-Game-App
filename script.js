document.querySelector(".start-game span").onclick = () => {
  let userName = prompt("Please enter your name");
  userName == null || userName == ""
    ? (document.querySelector(".name span").textContent = "Unknown")
    : (document.querySelector(".name span").textContent = userName);

  // REMOVE SPLASH SCREEN
  document.querySelector(".start-game").remove();
};

let duration = 1000;

const blocksContainer = document.querySelector(".memory-game-blocks");

const blocks = Array.from(blocksContainer.children);

let range = [...Array(blocks.length).keys()];

shuffle(range);

blocks.forEach((block, index) => {
  block.style.order = range[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

// Shuffle Function
function shuffle(arr) {
  return arr.copyWithin(0, Math.floor(Math.random() * arr.length));
}

// Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("fliped");

  let allFlipedCards = blocks.filter((flipedCard) =>
    flipedCard.classList.contains("fliped")
  );

  if (allFlipedCards.length === 2) {
    stopClicking();

    CheckMatchedCards(allFlipedCards[0], allFlipedCards[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-click");
  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}

// Check Matched Cards Function
function CheckMatchedCards(firstCard, secondCard) {
  let wrongAttempts = document.querySelector(".attempts span");

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.classList.replace("fliped", "matched");
    secondCard.classList.replace("fliped", "matched");
    document.getElementById("success").play();
  } else {
    wrongAttempts.textContent = parseInt(wrongAttempts.textContent) + 1;
    setTimeout(() => {
      firstCard.classList.remove("fliped");
      secondCard.classList.remove("fliped");
    }, duration);
    document.getElementById("fail").play();
  }
}
