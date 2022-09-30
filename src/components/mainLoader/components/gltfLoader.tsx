import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
  useTexture,
  useGLTF
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useLayoutEffect, useRef } from "react";
// import '../style.css';

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
export const Controls = () => {
    const controls = useRef<any>()
    const { camera, gl } = useThree()
    useFrame(() => controls.current.update())
     //@ts-ignore
    return   <OrbitControls autoRotate ref={controls} enableDamping={true} 
    args={[camera, gl.domElement]} dampingFactor={0.1}  rotateSpeed={0.5}
    enableZoom={true} enablePan={true} />
  }
const Model = ({file, currentTexture, currentColor}: any) => {
      //@ts-ignore
    const [colorMap, normalMap, roughnessMap, metalnessMap] = useTexture(currentTexture);
  const gltf = useLoader(GLTFLoader, file);
     //@ts-ignore
  const { scene, nodes, materials } = useGLTF(file);
//   useLayoutEffect(() => {
//     Object.assign(materials.Material, { 
//       metalnessMap: metalnessMap,
//       normalMap: normalMap,
//       roughnessMap: roughnessMap,
//       map: colorMap,
//       color: currentColor})
//   }, [scene, nodes, materials, currentColor, currentTexture, colorMap, normalMap, roughnessMap, metalnessMap]);

  //@ts-ignore
  return <primitive object={gltf.scene} scale={0.4} />;
};

export default function GltfLoader({file, currentTexture, currentColor}: any) {
  return (
    <div className="gltfx">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model currentTexture={currentTexture} currentColor={currentColor}  file={file}/>
          <Controls />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
