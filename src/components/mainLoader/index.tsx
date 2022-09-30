import Reat, { useState } from 'react';
import * as THREE from 'three';
import GltfLoader from './components/gltfLoader';
import OBJModel from './components/objLoader';
import StlLoader from './components/stlLoader';
import { smooth, rough, beatup } from '../../textures';

const stlFile =    { document_url: "./test.stl",
filename: 'W1-7M11Y-V1-C-Left.stl',
type: "scan"
}

const objFile =    { document_url: "./eleph.obj",
filename: 'W1-7M11Y-V1-C-Left.obj',
type: "scan"
}
const gltfFile =    { document_url: "./small-airplane-v3.gltf",
filename: 'W1-7M11Y-V1-C-Left.gltf',
type: "scan"
}
const ThreeDViewer = ({document, currentColor, currentTexture}: any) => {
    console.log(document)
    if (document?.filename?.endsWith('obj')) {
        return <OBJModel  currentColor={currentColor} currentTexture={currentTexture} file={document?.document_url} />
    }
    else if (document?.filename?.endsWith('stl')) {
        return <StlLoader file={document?.document_url}/>
    }
    else{
    return <GltfLoader currentColor={currentColor} currentTexture={currentTexture} file={document?.document_url}/>
    }
}
const MainLoader = () => {
    const steelblue = new THREE.Color(0x4682b4);
    const [currentTexture, setCurrentTexture] = useState(smooth);
    const [currentColor, setCurrentColor] = useState(steelblue);
    return <ThreeDViewer currentColor={currentColor} currentTexture={currentTexture} document={gltfFile}/>
}

export default MainLoader;