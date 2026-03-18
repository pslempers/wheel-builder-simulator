import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// MAP IMPORT FOR THREE.JS //
// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const fov = 75;
var aspect = window.innerWidth/window.innerHeight;
const near = 0.1;
const far = 500;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer();
camera.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.display = "none";


    // CREATING THE THREE.JS SCENE //

    // CREATE VARIABLES TO TARGET ELEMENTS //
    var startButton = document.getElementById("startButton");
    var resetCamera = document.getElementById("reset-cam");

    // SETUP LOGIC VARIABLES
    var hasStarted = false;
    var camFix = false;
    var stageChange = false;
    
    // ON BUTTON CLICK, START ANIMATION IN PLACE OF MAIN CONTENT //
    startButton.addEventListener("click", () => {
        startRender();
    });

    // START RENDER FUNCTION (SO IT CAN BE CALLED FROM MORE THAN JUST START BUTTON)
    function startRender() {
        hasStarted = true;
        // HIDE MAIN CONTENT //
        document.querySelector("main").style.display = "none";
        // SHOW FOOTER CAPTION //
        $(".caption").css("display","flex");
        // SHOW THREE.JS CANVAS //
        renderer.domElement.style.display = "block";
        render();
        camFix = true;
    }
    // ALL THE DESCRIPTIONS FOR THE WHEEL BUILDING STATIONS
    var stationArray = [
        "Welcome to Wheelbuilder Simulator.\n To get started, click the right arrow. \n"
        +"Try Zooming in and out to see better. Click and drag to Orbit, and shift drag to Pan.",//0
        "Are you ready to build some wheels?",//1
        "Great! Let's go!",//2
        "Start by putting the hub on the spike. It's got 32 holes, so we use 32 spokes. \n Nice! See that "
        +"red donut on top of the hub? That's where the discbrake will go!",//3
        "Got it? Now let's start Loading the hub. We start with the short spokes on your right. "
        +"We need 8 of them in every other hole down through the top flange. But don't go "
        +"through the lower flange as well!",
        "Once the first group of 8 are loaded on the top flange, load 8 longer spokes "
        +" from your left side into the lower flange. These should sit exactly right of each "
        +"spoke from group 1.",//4
        "A good way to remember what we just did: Since the short spokes are on the "
        + "disc brake side, the most tension goes there. We say: 'Right side, tight side!'",//5
        "Next, we have to flip the wheel over. See how the spokes hang there nicely? "
        +"Be careful that they don't fall out while you continue!",//6
        "Let's put more spokes in now. Remember, now that you have flipped the wheel, your "
        +"discbrake is facing the floor. So this time, the short spokes go on the lower flange",//7
        "Once you've got those in, it's time to put in the last 8 long spokes down through the top.",//8
        "Now that you're done with this, it's time to get a rim!",//9
        "Let's Get Lacing.",//10
        "Here, we'll fasten each spoke from the first group of 8 with a nipple and tighten only a little "
        +"to hold it in place. They need to be equidistant from each other.",//11
        "It's smart to hold the rim higher above the spokes like this, to avoid scratching. "
        +"Once you get the first group of 8 from the top flange fastened, get the neighbours next.",//12
        "Rotate the hub clockwise but hold the rim firm. This should pull the fastened spokes tight. "
        +"Pull spokes left from the far side of the top flange, and cross once over top the 1st group.",//13
        "After you pull the spoke from group 2 over one neighbour, aim directly between two spokes and screw it."
        +"I always keep the screwdriver located left where you see here. It helps me from getting lost.",//14
        "Once you're ready for the third group, pick the ones that are heads down. This is the "
        +"easiest group, once you get the first. They aim between the crossed spokes.",//15
        "The final 8 and most difficult group, has only one place they belong. But they must be laced "
        +"following the rule: over, over, under. Gee, wouldn't this be easier to understand with animation?",//16
        "Thanks for reading! You made it to the end!"//17
    ]

    
    // Listeners for Stage Caption Stepper button presses
    $(".nextBtn").on("click", () => {
        // console.log("next pressed");
        stageCaptionStepper("next");
    })
    $(".prevBtn").on("click", () => {
        // console.log("prev pressed");
        stageCaptionStepper("prev");
    })
    // variable required for stageCaptionStepper()
    var currentStage = 0;
    $("#stage-caption").html(stationArray[0]);
    
    // THIS FUNCTION STEPS THROUGH THE ARRAY OF DESCRIPTION TEXT
    function stageCaptionStepper(step) {
        // REGULAR STEPPING
        if (step === "next" && currentStage < stationArray.length-1) {
            currentStage++;
            stageChange = true;
            $("#stage-caption").html(stationArray[currentStage]);
        }
        // REGULAR BACKSTEPPING
        else if (step === "prev" && currentStage > 0) {
            currentStage--;
            stageChange = true;
            $("#stage-caption").html(stationArray[currentStage]);
        }
        // IF REVERSING FROM START, LOOP TO END
        else if (step === "prev" && currentStage <= 0) {
            currentStage = stationArray.length-1;
            stageChange = true;
            $("#stage-caption").html(stationArray[currentStage]);
        }
        // IF PASSING END, LOOP TO START
        else if (step === "next" && currentStage >= stationArray.length - 1) {
            currentStage = 0;
            stageChange = true;
            $("#stage-caption").html(stationArray[currentStage]);
        }
        else {console.log("No Bueno"+currentStage)}
    }
    
    // STATION CHECK FUNCTION. IF USER REACHES CERTAIN POINTS IN THE STAGE-CAPTION,
    // SWITCH TO NEXT STATION. CAMERA POSITIONS ARE SET UP TO VIEW AND ORBIT EACH STATION.
    function setStation(cue) {
        switch(cue) {
            case 3:
                camFix = false;
                camera.position.x = -2.6; // -left +right
                camera.position.y = 1; // -down +up
                camera.position.z = -2; // -fwd +back
                camera.rotation.x = 0; // -fwd +back rotate parallel in radians
                camera.rotation.y = Math.PI * -0.5; // -left +right rotate in radians
                camera.rotation.z = 0; // -fwd +back rotate perpendicular in radians
                controls.target.set(-2,1,-2);
                stageChange = false;
                console.log("stage set");
                break;
            case 7:
                camFix = false;
                camera.position.x = -0.6;
                camera.position.y = 1;
                camera.position.z = -2;
                camera.rotation.x = 0;
                camera.rotation.y = Math.PI * -0.5;
                camera.rotation.z = 0;
                controls.target.set(0,1,-2);
                stageChange = false;
                console.log("stage set");
                break;
            case 11:
                camFix = false;
                camera.position.x = 1.4;
                camera.position.y = 1;
                camera.position.z = -2;
                camera.rotation.x = 0;
                camera.rotation.y = Math.PI * -0.5;
                camera.rotation.z = 0;
                controls.target.set(2,1,-2);
                stageChange = false;
                console.log("stage set");
                break;
            default:
                camFix = false;
                camera.position.x = 0;
                camera.position.y = 1.6;
                camera.position.z = 1;
                camera.rotation.x = -0.5;
                camera.rotation.y = 0;
                camera.rotation.z = 0;
                controls.target.set(0,1,0);
                stageChange = false;
                console.log("default stage");
                break;
        }
    }

    // SUB-MENU STATION NAVIGATION
    $("#intro").on("click", () => {
        stageChange = true;
        // DO START BUTTON, THEN ENGAGE INTRO STAGE
        startRender()
        currentStage = 0;
        $("#stage-caption").html(stationArray[0]);
        setStation(0);
        console.log("intro clicked");
    });
    $("#load").on("click", () => {
        stageChange = true;
        // DO START BUTTON, THEN ENGAGE LOADING STAGE
        startRender()
        $("main").css("display","none");
        currentStage = 3;
        $("#stage-caption").html(stationArray[3]);
        setStation(3);
        console.log("load clicked");
    });
    $("#flip").on("click", () => {
        stageChange = true;
        // DO START BUTTON, THEN ENGAGE FLIP LOAD STAGE
        startRender()
        $("main").css("display","none");
        currentStage = 7;
        $("#stage-caption").html(stationArray[7]);
        setStation(7);
        console.log("flip clicked");
    });
    $("#lace").on("click", () => {
        stageChange = true;
        // DO START BUTTON, THEN ENGAGE LACING STAGE
        startRender()
        $("main").css("display","none");
        currentStage = 11;
        $("#stage-caption").html(stationArray[11]);
        setStation(11);
        console.log("lace clicked");
    });
    
    // RENDER SCENE WITH REQUEST ANIMATION FRAME LOOP //
    // https://threejs.org/manual/#en/rendering-on-demand
    
    function render() {
        requestAnimationFrame(render);

        // ADJUSTING THE CAMERA ON ANIMATION START
        // ZOOM IN SLOWLY UNTIL CAMERA REACHES A CERTAIN POINT //
        if (camFix === true){
            if (camera.position.z > 1) {
                camera.position.z -= 0.015;
            }
            // TRANSLATE CAMERA UPWARDS SLOWLY UNTIL A CERTAIN POINT //
            if (camera.position.y < 1.6) {
                camera.position.y += 0.01;
            }
            // ROTATE CAMERA DOWN SLOWLY UNTIL A CERTAIN ANGLE //
            if (camera.rotation.x > -0.5) {
                camera.rotation.x -= 0.0015;
            }
            // WHEN FINISHED ROTATING UNDO camFix
            if (camera.rotation.x <= -0.5) {
                camFix = false;
                console.log(camFix);
            }
        }

        // BEGINNING TO SWITCH THROUGH STAGES
        if (stageChange===true) {
            if (currentStage === 0) {
                setStation(0);
            }
            if (currentStage === 3) {
                setStation(3);
            }
            if (currentStage === 7) {
                setStation(7);
            }
            if (currentStage === 11) {
                setStation(11);
            }
        } 


        renderer.render( scene, camera );
    }
    // WE CAN USE THIS TO RENDER CONSTANTLY (FOR ANIMATIONS)
    // requestAnimationFrame(render);
    // WE CAN USE THIS TO RENDER ONCE (HELPS RESPONSIVENESS)
    // render();

    // HANDLE WINDOW RESIZING
    window.addEventListener('resize', render);


    
    // ADDING LIGHTING TO THE SCENE //
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);
    
    // ADDING SUNGLIGHT //
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(5, 8, 7.5);
    scene.add(directionalLight);
    

    // ADDING ORBIT CONTROLS //
    // https://threejs.org/docs/#OrbitControls //
    const controls = new OrbitControls(camera, renderer.domElement);
    // HANDLE INERTIA TO HELP FEEL OF NAVIGATION
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 0; // ALLOWS ZOOMING ALL THE WAY IN
    controls.maxDistance = 30;
    controls.target.set(0,1,0); // CENTRES CAM ON THE WHEEL

    // USE ORBIT CONTROLS TO DISPATCH CHANGES AND RENDER AGAIN
    // controls.addEventListener('change', render);
    
    // RESET CAMERA BUTTON //
    resetCamera.addEventListener("click", () => {
        controls.reset();
        controls.target.set(0,1,0);
        currentStage = 0;
        $("#stage-caption").html(stationArray[0]);
        camFix = true;
    });



    // LOADING THE GLTF MODEL WITH GLTF LOADER //
    // https://threejs.org/docs/#GLTFLoader

    const loader = new GLTFLoader();

    loader.load( 'glbs/WheelTable6.glb', function ( gltf ) {
            scene.add( gltf.scene );
            console.log("GLTF Model Loaded Successfully");
        }, 
        function (xhr) {
            // Log loading progress
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        }, 
        function ( error ) {
            console.error( error );
    } 
);