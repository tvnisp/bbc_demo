let articles = [1, 2 ,3 ,4 ,5],
    articlesUnordered = shuffle(articles),
    count = 0;

let DOM = {
  count: document.querySelector(".count"),
  title: document.querySelector(".title"),
  heading: document.querySelector(".heading"),
  img: document.querySelector(".img"),
  paragraph: document.querySelector(".paragraph"),
  list: document.querySelector(".list"),
  nextArticle: document.querySelector("#next-article"),
  submitFormula: document.querySelector(".submit-formula"),
}

function init() {
  getArticle(articlesUnordered[count])
  .then(data => {
    displayArticle(data)
  })
  .then(() => {
    count++
  })
  .catch(error => {
    displayError(error)
  })
  
}

// New image 
function newImage(data){
  let random = Math.floor(Math.random()*1000);
  let image = new Image();
  image.src = `https://picsum.photos/640/420/?random=sig${random}`;
  image.alt = data.model.altText
  DOM.img.appendChild(image)
}

// Display error
function displayError(data) {
  DOM.title.innerText = `${data}, Please check your internet connection and try again. Press the Home button from the navigation bar.`
}

// Display the article
function displayArticle(data) {
  DOM.count.innerText = `Article ${count +1}/5`;
  DOM.title.innerText = data.title;
   data.body.forEach(el => {
    if (el.type == "heading") {
      DOM.heading.innerText = el.model.text;
    }
    if (el.type == "image") {
      newImage(el);
    }
    if (el.type == "paragraph") {
      DOM.paragraph.insertAdjacentHTML("beforeend", `<p>${el.model.text}</p>`);
    }
    if (el.type == "list") {
      el.model.items.forEach(el => {
        DOM.list.insertAdjacentHTML("beforeend", `<li>${el}</li>`)
      })
    }
  })
}

// Display ranking
function displayRanking() {
  DOM.heading.innerText = "Ranking"
  DOM.nextArticle.style = "display: none";
  DOM.submitFormula.style = "display: flex";
  DOM.count.style = "display: none";
}

//Clean last article
function cleanLast() {
  DOM.count.innerText = "";
  DOM.title.innerText = "";
  DOM.heading.innerText = "";
  DOM.img.innerHTML = "";
  DOM.paragraph.innerHTML = "";
  DOM.list.innerHTML = "";
}

//Load an article
async function getArticle(num) {
  let response = await fetch(`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-${num}.json`);
  let data = await response.json();
  return data;
}

// Render the articles always random
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
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

const controlView = async () => {
  // Check if more articles
  if (count < 5) {    
    cleanLast()
    // Get new data and render
      getArticle(articlesUnordered[count])
      .then(data => {
        displayArticle(data)
      })
      .then(() => {
        count++
      })
      .catch(error => {
        displayError(error)
    })
  } else {
    cleanLast()
    displayRanking();
  }
}

DOM.nextArticle.addEventListener("click", () => {
  controlView()
})

init()