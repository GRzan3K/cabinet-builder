const form = document.getElementById("cabinet-form");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");
const shelvesInput = document.getElementById("shelves");

const result = document.getElementById("results");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    const depth = Number(depthInput.value);
    const shelves = Number(shelvesInput.value);
    
    const thickness = 18;
    const shelfOffset = 20;

    const insideWidth = width - thickness * 2;

    const sideHeight = height;
    const sideDepth = depth;
   
    const topWidth = insideWidth;
    const topDepth = depth;

    const bottomWidth = insideWidth;
    const bottomDepth = depth;

    const shelfWidth = insideWidth;
    const shelfDepth = depth - shelfOffset;

    result.innerHTML = `
    <h2>Lista elementów</h2>

    <p>Boki: 2 szt. - ${sideHeight} x ${sideDepth} mm</p>

    <p>Góra: 1 szt. - ${topWidth} x ${topDepth} mm</p>

    <p>Dół: 1 szt. - ${bottomWidth} x ${bottomDepth} mm</p>

    <p>Półki: ${shelves} szt. - ${shelfWidth} x ${shelfDepth} mm</p>
    
    `;

});