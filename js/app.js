// require("dotenv").config();

const API_URL = `https://pixabay.com/api`;
const API_KEY = process.env.API_KEY;
const BASE_URL = `${API_URL}/?key=${API_KEY}&q=`;

console.log(API_URL);
console.log(BASE_URL);

const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingImage = document.querySelector("#loadingImage");
const imageSection = document.querySelector(".images");

loadingImage.style.display = "none";
form.addEventListener("submit", formSubmitted);

function formSubmitted(e) {
  e.preventDefault();
  const searchTerm = input.value;
  searchStart();
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = "none";
    });
}

function searchStart() {
  loadingImage.style.display = "";
  imageSection.innerHTML = "";
}

async function search(searchTerm) {
  const url = `${BASE_URL}${searchTerm}&image_type=photo&pretty=true`;
  console.log(url);
  const response = await fetch(url);
  const results = await response.json();
  console.log(results);
  return results.imageUrl;
}

function displayImages(results) {
  result.forEach((result) => {
    const imageElement = document.createElement("img");
    imageElement.src = result.imageUrl[0];
    imageSection.appendChild(imageElement);
  });
}
