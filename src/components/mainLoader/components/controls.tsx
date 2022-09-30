import React, { useRef } from "react";
import {  useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';


export const Controls = () => {
  const controls = useRef<any>()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
   //@ts-ignore
  return   <OrbitControls autoRotate ref={controls} enableDamping={true} 
  args={[camera, gl.domElement]} dampingFactor={0.1}  rotateSpeed={0.5}
  enableZoom={true} enablePan={true} />
}
