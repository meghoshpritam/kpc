class Utils {
  static disableButtonClass = 'disable-card-button';

  //  fix the card container height
  static articleCarsInit = ({ selector, wrapperSelector, nextButton, lineSelector, numberSelector }) => {
    const cards = document.querySelectorAll(selector);
    let maxHeight = 0;
    let displayed = 0;
    let lastDisplayed = -1;

    for (let idx = 0; idx < cards.length; idx++) {
      const cDisplay = window.getComputedStyle(cards[idx], null).display;

      if (cDisplay !== 'none') {
        lastDisplayed = idx;
        displayed += 1;
      }

      cards[idx].style.display = 'grid';
      if (maxHeight < cards[idx].clientHeight) maxHeight = cards[idx].clientHeight;

      cards[idx].style.display = cDisplay;
    }

    // disable next button if all cards are displayed initially
    if (cards.length === displayed) document.querySelector(nextButton).classList.add(Utils.disableButtonClass);

    document.querySelector(numberSelector).innerHTML = `${lastDisplayed + 1}`;
    document.querySelector(lineSelector).style.width = `${Math.ceil((100 * (lastDisplayed + 1)) / cards.length)}%`;
    document.querySelector(wrapperSelector).style.minHeight = `${maxHeight}px`;
  };

  // initialize height and dot of cars
  static initDotCards = ({ selector, containerSelector, nextButton, indicatorsSelector }) => {
    const cards = document.querySelectorAll(selector);

    let maxHeight = 0;
    let displayed = 0;
    // let lastDisplayed = -1;

    for (const card of cards) {
      const cDisplay = window.getComputedStyle(cards, null).display;

      if (cDisplay !== 'none') {
        // lastDisplayed = idx;
        displayed += 1;
      }

      card.style.display = 'flex';
      if (maxHeight < card.clientHeight) maxHeight = card.clientHeight;

      card.style.display = cDisplay;
    }

    // disable next button if all cards are displayed initially
    if (cards.length === displayed) document.querySelector(nextButton).classList.add(Utils.disableButtonClass);

    // get all the indicators
    const indicators = document.querySelectorAll(indicatorsSelector);

    for (let idx = 0; idx < indicators.length; idx += 1) {
      if (idx < Math.ceil(cards.length / displayed)) indicators[idx].classList.remove('hidden');
      else {
        indicators[idx].classList.add('hidden');
      }
    }

    // hr height
    let hrHeight = 0;
    const hrs = document.querySelectorAll(`${containerSelector} > hr`);

    for (const hr of hrs) {
      if (hrHeight < window.getComputedStyle(hr).height) {
        hrHeight = window.getComputedStyle(hr).height;
      }
    }

    for (const card of cards) {
      card.style.minHeight = `${maxHeight}px`;
    }

    // document.querySelector(containerSelector).style.minHeight = `${2 * maxHeight + hrHeight}px`;
  };

  // change cards
  static changeContentButton = ({
    selector,
    direction = 'next',
    previousButton,
    nextButton,
    lineSelector,
    numberSelector,
  }) => {
    const cards = document.querySelectorAll(selector);
    let currentScreenCards = [];

    for (let idx = 0; idx < cards.length; idx += 1) {
      if (window.getComputedStyle(cards[idx], null).display !== 'none') {
        currentScreenCards = [...currentScreenCards, idx];
      }
    }

    const changeNewState = (states = [], add, remove) => {
      for (let idx = 0; idx < cards.length; idx += 1) {
        document.querySelector(previousButton).classList.add(Utils.disableButtonClass);
        if (states[0] !== 0) document.querySelector(previousButton).classList.remove(Utils.disableButtonClass);

        document.querySelector(nextButton).classList.add(Utils.disableButtonClass);
        if (states[states.length - 1] !== cards.length - 1)
          document.querySelector(nextButton).classList.remove(Utils.disableButtonClass);

        document.querySelector(numberSelector).innerHTML = `${states[states.length - 1] + 1}`;
        document.querySelector(lineSelector).style.width = `${Math.ceil(
          (100 * (states[states.length - 1] + 1)) / cards.length,
        )}%`;

        if (states.indexOf(idx) !== -1) {
          cards[idx].classList.remove('animate__animated', `animate__fadeIn${remove}`);
          cards[idx].classList.add('animate__animated', `animate__fadeIn${add}`);
          cards[idx].style.display = 'grid';
        } else {
          cards[idx].style.display = 'none';
        }
      }
    };

    if (direction === 'next') {
      let newScreenCards = [];
      let newLastNum = currentScreenCards[currentScreenCards.length - 1] + currentScreenCards.length;

      if (newLastNum >= cards.length) newLastNum = cards.length - 1;

      for (let idx = currentScreenCards.length - 1; idx > -1; idx -= 1) {
        newScreenCards = [...newScreenCards, newLastNum - idx];
      }

      changeNewState(newScreenCards, 'Right', 'Left');
    } else if (direction === 'previous') {
      let newScreenCards = [];

      let newFirstNum = currentScreenCards[0] - currentScreenCards.length;

      if (newFirstNum < 0) newFirstNum = 0;

      for (let idx = 0; idx < currentScreenCards.length; idx += 1) {
        newScreenCards = [...newScreenCards, newFirstNum + idx];
      }

      changeNewState(newScreenCards, 'Left', 'Right');
    }
  };

  // dot card change button
  static dotCardChangeButton = ({
    selector,
    direction = 'next',
    previousButton,
    nextButton,
    indicatorsSelector,
    containerSelector,
    position,
  }) => {
    const cards = document.querySelectorAll(selector);
    let currentScreenCards = [];

    for (let idx = 0; idx < cards.length; idx += 1) {
      if (window.getComputedStyle(cards[idx], null).display !== 'none') {
        currentScreenCards = [...currentScreenCards, idx];
      }
    }

    const changeNewState = (states = [], add, remove) => {
      // change the hr tag
      if (Number(window.getComputedStyle(document.querySelector('body')).width.split('px')[0]) >= 768) {
        const hrs = document.querySelectorAll(`${containerSelector} > hr`);

        for (let index = 0; index < hrs.length; index += 1) {
          if (index === states[states.length - 1] - 1) {
            hrs[index].style.display = 'block';
          } else {
            hrs[index].style.display = 'none';
          }
        }
      }

      // highlight the current indicator
      const indicators = document.querySelectorAll(indicatorsSelector);
      for (let idx = 0; idx < indicators.length; idx++) {
        if (idx === Math.floor(states[states.length - 1] / states.lenguh)) {
          indicators[idx].classList.remove('shadow-sm', 'bg-ice-blue2');
          indicators[idx].classList.add('shadow-lg', 'bg-g4');
        } else {
          indicators[idx].classList.remove('shadow-lg', 'bg-g4');
          indicators[idx].classList.add('shadow-sm', 'bg-ice-blue2');
        }
      }

      for (let idx = 0; idx < cards.length; idx += 1) {
        document.querySelector(previousButton).classList.add(Utils.disableButtonClass);
        if (states[0] !== 0) document.querySelector(previousButton).classList.remove(Utils.disableButtonClass);

        document.querySelector(nextButton).classList.add(Utils.disableButtonClass);
        if (states[states.length - 1] !== cards.length - 1)
          document.querySelector(nextButton).classList.remove(Utils.disableButtonClass);

        // document.querySelector(numberSelector).innerHTML = `${states[states.length - 1] + 1}`;
        // document.querySelector(lineSelector).style.width = `${Math.ceil(100 * (states[states.length - 1] + 1) / (cards.length))}%`;

        if (states.indexOf(idx) !== -1) {
          cards[idx].classList.remove('animate__animated', `animate__fadeIn${remove}`);
          cards[idx].classList.add('animate__animated', `animate__fadeIn${add}`);
          cards[idx].style.display = 'flex';
        } else {
          cards[idx].style.display = 'none';
        }
      }
    };

    if (position) {
      let max = position * currentScreenCards.length - 1;

      if (max > cards.length - 1) max = cards.length - 1;

      if (max - currentScreenCards.length - 1 < 0) {
        max = currentScreenCards.length - 1;
      }

      let newStates = [];
      for (let idx = currentScreenCards.length - 1; idx > -1; idx -= 1) {
        newStates = [...newStates, max - idx];
      }

      // check previous or next move by the position difference
      let next = false;
      for (let idx = 0; idx < currentScreenCards.length; idx += 1) {
        if (currentScreenCards[idx] < newStates[idx]) {
          next = true;
        }
      }

      if (next) changeNewState(newStates, 'Right', 'Left');
      else changeNewState(newStates, 'Left', 'Right');
    } else if (direction === 'next') {
      let newScreenCards = [];
      let newLastNum = currentScreenCards[currentScreenCards.length - 1] + currentScreenCards.length;

      if (newLastNum >= cards.length) newLastNum = cards.length - 1;

      for (let idx = currentScreenCards.length - 1; idx > -1; idx -= 1) {
        newScreenCards = [...newScreenCards, newLastNum - idx];
      }

      changeNewState(newScreenCards, 'Right', 'Left');
    } else if (direction === 'previous') {
      let newScreenCards = [];

      let newFirstNum = currentScreenCards[0] - currentScreenCards.length;

      if (newFirstNum < 0) newFirstNum = 0;

      for (let idx = 0; idx < currentScreenCards.length; idx += 1) {
        newScreenCards = [...newScreenCards, newFirstNum + idx];
      }

      changeNewState(newScreenCards, 'Left', 'Right');
    }
  };
}

export default Utils;
