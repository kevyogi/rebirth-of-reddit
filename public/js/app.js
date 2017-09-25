console.log("hello world");

let redditReq = new XMLHttpRequest();
redditReq.addEventListener("load", redditReceiver);
redditReq.open("GET", "https://www.reddit.com/r/outrun.json");
redditReq.send();

function redditReceiver(){
  let data = JSON.parse(this.responseText);
  console.log(data);
}