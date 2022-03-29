console.log("Hello World");
//CREATE VARIABLES FOR REFERENCING THE BUTTON AND SEARCH BOX
var searchBtn = document.querySelector("#searchbtn");
var searchBox = document.querySelector("#searchbox");
//ADD LISTENER FOR BUTTON CLICK
searchBtn.addEventListener("click", function (event) {
  //STOP SUBMIT BUTTON FROM REFRESHING PAGE BY DEFAULT
  event.preventDefault();
  //CREATE VARIABLE FOR SEARCH INPUT
  var searchValue = searchBox.value;
  //FETCH REQUEST FOR GETTING DATA FROM API
  fetch('http://www.omdbapi.com/?apikey=4619adc4&s=' + searchValue)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      //FOR LOOP WILL LET US ACCESS EACH SEARCH RESULT INDIVIDUALLY
      for (let i = 0; i < data.Search.length; i++) {
        //CREATE VARIABLE TO REFERENCE RESULTS AREA
        const searchResults = document.querySelector("#results");
        //CREATE VARIABLES TO REPRESENT RESULTS FIELDS
        const movie = data.Search[i];
        const title = movie.Title;
        const year = movie.Year;
        const poster = movie.Poster;
        //SET UP FUNCTIONALITY TO CREATE A NEW CARD HTML ELEMENT FOR EACH RESULT  
        const newCard = document.createElement('div');
        //ADD THE CARD CLASS TO OUR NEW DIV ELEMENT
        newCard.classList.add('card');
        //ADD DIMENSIONS TO CARD ELEMENT
        newCard.style.height = '200px';
        newCard.style.width = '200px';
        //CREATE IMAGE ELEMENT FOR POSTER IMAGE ON CARD
        const newPoster = document.createElement('img');
        //ADD CARD TOP CLASS FOR THE IMAGE ELEMENT
        newPoster.classList.add('card-img-top');
        //ADD IMAGE SOURCE TO POSTER IMAGE ELEMENT
        newPoster.setAttribute("src",poster);
        //HEIGHT OF IMAGE TO CARD
        newPoster.style.height = '100px';
        //ADD IMAGE TO CARD ELEMENT
        newCard.appendChild(newPoster);
        //ADD NEW CARD TO RESULTS DISPLAY AREA
        searchResults.appendChild(newCard);
      }
    })
    //.catch IS FOR ERROR HANDLING IN FETCH REQUEST
    .catch(error => console.log(error));
});
