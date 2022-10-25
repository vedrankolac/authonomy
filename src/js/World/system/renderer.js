import {
  WebGLRenderer,
  sRGBEncoding,
  BasicShadowMap,
  PCFShadowMap,
  PCFSoftShadowMap,
  VSMShadowMap,
  ACESFilmicToneMapping
} from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const createRenderer = (xrEnabled = false) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;

  // mobile phone optimisation
  // setting pixel ratio makes it much faster on iPhone 12 Pro Max
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // renderer.toneMapping = ACESFilmicToneMapping;
	// renderer.toneMappingExposure = 1;

  renderer.outputEncoding = sRGBEncoding;

  // mobile phone optimisation
  // setting easier shadowMap makes it much faster on iPhone 12 Pro Max
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  document.body.appendChild( renderer.domElement );
  if (xrEnabled) {
    renderer.xr.enabled = true;
    document.body.appendChild( VRButton.createButton( renderer ) ); 
  }
  return renderer;
}

export { createRenderer };