import { sphere } from "../bodies/sphere";
import { defaultColorShinyPlastic } from "../materials/defaultColorShinyPlastic";
import { hslToHex } from "../../utils/colorUtils";

const spheres = (
  scene,
  loop,
  physicsWorld,
  isDay,
  props
) => {
  const color = isDay ? hslToHex(0.6, 0, 0.8) : hslToHex(0.6, 0, 0.002);
  const colorMaterial = defaultColorShinyPlastic(color);
  const spreadWidth = 10;
  const {
    min = 0.02,
    sizeRange = Math.random()/12,
    n = 8,
    y = 3,
    yRange = 6
  } = props;

  for (let i = 0; i < n; i++) {
    const size = {
      radius: sizeRange + min
    }
    const translation = {
      x: Math.random() * spreadWidth - spreadWidth/2,
      y: Math.random() * yRange + y,
      z: Math.random() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: Math.random(),
      y: Math.random(),
      z: Math.random()
    }
    const sphereItem = sphere(colorMaterial, size, translation, rotation, physicsWorld);
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);
  }
}

export { spheres };