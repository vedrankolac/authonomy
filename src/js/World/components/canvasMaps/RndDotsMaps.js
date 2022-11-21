import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";
import { randomNoiseWithLevel } from '../../utils/noiseGenerators';

class RndDotsMaps {
	constructor(color, level = 128) {
		const width  = 1024;
		const height = 1024;

		const normalWidth  = 1024;
		const normalHeight = 1024;

    console.log('noise maps', Math.round(level));
		
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		const normalCanvas = document.createElement('canvas');
		normalCanvas.width = normalWidth;
		normalCanvas.height = normalHeight;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, normalWidth, normalHeight );

		const n = Math.random() * 160 + 40;
		for ( let i = 0; i < n; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = 2;
      const cRGB = Math.round(Math.random()) ? 235 : 20;
      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.strokeStyle = "rgba(1, 1, 1, 0)";
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();
		}

		randomNoiseWithLevel(normalCanvas, level);
    const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
      colorMap: colorCanvas,
			normalMap: nMap
    };
	}
}

export { RndDotsMaps };