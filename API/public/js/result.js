const ID = location.pathname.split("/")[2];
let title = document.getElementById("title");
let date = document.getElementById("date");
let image = document.getElementById("image");
let text = document.getElementById("text");
let spinner = document.getElementById("spinner");
const URL = "http://localhost:3000";

fetch(URL + "/api/news/id/" + ID)
  .then((res) => res.json())
  .then((data) => {
    spinner.style.display = "none";
    title.innerHTML = data.data.title;
    date.innerHTML = data.data.date;
    image.src = data.data.image_url;
    text.innerHTML = data.data.content;
    console.log(data);
  });

  