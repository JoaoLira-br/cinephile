for (let i = 0; i < localStorage.length; i++) {
  const element = localStorage.key(i);
  console.log(element);
}
console.log(typeof localStorage.getItem("movieData"));

const FILTERS = { OLDEST: "OLDEST", NEWEST: "NEWEST" };
const menuBackdrop = document.querySelector(".menu__backdrop");
const apiKey = "fdbbfd20";
let userHasSearched = localStorage.getItem("movieData") ? true : false;
let existsSearchedMovie = false;
let movieData = [];
let moreInfoJSON = {};
let movieJSON = {};

if(userHasSearched){
    movieJSON = JSON.parse(localStorage.getItem("movieData"));
    existsSearchedMovie = movieJSON.hasOwnProperty("Search") ? true : false;
    if(existsSearchedMovie){
        movieData = movieJSON.Search;
    }
}

console.log(typeof movieData);
console.log(movieData[1]);


localStorage.removeItem("movieData");
const requestURL = `https://www.omdbapi.com/?apikey=${apiKey}&`;
let input = "";
// let existsSearchedMovie = omdbResponse ? true : false;

async function searchMovie() {
  userHasSearched = true;
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
  movieJSON = await response.json();
  existsSearchedMovie = movieJSON.hasOwnProperty("Search") ? true : false;
  spinnerContainer.classList.remove("loading");
  movieData = movieJSON.Search;
  console.log(movieData);
  renderMovie();
}


async function renderMovie(filter = "") {
  const movieWrapper = document.querySelector(".movies--container");
  const moviesSection = document.querySelector(".movies");
  const movieSearchTitle = document.querySelector(".movies__search--title");
  if (!userHasSearched) {
    return;
  }
  if (!existsSearchedMovie) {
    movieSearchTitle.innerHTML = `Could not find any movie with title <span class='yellow'> "${input}"</span>`;
    let notFoundHTML = getNotFoundHTML();
    movieWrapper.innerHTML = notFoundHTML;
    return;
  }
  let movies = movieData ? movieData : "";
     console.log(movies);
     console.log(typeof movies);

//   let movies = JSON.parse(omdbResponse).Search;



  movies = movies.length > 6 ? movies.slice(0, 6) : movies;
  if (filter === FILTERS.OLDEST) {
    movies.sort((a, b) => a.Year - b.Year);
  }
  if (filter === FILTERS.NEWEST) {
    movies.sort((a, b) => b.Year - a.Year);
  }

 for (let movie of movies) {
    let resJSON = await fetch(requestURL + `i=${movie.imdbID}`);
    resJSON = await resJSON.json();
    console.log(resJSON);
    
    let obj = {...movie, ...resJSON};
    console.log(obj);
    
    movie = {...movie, ...resJSON};
}
  
  console.log(movies);
  
  
  const movieHTML = movies
    .map((movie) => {
      return getMovieHTML(movie);
    })
    .join("");
  movieWrapper.innerHTML = movieHTML;
}

function filterMovies(event) {
  const filter = event.target.value;
  renderMovie(filter);
}

function getMovieHTML(movie) {
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
    <figure class="movies__not-found--wrapper">
        <img
            src="./assets/undraw_void_-3-ggu.svg"
            alt="not found"
            class="movies__not-found--img"
            />
    </figure>
  </div>`;
}
// async function getRandomImage() {
//   const response = await fetch(unsplashAPI);
//   const data = await response.json();
//   console.log(data);

//   return data.urls.regular;
// }
function openMenu() {
  menuBackdrop.classList.add("menu--open");
}

function closeMenu() {
  menuBackdrop.classList.remove("menu--open");
}

renderMovie();
