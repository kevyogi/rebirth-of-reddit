console.log("hello world");

let body = document.getElementById("body");

let appTitle = document.createElement("h1");
appTitle.id = "appTitle";
body.appendChild(appTitle);

let plusDiv = document.createElement("div");
plusDiv.id = "plusDiv";
body.appendChild(plusDiv);

let menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";
body.appendChild(menuDiv);

  let randomButton = document.createElement("button");
  randomButton.id = "randomButton";
  randomButton.innerHTML = "RANDOM";
  menuDiv.appendChild(randomButton);

  let boardsButton = document.createElement("button");
  boardsButton.id = "boardsButton";
  boardsButton.innerHTML = "MY BOARDS";
  boardsButton.addEventListener("click", function(){
    let boardReq = new XMLHttpRequest();
    boardReq.open("GET", "https://www.reddit.com/r/VaporwaveAesthetics.json");
    boardReq.send();
    boardReq.addEventListener("load", function(){
      let data = JSON.parse(this.responseText);
      postBuilder(mainDiv, 10, data);
    })
  })
  menuDiv.appendChild(boardsButton);

  let getAppButton = document.createElement("button");
  getAppButton.id = "getAppButton";
  getAppButton.innerHTML = "GET THE APP";
  menuDiv.appendChild(getAppButton);

let mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
body.appendChild(mainDiv);

let headerDiv = document.createElement("div");
headerDiv.id = "headerDiv";
mainDiv.appendChild(headerDiv);



let redditReq = new XMLHttpRequest();
redditReq.addEventListener("load", function(){
  let data = JSON.parse(this.responseText);
  postBuilder(mainDiv, 10, data);
});
redditReq.open("GET", "https://www.reddit.com/r/outrun.json");
redditReq.send();

function postBuilder(parentElem, amount, data){
  console.log(data.data.children[12].data);
  let postData = data.data.children;
  for(let i = 2; i < (amount+2); i++){
    let postDiv = document.createElement("div");
    postDiv.className = "postDiv";
    parentElem.appendChild(postDiv);

    let pictureElem = document.createElement("div");
    pictureElem.className = "pictureElem";
    pictureElem.style.backgroundImage = `url('${postData[i].data.url}')`;
    postDiv.appendChild(pictureElem);

    let titleDiv = document.createElement("div");
    titleDiv.className = "titleDiv";
    titleDiv.innerHTML = postData[i].data.title;
    postDiv.appendChild(titleDiv);

    let submitterDiv = document.createElement("div");
    submitterDiv.className = "submitterDiv";
    submitterDiv.innerHTML = "by " + postData[i].data.author + " on " + (new Date(postData[i].data.created * 1000));
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