import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {  Stage, useTexture } from '@react-three/drei'
import { Submarine } from '../components/submarine';
import { Propeller } from './propeller';

interface SceneProps {
    currentColor?: any,
    currentTexture?: any,
    upKeyPressed?: boolean
}

export const Scene = ({currentColor, currentTexture, upKeyPressed}: SceneProps) => {
  //@ts-ignore
  const [colorMap, normalMap, roughnessMap, metalnessMap] = useTexture(currentTexture);
  const propellerMesh = useRef();

  useFrame(({ clock }) => {
    if (upKeyPressed) {
      const { current }: any = propellerMesh;
      if(current) current.rotation.z = clock.getElapsedTime() * 3;
    }
  })
  return (
    <Stage adjustCamera intensity={1}>
    <mesh>
      <Submarine 
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap} 
        currentColor={currentColor}
        currentTexture={currentTexture} />
    </mesh>
    {//@ts-ignore
      <mesh ref={propellerMesh}>
      <Propeller 
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap} 
        currentColor={currentColor}
        currentTexture={currentTexture} />
    </mesh>
    }
    
  </Stage>
  )
}