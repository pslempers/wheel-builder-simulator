// JS FINAL PROJECT SCRIPT //
// Peter Slempers //
//
//  This project uses Three.js to create a 3D scene 
//  where users can build virtual wheels.
//  Three.js was created by Mr.doob and is an open-source library
//  available at https://threejs.org/
//  Also available on GitHub at https://github.com/mrdoob/three.js
//
// ADD EVENT LISTENERS TO BUTTONS AND NAV LINKS //

// CREATE ONLOAD FUNCTION //
window.onload = function() {

    // CREATE VARIABLES TO TARGET ELEMENTS //
    var startButton = document.getElementById("startButton");
    var navStart = document.getElementById("nav-start");
    var navStations = document.getElementById("nav-stations");
    var navAbout = document.getElementById("nav-about");

    // ADD EVENT LISTENERS TO BUTTONS //
    startButton.addEventListener("click", function() {
        //CREATE START BUTTON FUNCTIONALITY//
        $("main").css("display","none");
        $(".caption").css("display","flex");
    });

    // FUNCTION TO TOGGLE SELECTED CLASS ON NAV //
    function toggleSelected(event) {
        // REMOVE 'SELECTED' CLASS FROM ALL NAV LINKS //
        navStart.classList.remove("selected");
        navStations.classList.remove("selected");
        navAbout.classList.remove("selected");
        
        // ADD 'SELECTED' CLASS TO CLICKED NAV LINK //
        event.target.classList.toggle("selected");
    }
    
    // ADD EVENT LISTENERS TO NAV LINKS //
    navStart.addEventListener("click", toggleSelected);
    navStations.addEventListener("click", toggleSelected);
    navAbout.addEventListener("click", toggleSelected);
    
    var submenuOpen = false;
    // STATIONS SUB-MENU ACTIVATION
    $("#nav-stations").on("click",() => {
        console.log('stations selected!');
        if (submenuOpen === false) {
            $(".sub-menu").css("display", "flex");
            submenuOpen = true;
        } else 
            {    
            navStations.classList.remove("selected");
            $(".sub-menu").css("display", "none")
            submenuOpen = false;
        }
    });
}// END OF ONLOAD FUNCTION //
