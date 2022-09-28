/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect }from 'react';
import { useGLTF } from '@react-three/drei';
import myGLTF from "../models/propeller.json";
//@ts-ignore
import PropellerGltf from '../models/propeller.gltf';
const stringGLTF = JSON.stringify(myGLTF) // convert Object to a String
const base64EncodedGLTF = btoa(stringGLTF) // Base64 encode the String
const resultingDataURI = `data:application/octet-stream;base64,${base64EncodedGLTF}`;

interface PropellerProps {
    currentColor?: any,
    currentTexture?: any,
    colorMap?: any,
    normalMap?: any,
    roughnessMap?: any,
    metalnessMap?: any,
}
export const Propeller = ({currentColor, currentTexture, colorMap, normalMap, roughnessMap, metalnessMap}: any) => {
    //@ts-ignore
  const { scene, nodes, materials } = useGLTF(PropellerGltf);

  useLayoutEffect(() => {
    Object.assign(materials.Material, { 
      metalnessMap: metalnessMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      map: colorMap,
      color: currentColor})
  }, [scene, nodes, materials, currentColor, currentTexture, colorMap, normalMap, roughnessMap, metalnessMap]);

  return <primitive object={scene} />
};