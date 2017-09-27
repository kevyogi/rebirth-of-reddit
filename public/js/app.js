console.log("hello world");

let header = document.getElementById("header");
let body = document.getElementById("body");
let footer = document.getElementById("footer");

let plusDiv = document.createElement("div");
plusDiv.id = "plusDiv";
header.appendChild(plusDiv);

  let thePlus = createIdElement("div", "thePlus", plusDiv, "+");

let appTitle = createIdElement("h1", "appTitle", header, "");

let menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";
header.appendChild(menuDiv);

  let randomButton = createIdElement("button", "randomButton", menuDiv, "RANDOM");
  randomButton.addEventListener("click", function(){
    makeReq("glitch_art");
  })

  let boardsButton = createIdElement("button", "boardsButton", menuDiv, "MY BOARDS");
  boardsButton.addEventListener("click", function(){
    makeReq("VaporwaveAesthetics");
  })

  let getAppButton = createIdElement("button", "getAppButton", menuDiv, "GET THE APP");
  getAppButton.addEventListener("click", function(){
    makeReq("ImaginaryLandscapes");
  })

let mainDiv = createClassedElement("div", "mainDiv", body);

  let headerDiv = createIdElement("div", "headerDiv", mainDiv, "");

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

    let postDiv = createClassedElement("div", "postDiv", parentElem);

    let pictureElem = createClassedElement("div", "pictureElem", postDiv);
    if(postData[i].data.hasOwnProperty("preview") && postData[i].data.preview.images[0].variants.hasOwnProperty("gif")){
      pictureElem.style.backgroundImage = `url('${postData[i].data.preview.images[0].variants.gif.source.url}')`;
    }else if(postData[i].data.hasOwnProperty("preview")){
      pictureElem.style.backgroundImage = `url('${postData[i].data.preview.images[0].source.url}')`;
    }else{
      pictureElem.style.backgroundImage = `url('${postData[i].data.url}')`;
    }

    let brElem1 = createClassedElement("br", "brElem", postDiv);

    let titleDiv = createClassedElement("div", "titleDiv", postDiv);
    if((postData[i].data.title).length > 50){
      titleDiv.innerHTML = (postData[i].data.title).substr(0, 50) + "...";
    }else{
      titleDiv.innerHTML = postData[i].data.title;
    }

    let submitterDiv = createClassedElement("div", "submitterDiv", postDiv);
    submitterDiv.innerHTML = "by " + postData[i].data.author + " on " + (new Date(postData[i].data.created * 1000)).toLocaleString();

    let scoreDiv = createClassedElement("div", "scoreDiv", postDiv);
    scoreDiv.innerHTML = postData[i].data.score + " upvotes";

    let commentDiv = createClassedElement("div", "commentDiv", postDiv);
    commentDiv.innerHTML = "Comments: " + postData[i].data.num_comments;

    let brElem2 = createClassedElement("br", "brElem", postDiv);
  }
}

let facebook = createIdElement("div", "facebook", footer, "");

let instagram = createIdElement("div", "instagram", footer, "");

function createClassedElement(element, className, parent){
  let newElement = document.createElement(element);
  newElement.className = className;
  parent.appendChild(newElement);
  return newElement;
}

function createIdElement(element, id, parent, innerHTML){
  let newElement = document.createElement(element);
  newElement.id = id;
  newElement.innerHTML = innerHTML;
  parent.appendChild(newElement);
  return newElement;
}