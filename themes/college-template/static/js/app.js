const initPhotoSwipeFromDOM = function (gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  const parseThumbnailElements = function (el) {
    const thumbElements = el.childNodes;
    const numNodes = thumbElements.length;
    const items = [];
    let figureEl;
    let linkEl;
    let size;
    let item;

    for (let i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };

      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  const closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  const onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    const eTarget = e.target || e.srcElement;

    // find root element of slide
    const clickedListItem = closest(eTarget, (el) => el.tagName && el.tagName.toUpperCase() === 'FIGURE');

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    const clickedGallery = clickedListItem.parentNode;
    const { childNodes } = clickedListItem.parentNode;
    const numChildNodes = childNodes.length;
    let nodeIndex = 0;
    let index;

    for (let i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  const photoswipeParseHash = function () {
    const hash = window.location.hash.substring(1);
    const params = {};

    if (hash.length < 5) {
      return params;
    }

    const vars = hash.split('&');
    for (let i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      const pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    const pswpElement = document.querySelectorAll('.pswp')[0];
    let gallery;
    let options;
    let items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        const thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width,
        };
      },
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (let j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  const galleryElements = document.querySelectorAll(gallerySelector);

  for (let i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');

function showImages(element) {
  const folderName = element.querySelector('h2').innerText;
  const folder = element.getAttribute('data-folder');
  const title = document.querySelector('[data-name="gallery-title"]');
  title.innerHTML = `${folderName} Gallery`;
  const showingImageSection = document.querySelector('[data-name="images-container"]');
  const imagesContainer = document.querySelector('[data-name="images-container-all"]');

  const images = imagesContainer.querySelectorAll('figure');
  for (let idx = 0; idx < images.length; idx += 1) {
    const names = images[idx].getAttribute('data-folders').split(',');
    let isMatch = false;
    for (let index = 0; index < names.length; index += 1) {
      if (names[index].trim() === folder) {
        isMatch = true;
        break;
      }
    }
    if (isMatch) showingImageSection.appendChild(images[idx].cloneNode(true));
  }

  document.querySelector('[data-name="back-button"]').classList.remove('hidden');
  document.querySelector('[data-name="back-button"]').classList.add('flex');
  document.querySelector('[data-section="folder-section"]').classList.add('hidden');
  showingImageSection.classList.remove('hidden');
}

function closeImages() {
  const title = document.querySelector('[data-name="gallery-title"]');
  title.innerHTML = title.dataset.title;
  const imagesContainer = document.querySelector('[data-name="images-container"]');

  imagesContainer.innerHTML = '';
  imagesContainer.classList.add('hidden');

  document.querySelector('[data-name="back-button"]').classList.add('hidden');
  document.querySelector('[data-name="back-button"]').classList.remove('flex');
  document.querySelector('[data-section="folder-section"]').classList.remove('hidden');
}
