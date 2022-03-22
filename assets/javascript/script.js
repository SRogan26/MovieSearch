console.log("Hello World");
//FETCH REQUEST FOR GETTING DATA FROM API
fetch('http://www.omdbapi.com/?apikey=4619adc4&s=water%20boy')
  .then(response => response.json())
  .then(data => console.log(data));
