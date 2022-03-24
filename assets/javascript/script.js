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
  fetch('http://www.omdbapi.com/?apikey=4619adc4&t='+ searchValue)
    .then(response => response.json())
    .then(data => console.log(data))
    //.CATCH IS FOR ERROR HANDLING IN FETCH REQUEST
    .catch(error => console.log(error));
});




