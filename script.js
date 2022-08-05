const API_URL = "https://jsonplaceholder.typicode.com/albums/1/photos";
let container = document.querySelector(".container");
let input = document.querySelector(".search");
let cardsResponse = [];

function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function renderCards(cards) {
    clearContainer();
    cards.forEach((card) => {
        const content = document.createElement("div");
        content.classList.add("content");

        const button = document.createElement("button");
        button.textContent = "x";
        button.classList.add("close-button");
        button.addEventListener("click", function (event) {
            removeContent(content);
        });

        const title = document.createElement("div");
        title.classList.add("title");
        title.innerHTML = card.title;

        input.addEventListener("change", function (event) {
            filterContent(cardsResponse, event.target.value);
        });

        const photo = document.createElement("div");
        photo.classList.add("photo");
        photo.innerHTML = `<img src= "\ ${card.thumbnailUrl}">`;

        content.appendChild(title);
        content.appendChild(photo);
        content.appendChild(button);
        container.appendChild(content);
    })
}

//Fetch data from api and render
fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        renderCards(data);
        cardsResponse = data;
    })
    .catch((error) => console.log(error))

//New data according to filter
function filterContent(data, text) {
    const newData = data.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    renderCards(newData);
}

//Assign close button features
function removeContent(element) {
    element.remove();
}
