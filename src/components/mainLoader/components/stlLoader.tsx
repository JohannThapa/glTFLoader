import { Html, useProgress, OrbitControls, Environment, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import texture1 from '../../../textures/Metal030_1K_NormalGL.jpg';

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  
 const Model = ({file}: any) => {
    const geom = useLoader(STLLoader, file);
    const texture = useTexture(texture1);
    const ref = useRef<any>();
    const { camera, gl } = useThree()
    useEffect(() => {
        camera.lookAt(ref.current.position);
    });

    return (
        <>
            <mesh ref={ref}  scale={0.02}>
                <primitive object={geom} attach="geometry"/>
                <meshStandardMaterial map={texture} />
            </mesh>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
        </>
    );
};
export const Controls = () => {
    const controls = useRef<any>()
    const { camera, gl } = useThree()
    useFrame(() => controls.current.update())
     //@ts-ignore
    return   <OrbitControls autoRotate ref={controls} enableDamping={true} 
    args={[camera, gl.domElement]} dampingFactor={0.1}  rotateSpeed={0.5}
    enableZoom={true} enablePan={true} />
  }
export default function StlLoader({file}: any) {
    return (
      <div className="App">
        <Canvas>
          <Suspense fallback={<Loader />}>
            <Model file={file}/>
          <Controls />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    );
  }