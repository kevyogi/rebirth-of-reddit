console.log("hello world");

let body = document.getElementById("body");

let mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
body.appendChild(mainDiv);

let titleDiv = document.createElement("div");
titleDiv.id = "titleDiv";
mainDiv.appendChild(titleDiv);

let headerDiv = document.createElement("div");
headerDiv.id = "headerDiv";
mainDiv.appendChild(headerDiv);

let pictureElem = document.createElement("img");
pictureElem.id = "picOne";
body.appendChild(pictureElem);

let redditReq = new XMLHttpRequest();
redditReq.addEventListener("load", function(){
  let data = JSON.parse(this.responseText);
  postBuilder(body, 4, data);
});
redditReq.open("GET", "https://www.reddit.com/r/outrun.json");
redditReq.send();

function postBuilder(parentElem, amount, data){
  console.log(data.data.children[2].data.url);
  for(let i = 0; i < (amount+2); i++){
    let postDiv = document.createElement("div");
    postDiv.className = "postDiv";
    parentElem.appendChild(postDiv);

    let pictureElem = document.createElement("img");
    pictureElem.className = "pictureElem";
    postDiv.appendChild(pictureElem);
    pictureElem.src = data.data.children[i].data.url;

  }
}