console.log("hello world");

let header = document.getElementById("header");
let body = document.getElementById("body");
let footer = document.getElementById("footer");

let appTitle = document.createElement("h1");
appTitle.id = "appTitle";
header.appendChild(appTitle);

let plusDiv = document.createElement("div");
plusDiv.id = "plusDiv";
plusDiv.innerHTML = "+";
header.appendChild(plusDiv);

let menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";
header.appendChild(menuDiv);

  let randomButton = document.createElement("button");
  randomButton.id = "randomButton";
  randomButton.innerHTML = "RANDOM";
  randomButton.addEventListener("click", function(){
    makeReq("glitch_art");
  })
  menuDiv.appendChild(randomButton);

  let boardsButton = document.createElement("button");
  boardsButton.id = "boardsButton";
  boardsButton.innerHTML = "MY BOARDS";
  boardsButton.addEventListener("click", function(){
    makeReq("VaporwaveAesthetics");
  })
  menuDiv.appendChild(boardsButton);

  let getAppButton = document.createElement("button");
  getAppButton.id = "getAppButton";
  getAppButton.innerHTML = "GET THE APP";
  getAppButton.addEventListener("click", function(){
    makeReq("ImaginaryLandscapes");
  })
  menuDiv.appendChild(getAppButton);

let mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
body.appendChild(mainDiv);

  let headerDiv = document.createElement("div");
  headerDiv.id = "headerDiv";
  mainDiv.appendChild(headerDiv);

makeReq("outrun");

function makeReq(subreddit){
  let url = `https://www.reddit.com/r/${subreddit}.json`
  let newReq = new XMLHttpRequest();
  newReq.open("GET", url);
  newReq.send();
  newReq.addEventListener("load", callBack);
}

function callBack(){
  mainDiv.innerHTML = "";
  let data = JSON.parse(this.responseText);
  postBuilder(mainDiv, 12, data);
}

function postBuilder(parentElem, amount, data){
  let postData = data.data.children;

  for(let i = 0; i < amount; i++){
    let postDiv = document.createElement("div");
    postDiv.className = "postDiv";
    parentElem.appendChild(postDiv);

    let pictureElem = document.createElement("div");
    pictureElem.className = "pictureElem";
    if(postData[i].data.hasOwnProperty("preview") && postData[i].data.preview.images[0].variants.hasOwnProperty("gif")){
      pictureElem.style.backgroundImage = `url('${postData[i].data.preview.images[0].variants.gif.source.url}')`;
    }else if(postData[i].data.hasOwnProperty("preview")){
      pictureElem.style.backgroundImage = `url('${postData[i].data.preview.images[0].source.url}')`;
    }else{
      pictureElem.style.backgroundImage = `url('${postData[i].data.url}')`;
    }
    postDiv.appendChild(pictureElem);

    let titleDiv = document.createElement("div");
    titleDiv.className = "titleDiv";
    if((postData[i].data.title).length > 50){
      titleDiv.innerHTML = (postData[i].data.title).substr(0, 50) + "...";
    }else{
      titleDiv.innerHTML = postData[i].data.title;
    }
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