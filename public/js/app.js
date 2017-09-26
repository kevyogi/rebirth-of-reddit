console.log("hello world");

let header = document.getElementById("header");
let body = document.getElementById("body");

let appTitle = document.createElement("h1");
appTitle.id = "appTitle";
header.appendChild(appTitle);

let plusDiv = document.createElement("div");
plusDiv.id = "plusDiv";
header.appendChild(plusDiv);

let menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";
header.appendChild(menuDiv);


function makeReq(element, url){
  let element = new XMLHttpRequest();
  element.open("GET", url);
  element.send();
  element.addEventListener("load", function(){
    mainDiv.innerHTML = "";
    let data = JSON.parse(this.responseText);
    postBuilder(mainDiv, 10, data);
  })
}



  let randomButton = document.createElement("button");
  randomButton.id = "randomButton";
  randomButton.innerHTML = "RANDOM";
  randomButton.addEventListener("click", function(){
    let randomReq = new XMLHttpRequest();
    randomReq.open("GET", "https://www.reddit.com/r/glitch_art.json");
    randomReq.send();
    randomReq.addEventListener("load", function(){
      mainDiv.innerHTML = "";
      let data = JSON.parse(this.responseText);
      postBuilder(mainDiv, 12, data);
    })
  })
  menuDiv.appendChild(randomButton);

  let boardsButton = document.createElement("button");
  boardsButton.id = "boardsButton";
  boardsButton.innerHTML = "MY BOARDS";
  boardsButton.addEventListener("click", function(){
    let boardReq = new XMLHttpRequest();
    boardReq.open("GET", "https://www.reddit.com/r/VaporwaveAesthetics.json");
    boardReq.send();
    boardReq.addEventListener("load", function(){
      mainDiv.innerHTML = "";
      let data = JSON.parse(this.responseText);
      postBuilder(mainDiv, 12, data);
    })
  })
  menuDiv.appendChild(boardsButton);

  let getAppButton = document.createElement("button");
  getAppButton.id = "getAppButton";
  getAppButton.innerHTML = "GET THE APP";
  getAppButton.addEventListener("click", function(){
    let getAppReq = new XMLHttpRequest();
    getAppReq.open("GET", "https://www.reddit.com/r/ImaginaryLandscapes.json");
    getAppReq.send();
    getAppReq.addEventListener("load", function(){
      mainDiv.innerHTML = "";
      let data = JSON.parse(this.responseText);
      postBuilder(mainDiv, 12, data);
    })
  })
  menuDiv.appendChild(getAppButton);

let mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
body.appendChild(mainDiv);

let headerDiv = document.createElement("div");
headerDiv.id = "headerDiv";
mainDiv.appendChild(headerDiv);



let redditReq = new XMLHttpRequest();
redditReq.addEventListener("load", function(){
  let data = JSON.parse(this.responseText);
  postBuilder(mainDiv, 12, data);
});
redditReq.open("GET", "https://www.reddit.com/r/outrun.json");
redditReq.send();

function postBuilder(parentElem, amount, data){
  console.log(data.data.children[0].data);
  let postData = data.data.children;


  for(let i = 0; i < amount; i++){
    let postDiv = document.createElement("div");
    postDiv.className = "postDiv";
    parentElem.appendChild(postDiv);

    let pictureElem = document.createElement("div");
    pictureElem.className = "pictureElem";
    pictureElem.style.backgroundImage = `url('${postData[i].data.url}')`;
    postDiv.appendChild(pictureElem);

    let titleDiv = document.createElement("div");
    titleDiv.className = "titleDiv";
    titleDiv.innerHTML = (postData[i].data.title).substr(0, 50) + "...";
    postDiv.appendChild(titleDiv);

    let submitterDiv = document.createElement("div");
    submitterDiv.className = "submitterDiv";
    submitterDiv.innerHTML = "by " + postData[i].data.author + " on " + (new Date(postData[i].data.created * 1000)).toLocaleString();
    postDiv.appendChild(submitterDiv);

    let scoreDiv = document.createElement("div");
    scoreDiv.className = "scoreDiv";
    scoreDiv.innerHTML = postData[i].data.score + " upvotes";
    postDiv.appendChild(scoreDiv);

    let commentDiv = document.createElement("div");
    commentDiv.className = "commentDiv";
    commentDiv.innerHTML = "Comments: " + postData[i].data.num_comments;
    postDiv.appendChild(commentDiv);

    let brElem = document.createElement("br");
    postDiv.appendChild(brElem);

  }
}