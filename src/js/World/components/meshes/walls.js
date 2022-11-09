import { PlaneGeometry, SphereGeometry, Mesh, MeshStandardMaterial, MathUtils, DoubleSide } from 'three';
import { RndDotsFloor } from '../canvasMaps/RndDotsFloor';
import { RndNoiseNormal } from '../canvasMaps/RndNoiseNormal';
import { canvasTextureMaterial } from '../materials/canvasTextureMaterial';

const walls = (scene, size = 20, bgHSL, color) => {
  const maps = new RndDotsFloor(bgHSL, color, 256);

  const plastic = {
    roughness: 1,
    metalness: 0,
    n: 'plastic'
  }

  const materialFloor = canvasTextureMaterial(
    {...maps},
    plastic,
    1,
    8 * 15,
    8 * 15
  )

  const materialDome = new MeshStandardMaterial({
    color: color,
    envMapIntensity: 100,
    side: DoubleSide
  });

  const geometryPlane = new PlaneGeometry(size, size, 4, 4);
  const floor = new Mesh(geometryPlane, materialFloor);
  floor.receiveShadow = true;
  floor.rotation.x = MathUtils.degToRad(270);
  scene.add(floor);

  const geometryDome = new SphereGeometry(200, 64, 64);
  const dome = new Mesh(geometryDome, materialDome);
  scene.add(dome);
}

export { walls };