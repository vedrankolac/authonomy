import { mapNumber } from '../../utils/numUtils';

class RndDotsMaps {
	constructor(color, width = 2048, height = 2048 ) {
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		const rRGBInit = Math.random() * 207 + 48;
    const roughnessCanvas = document.createElement('canvas');
		roughnessCanvas.width = width;
		roughnessCanvas.height = height;
		const roughnessCanvasContext = roughnessCanvas.getContext( '2d' );
    // roughnessCanvasContext.fillStyle = 'rgb(255,255,255)';
    roughnessCanvasContext.fillStyle = `rgb(${rRGBInit}, ${rRGBInit}, ${rRGBInit})`;
		roughnessCanvasContext.fillRect( 0, 0, width, height );

    const mRGBInit = Math.random() * 255;
    const metalnessCanvas = document.createElement('canvas');
		metalnessCanvas.width = width;
		metalnessCanvas.height = height;
		const metalnessCanvasContext = metalnessCanvas.getContext( '2d' );
    // metalnessCanvasContext.fillStyle = 'rgb(0,0,0)';
    metalnessCanvasContext.strokeStyle = `rgb(${mRGBInit}, ${mRGBInit}, ${mRGBInit})`;
		metalnessCanvasContext.fillRect( 0, 0, width, height );

		// const rRGB = Math.random() * 127;
    // const mRGB = Math.random() * 127 + 128;
		const rRGB = Math.random() * 207 + 48;
    const mRGB = Math.random() * 255;
		const r = Math.random() * 13 + 3;
		const n = mapNumber(r, 3, 16, 280, 100);

		for ( let i = 0; i < n; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
      
      const cRGB = Math.round(Math.random()) ? 235 : 0;
      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.strokeStyle = "rgba(1, 1, 1, 0)";
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();

      roughnessCanvasContext.fillStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
			roughnessCanvasContext.beginPath();
			roughnessCanvasContext.strokeStyle = "rgba(1, 1, 1, 0)";
			roughnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			roughnessCanvasContext.fill();

      metalnessCanvasContext.fillStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
			metalnessCanvasContext.beginPath();
			metalnessCanvasContext.strokeStyle = "rgba(1, 1, 1, 0)";
			metalnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			metalnessCanvasContext.fill();
		}

		return {
      colorMap: colorCanvas,
      roughnessMap: roughnessCanvas,
      metalnessMap: metalnessCanvas,
    };
	}
}

export { RndDotsMaps };