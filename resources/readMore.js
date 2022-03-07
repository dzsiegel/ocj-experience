var moreButton = '<button class="readMore" onClick="showMore(this)">Read more</button>';
var lessButton = '<button class="readMore" onClick="showMore(this)">Read less</button>';
function AddReadMore() {
  //This limit you can set after how much characters you want to show Read More.
  var carLmt = 200;

  var text = document.getElementsByClassName("readMore");
  for(let i=0; i<text.length; i++) {
    if(text[i].innerText.length > carLmt) {
      var beforeText = text[i].innerHTML;
      //console.log(beforeText);
      let displayText = beforeText.substring(0, carLmt);
      text[i].setAttribute("moretext",beforeText);
      text[i].setAttribute("lesstext",displayText);
      text[i].setAttribute("minimized", true);
      text[i].innerHTML=displayText + "...\n" + moreButton;
    }
  }
}

function showMore(elem){
  var node = elem.parentNode.parentNode;
  console.log(node.getAttribute("lesstext"));
  if(node.getAttribute("minimized")) {
    node.innerHTML = node.getAttribute("moretext") + "..." + lessButton;
    node.setAttribute("minimized", false);
  }
  else {
    var node = elem.parentNode;
    node.innerHTML = node.getAttribute("lesstext") + "..." + moreButton;
    node.setAttribute("minimized", true);
  }

}