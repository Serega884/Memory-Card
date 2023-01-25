const start = document.querySelector('.start');
start.addEventListener('click', (e) => {
  e.preventDefault();
  starGame();
});

function starGame() {
  let numberCards = document.querySelector('.numberCard');

  //Проверка на количество карточек
  if (
    numberCards.value <= 2 ||
    numberCards.value >= 10 ||
    numberCards.value % 2 !== 0
  ) {
    numberCards.value = 4;
    return;
  }
  const header = document.querySelector('.header');
  header.style.display = 'none';
  const number = numberCards.value;
  const numberCard = (number * number) / 2;
  const memory = document.querySelector('.memory-game');

  let arr = [];
  for (let j = 1; j <= numberCard; j++) {
    arr.push(j);
  }

  arr = [...arr, ...arr];

  for (let i = 1; i <= arr.length; i++) {
    const div = document.createElement('div');
    div.classList.add('memory-card');
    div.textContent = div.dataset.name = String(arr[i - 1]);
    div.id = String(i);
    memory.appendChild(div);
  }

  // Create button reset
  const reset = document.createElement('button');
  reset.classList.add('reset');
  const wrap = document.querySelector('.wrapper');
  reset.textContent = 'Play again';
  wrap.appendChild(reset);
  memory.style.width = String(52 * number) + 'px';

  // Create timer
  const countdownEl = document.createElement('p');
  countdownEl.classList.add('counttimer');
  countdownEl.style.display = 'none';
  wrap.appendChild(countdownEl);
  let time = 60;

  const cards = document.querySelectorAll('.memory-card');
  let reload = false;
  let hasFlippedCard = false;
  let firstCard, secondCard, thirdCard;
  let flipper = false;
  const flipCard = (e) => {
    const target = e.target;
    console.log(target);
    reset.style.display = 'none';

    target.classList.add('flip');
    if (target === firstCard) return;
    openFlip();
    if (!hasFlippedCard) {
      if (firstCard === undefined) {
        firstCard = target;
      } else {
        if (secondCard.id !== target.id) {
          thirdCard = firstCard;
          firstCard = target;
          if (!flipper) {
            checkForMatch();
          }
        } else return;
        flipper = false;
      }
      hasFlippedCard = true;
    } else {
      secondCard = target;
      hasFlippedCard = false;
    }

    if (!reload) {
      countdownEl.style.display = 'flex';
      reload = true;
      // eslint-disable-next-line no-undef
      timerId = setInterval(updateCountdown, 1000);
      // eslint-disable-next-line no-inner-declarations
      function updateCountdown() {
        let seconds = time;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `Время пошло: ${seconds}`;
        time--;
        if (seconds === '00') {
          alert('Game over!');
          // eslint-disable-next-line no-undef
          clearInterval(timerId);
          shufle();
          countdownEl.display = 'none';
          time = 60;
          flipper = false;
        }
      }
    }
  };

  const checkForMatch = () => {
    if (thirdCard.dataset.name === secondCard.dataset.name) {
      thirdCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
    } else {
      thirdCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }
  };

  // проверка что все карточки открыты

  function openFlip() {
    let flip = document.querySelectorAll('.flip');
    if (flip.length === cards.length) {
      flipper = true;
      countdownEl.style.display = 'none';
      // eslint-disable-next-line no-undef
      clearInterval(timerId);
      time = 60;
      reset.style.display = 'flex';
      reset.addEventListener('click', shufle);
    }
  }

  function shufle() {
    reload = false;
    cards.forEach((card) => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
      card.style.order = Math.floor(Math.random() * cards.length);
    });
  }
  shufle();
}
