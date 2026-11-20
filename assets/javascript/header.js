
const hideTopDistance = 100;
var isMenuVisible = false;

document.querySelectorAll('details').forEach(d => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'accordion-close';
  btn.textContent = 'Close';
  d.appendChild(btn);
});

document.addEventListener('click', e => {
  const btn = e.target.closest('.accordion-close');
  if (!btn) return;

  const details = btn.closest('details');
  details.open = false;
  details.querySelector('summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function hideScroll(){
    const topButton = document.getElementById("topButton");
    const socialButtons = document.getElementById("socialMediaButtons");

    if (document.body.scrollTop > hideTopDistance || document.documentElement.scrollTop > hideTopDistance)  {

      if (topButton) {
        topButton.style.display = "block";
      }
      if (socialButtons) {
        socialButtons.style.display = "none";
      }

    } else {

      if (topButton) {
        topButton.style.display = "none";
      }
      if (socialButtons) {
        socialButtons.style.display = "flex";
      }
      
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

window.addEventListener("scroll", hideScroll);
hideScroll();

// showMenu();
