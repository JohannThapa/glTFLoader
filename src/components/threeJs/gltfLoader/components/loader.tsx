import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import '../style.css';

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./test1.gltf");
  return <primitive object={gltf.scene} scale={0.4} />;
};

export default function GltfX() {
  return (
    <div className="gltfx">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
