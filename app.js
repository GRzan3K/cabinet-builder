const form = document.getElementById("cabinet-form");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");
const shelvesInput = document.getElementById("shelves");

const resultsBody = document.getElementById("results-body");

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

    let shelfRow = "";
    if (shelves > 0) {
        
        shelfRow = `
            <tr>
                <td>Półka</td>
                <td>${shelves}</td>
                <td>${shelfWidth} x ${shelfDepth} mm</td>
            </tr>
        `;
    }

    resultsBody.innerHTML = `
        <tr>
            <td>Bok</td>
            <td>2</td>
            <td>${sideHeight} x ${sideDepth} mm</td>
        </tr>

        <tr>
            <td>Góra</td>
            <td>1</td>
            <td>${topWidth} x ${topDepth} mm</td>
        </tr

        <tr>
            <td>Dół</td>
            <td>1</td>
            <td>${bottomWidth} x ${bottomDepth} mm</td>
        </tr>

        ${shelfRow}
        
    `;

});

