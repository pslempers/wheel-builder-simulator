import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// JS FINAL PROJECT SCRIPT //
// Peter Slempers //
//
// This script handles the interactive 
// functionality of the pet project webpage.
//

// CREATE ONLOAD FUNCTION //
window.onload = function() {

    // CREATE VARIABLES TO TARGET ELEMENTS //
    var startButton = document.getElementById("startButton");
    var navStart = document.getElementById("nav-start");
    var navStations = document.getElementById("nav-stations");
    var navAbout = document.getElementById("nav-about");

    // FUNCTION TO TOGGLE SELECTED CLASS ON NAV //
    function toggleSelected(event) {
        // REMOVE 'SELECTED' CLASS FROM ALL NAV LINKS //
        navStart.classList.remove("selected");
        navStations.classList.remove("selected");
        navAbout.classList.remove("selected");

        // ADD 'SELECTED' CLASS TO CLICKED NAV LINK //
        event.target.classList.add("selected");
    }

    // ADD EVENT LISTENERS TO NAV LINKS //
    navStart.addEventListener("click", toggleSelected);
    navStations.addEventListener("click", toggleSelected);
    navAbout.addEventListener("click", toggleSelected);

    // ADD ALL THREEJS RELATED INTERACTIVITY HERE //
    // MAP IMPORT FOR THREE.JS //
    // Set up scene, camera, canvas target, and renderer
    const scene = new THREE.Scene();
    // SETTING UP THE CAMERA //
    // https://threejs.org/docs/#PerspectiveCamera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    // SEETING UP THE CANVAS TARGET //
    const canvasContainer = document.getElementById('threejs-canvas');
    // SETTING UP THE RENDERER //
    // https://threejs.org/docs/#WebGLRenderer
    const renderer = new THREE.WebGLRenderer({canvas: canvasContainer});
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    
    // CREATING THE THREE.JS SCENE //


    // ON BUTTON CLICK, CALL GLTF LOADER OF FIRST SCENE //
    startButton.addEventListener("click", function() {
        console.log("helloworld");
        // HIDE MAIN CONTENT //
        document.querySelector("#main-start").style.display = "none";
        // SHOW THREE.JS CANVAS //
        renderer.domElement.style.display = "block";
        // START RENDERING THE SCENE //
        loadGLTFModel('glbs/WheelTable2.glb');
        animate();
    });
    
    // THREE.JS TEST CUBE //
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    
    // ADDING GLTF MODEL LOADER EXAMPLE //
    const loader = new GLTFLoader();
    function loadGLTFModel(path) {
        loader.load(
            path,
            function (gltf) {
                scene.add(gltf.scene);
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );
    }
    
    // ADDING LIGHTING TO THE SCENE //
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);
    
    // ADDING SUNGLIGHT //
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // ADDING ORBIT CONTROLS //
    // https://threejs.org/docs/#OrbitControls //
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

}// END OF ONLOAD FUNCTION //
