console.log("Hello World");
//PLACEHOLDER IMAGE URL
const imgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/300px-No_sign.svg.png?20101202215511"
//LIST SEARCH URL
const listSearch = 'http://www.omdbapi.com/?apikey=4619adc4&s=';
//BY ID SEARCH URL
const idSearch = 'http://www.omdbapi.com/?apikey=4619adc4&i=';
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
  fetch(listSearch + searchValue)
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
        const idNumber = movie.imdbID;
        //CREATE NEW COLUMN ELEMENT TO WRAP OUR CARD INTO
        const newColDiv = document.createElement("div");
        newColDiv.classList.add("col-sm-12","col-md-6","col-lg-4");
        //SET UP FUNCTIONALITY TO CREATE A NEW CARD HTML ELEMENT FOR EACH RESULT  
        const newCard = document.createElement('div');
        //ADD THE CARD CLASS TO OUR NEW DIV ELEMENT
        newCard.classList.add('card');
        //GIVE CARD UNIQUE ID ATTRIBUTE
        newCard.setAttribute("id", "result" + i);
        //APPEND CARD TO COLUMN DIV ELEMENT
        newColDiv.appendChild(newCard);
        //ADD DIMENSIONS TO CARD ELEMENT, LETS 3 RESULTS DISPLAY PER ROW W/DYNAMIC SIZE
        //newCard.style.width = '30%';
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
        //CREATE CARD TEXT AREA ELEMENT
        const newBodyArea = document.createElement("div");
        newBodyArea.classList.add("card-body");
        //CREATE TITLE AND YEAR ELEMENTS FOR CARD TEXT
        const titleText = document.createElement("h5");
        titleText.classList.add("card-title");
        const yearText = document.createElement("p");
        yearText.classList.add("card-text");
        //ADD TITLE & YEAR TEXT OF SEARCH RESULT TO THEIR ELEMENTS
        titleText.innerText = title;
        yearText.textContent = "Released " + year;
        //CREATE BUTTON FOR PLOT, DISPLAYING ID AS TEXT FOR PLACEHOLDER
        const plotBtn = document.createElement("btn");
        plotBtn.classList.add('btn', 'btn-success');
        plotBtn.setAttribute("href", idSearch + idNumber + '&plot=full');
        plotBtn.textContent = 'Plot: ' + idNumber;
        //ASSEMBLE THE CARD BODY TEXT AREA W/ PLOT BUTTON
        newBodyArea.append(titleText, yearText, plotBtn);
        //ADD IMAGE AND CARD TEXT TO CARD ELEMENT
        newCard.append(newPoster, newBodyArea);
        //ADD NEW CARD TO RESULTS DISPLAY AREA
        searchResults.appendChild(newColDiv);
      }
    })
    //.catch IS FOR ERROR HANDLING IN FETCH REQUEST
    .catch(error => console.log(error));
});
