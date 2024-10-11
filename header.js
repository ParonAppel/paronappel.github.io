
const hideTopDistance = 100;

function hideScroll(){
    const topButton = document.getElementById("topButton");
    const socialButtons = document.getElementById("socialMediaButtons");

    if (document.body.scrollTop > hideTopDistance || document.documentElement.scrollTop > hideTopDistance)  {

      topButton.style.display = "block";
      socialButtons.style.display = "none";

    } else {

      topButton.style.display = "none";
      socialButtons.style.display = "flex";
    }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' } ); 
}

function scrollToProjects() {
  const element = document.getElementById("projects");
  element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
} 

function enableScrolling(){
  window.onscroll=function(){};
}

function discoMode() {

  var menu = document.getElementById("body");

  if(menu.classList.contains("discoMode")) {

    menu.classList.remove("discoMode")

  } else {
    menu.classList.add("discoMode")
  }

}

function showMenu() {

  var menu = document.getElementById("menuItems");
  var menuItems = menu.children;

  if (menu.style.display === "block") {

    menu.style.display = "none";
    menu.style.animation ="buttonShow 2s normal reverse linear";

  } else {

    menu.style.display = "block";

    for (var i = 0; i < menuItems.length; i++) {
      console.log(menuItems[i]);
      menuItems[i].style.animation ="buttonShow 0.5s normal linear " + (i * 0.5) + "s"; 
      menuItems[i].classList.add("visible");
    }
    
  }	
}

window.addEventListener("scroll", hideScroll);
hideScroll();
showMenu();