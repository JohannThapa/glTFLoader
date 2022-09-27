import { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

import myGLTF from "../models/scene.json";
const stringGLTF = JSON.stringify(myGLTF) // convert Object to a String
const base64EncodedGLTF = btoa(stringGLTF) // Base64 encode the String

//First part is: 'data:application/octet-stream;base64,'
const resultingDataURI = `data:application/octet-stream;base64,${base64EncodedGLTF}`;

export default class GltfViewer extends Component {
    scene: THREE.Scene  = new THREE.Scene();
    renderer!: THREE.WebGLRenderer;
    mount: any;
    camera: any;
    frameId: any;
    cubeMesh: any;
    componentDidMount() {
        //Add Scene

        this.scene = new THREE.Scene();

        //Add Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#808080');
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);

        //Add Camera
        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(75, 20, 0);

        //After loading GLTF file resize

        // //Add Geometry
        // const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
        // const material = new THREE.MeshBasicMaterial({ color: '#0F0' });

        // //Add mesh which is also the model
        // this.cubeMesh = new THREE.Mesh(cubeGeometry, material);
        // this.scene.add(this.cubeMesh);

        //Load GLTF file
        // Instantiate a loader
        const loader = new GLTFLoader();

        
        /// Load a glTF resource
loader.load(
    // resource URL
    resultingDataURI,
    // 'https://r105.threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf',
    // called when the resource is loaded
     ( gltf ) => {

        this.scene.add( gltf.scene );

        
    },
    // called while loading is progressing
    (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    (error) => {
        console.log( 'An error happened' );
    }
);

        //Settings
        //Add Camera Controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();

        ///Add AMBIENT LIGHT
        let light: any = new THREE.DirectionalLight(0xffffff, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this.scene.add(light);
        light = new THREE.AmbientLight(0xffffff, 4.0);
        this.scene.add(light);

        //Start animation
        this.start();
    }

    //Unmount when animation has stopped
    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    //Function to start animation
    start = () => {
        //Rotate Models
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    //Function to stop animation
    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    //Animate models here
    animate = () => {
        //ReDraw scene with camera and scene object
        if (this.cubeMesh) this.cubeMesh.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    //Render the scene
    renderScene = () => {
        if (this.renderer) this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div
                style={{ width: '800px', height: '800px' }}
                ref={(mount) => {
                    this.mount = mount;
                }}
            />
        );
    }
}