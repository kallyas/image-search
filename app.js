// require("dotenv").config();

const API_URL = `https://pixabay.com/api`;
const API_KEY = `17631253-060c608ba0a8d5a2779c2e3dc`;
const BASE_URL = `${API_URL}/?key=${API_KEY}&q=`;

const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.images');

loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  
  searchStart();
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  const url = `{BASE_URL}${searchTerm}&image_type=photo&pretty=true`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.photos;
    });
}

function displayImages(images) {
  images.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = image.image_url[0];
    imageSection.appendChild(imageElement);
  });
}
