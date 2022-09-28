import React from "react";
import { useGLTF } from "@react-three/drei";
//@ts-ignore
import Test from '../../models/test.gltf';
export default function Plane(props: any) {
  const { nodes, materials } = useGLTF("/small-airplane-v3.gltf");
  //@ts-ignore
//   const { nodes, materials } = useGLTF(Test);

  return (
    <group {...props}>
      <group scale={[0.5, 0.5, 0.5]}>
        <mesh
          material={materials.White}
          //@ts-ignore
          geometry={nodes["buffer-0-mesh-0"].geometry}
        />
        <mesh
          material={materials.Red}
          //@ts-ignore
          geometry={nodes["buffer-0-mesh-0_1"].geometry}
        />
        <mesh
          material={materials.Gray}
          //@ts-ignore
          geometry={nodes["buffer-0-mesh-0_2"].geometry}
        />
        <mesh
          material={materials.Black}
          //@ts-ignore
          geometry={nodes["buffer-0-mesh-0_3"].geometry}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/small-airplane-v3.gltf");
