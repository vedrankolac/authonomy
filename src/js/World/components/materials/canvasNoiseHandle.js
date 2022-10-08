import { Vector2, MeshPhysicalMaterial, CanvasTexture, RepeatWrapping } from 'three';

const canvasNoiseHandle = (maps, envMapIntensity = 1, repeatX = 1, repeatY = 1) => {
  const colorMap = new CanvasTexture(maps.colorMap);
  colorMap.repeat.x = repeatX;
  colorMap.repeat.y = repeatY;
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;

  const roughnessMap = new CanvasTexture(maps.roughnessMap);
  roughnessMap.repeat.x = repeatX;
  roughnessMap.repeat.y = repeatY;
  roughnessMap.wrapS = RepeatWrapping;
  roughnessMap.wrapT = RepeatWrapping;

  const metalnessMap = new CanvasTexture(maps.metalnessMap);
  metalnessMap.repeat.x = repeatX;
  metalnessMap.repeat.y = repeatY;
  metalnessMap.wrapS = RepeatWrapping;
  metalnessMap.wrapT = RepeatWrapping;

  const normalMap = new CanvasTexture(maps.normalMap);
  normalMap.repeat.x = repeatX;
  normalMap.repeat.y = repeatY;
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;

  const parameters = {
    // STANDARD

    // envMap: envmap.texture,
    envMapIntensity: envMapIntensity,

    // color: 0x444444,
    map: colorMap,

    roughness: 1,
    roughnessMap: roughnessMap,

    normalMap: normalMap,
		normalScale: new Vector2(1, 1),

    // aoMap: aoMap,
    // aoMapIntensity:

    // bumpMap: bumpMap,
    // bumpScale:

    // emissive:
    // emissiveMap: emissiveMap,

    // displacementMap
    // displacementScale
    // displacementBias

    metalness: 1,
    metalnessMap: metalnessMap,

    // alphaMap: alphaMap,

    // PHYSICAL

    // clearcoat:
    // clearcoatMap: clearcoatMap,
    // clearcoatRoughness:
    // clearcoatRoughnessMap:
    // clearcoatNormalScale: 
    // clearcoatNormalMap:

    // reflectivity:
    // ior:

    // sheen:
    // sheenColor:
    // sheenRoughness:

    // transmission:
    // transmissionMap: transmissionMap,
    // attenuationDistance:
    // attenuationColor:

    // specularIntensity:
    // specularColor:
    // specularIntensityMap:
    // specularColorMap:
  } 

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {
  canvasNoiseHandle
};