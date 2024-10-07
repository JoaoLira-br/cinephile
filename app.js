const btnSearch = document.querySelector(".btn");
const anchorContact = document.querySelector(".nav__link--primary");
const anchorsContact = document.querySelectorAll(".link__contact");
const anchorsFindMovie = document.querySelectorAll("a[href*='movie.html']");
const searchInput = document.querySelector(".header__browser");
const spinnerContainer = document.querySelector(".spinner__container");
const menuBackdrop = document.querySelector('.menu__backdrop');
// let sentFromHome = {firstTime: false, movieData: ""};

const apiKey = "fdbbfd20";
let requestURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;

async function handleClickListeners() {
  btnSearch.addEventListener("click", async function () {
    console.log("button clicked");
    if (!searchInput.value) {
      console.log("pimba");
      alert("Enter a movie name");
      return;
    }
    spinnerContainer.classList.add("loading");
    console.log("pimba2");
    requestURL += `s=${searchInput.value}`;
    const response = await fetch(requestURL);
    const data = await response.json();
    
    localStorage.setItem("movieData", JSON.stringify(data));
    // sentFromHome.firstTime = true;

    // localStorage.setItem("sentFromHome", {firstTime: true, movieData: JSON.stringify(data)});
    spinnerContainer.classList.remove("loading");
    window.location.href = `${window.location.origin}/movie-finder/movie.html`;
  });

  anchorsContact.forEach((anchor) => {
    anchor.addEventListener("click", function () {
      alert("This feature is not implemented yet!");
    });
  });

  
}

function openMenu(){
    menuBackdrop.classList.add('menu--open');
    // document.body.classList.add('menu--open');
}

function closeMenu(){
    menuBackdrop.classList.remove('menu--open');
}




handleClickListeners();
