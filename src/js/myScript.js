var tabButtons=document.querySelectorAll(".tabs button");
var tabPanel=document.querySelectorAll(".tabPanel");

function showPanel(panelIndex){
    tabPanel.forEach(function(node) {
        node.style.display="none";
    });
    tabPanel[panelIndex].style.display="block";
}
showPanel(0)

var header = document.getElementById("myTabs");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}