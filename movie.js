
for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i);
    console.log(element);
  }
console.log(localStorage.getItem("movieData"));



const FILTERS = { OLDEST: "OLDEST", NEWEST: "NEWEST"};
const menuBackdrop = document.querySelector(".menu__backdrop");
const apiKey = "fdbbfd20";
let userHasSearched = localStorage.getItem("movieData") ? true : false;
let omdbResponse = userHasSearched ? localStorage.getItem("movieData") : "";
localStorage.removeItem("movieData");
const requestURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;
const unsplashAPI =
  "https://api.unsplash.com/photos/random?query=lego+movie&client_id=6bHnrOETlHPBvUqDVJbYfOvULGCixhU-_HCTbVU3-ng";
let existsSearchedMovie = omdbResponse ? true : false;
let input = "";

async function searchMovie() {
  userHasSearched = true;
  console.log("pimba");
  const searchInput = document.querySelector(".header__browser");
  input = searchInput.value;
  if (!input) {
    alert("Enter a movie name");
    return;
  }
  const spinnerContainer = document.querySelector(".spinner__container");
  spinnerContainer.classList.add("loading");
  let fetchURL = requestURL + `s=${input}`;
  const response = await fetch(fetchURL);
  omdbResponse = await response.json();
  console.log(omdbResponse);

  existsSearchedMovie = omdbResponse.hasOwnProperty("Search") ? true : false;
  spinnerContainer.classList.remove("loading");

  omdbResponse = JSON.stringify(omdbResponse);
  renderMovie();
}

function renderMovie(filter = "") {
  const movieWrapper = document.querySelector(".movies--container");
  const moviesSection = document.querySelector(".movies");
  if (!userHasSearched) {
    return;
  }
  if (!existsSearchedMovie) {
    let notFoundHTML = getNotFoundHTML();
    movieWrapper.innerHTML = notFoundHTML;
    return;
  }
  let movies = omdbResponse ? JSON.parse(omdbResponse).Search : "";
  movies = movies.length > 6 ? movies.slice(0, 6) : movies;
    if (filter === FILTERS.OLDEST){
        movies.sort((a, b) => a.Year - b.Year);
    }
    if (filter === FILTERS.NEWEST){
        movies.sort((a, b) => b.Year - a.Year);
    }
  const movieHTML = movies
    .map((movie) => {
      return getMovieHTML(movie);
    })
    .join("");
  movieWrapper.innerHTML = movieHTML;
}

function filterMovies(event){
    const filter = event.target.value;
    renderMovie(filter);
}

function getMovieHTML(movie) {
  let moviePoster = movie.Poster === "N/A" ? getRandomImage() : movie.Poster;
  return `
    <div class="movie">
    <figure class="img__movie--wrapper">
        <img
        src="${movie.Poster}"
        alt="poster"
        class="img__movie"
        />
    </figure>
    <h3 class="movie__title">${movie.Title}</h3>
    <p class="movie__description">${movie.Year}</p>
    <p class="movie__description">${movie.Type}</p>
    </div>
    `;
}

function getNotFoundHTML() {
  return `<div class="movies--not-found">
    <h2 class="movies__not-found--title">Could not find any movie with title "${input}" </h2>
    <figure class="movies__not-found--wrapper">
        <img
            src="./assets/undraw_void_-3-ggu.svg"
            alt="not found"
            class="movies__not-found--img"
        />
    </figure>
  </div>`;
}
async function getRandomImage() {
  const response = await fetch(unsplashAPI);
  const data = await response.json();
  console.log(data);

  return data.urls.regular;
}
function openMenu() {
  menuBackdrop.classList.add("menu--open");
  // document.body.classList.add('menu--open');
}

function closeMenu() {
  menuBackdrop.classList.remove("menu--open");
}

renderMovie();
