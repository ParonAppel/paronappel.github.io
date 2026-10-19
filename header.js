
const hideTopDistance = 100;
var isMenuVisible = false;

var projects;

async function initProjectsData() { 
  const requestURL =
  "https://paronappel.github.io/projects.json";
  const request = new Request(requestURL);
  
  const response = await fetch(request);
  const projectsData = await response.json();

  projects = projectsData.projects;
  setProject('Alien Intern');
}

initProjectsData();

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
  var menuImage = document.getElementById("menuImage");
  menu.classList.remove('animate', 'animate-reverse');

  menuImage.classList.toggle('upsideDown');

  setTimeout(() => {
    if (isMenuVisible) {

      menu.style.pointerEvents = "none";
      menu.classList.add('animate-reverse');
    } else {

      menu.style.pointerEvents = "inital";
      menu.classList.add('animate');
    }	

    isMenuVisible = !isMenuVisible;
  }, 10); 

}

function setProject(nameOfProject) {

  var desc = document.getElementById("project-description");
  var title = document.getElementById("project-title");
  var image = document.getElementById("project-image");
  var button = document.getElementById("project-button");

  for(const project of projects) 
  {
    if(project.title == nameOfProject) 
    {
      title.innerText = project.title;
      desc.innerText = project.desc;
      image.src = project.image;
      button.setAttribute("href", project.url);
    }
  }
}

window.addEventListener("scroll", hideScroll);
hideScroll();
showMenu();
