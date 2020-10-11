const URL = "https://teachablemachine.withgoogle.com/models/mLhDa6ugX/";
let model, webcam, labelContainer, maxPredictions;
const text = document.querySelector(".text-display");

async function init() {
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";


	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	const flip = true;
	webcam = new tmImage.Webcam(350, 350, flip);
	await webcam.setup();
	await webcam.play();
	window.requestAnimationFrame(loop);

	document.getElementById("webcam-container").appendChild(webcam.canvas);
	labelContainer = document.getElementById("label-container");
	for (let i = 0; i < maxPredictions; i++) {
			labelContainer.appendChild(document.createElement("div"));
	}
}

async function loop() {
	webcam.update();
	await predict();
	window.requestAnimationFrame(loop);
}

async function predict() {
	const prediction = await model.predict(webcam.canvas);
	for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
					prediction[i].className + ": " + (prediction[i].probability.toFixed(2) * 100) + "%";
			labelContainer.childNodes[i].innerHTML = classPrediction;
  }
	if (prediction[1].probability > 0.5) {
		text.innerHTML = "This item is not recyclable.";
	} else if (prediction[1].probability < 0.5) {
		text.innerHTML = "This item is recyclable.";
	}
}
