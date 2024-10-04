const apiKey = 'fdbbfd20';
const searchInput = localStorage.getItem('movieName') ? localStorage.getItem('movieName') : '';
const requestURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;


async function searchMovie(filter){
    if(!searchInput){
        alert('Please enter a movie name');
        return;
    } else {
        requestURL += `s=${searchInput}&`;
        const response = await fetch(requestURL);
        const data = await response.json();
        console.log(data);
    }
}