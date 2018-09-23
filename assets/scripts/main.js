var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "select-anim":*/
x = document.getElementsByClassName("select-anim");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

function writeAnimationSpeed(outputValue, outputEle){
  const output = document.querySelector(outputEle)
  output.innerHTML = `${outputValue}s`;
}

// OPTIONAL timeCorrection helps to correct input value to desirable value
// Ex. input interval  1 - 100
// To convert input to 0.1s to 10s you need to use timeCorrection = 10
function getNumberRange(inputEle, outputEle, timeCorrection = 1){
  const input= document.querySelector(inputEle)
  // Initialize
  writeAnimationSpeed(input.value/timeCorrection, outputEle)

  input.addEventListener('input', () => {
    writeAnimationSpeed(input.value/timeCorrection, outputEle)
  })
  return input.value/timeCorrection;
}



function getAnimation(){
  const animation = document.querySelector('.select-selected')
  return animation.innerHTML;
}

function getSettings(){
  const applyButton = document.querySelector('.controller-button');
  let animSpeed, slideSpeed, animName;
  applyButton.addEventListener('click', (e) => {
    e.preventDefault();
    animSpeed = getNumberRange('#anim-speed', '#anim-speed-out', 10);
    slideSpeed = getNumberRange('#slide-speed', '#slide-speed-out');
    animName = getAnimation();

    sliderWidget.settings.animDuration = animSpeed * 1000;
    sliderWidget.settings.mainCycleInterval = slideSpeed * 1000;
    sliderWidget.settings.slideAnimStyle = animName;

    sliderWidget.init();
  })
}

getNumberRange('#anim-speed', '#anim-speed-out', 10)
getNumberRange('#slide-speed', '#slide-speed-out')
getSettings()