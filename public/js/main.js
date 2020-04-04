// IIFE function
const articles = (function () {
  let articles = [1, 2, 3, 4, 5],
    articlesUnordered = shuffle(articles),
    count = 0;
  // articlesObject = [];

  // Preload all 5 articles and load them in an object array
  // function preloadArticles(){
  //   articlesUnordered.forEach(async (el)  =>  {
  //     let response = await fetch(`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-${el}.json`);
  //     let data = await response.json();
  //     articlesObject.push(data);
  //   });
  // };

  // All target elements
  const DOM = {
    count: document.querySelector(".count"),
    article: document.querySelector("article"),
    article2: document.querySelector("article2"),
    title: document.querySelector(".title"),
    nextArticle: document.querySelector("#next-article"),
    submitFormula: document.querySelector(".submit-formula"),
    lastArticle: document.querySelector("#last-article"),
    loader: document.querySelector(".loader"),
    // heading: document.querySelector(".heading"),
    // img: document.querySelector(".img"),
    // paragraph: document.querySelector(".paragraph"),
    // list: document.querySelector(".list"),
  };

  // Return promise from json file - Article
  function renderArticle() {
    getArticle(articlesUnordered[count])
      .then((data) => {
        DOM.loader.style = "display: none";
        displayArticle(data);
      })
      .catch((error) => {
        displayError(error);
      });
  }

  // New image - Otherwhise won't load different images on the same page
  function newImage(data) {
    let random = Math.floor(Math.random() * 1000);
    let image = new Image();
    image.src = `${data.model.url}=sig${random}`;
    image.alt = data.model.altText;
    DOM.article.appendChild(image);
  }

  // Display error - If promise catches an error, will be displayed in the title
  function displayError(data) {
    DOM.article.innerHTML = `<h1>${data}, Please check your internet connection and try again. Press the Home button from the navigation bar.</h1>`;
  }

  // Display the article
  function displayArticle(data) {
    DOM.count.innerText = `Article ${count + 1}/5`;
    DOM.article.insertAdjacentHTML(
      "beforeend",
      `<h1 class="title">${data.title}</h1>`
    );
    data.body.forEach((el) => {
      if (el.type == "heading") {
        DOM.article.insertAdjacentHTML(
          "beforeend",
          `<h2>${el.model.text}</h2>`
        );
      }
      if (el.type == "image") {
        newImage(el);
      }
      if (el.type == "paragraph") {
        DOM.article.insertAdjacentHTML("beforeend", `<p>${el.model.text}</p>`);
      }
      if (el.type == "list") {
        el.model.items.forEach((el) => {
          DOM.article.insertAdjacentHTML("beforeend", `<li>${el}</li>`);
        });
      }
      DOM.nextArticle.style = "display: block";
      checkButton();
    });
  }

  // Display ranking
  function displayRanking() {
    DOM.article.innerHTML = "<h2>Ranking</h2>";
    DOM.nextArticle.style = "display: none";
    DOM.submitFormula.style = "display: flex";
    DOM.count.style = "display: none";
  }

  //Clean last article
  function cleanLast() {
    DOM.article.innerHTML = "";
    DOM.nextArticle.style = "display: none";
    DOM.lastArticle.style = "display: none";
  }

  //Load an article - New browsers
  async function getArticle(num) {
    let response = await fetch(
      `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-${num}.json`
    );
    let data = await response.json();
    return data;
  }

  // Array randomizer
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Display back button
  function checkButton() {
    if (count == 0 || count >= 5) {
      DOM.lastArticle.style = "display: none";
    } else {
      DOM.lastArticle.style = "display: block";
    }
  }

  // Control view model
  function controlView() {
    // Check if more articles
    if (count < 5) {
      cleanLast();
      DOM.loader.style = "display: block";
      renderArticle();
    } else {
      cleanLast();
      displayRanking();
    }
  }

  // Event listeners
  DOM.nextArticle.addEventListener("click", () => {
    count++;
    controlView();
  });

  DOM.lastArticle.addEventListener("click", () => {
    count--;
    controlView();
  });

  return {
    init: renderArticle(),
    // cache: cacheArticles()
  };
})();

// Load the first article onload
// articles.cache();
articles.init();
