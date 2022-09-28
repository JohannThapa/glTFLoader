/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect }from 'react';
import { useGLTF } from '@react-three/drei';
import myGLTF from "../models/submarine.json";
import testGLTF from "../models/test.json";
//@ts-ignore
import test1GLTF from "../models/test2.gltf";
const stringGLTF = JSON.stringify(myGLTF) // convert Object to a String
const base64EncodedGLTF = btoa(stringGLTF) // Base64 encode the String

//First part is: 'data:application/octet-stream;base64,'
const resultingDataURI = `data:application/octet-stream;base64,${base64EncodedGLTF}`;

interface SubmarineProps {
    currentColor?: any,
    currentTexture?: any,
    colorMap?: any,
    normalMap?: any,
    roughnessMap?: any,
    metalnessMap?: any,
}
export const Submarine = ({currentColor, currentTexture, colorMap, normalMap, roughnessMap, metalnessMap}: any) => {
  const gltf = useGLTF(resultingDataURI, true);
  const { scene, nodes, materials } = useGLTF(resultingDataURI);

  useLayoutEffect(() => {
    Object.assign(gltf.materials.Material, { 
      metalnessMap: metalnessMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      map: colorMap,
      color: currentColor})
  }, [gltf.scene, gltf.nodes, gltf.materials, currentColor, currentTexture, colorMap, normalMap, roughnessMap, metalnessMap]);

  return <primitive object={gltf.scene} />
};