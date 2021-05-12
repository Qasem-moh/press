let title = document.getElementById("title");
let content = document.getElementById("content");
let image_url = document.getElementById("image_url");
let image_preview = document.getElementById("image_preview");
let post = document.getElementById("post");
let show_dialog = document.getElementById("show_dialog");
let dialog = document.getElementById("dialog");
let close_dialog = document.getElementById("close_dialog");
let cards = document.getElementById("cards");
// edit dialog
let edit_title = document.getElementById("edit_title");
let edit_content = document.getElementById("edit_content");
let edit_image_url = document.getElementById("edit_image_url");
let edit_image_preview = document.getElementById("edit_image_preview");
let edit_save = document.getElementById("save");
let edit_show_dialog = document.getElementById("edit_dialog");
let edit_dialog = document.getElementById("edit_dialog");
let edit_close_dialog = document.getElementById("close_dialog_edit");

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
  let remove_bts = document.getElementsByClassName("btn btn-red remove");
  for (let i = 0; i < remove_bts.length; i) {
    remove_bts[i].addEventListener("click", (e) => {
      let id = e.target.parentElement.parentElement.getAttribute("data-id");
      removePost(id).then((e) => {
        alert("deleted");
      });
    });
    i++;
  }
  let edit_bts = document.getElementsByClassName("btn btn-secondary edit");
  for (let i = 0; i < edit_bts.length; i) {
    edit_bts[i].addEventListener("click", (e) => {
      let id = e.target.parentElement.parentElement.getAttribute("data-id");

      getNewsByID(id).then((data) => {
        edit_show_dialog.removeAttribute("hidden");
        edit_content.innerHTML = data.data.data.content;
        edit_title.value = data.data.data.title;
        edit_image_preview.src = data.data.data.image_url;
        edit_image_url.value = data.data.data.image_url;
      });
      edit_save.addEventListener("click", (e) => {
        console.log(edit_content.value);
        SavePost(
          id,
          edit_title.value,
          edit_image_url.value,
          edit_content.value
        ).then((respose) => {
          edit_dialog.setAttribute("hidden", "");
          window.location.reload();
        });
      });
    });
    i++;
  }
});

const URL = "http://localhost:3000/";
show_dialog.addEventListener("click", (e) => {
  dialog.removeAttribute("hidden");
});
close_dialog.addEventListener("click", (e) => {
  dialog.setAttribute("hidden", "");
});

edit_close_dialog.addEventListener("click", (e) => {
  edit_dialog.setAttribute("hidden", "");
});
edit_image_url.addEventListener("input", (e) => {
  edit_image_preview.src = image_url.value;
});

image_url.addEventListener("input", (e) => {
  image_preview.src = image_url.value;
});

post.addEventListener("click", (e) => {
  let title = document.getElementById("title");
  let content = document.getElementById("content");
  let image_url = document.getElementById("image_url");
  Post(title.value, image_url.value, content.value).then((r) => {
    dialog.setAttribute("hidden", "");
    window.location.reload();
  });
});
async function removePost(id) {
  let f = await fetch(URL + "api/news/remove", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  let response = f.json();
  return response;
}

async function SavePost(id, title, image, content) {
  let f = await fetch(URL + "api/news/edit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id,
      title: title,
      content: content,
      image_url: image,
    }),
  });
  let response = f.json();
  return response;
}

async function Post(title, image, content) {
  let f = await fetch(URL + "api/news/add", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: title, content: content, image_url: image }),
  });
  let response = f.json();
  return response;
}

async function getNews() {
  const URL = "http://localhost:3000/";
  let f = await fetch(URL + "api/news");
  let response = f.json();
  return response;
}

async function getNewsByID(id) {
  const URL = "http://localhost:3000/";
  let f = await fetch(URL + "api/news/get/" + id);
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
    <a href="http://localhost:3000/content/${readmore_url}" class="btn btn-primary">Preview</a>
    <button class="btn btn-secondary edit" >edit</button>
    <button class="btn btn-red remove" >remove</button>
    </div>
</div>`;
  cards.innerHTML += card;
}
