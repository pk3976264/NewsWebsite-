const API_KEY = "29a381d219844c62839c1d67f15756d4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data)
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const templateCards = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardsClone = templateCards.content.cloneNode(true);
        fillDataInCard(cardsClone,article);
        cardsContainer.appendChild(cardsClone);
    });
};

function fillDataInCard(cardsClone, article){
    const NewsImg = cardsClone.querySelector("#news-img");
    const NewsTitle = cardsClone.querySelector("#news-title");
    const NewsSource = cardsClone.querySelector("#news-source");
    const NewsDesc = cardsClone.querySelector("#news-desc");

    NewsImg.src = article.urlToImage;
    NewsTitle.innerHTML = article.title;
    NewsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/jakarta"
    });

    NewsSource.innerHTML = `${article.source.name} . ${date}`;

    cardsClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const SearchButton = document.getElementById("search-button");
const SearchText = document.getElementById("search-text");

SearchButton.addEventListener("click", () => {
    const query = SearchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
