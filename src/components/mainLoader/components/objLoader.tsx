import { Environment, OrbitControls, useTexture,
    Html,
    useProgress } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import texture1 from '../../../textures/Metal030_1K_NormalGL.jpg';

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
const Obj = ({file, currentTexture, currentColor}: any) => {
    console.log(file)
  const obj = useLoader(OBJLoader, file);
  const texture = useTexture(texture1);
  const geometry = useMemo(() => {
    let g;
    //@ts-ignore
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <mesh geometry={geometry} scale={0.01}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
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
export default function ObjLoader({file, currentTexture, currentColor}: any) {
    return (
      <div className="App">
        <Canvas>
          <Suspense fallback={<Loader />}>
            <Obj  currentTexture={currentTexture} currentColor={currentColor}    file={file}/>
          <Controls />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    );
  }