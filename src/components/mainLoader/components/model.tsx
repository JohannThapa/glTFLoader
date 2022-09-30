import React from "react";

const Model1 = () => {
    return (
      <mesh position={[0, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[5, 5, 5]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }
  const Model2 = () => {
    return (
      <mesh>
        <mesh position={[-5, -1.5, -3]}>
          <boxBufferGeometry attach="geometry" args={[6, 2, 5]} />
          <meshNormalMaterial attach="material" />
        </mesh>
        <mesh>
          <mesh position={[0, 3, -1]}>
            <octahedronBufferGeometry attach="geometry" args={[4]} />
            <meshNormalMaterial attach="material" />
          </mesh>
          <mesh position={[3, 0.5, 3]}>
            <sphereGeometry attach="geometry" args={[3, 10, 32]} />
            <meshNormalMaterial attach="material" />
          </mesh>
        </mesh>
      </mesh>
    )
  }
  const Model = () => {
    return (
      <mesh>
        <Model1 />
        <Model2 />
      </mesh>
    )
  }

  export default Model;