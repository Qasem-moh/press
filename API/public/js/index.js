let cards = document.getElementById("cards");

getNews().then((data) => {
  let res = [...data];
  res.forEach((news) => {
    addCard(
      news.title,
      news.content.substring(0, 200) + "...",
      news.image_url,
      news._id
    );
  });
});

async function getNews() {
  const URL = "http://localhost:3000/";
  let f = await fetch(URL + "api/news");
  let response = f.json();
  return response;
}

function addCard(title, content, image_url, readmore_url) {
  let card = `<div class="card" id="card" data-id='${readmore_url}'>
  <img
    src="${image_url}"
    class="card-img-top"
    alt="..." 
  />
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">
     ${content}
    </p>
    <a href="http://localhost:3000/content/${readmore_url}" class="btn btn-primary">Read More</a>
  </div>
</div>`;
  cards.innerHTML += card;
}
