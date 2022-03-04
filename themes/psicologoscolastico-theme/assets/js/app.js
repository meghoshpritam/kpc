/* eslint-disable max-classes-per-file */
const SCROLL_HEADER_SELECTOR = '.page-header-0203';
const RELATIVE_HEADER_SELECTOR = '.page-relative-header-0203';
const MENU_DRAWER_SELECTOR = '.menu-drawer-0303';
const TAG_BLOG_CONTAINER_SELECTOR = '[data-id="blog-by-tag-0303"]';
const TAG_BUTTON_SELECTOR = '[data-id="tag-selector-button-0303"]';
const HIDDEN_CLASS = 'hidden';
const TESTIMONIAL_ID = 'data-testimonial-id';

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

class App {
  static menu = false;

  // toggle menu btn
  static toggleMenu = () => {
    const header = document.querySelector(SCROLL_HEADER_SELECTOR);
    let headerHeight = header.clientHeight;

    if (window.getComputedStyle(header, null).display === 'none' && window.innerWidth >= 768) {
      headerHeight = document.querySelector(RELATIVE_HEADER_SELECTOR).clientHeight;
    }

    document.querySelector(MENU_DRAWER_SELECTOR).style.top = `${headerHeight}px`;

    App.menu = !App.menu;

    if (App.menu) {
      document.querySelector(MENU_DRAWER_SELECTOR).classList.remove('hidden');
      return;
    }

    document.querySelector(MENU_DRAWER_SELECTOR).classList.add('hidden');
  };

  static onScroll = () => {
    // fixed header on scroll
    if (window.pageYOffset > 40) {
      document.querySelector('.scroll-to-top-1606')?.classList.remove('hidden');
      document.querySelector(SCROLL_HEADER_SELECTOR).classList.remove('hidden');
    } else {
      document.querySelector('.scroll-to-top-1606')?.classList.add('hidden');
      document.querySelector(SCROLL_HEADER_SELECTOR).classList.add('hidden');
    }
  };

  static onLoad = () => {
    // change current year
    document.querySelector('.current-year-footer-0102').innerHTML = new Date().getFullYear();
    App.onScroll();
  };

  static tocHighlight = () => {
    const tocLinks = document.querySelector('aside').querySelectorAll('a');
    const allArticleHeadings = document.querySelector('article').querySelectorAll('h1,h2,h3,h4,h5,h6');
    const headerHeight = document.querySelector(SCROLL_HEADER_SELECTOR).clientHeight;
    let articleHeadings = [];

    if (tocLinks.length > 0)
      for (let idx = 0, tocIdx = 0; idx < allArticleHeadings.length; idx += 1) {
        if (allArticleHeadings[idx]?.innerHTML === tocLinks[tocIdx]?.innerHTML) {
          articleHeadings = [...articleHeadings, allArticleHeadings[idx]];
          tocIdx += 1;
        }
      }

    const fixTOCTop = () => {
      const _headerHeight = document.querySelector(SCROLL_HEADER_SELECTOR).clientHeight;
      document.querySelector('.toc-container').style.top = `${_headerHeight + 20}px`;
    };

    fixTOCTop();

    let current = 0;
    const headerOffset = 50;

    const distances =
      articleHeadings.map((articleHeading) => articleHeading.getBoundingClientRect().top - headerHeight) || [];

    distances.sort((a, b) => a - b);

    if (distances[0] < 0) {
      let articleEnd = true;
      for (let index = 1; index < distances.length; index += 1) {
        if (distances[index] >= 0) {
          if (distances[index] <= headerOffset) current = index;
          else current = index - 1;
          articleEnd = false;
          break;
        }
      }
      if (articleEnd) {
        current = distances.length - 1;
      }
    }

    const hightLight = (index) => {
      if (index < tocLinks.length) {
        for (let idx = 0; idx < tocLinks.length; idx += 1) {
          if (index === idx) tocLinks[idx].classList.add('text-g1');
          else tocLinks[idx].classList.remove('text-g1');
        }
      }
    };

    let lastScrollTop = 0;

    for (let index = 0; index < tocLinks.length; index += 1) {
      tocLinks[index].addEventListener('click', (event) => {
        const header = document.querySelector(SCROLL_HEADER_SELECTOR);
        let headHeight = header.clientHeight;

        if (window.getComputedStyle(header, null).display === 'none') {
          header.classList.remove('hidden');
          headHeight = header.clientHeight;
          header.classList.add('hidden');
        }

        event?.preventDefault();

        window.scrollTo({
          top: window.pageYOffset + articleHeadings[index].getBoundingClientRect().top - headHeight - headerOffset / 2,
          behavior: 'smooth',
        });
        current = index;
        hightLight(index);
      });
    }

    window.addEventListener('scroll', () => {
      const _headerHeight = document.querySelector(SCROLL_HEADER_SELECTOR).clientHeight;
      fixTOCTop();
      hightLight(current);
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        if (current < articleHeadings.length - 1) {
          if (articleHeadings[current + 1].getBoundingClientRect().top < _headerHeight + headerOffset) {
            hightLight(current + 1);
            current += 1;
          }
        }
      } else if (current >= 1) {
        if (articleHeadings[current].getBoundingClientRect().top > _headerHeight + headerOffset * 2) {
          hightLight(current - 1);
          current -= 1;
        }
      }
      lastScrollTop = st <= 0 ? 0 : st;
    });
  };

  // fix the height of the article list page on page load
  static fixHeightListPage = () => {
    Utils.articleCarsInit({
      selector: '.category-page-article-card-1006',
      wrapperSelector: '.wrapper-category-page-article-card-1006',
      nextButton: '.btn-next-category-page-article-card-1006',
      lineSelector: '.line-category-page-article-card-1006',
      numberSelector: '.number-category-page-article-card-1006',
    });
  };

  // go to the next article card
  static articleNext = () => {
    Utils.changeContentButton({
      selector: '.category-page-article-card-1006',
      direction: 'next',
      previousButton: '.btn-pre-category-page-article-card-1006',
      nextButton: '.btn-next-category-page-article-card-1006',
      lineSelector: '.line-category-page-article-card-1006',
      numberSelector: '.number-category-page-article-card-1006',
    });
  };

  // go back to the previous article card
  static articlePre = () => {
    Utils.changeContentButton({
      selector: '.category-page-article-card-1006',
      direction: 'previous',
      previousButton: '.btn-pre-category-page-article-card-1006',
      nextButton: '.btn-next-category-page-article-card-1006',
      lineSelector: '.line-category-page-article-card-1006',
      numberSelector: '.number-category-page-article-card-1006',
    });
  };

  // initialize the home article function
  static homepageArticleInit = () => {
    Utils.initDotCards({
      selector: '.home-page-article-card1106',
      containerSelector: '.container-home-page-article-card1106',
      nextButton: '.btn-next-home-page-article-card1106',
      indicatorsSelector: '.indicator-home-page-article-card1106',
    });
  };

  // previous article button
  static homepageArticlePre = () => {
    Utils.dotCardChangeButton({
      selector: '.home-page-article-card1106',
      direction: 'previous',
      previousButton: '.btn-pre-home-page-article-card1106',
      nextButton: '.btn-next-home-page-article-card1106',
      indicatorsSelector: '.indicator-home-page-article-card1106',
      containerSelector: '.container-home-page-article-card1106',
    });
  };

  // next article button
  static homepageArticleNext = () => {
    Utils.dotCardChangeButton({
      selector: '.home-page-article-card1106',
      direction: 'next',
      previousButton: '.btn-pre-home-page-article-card1106',
      nextButton: '.btn-next-home-page-article-card1106',
      indicatorsSelector: '.indicator-home-page-article-card1106',
      containerSelector: '.container-home-page-article-card1106',
    });
  };

  static homepageArticleDotBtn = (position) => {
    Utils.dotCardChangeButton({
      selector: '.home-page-article-card1106',
      direction: 'next',
      previousButton: '.btn-pre-home-page-article-card1106',
      nextButton: '.btn-next-home-page-article-card1106',
      indicatorsSelector: '.indicator-home-page-article-card1106',
      containerSelector: '.container-home-page-article-card1106',
      position,
    });
  };

  // scroll to contact form section
  static contactFormScroll = (event) => {
    const header = document.querySelector(SCROLL_HEADER_SELECTOR);
    let headerHeight = header.clientHeight;
    const formSection = document.querySelector('.mobile-shape-0406');
    const drawer = document.querySelector('.menu-drawer-0421');

    if (window.getComputedStyle(header, null).display === 'none') {
      header.classList.remove('hidden');
      headerHeight = header.clientHeight;
      header.classList.add('hidden');
    }

    const headerOffset = (window.innerHeight - headerHeight - formSection.clientHeight) / 3;

    event?.preventDefault();

    if (window.getComputedStyle(drawer, null).display !== 'none') App.toggleMenu();

    window.scrollTo({
      top: window.pageYOffset + formSection.getBoundingClientRect().top - headerOffset - headerHeight,
      behavior: 'smooth',
    });
  };

  // scroll to top of the page
  static scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // change current visible map
  static changeSelectedMap = (select) => {
    const maps = document.querySelectorAll('.g-map-1906');
    const mapCards = document.querySelectorAll('.map-selector-card2206');

    if (Number(select) > -1 && Number(select) < maps.length)
      for (let idx = 0; idx < maps.length; idx += 1) {
        if (Number(select) === idx) {
          maps[idx].classList.remove('hidden');
          mapCards[idx].classList?.remove('text-g4');
          mapCards[idx].classList?.add('from-g5-f', 'to-g5-t', 'text-white');
        } else {
          maps[idx].classList.add('hidden');
          mapCards[idx].classList?.remove('from-g5-f', 'to-g5-t', 'text-white');
        }
      }
  };

  // check the element is visible in viewport or not
  static isInViewport = (element) => {
    try {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    } catch {
      return false;
    }
  };

  // animation on scroll init
  static onScrollAnimation = (
    selector,
    animationClasses = [],
    increasingClasses = [],
    removedClasses = [],
    remain = false,
  ) => {
    const elements = document.querySelectorAll(selector);
    let modified = [];

    animationClasses.forEach(() => {
      modified = [...modified, false];
    });

    window.addEventListener('scroll', () => {
      let increaseClassIdx = 0;

      const getClasses = () => {
        let newClasses = [...animationClasses];
        if (
          increasingClasses.length > increaseClassIdx &&
          increasingClasses[increaseClassIdx] &&
          increasingClasses[increaseClassIdx] !== ''
        ) {
          newClasses = [...newClasses, increasingClasses[increaseClassIdx]];
        }

        return newClasses;
      };

      let modifiedIdx = 0;
      elements.forEach((element) => {
        if (App.isInViewport(element)) {
          if (!(remain && modified[modifiedIdx])) {
            if (removedClasses.length > 0) {
              element.classList.remove(...removedClasses);
            }
            element.classList.add(...getClasses());
            modified[modifiedIdx] = true;
          }
        } else if (!(remain && modified[modifiedIdx])) element.classList.remove(...getClasses());
        modifiedIdx += 1;
        increaseClassIdx += 1;
      });
    });
  };

  static getBlogContainerElementByTag = (tag) =>
    document.querySelector(`${TAG_BLOG_CONTAINER_SELECTOR}[data-tag="${tag}"]`);

  static hideAllElements = (elements) => {
    for (const element of elements) {
      element.classList.add(HIDDEN_CLASS);
    }
  };

  static showAllElements = (elements) => {
    for (const element of elements) {
      element.classList.remove(HIDDEN_CLASS);
    }
  };

  static showBlogsByTag = (tag) => {
    const searchSelector = 'input[data-id="search-blogs"]';
    const buttonActiveClasses = ['border-sky-blue', 'text-white', 'bg-sky-blue'];
    const buttonInactiveClass = 'border-light-gray3';

    const searchElement = document.querySelector(searchSelector);
    const blogContainerElements = document.querySelectorAll(TAG_BLOG_CONTAINER_SELECTOR);
    const blogButtonElements = document.querySelectorAll(TAG_BUTTON_SELECTOR);
    const targetContainerElement = this.getBlogContainerElementByTag(tag);
    const targetButtonElement = document.querySelector(`${TAG_BUTTON_SELECTOR}[data-tag="${tag}"]`);

    searchElement.setAttribute('data-active-tab', tag);
    this.hideAllElements(blogContainerElements);
    for (const blogButtonElement of blogButtonElements) {
      blogButtonElement.classList.remove(...buttonActiveClasses);
      blogButtonElement.classList.add(buttonInactiveClass);
    }

    targetContainerElement.classList.remove(HIDDEN_CLASS);
    targetButtonElement.classList.remove(buttonInactiveClass);
    targetButtonElement.classList.add(...buttonActiveClasses);
  };

  static searchBlog = (event) => {
    const { target } = event;
    const searchTerm = target.value || '';
    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((term) => term?.length > 0);
    const selectedTag = target.dataset.activeTab;
    const targetContainerElement = this.getBlogContainerElementByTag(selectedTag);
    const blogElements = targetContainerElement.children || [];
    const searchResult = document.querySelector('[data-id="blog-search-result"]');
    this.hideAllElements(blogElements);

    const matchElements =
      Array.from(blogElements).filter((element) => {
        const blogTitle = element.getAttribute('title').toLowerCase() || '';
        return searchTerms.every((term) => blogTitle.includes(term));
      }) || [];
    searchResult.classList.add(HIDDEN_CLASS);
    if (searchTerm.length > 0) {
      searchResult.classList.remove(HIDDEN_CLASS);
    }
    const nMatches = matchElements.length;
    if (nMatches === 0) {
      searchResult.innerHTML = searchResult.dataset.notFoundResult;
    } else if (nMatches === 1) {
      searchResult.innerHTML = searchResult.dataset.singleResult;
    } else {
      searchResult.innerHTML = searchResult.dataset.multipleResult.replace('{0}', nMatches);
    }

    this.showAllElements(matchElements);
  };

  static previousTestimonial = (currentIndex) => {
    const testimonialElements = document.querySelectorAll(`[${TESTIMONIAL_ID}]`);
    const targetTestimonialElement = document.querySelector(`[${TESTIMONIAL_ID}="${currentIndex - 1}"]`);

    this.hideAllElements(testimonialElements);
    targetTestimonialElement.classList.remove(HIDDEN_CLASS);
  };

  static nextTestimonial = (currentIndex) => {
    const testimonialElements = document.querySelectorAll(`[${TESTIMONIAL_ID}]`);
    const targetTestimonialElement = document.querySelector(`[${TESTIMONIAL_ID}="${currentIndex + 1}"]`);

    this.hideAllElements(testimonialElements);
    targetTestimonialElement.classList.remove(HIDDEN_CLASS);
  };
}

window.App = App;

document.addEventListener('load', App.onLoad());

document.addEventListener('scroll', () => {
  App.onScroll();
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function onInputFormEmail(element) {
  const email = element.value;
  const isValid = validateEmail(email);
  if (isValid) element.setCustomValidity('');
  else element.setCustomValidity(' ');
}

function onSubmitContactForm(event) {
  event.preventDefault();

  if (grecaptcha.getResponse() !== '') {
    event.target.submit();
  }
}
