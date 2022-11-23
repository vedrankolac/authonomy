import { CanvasTexture, RepeatWrapping } from 'three';
import { floatBufferFromCanvas, normalMap as normalMapCreator } from "@thi.ng/pixel";

class RndNoiseTresholdNormal {
	constructor(color, colorNoiselevel = 128, normalNoiselevel = 128) {
    const width  = 1024;
		const height = 1024;

    console.log('noise maps', Math.round(colorNoiselevel), Math.round(normalNoiselevel));

		let colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    let colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

    let normalCanvas = document.createElement('canvas');
		normalCanvas.width = width;
		normalCanvas.height = height;
    let normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

    const compositeNoise = (cc, nc, x = 0, y = 0, alpha = 255) => {
      const w = cc.width;
      const h = cc.height;
    
      const ccContext = cc.getContext("2d");      
      const ccImageData = ccContext.getImageData(x, y, w, h);
      const ccPixels = ccImageData.data;

      const ncContext = nc.getContext("2d");      
      const ncImageData = ncContext.getImageData(x, y, w, h);
      const ncPixels = ncImageData.data;

      const n = ccPixels.length;
      let i = 0;

      const cnl = colorNoiselevel/256;
      const nnl = normalNoiselevel/256;

      const darkSpotTreshold           = Math.random() * 0.1;
      const brightSpotTreshold         = Math.random() * 0.0010;

      while (i < n) {
        let iN = i;

        // add background noise
        const rnd = Math.random()
        let noiseLevel  = 1 - (rnd * cnl);
        let nNoiseLevel = 1 - (rnd * nnl);

        // dark px
        let td = Math.random();
        const blackORGrayscale = Math.round(Math.random());
        if (td < darkSpotTreshold) {
          // noiseLevel = blackORGrayscale ? Math.random() * 1 : 0;
          noiseLevel = Math.random() * 1;
          nNoiseLevel = Math.random() * 0.4;
        }

        let r = color.r * noiseLevel;
        let g = color.g * noiseLevel;
        let b = color.b * noiseLevel;

        // bright px
        const tb = Math.random();
        const whiteORGrayscale = Math.round(Math.random());
        if (tb < brightSpotTreshold) {
          // noiseLevel = whiteORGrayscale ? Math.random() * 0.75 : 0.9;
          noiseLevel = Math.random() * 0.75;
          r = noiseLevel / r;
          g = noiseLevel / g;
          b = noiseLevel / b;
        }

        ccPixels[i++] = r * 255;
        ccPixels[i++] = g * 255;
        ccPixels[i++] = b * 255;
        ccPixels[i++] = alpha;

        // normal map
        ncPixels[iN++] = ncPixels[iN++] = ncPixels[iN++] = nNoiseLevel * normalNoiselevel | 0;
        ncPixels[iN++] = alpha;

      }

      ccContext.putImageData(ccImageData, x, y);
      ncContext.putImageData(ncImageData, x, y);
    }

    // make all noise maps in one loop
    compositeNoise(colorCanvas, normalCanvas);

    const normalMapSrc = floatBufferFromCanvas(normalCanvas);
    normalCanvas = null;
		let normalImage = normalMapCreator(normalMapSrc, {step: 0, scale: 1}).toImageData();

    const normalMap =  new CanvasTexture(normalImage);
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
    normalImage = null;

    const colorMap  =  new CanvasTexture(colorCanvas);
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorCanvas = null;

		return {
			normalMap,
      colorMap
    };
	}
}

export { RndNoiseTresholdNormal };