console.log("Hello World");
const imgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/300px-No_sign.svg.png?20101202215511"
//CREATE VARIABLES FOR REFERENCING THE BUTTON AND SEARCH BOX
var searchBtn = document.querySelector("#searchbtn");
var searchBox = document.querySelector("#searchbox");
//ADD LISTENER FOR BUTTON CLICK
searchBtn.addEventListener("click", function (event) {
  //STOP SUBMIT BUTTON FROM REFRESHING PAGE BY DEFAULT
  event.preventDefault();
  //CREATE VARIABLE FOR SEARCH INPUT
  const searchValue = searchBox.value;
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
        //GIVE CARD UNIQUE ID ATTRIBUTE
        newCard.setAttribute("id","result"+i);
        //ADD DIMENSIONS TO CARD ELEMENT
        newCard.style.height = '400px';
        newCard.style.width = '200px';
        //CREATE IMAGE ELEMENT FOR POSTER IMAGE ON CARD
        const newPoster = document.createElement('img');
        //ADD CARD TOP CLASS FOR THE IMAGE ELEMENT
        newPoster.classList.add('card-img-top');
        //ADD IMAGE SOURCE TO POSTER IMAGE ELEMENT WITH TEST FOR PLACE HOLDER IF POSTER IS N/A
        if (poster != "N/A") {
          newPoster.setAttribute("src", poster);
        }
        else {
          newPoster.setAttribute("src", imgPlaceholder)
        };
        //HEIGHT OF IMAGE TO CARD
        newPoster.style.height = '300px';
        //CREATE CARD TEXT AREA ELEMENT
        const newTextArea = document.createElement("div");
        newTextArea.classList.add("card-body");
        //CREATE TITLE AND YEAR ELEMENTS FOR CARD TEXT
        const titleText = document.createElement("h6");
        titleText.classList.add("card-title");
        const yearText = document.createElement("p");
        yearText.classList.add("card-text");
        //ADD TITLE AND YEAR TEXT OF SEARCH RESULT TO THEIR ELEMENTS
        titleText.textContent = title;
        yearText.textContent = "Released "+year;
        //ASSEMBLE THE CARD BODY TEXT AREA
        newTextArea.append(titleText,yearText);
        //ADD IMAGE AND CARD TEXT TO CARD ELEMENT
        newCard.append(newPoster,newTextArea);
        //ADD NEW CARD TO RESULTS DISPLAY AREA
        searchResults.appendChild(newCard);
      }
    })
    //.catch IS FOR ERROR HANDLING IN FETCH REQUEST
    .catch(error => console.log(error));
});
