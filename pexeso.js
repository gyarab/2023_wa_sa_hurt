let gridSize = 4;
const images = ['https://media.cnn.com/api/v1/images/stellar/prod/230426141158-sand-cat-9.jpg?c=original&q=h_618,c_fill', 'https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg', 'https://i.pinimg.com/736x/d0/0b/f8/d00bf86933543a764c971cca785fdc32.jpg', 'https://rukminim2.flixcart.com/image/850/1000/l3khsi80/poster/t/d/b/small-cute-cat-poster-multicolor-photo-paper-print-poster-cute-original-imagezffcmvryfk8.jpeg?q=90', 'https://images.ctfassets.net/ub3bwfd53mwy/5WFv6lEUb1e6kWeP06CLXr/acd328417f24786af98b1750d90813de/4_Image.jpg?w=750', 'https://images.ctfassets.net/ub3bwfd53mwy/5zi8myLobtihb1cWl3tj8L/45a40e66765f26beddf7eeee29f74723/6_Image.jpg?w=750', 'https://wallpaperset.com/w/full/b/8/3/429283.jpg', 'https://ih1.redbubble.net/image.3506004830.8308/fpp,small,lustre,wall_texture,product,750x1000.u1.jpg', 'https://elements-video-cover-images-0.imgix.net/files/98e1e8a8-464f-4758-b272-613d3e588bbf/inline_image_preview.jpg?auto=compress%2Cformat&h=225&w=400&fit=min&s=1212f6ed538a8c2370e68b9022c62ad8', 'https://imgix.ranker.com/list_img_v2/12346/2292346/original/30-and-funny-cat-selfies-you-ll-wish-your-cat-took-u1?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720', 'https://helios-i.mashable.com/imagery/articles/01B0i5GV1ZyRk3x2fIbTkTJ/hero-image.fill.size_1248x702.v1611607231.jpg', 'https://png.pngtree.com/png-vector/20231020/ourmid/pngtree-cute-kitty-cat-png-image_10236144.png', 'https://www.scotsman.com/webimg/b25lY21zOmE5MDMxNWZhLWE4ZTUtNDQ4Zi1hYTdkLWY5YWMyZGIxNzhlZTphNTU3NjY4Mi1iNDY5LTRlZjUtOWJjYS05YmNhMWMyYzhmYjg=.jpg?crop=3:2,smart&width=640&quality=65&enable=upscale', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
let totalPairs = gridSize * gridSize / 2;

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards using the Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');
  //card.innerHTML = `<img src="images/${image}.png" alt="${image}">`;
  card.innerHTML = `<img src="${image}" alt="${image}">`;
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (!card.classList.contains('flipped') && flippedCards.length < 2) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const image1 = card1.querySelector('img').alt;
  const image2 = card2.querySelector('img').alt;

  if (image1 === image2) {
    matchedPairs++;
    if (matchedPairs === totalPairs) {
      alert('Congratulations! You have matched all pairs.');
      resetGame();
    }
  } else {
    flippedCards.forEach(card => card.classList.remove('flipped'));
  }

  flippedCards = [];
}

function initializeGame() {
  resetGame();
  shuffle(cards);

  const gameBoard = document.getElementById('gameBoard');
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  cards.forEach(image => {
    const card = createCard(image);
    gameBoard.appendChild(card);
  });
}

function resetGame() {
  matchedPairs = 0;
  flippedCards = [];
  cards = [...images.slice(0, totalPairs), ...images.slice(0, totalPairs)];
  shuffle(cards);

  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
}

function startGame() {
  const selectedSize = document.getElementById('gridSize');
  gridSize = parseInt(selectedSize.value);
  totalPairs = gridSize * gridSize / 2;
  initializeGame();
}
