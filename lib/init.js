// Coordinate init functions and mouse position debugger

const CANVAS_MARGIN = 100;

export function mouseLocation(event) {
	console.log(`x: ${event.clientX}, y: ${event.clientY}`);
}
/**
 *
 * @param {Canvas} c HTML canvas element
 * @param {Context} ctx HTML canvas context
 * @param {Number} acc Size of individual squares in pixels
 * @returns {Object} Coordinate data
 */
export function drawField(c, ctx, acc) {
	// Correct for canvas blurryness
	ctx.translate(0.5, 0.5);
	// x-axis zero index
	const xzi = c.width / 2;
	// y-axis zero index
	const yzi = c.height / 2;
	ctx.strokeStyle = "rgb(230,230,230)";

	// Create x-axis
	ctx.beginPath();
	ctx.moveTo(0 + CANVAS_MARGIN - acc, yzi);
	ctx.lineTo(c.width - CANVAS_MARGIN + acc, yzi);
	ctx.stroke();

	// Create y-axis
	ctx.beginPath();
	ctx.moveTo(xzi, 0 + CANVAS_MARGIN - acc);
	ctx.lineTo(xzi, c.height - CANVAS_MARGIN + acc);
	ctx.stroke();

	return drawMarks(c, ctx, xzi, yzi, acc);
}

export function drawMarks(c, ctx, xzi, yzi, acc) {
	const markLengthVertical = c.height / 2 - CANVAS_MARGIN + acc;
	const markLengthHorizontal = c.width / 2 - CANVAS_MARGIN + acc;
	const xCorr = new Map();
	const yCorr = new Map();

	let currentLoc = 1;

	for (let i = xzi + acc; i < c.width + acc - CANVAS_MARGIN + acc; i += acc) {
		ctx.moveTo(i, yzi + markLengthVertical);
		ctx.lineTo(i, yzi - markLengthVertical);
		ctx.stroke();

		xCorr.set(currentLoc, i);
		currentLoc++;
	}

	currentLoc = 1;

	for (let i = xzi - acc; i > 0 - acc + CANVAS_MARGIN - acc; i -= acc) {
		ctx.moveTo(i, yzi + markLengthVertical);
		ctx.lineTo(i, yzi - markLengthVertical);
		ctx.stroke();

		xCorr.set(-currentLoc, i);
		currentLoc++;
	}

	currentLoc = 1;

	for (let i = yzi + acc; i < c.height + acc - CANVAS_MARGIN + acc; i += acc) {
		ctx.moveTo(xzi + markLengthHorizontal, i);
		ctx.lineTo(xzi - markLengthHorizontal, i);
		ctx.stroke();

		yCorr.set(-currentLoc, i);
		currentLoc++;
	}

	currentLoc = 1;

	for (let i = yzi - acc; i > 0 - acc + CANVAS_MARGIN - acc; i -= acc) {
		ctx.moveTo(xzi + markLengthHorizontal, i);
		ctx.lineTo(xzi - markLengthHorizontal, i);
		ctx.stroke();

		yCorr.set(currentLoc, i);
		currentLoc++;
	}
	xCorr.set(0, xzi);
	yCorr.set(0, yzi);

	return {
		x: xCorr,
		y: yCorr,
		context: ctx,
	};
}
