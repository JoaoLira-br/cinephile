const btnSearch = document.querySelector('.btn');
const searchInput = document.querySelector('.header__browser');

btnSearch.addEventListener('click', function() {
    const searchValue = searchInput.value;
    console.log(searchValue);
    localStorage.setItem('movieName', searchValue);

});

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
function alertNotImplemented() {
    console.log('This feature is not implemented yet!');
    
//   alert('This feature is not implemented yet!');
}
alertNotImplemented();