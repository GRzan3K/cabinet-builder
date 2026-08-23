const widthInput = document.getElementById("width");
const thicknessInput = document.getElementById("thickness");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");

const calculateButton =
    document.getElementById("calculate");

const result =
    document.getElementById("result");


calculateButton.addEventListener("click", function () {

    const width = Number(widthInput.value);
    const thickness = Number(thicknessInput.value)
    const height = Number(heightInput.value);
    const depth = Number(depthInput.value);

    const insideWidth = width - thickness * 2;

    const sideHeight = height;
    const sideDepth = depth;

    const sidesArea = sideHeight * sideDepth * 2;
    const sidesAreaM2 = sidesArea / 1000000;

    result.textContent =
        "Szerokość wewnętrzna: " + insideWidth + " mm";

});