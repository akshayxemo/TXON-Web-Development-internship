window.onscroll = ()=>{
    scrollNavFix();
    scrollFunction();
}
const nav = document.getElementById("NAV");
function scrollNavFix(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        nav.classList.remove("fade-in");
        nav.classList.add("tilt-in-top-1");
        nav.classList.add("fixed");
    }
    else{
        nav.classList.remove("tilt-in-top-1")
        nav.classList.remove("fixed");
    }
}

        const list = document.getElementById("collapsed");
        const menu = document.getElementsByClassName("nav");
        let count = 0;
        function ShowHideMenu(){
            count++;
            if(count == 1){
                menu[0].style.top = "0px";
                menu[0].style.transition = "1s ease"
                list.classList.remove("fa-bars-staggered");
                list.classList.add("fa-xmark");
            }
            else {
                menu[0].style.top = "-300px";
                menu[0].style.transition = "1s ease"
                list.classList.remove("fa-xmark");
                list.classList.add("fa-bars-staggered");
                count = 0;
            }
        }

        function changeMode(id) {
            let element = document.body;
            element.classList.toggle("dark-mode");
            let icon = document.getElementById(id);
            if(icon.classList.value == 'fa-solid fa-moon slide'){
                icon.classList.remove("slide");
                // icon.classList.add("fa-moon");
                icon.style.left = "0px";
            }
            else{
                icon.classList.add("slide");
                // icon.classList.remove("fa-moon");
                icon.style.left = "40px";
            }
          }

// Get the button:
let mybutton = document.getElementById("backToTop");

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}