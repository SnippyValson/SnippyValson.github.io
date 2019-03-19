var renderer;
var camera;
var scene;
var $container;
var uniforms;
var shaderMaterial;
var plane;
var startTime;

(function () {
    window.onload = shade;
})();

function shade() {
    init();
    startTime = Date.now();
    animate();
}

function init() {

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    $container = $('#container');

    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.Camera();
    scene = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 1;

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        mouse: {type: "v2",value: new THREE.Vector2()}
    };

    // create the sphere's material
    shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: $('#vertexshader').text(),
        fragmentShader: $('#fragmentshader').text()
    });

    // create a new mesh with sphere geometry -
    // we will cover the sphereMaterial next!
    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        shaderMaterial);

    // add the sphere and camera to the scene
    scene.add(plane);
    scene.add(camera);

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = elapsedSeconds;
    renderer.render(scene, camera);
}