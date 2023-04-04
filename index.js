// get elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.getElementById('search-history');

// get API key
const apiKey = 'LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a';


// initialize search history
let searches = [];

// fetch the current image of the day on page load
document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

// add event listener to search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);
});

// get current image of the day
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split('T')[0];
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // display the image
      displayImage(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// get image of the day for a specific date
function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // save the search to local storage
      saveSearch(date);
      // add the search to the search history list
      addSearchToHistory(date);
      // display the image
      displayImage(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function getPrevDate(date){
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      // add the search to the search history list
      // display the image
      displayImage(data);
    })
     
    .catch(error => {
      console.error('Error:', error);
    });
    
}

// save search to local storage
function saveSearch(date) {
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// add search to search history list
// add search to search history list
function addSearchToHistory(date) {
  const li = document.createElement('li');
  li.textContent = date;
  li.addEventListener('click', () => {
    console.log(date);
    getPrevDate(date);
    
  });
  searchHistoryList.appendChild(li);
}

// display image
function displayImage(data) {
  currentImageContainer.innerHTML = `
  
    <img src="${data.url}" alt="${data.title}">
     <h2>${data.title}</h2>
    <p>${data.explanation}</p>
  `;
}

