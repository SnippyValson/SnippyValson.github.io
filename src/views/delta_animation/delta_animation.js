import "./../../main.css";
import "./delta_animation.css";
import {
  Style
} from "../../libs/style";
import * as THREE from "three";
import {
  PointLightHelper
} from "three";

var style = new Style();
console.log(style);

var speed = 0.001;
var frameRate = 60;
var frameSpeed = 0.0167;
style.applyStyle();
var threeView = document.getElementById("threeview");
var sceneWidth = threeView.clientWidth;
var sceneHeight = threeView.clientHeight;
var viewAngle = 45;
var aspect = sceneWidth / sceneHeight;
var near = 0.1;
var far = 10000;
var renderer = new THREE.WebGLRenderer({
  alpha: true
});
renderer.setClearColor("black", 0.0);
var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
camera.position.z = 5;
var scene = new THREE.Scene();
scene.add(camera);


const timeControlledCube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({
    roughness: 0.1,
    metalness: 0.9,
  })
);
scene.add(timeControlledCube);
timeControlledCube.rotation.x += Math.PI / 4;
timeControlledCube.rotation.z += Math.PI / 4;
timeControlledCube.position.x += 1.5;
const frameControlledCube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({
    roughness: 0.1,
    metalness: 0.9,
  })
);
scene.add(frameControlledCube);
frameControlledCube.rotation.x += Math.PI / 4;
frameControlledCube.rotation.z += Math.PI / 4;
frameControlledCube.position.x += -1.5;

renderer.setSize(sceneWidth, sceneHeight);
var domElement = renderer.domElement;
domElement.style.margin = 0;
threeView.appendChild(domElement);

scene.add(camera);

const ambientLight = new THREE.AmbientLight("#ff00ff", 0.1);
scene.add(ambientLight);

const light = new THREE.SpotLight(0x00ffff, 1, 80, Math.PI * 0.25, 1, 2);
light.position.set(5, -5, 5);
scene.add(light);

const light1 = new THREE.SpotLight(0xff00ff, 1, 80, Math.PI * 0.25, 1, 2);
light1.position.set(0, 5, 5);
scene.add(light1);

const light2 = new THREE.SpotLight(0xff00ff, 1, 80, Math.PI * 0.25, 1, 2);
light2.position.set(-5, 5, -5);
scene.add(light2);

const light3 = new THREE.PointLight(0xff00ff, 1, 0, 0);
light3.position.set(0, 0, 0);
scene.add(light3);

var light4 = new THREE.HemisphereLight(0xff00ff, 0x00ffff, 1);
scene.add(light4);

var fps = 0;
var speedT1 = Date.now();
var speedT2 = Date.now();
var fpsCounterT1 = Date.now();
var fpsCounterT2 = Date.now();
var fpsLimiterT1 = Date.now();
var fpsLimiterT2 = Date.now();

function emulatedFpsanimate() {
  fpsLimiterT2 = Date.now();
  fpsCounterT2 = Date.now();
  var fpsCounterDelta = fpsCounterT2 - fpsCounterT1;
  var fpsLimiterDelta = fpsLimiterT2 - fpsLimiterT1;
  if (fpsLimiterDelta > 1000 / frameRate) {
    fpsLimiterT1 =
      Date.now() - ((fpsLimiterT2 - fpsLimiterT1) % (1000 / frameRate));
    animate();
  }
  if (fpsCounterDelta >= 1000) {
    fpsCounterT1 = Date.now() - ((fpsCounterT2 - fpsCounterT1) % 1000);
    document.getElementById("fps").innerHTML = `${fps} fps`;
    fps = 0;
  }
  requestAnimationFrame(emulatedFpsanimate);
}
emulatedFpsanimate();

function animate() {
  speedT2 = Date.now();
  var speedDelta = speedT2 - speedT1;
  speedT1 = speedT2;
  fps++;
  timeControlledCube.rotation.y += speed * speedDelta;
  timeControlledCube.rotation.x += speed * speedDelta;
  frameControlledCube.rotation.y += frameSpeed;
  frameControlledCube.rotation.x += frameSpeed;
  renderer.render(scene, camera);
}

window.onUpdateClicked = onUpdateClicked;

function onUpdateClicked() {
  var newFps = document.getElementById("fps-input").value;
  console.log(newFps);
  frameRate = parseFloat(newFps);
}