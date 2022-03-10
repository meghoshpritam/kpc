/* eslint-disable max-classes-per-file */
const SCROLL_HEADER_SELECTOR = '.page-header-0203';
const RELATIVE_HEADER_SELECTOR = '.page-relative-header-0203';
const MENU_DRAWER_SELECTOR = '.menu-drawer-0303';
const TAG_BLOG_CONTAINER_SELECTOR = '[data-id="blog-by-tag-0303"]';
const TAG_BUTTON_SELECTOR = '[data-id="tag-selector-button-0303"]';
const HIDDEN_CLASS = 'hidden';
const TESTIMONIAL_ID = 'data-testimonial-id';
const L_TO_R_ANIMATION = 'animate__fadeInRight';
const R_TO_L_ANIMATION = 'animate__fadeInLeft';
const PAGINATION_BREAKPOINT = 640;
const PAGINATION_LIST_BLOG_ELEMENTS = 6;

class App {
  static menu = false;

  // toggle menu btn
  static toggleMenu = () => {
    const header = document.querySelector(SCROLL_HEADER_SELECTOR);
    let headerHeight = header.clientHeight;

    if (window.getComputedStyle(header, null).display === 'none') {
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

  static clearContactForm = () => {
    const contactFormId = 'form#contact-us-form';

    document.querySelector(`${contactFormId} > textarea`).value = '';
    const inputElements = document.querySelectorAll(`${contactFormId} input:not([readonly])`);

    for (const inputElement of inputElements) {
      inputElement.value = '';
    }

    const checkboxElement = document.querySelector(`${contactFormId} input[type="checkbox"]`);
    checkboxElement.removeAttribute('value');
    checkboxElement.checked = false;
  };

  static onLoad = () => {
    // change current year
    document.querySelector('.current-year-footer-0102').innerHTML = new Date().getFullYear();

    // onload clear and close contact form
    document.querySelector('input#contact-us-dialog').checked = false;
    App.clearContactForm();

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
      const highlightColor = 'text-secondary';

      if (index < tocLinks.length) {
        for (let idx = 0; idx < tocLinks.length; idx += 1) {
          if (index === idx) tocLinks[idx].classList.add(highlightColor);
          else tocLinks[idx].classList.remove(highlightColor);
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

  // scroll to top of the page
  static scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
    this.showElementsByTag(tag, `[data-id="blog-0503"]`, (element, tagName) => element.dataset.tags.includes(tagName));
    this.showPagination({
      context: 'blog',
      listSelector: '[data-id="blog-0503"]',
    });
  };

  static searchBlog = (event) => {
    const { target } = event;
    const searchTerm = target.value || '';
    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((term) => term?.length > 0);
    const blogElements = document.querySelectorAll('[data-id="blog-0503"][data-active="true"]');
    const searchElements = document.querySelectorAll('[data-id="blog-0503"][data-active-search="true"]');
    this.hideAllElements(blogElements);

    const matchElements =
      Array.from(blogElements).filter((element) => {
        const blogTitle = element.getAttribute('title').toLowerCase() || '';
        return searchTerms.every((term) => blogTitle.includes(term));
      }) || [];

    this.searchInLists(searchTerm, searchElements, matchElements);
    this.showPagination({
      context: 'blog',
      listSelector: '[data-id="blog-0503"]',
    });
  };

  static getTestimonialElements = () => {
    const previousBtnElement = document.querySelector('[data-id="testimonial-previous-btn"]');
    const nextBtnElement = document.querySelector('[data-id="testimonial-next-btn"]');
    const activeTestimonials = document.querySelectorAll(`[${TESTIMONIAL_ID}]:not(.hidden)`);

    return {
      previousBtnElement,
      nextBtnElement,
      activeTestimonials,
    };
  };

  static previousTestimonial = () => {
    const { previousBtnElement, nextBtnElement, activeTestimonials } = this.getTestimonialElements();
    const activeTestimonial = activeTestimonials[0];

    this.hideAllElements(activeTestimonials);
    const currentIndex = Number(activeTestimonial.dataset.testimonialId);
    if (currentIndex - 1 === 0) {
      previousBtnElement.classList.add(HIDDEN_CLASS);
    }
    if (currentIndex > 0) {
      nextBtnElement.classList.remove(HIDDEN_CLASS);
      activeTestimonial.previousElementSibling.classList.remove(L_TO_R_ANIMATION);
      activeTestimonial.previousElementSibling.classList.add(R_TO_L_ANIMATION);
      activeTestimonial.previousElementSibling.classList.remove(HIDDEN_CLASS);
    }
  };

  static nextTestimonial = (totalTestimonial) => {
    const { previousBtnElement, nextBtnElement, activeTestimonials } = this.getTestimonialElements();
    const activeTestimonial = activeTestimonials[0];

    this.hideAllElements(activeTestimonials);
    const currentIndex = Number(activeTestimonial.dataset.testimonialId);
    if (currentIndex + 2 === totalTestimonial) {
      nextBtnElement.classList.add(HIDDEN_CLASS);
    }
    if (currentIndex + 1 < totalTestimonial) {
      previousBtnElement.classList.remove(HIDDEN_CLASS);
      activeTestimonial.nextElementSibling.classList.remove(R_TO_L_ANIMATION);
      activeTestimonial.nextElementSibling.classList.add(L_TO_R_ANIMATION);
      activeTestimonial.nextElementSibling.classList.remove(HIDDEN_CLASS);
    }
  };

  static playHpVideo = () => {
    const hpVideoThumbSelector = '.hp-video-thumb';
    const hpVideoSelector = '.hp-video-container';
    const thumbElement = document.querySelector(hpVideoThumbSelector);
    const videoElement = document.querySelector(hpVideoSelector);

    videoElement.innerHTML = `<iframe src="${videoElement.dataset.url}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full z-10"></iframe>`;
    window.setTimeout(() => {
      thumbElement.classList.add('invisible');
    }, 500);
  };

  static getURLParameterByName = (name, url = window.location.href) => {
    const _name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${_name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  static onLoadBlogPage = () => {
    let tags = this.getURLParameterByName('rel')?.split(' ') || [];
    tags = tags.filter((tag) => tag?.length > 0);

    if (tags.length > 0) {
      const buttonElements = document.querySelectorAll(`${TAG_BUTTON_SELECTOR}[data-active="true"]`);
      for (const buttonElement of buttonElements) {
        buttonElement.click();
      }
      for (const tag of tags) {
        const targetButtonElement = document.querySelector(`${TAG_BUTTON_SELECTOR}[data-tag="${tag}"]`);
        targetButtonElement?.click();
      }
    }
    this.showPagination({
      context: 'blog',
      listSelector: '[data-id="blog-0503"]',
    });
  };

  static sortDownloadList = (fieldName) => {
    const inactiveClass = 'text-gray-300';
    const listElements = document.querySelectorAll('[data-id="list-item"]');
    const listContainer = document.querySelector('[data-id="list-item-container"]');
    const sortButton = document.querySelector(`[data-id="list-sort-button"][data-field="${fieldName}"]`);
    let newListElements;
    let sortType = 'a';

    if (sortButton.dataset.sort === 'a') {
      let compareFunc = (a, b) => String(b.dataset[fieldName]).localeCompare(a.dataset[fieldName]);
      if (fieldName === 'date') {
        compareFunc = (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date);
      }
      newListElements = Array.from(listElements).sort(compareFunc);
      sortType = 'd';
      sortButton.children[0].classList.add(inactiveClass);
      sortButton.children[1].classList.remove(inactiveClass);
    } else if (sortButton.dataset.sort === 'd') {
      newListElements = Array.from(listElements).sort((a, b) =>
        String(Number(a.dataset.index)).localeCompare(Number(b.dataset.index)),
      );
      sortType = '';
      sortButton.children[0].classList.remove(inactiveClass);
      sortButton.children[1].classList.remove(inactiveClass);
    } else {
      let compareFunc = (a, b) => String(a.dataset[fieldName]).localeCompare(b.dataset[fieldName]);
      if (fieldName === 'date') {
        compareFunc = (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date);
      }
      newListElements = Array.from(listElements).sort(compareFunc);
      sortButton.children[0].classList.remove(inactiveClass);
      sortButton.children[1].classList.add(inactiveClass);
    }

    sortButton.setAttribute('data-sort', sortType);
    let listElementHTML = '';
    for (const listElement of newListElements) {
      listElementHTML += listElement.outerHTML;
    }
    listContainer.innerHTML = listElementHTML;
  };

  static updateSearchResult = (searchTerm, matchElements) => {
    const searchResult = document.querySelector('[data-id="blog-search-result"]');

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
  };

  static searchInLists = (searchTerm, searchElements, matchElements) => {
    for (const listElement of searchElements) {
      listElement.removeAttribute('data-active-search');
    }

    this.updateSearchResult(searchTerm, matchElements);
    this.showAllElements(matchElements);

    for (const listElement of matchElements) {
      listElement.setAttribute('data-active-search', 'true');
    }
  };

  static searchInDownloadList = (event) => {
    const { target } = event;
    const searchTerm = target.value || '';
    const searchTerms = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((term) => term?.length > 0);
    const listElements = document.querySelectorAll('[data-id="list-item"][data-active="true"]');
    const listElementsWithSearch = document.querySelectorAll('[data-id="list-item"][data-active-search="true"]');
    this.hideAllElements(listElements);

    const matchElements =
      Array.from(listElements).filter((element) => {
        const title = element.dataset.title.toLowerCase() || '';
        const description = element.dataset.description.toLowerCase() || '';
        return searchTerms.every((term) => title.includes(term) || description.includes(term));
      }) || [];

    this.searchInLists(searchTerm, listElementsWithSearch, matchElements);
  };

  static showElementsByTag = (tag, listSelector, elementSelectorFunction) => {
    const buttonActiveClasses = ['border-sky-blue', 'text-white', 'bg-sky-blue'];
    const buttonInactiveClass = 'border-light-gray3';
    const targetButtonElement = document.querySelector(`${TAG_BUTTON_SELECTOR}[data-tag="${tag}"]`);

    if (targetButtonElement.dataset.active === 'true') {
      targetButtonElement.classList.remove(...buttonActiveClasses);
      targetButtonElement.classList.add(buttonInactiveClass);
      targetButtonElement.setAttribute('data-active', 'false');
    } else {
      targetButtonElement.classList.remove(buttonInactiveClass);
      targetButtonElement.classList.add(...buttonActiveClasses);
      targetButtonElement.setAttribute('data-active', 'true');
    }

    const activeButtonElements = document.querySelectorAll(`${TAG_BUTTON_SELECTOR}[data-active="true"]`);
    const activeTags = Array.from(activeButtonElements).map((element) => element.dataset.tag);
    const listElements = document.querySelectorAll(listSelector);

    if (activeTags?.length < 1) {
      this.showAllElements(listElements);
      for (const listElement of listElements) {
        listElement.setAttribute('data-active', 'true');
      }
      return;
    }

    for (const listElement of listElements) {
      if (activeTags.some((tagName) => elementSelectorFunction(listElement, tagName))) {
        listElement.classList.remove(HIDDEN_CLASS);
        listElement.setAttribute('data-active', 'true');
      } else {
        listElement.classList.add(HIDDEN_CLASS);
        listElement.setAttribute('data-active', 'false');
      }
    }
  };

  static showDownloadByTag = (tag) => {
    this.showElementsByTag(tag, `[data-id="list-item"]`, (element, tagName) => element.dataset.area === tagName);
  };

  static onOpenContactForm = (event) => {
    const recaptchaId = 'google-recaptcha-script';
    if (event.target.checked) {
      if (document.querySelector(`meta[name="google-recaptcha"]`) && !document.querySelector(`script#${recaptchaId}`)) {
        const scriptElement = document.createElement('script');

        scriptElement.setAttribute('id', recaptchaId);
        scriptElement.setAttribute('src', 'https://www.google.com/recaptcha/api.js');

        document.head.appendChild(scriptElement);
      }
    }
  };

  static getActiveElements = (selector) => {
    let listElements = document.querySelectorAll(selector);
    listElements = Array.from(listElements || []);

    const isSearchEnable = listElements.some((listElement) => listElement.dataset.activeSearch === 'true');
    let activeElements = listElements.filter((listElement) => listElement.dataset.active === 'true');
    if (isSearchEnable) {
      activeElements = activeElements.filter((listElement) => listElement.dataset.activeSearch === 'true');
    }

    return activeElements;
  };

  static getActiveButtonIndex = (buttons) => {
    let index = 1;
    for (const button of buttons) {
      if (button.includes('data-active="true"')) {
        return index;
      }
      index += 1;
    }

    return index;
  };

  static getPerviousAndNextButtons = (paginationContainer, activeButtonIdx, nPages) => {
    const previousButtonElement = paginationContainer.children[0];
    const nextButtonElement = paginationContainer.children[paginationContainer.children.length - 1];

    previousButtonElement.removeAttribute('disabled');
    if (activeButtonIdx === 1) {
      previousButtonElement.setAttribute('disabled', true);
    }

    nextButtonElement.removeAttribute('disabled');
    if (activeButtonIdx === nPages) {
      nextButtonElement.setAttribute('disabled', true);
    }

    return {
      previousButtonElement,
      nextButtonElement,
    };
  };

  static showCurrentListElements = (listElements, activePage, elementsPerPage) => {
    this.hideAllElements(listElements);
    const start = (activePage - 1) * elementsPerPage;
    let end = start + elementsPerPage;
    if (end > listElements.length) {
      end = listElements.length;
    }
    listElements[0].classList.add(HIDDEN_CLASS);

    const targetElements = listElements.slice(start, end);
    this.showAllElements(targetElements);
  };

  static getBlogElementsPerPage = () => {
    if (window.innerWidth >= PAGINATION_BREAKPOINT) {
      return PAGINATION_LIST_BLOG_ELEMENTS * 2;
    }
    return PAGINATION_LIST_BLOG_ELEMENTS;
  };

  static showPagination = ({ context, listSelector }) => {
    const paginationContainer = document.querySelector('.pagination-btn-container');
    paginationContainer.classList.add('invisible');

    const activeElements = this.getActiveElements(listSelector);

    const nActiveElements = activeElements.length;
    const elementsPerPage = this.getBlogElementsPerPage();
    const nPages = Math.ceil(nActiveElements / elementsPerPage);

    const buttons = [];
    for (let index = 1; index <= nPages; index += 1) {
      buttons.push(
        `<button data-context='${context}' data-id="pagination-btn" data-btn-index="${index}" class="pagination-button" data-active="false" onclick="App.changePage(this);">${index}</button>`,
      );
    }
    buttons[0] = buttons[0].replace('data-active="false"', 'data-active="true"');

    const activeButtonIdx = this.getActiveButtonIndex(buttons);

    const { previousButtonElement, nextButtonElement } = this.getPerviousAndNextButtons(
      paginationContainer,
      activeButtonIdx,
      nPages,
    );

    paginationContainer.innerHTML = previousButtonElement.outerHTML + buttons.join('\n') + nextButtonElement.outerHTML;
    paginationContainer.classList.remove('invisible');
    this.showCurrentListElements(activeElements, activeButtonIdx, elementsPerPage);
  };

  static changePage = (element) => {
    const { context } = element.dataset;
    const oldActiveButton = document.querySelector(
      `[data-context="${context}"][data-id="pagination-btn"][data-active="true"]`,
    );
    const activeButtonIdx = element.dataset.btnIndex;
    if (oldActiveButton.dataset.btnIndex === activeButtonIdx) {
      return;
    }

    const activeElements = this.getActiveElements('[data-id="blog-0503"]');
    oldActiveButton.setAttribute('data-active', 'false');
    element.setAttribute('data-active', 'true');
    const elementsPerPage = this.getBlogElementsPerPage();
    this.showCurrentListElements(activeElements, activeButtonIdx, elementsPerPage);
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
