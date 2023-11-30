let favorites = getFavorites();
 
// Function to retrieve favorites from localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
 
function addToFavorites(item) {
  let favorites = getFavorites();
  
  // Check if the item is not already in favorites
  if (!favorites.some((fav) => fav.title === item.title)) {
    favorites.push(item);
    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Display updated favorites on the page
    displayFavorites();
  }
}
 
// Updated displayFavorites function
function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    favoritesContainer.innerHTML = '<h2>Favorites</h2>';
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML += '<p>No favorites added yet.</p>';
    } else {
      favorites.forEach((favorite, index) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
          <h3>${favorite.title}</h3>
          <img src="${favorite.poster}" alt="${favorite.title}" class="favorite-image">
          <p>${favorite.year || 'Year information not available'}</p>
          <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>
        `;
        favoritesContainer.appendChild(favoriteCard);
      });
    }
  }
  
 
// Function to search for books
async function searchBooks() {
  const searchTerm = document.getElementById('search').value;
  const apiUrl = `https://openlibrary.org/search.json?q=${searchTerm}`;
 
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
 
    displayResults(data.docs);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
 
// Function to display search results for books
function displayResults(books) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
 
  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <img src="${getBookCoverUrl(book.cover_i)}" alt="Book Cover" class="book-image">
      <button onclick="addToFavorites({ title: '${book.title}', poster: '${getBookCoverUrl(book.cover_i)}' })">Add to Favorites</button>
    `;
 
    resultsContainer.appendChild(bookCard);
  });
}
 
// Function to get the book cover URL
function getBookCoverUrl(coverId) {
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}
 
// Function to get movies
function getMovies() {
  // Reset the result div
  document.getElementById('searchResults').innerHTML = '';
 
  // Get the search term and selected year
  const searchTerm = document.getElementById('valueMovie').value;
  const selectedYear = document.getElementById('yearSelect').value;
 
  // API call with the search term and selected year
  fetch(`https://www.omdbapi.com/?apikey=d67c387a&s=${searchTerm}&y=${selectedYear}`)
    .then(res => res.json())
    .then(data => {
      // Check if there are results
      if (data.Search) {
        // Loop through the results and add them to the result div
        for (let i = 0; i < data.Search.length; i++) {
          const movieTitle = data.Search[i].Title;
          const movieYear = data.Search[i].Year;
          const moviePoster = data.Search[i].Poster;
 
          // Create a new div for each movie
          const movieDiv = document.createElement('div');
          movieDiv.innerHTML = `
            <strong>${movieTitle}</strong> ${movieYear}<br>
            <img src="${moviePoster}" alt="${movieTitle}" class="movie-poster">
            <button onclick="addToFavorites({ title: '${movieTitle}', poster: '${moviePoster}' })">Add to Favorites</button>
            <hr>
          `;
 
          // Add the new div to the result div
          document.getElementById('searchResults').appendChild(movieDiv);
        }
      } else {
        // No results found
        document.getElementById('searchResults').innerHTML = 'No results found';
      }
    })
    .catch(error => console.error('Error:', error));
}
// Updated displayFavorites function
function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    favoritesContainer.innerHTML = '<h2>Favorites</h2>';
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML += '<p>No favorites added yet.</p>';
    } else {
      favorites.forEach((favorite, index) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
          <h3>${favorite.title}</h3>
          <img src="${favorite.poster}" alt="${favorite.title}" class="favorite-image">
          <p>${favorite.year || 'Year information not available'}</p>
          <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>
        `;
        favoritesContainer.appendChild(favoriteCard);
      });
    }
  }
  
  
  displayFavorites();
function removeFromFavorites(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Remove the item at the specified index
    favorites.splice(index, 1);
  
    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    // Re-display favorites
    displayFavorites();
  }
  
  
// Updated displayFavorites function
function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    favoritesContainer.innerHTML = '';
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML += '<p>No favorites added yet.</p>';
    } else {
      favorites.forEach((favorite, index) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
          <h3>${favorite.title}</h3>
          <img src="${favorite.poster}" alt="${favorite.title}" class="favorite-image">
          <p>${favorite.year || ''}</p>
          <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>
        `;
        favoritesContainer.appendChild(favoriteCard);
      });
    }
  }
  
  
  displayFavorites();