import "./../../main.css";
import "./threejs_showcase.css";
import { Style } from "../../shared/style";
import * as THREE from "three";
import * as React from 'react';
import { TopBar } from '../../shared/components/TopBar';
import { ButtonList, IButtonListItem } from '../../shared/components/NavgationPanel';

type IProps = {

}

type IState = {
  fps: string;
  newFrameRate: number;
}

export class ThreeJSShowCase extends React.Component<IProps, IState> {
  far: number;
  near: number;
  style;
  speed: number;
  aspect: number;
  renderer: THREE.WebGLRenderer;
  threeView: any;
  threeViewRef: React.RefObject<HTMLDivElement>;
  viewAngle: number;
  frameRate: number;
  frameSpeed: number;
  sceneWidth: number;
  sceneHeight: number;
  animationHandle: number;
  list_items: IButtonListItem[];
  state: Readonly<IState> = {
    fps: "*",
    newFrameRate: 60
  }

  constructor(props) {
    super(props);
    this.state = { fps: "*", newFrameRate: 60 };
    this.style = new Style();
    this.speed = 0.001;
    this.frameRate = 60;
    this.frameSpeed = 0.0167;
    this.viewAngle = 45;
    this.aspect = 1.0;
    this.near = 0.1;
    this.far = 10000;
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.animationHandle = 0;
    this.onUpdateClicked = this.onUpdateClicked.bind(this);
    this.frameRateInputChanged = this.frameRateInputChanged.bind(this);
    this.threeViewRef = React.createRef();
    this.list_items = [];
    this.list_items.push({ tag: 'animation', displayText: 'Time vs Frame based animation' });
    console.log('Delta animation created.');
  }

  componentDidMount() {
    this.threeView = this.threeViewRef.current;
    this.style.applyStyle();
    this.sceneWidth = this.threeView.clientWidth;
    this.sceneHeight = this.threeView.clientHeight;
    this.aspect = this.sceneWidth / this.sceneHeight;
    this.initScene();
    console.log('Delta animation mounted.');
  }

  initScene() {
    this.renderer.setClearColor("black", 0.0);
    let camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
    camera.position.z = 5;
    let scene = new THREE.Scene();
    scene.add(camera);
    let timeControlledCube = new THREE.Mesh(
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
    let frameControlledCube = new THREE.Mesh(
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
    this.renderer.setSize(this.sceneWidth, this.sceneHeight);
    let domElement = this.renderer.domElement;
    domElement.style.margin = 0;
    this.threeView.appendChild(domElement);
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
    const light4 = new THREE.HemisphereLight(0xff00ff, 0x00ffff, 1);
    scene.add(light4);
    let fps = 0;
    let frameT1 = performance.now();
    let frameT2 = performance.now();
    let frameCounterT1 = performance.now();
    let frameCounterT2 = performance.now();
    let frameLimiterT1 = performance.now();
    let frameLimiterT2 = performance.now();
    function animate() {
      frameT2 = performance.now();
      let frameDelta = frameT2 - frameT1;
      frameT1 = frameT2;
      fps++;
      timeControlledCube.rotation.y += this.speed * frameDelta;
      timeControlledCube.rotation.x += this.speed * frameDelta;
      frameControlledCube.rotation.y += this.frameSpeed;
      frameControlledCube.rotation.x += this.frameSpeed;
      this.renderer.render(scene, camera);
    }
    function emulatedFpsanimate() {
      frameLimiterT2 = performance.now();
      frameCounterT2 = performance.now();
      let fpsCounterDelta = frameCounterT2 - frameCounterT1;
      let fpsLimiterDelta = frameLimiterT2 - frameLimiterT1;
      if (fpsLimiterDelta > 1000 / this.frameRate) {
        frameLimiterT1 = performance.now() - ((frameLimiterT2 - frameLimiterT1) % (1000 / this.frameRate));
        animate.bind(this).call();
      }
      if (fpsCounterDelta >= 1000) {
        frameCounterT1 = performance.now() - ((frameCounterT2 - frameCounterT1) % 1000);
        this.setState({ fps: `${fps} FPS` })
        fps = 0;
      }
      this.animationHandle = requestAnimationFrame(emulatedFpsanimate.bind(this));
    }
    emulatedFpsanimate.bind(this).call();
  }

  onUpdateClicked() {
    this.frameRate = this.state.newFrameRate;
    console.log('Update Clicked!');
  }

  frameRateInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newFrameRate: parseFloat(event.target.value) });
  }

  onItemClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) {

  }

  render() {
    return (
      <div style={{ width: '100%', height: '99%', margin: '0px', padding: '0px' }} className="pixel-app-container">
        <div className="pixel-app-header">
          <TopBar>
            <label className="pixel-text-medium" id="fps-label">FPS : </label>
            <input className="pixel-input pixel-text-medium" onChange={this.frameRateInputChanged} value={this.state.newFrameRate} />
            <button className="pixel-button" id="update-button" onClick={this.onUpdateClicked}>Update</button>
            <label className="pixel-text-small" id="info-label">Time contolled animation [right] v/s frame controlled animation.</label>
          </TopBar>
        </div>
        <div className="pixel-app-side-panel pixel-slide-out">
          <ButtonList onItemClicked={this.onItemClicked} items={this.list_items}></ButtonList>
        </div>
        <div className="pixel-app-content">
          <div ref={this.threeViewRef} className="threeview"></div>
          <div className="bottom-right unselectable pixel-div pixel-text-medium">
            {this.state.fps}
          </div>
        </div>
      </div>
    );
  }
}