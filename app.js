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

    const parts = [
    {
        name: "Bok",
        quantity: 2,
        length: height,
        width: depth
    },

    {
        name: "Góra",
        quantity: 1,
        length: insideWidth,
        width: depth
    },

    {
        name: "Dół",
        quantity: 1,
        length: insideWidth,
        width: depth
    }
    ];

    if (shelves > 0){

        parts.push({
            name: "Półka",
            quantity: shelves,
            length: insideWidth,
            width: depth - shelfOffset
        });
        
    }
    
    let rows = "";
    parts.forEach(function (part){

        rows += `
            <tr>
                <td>${part.name}</td>
                <td>${part.quantity}</td>
                <td>${part.length} x ${part.width} mm</td>
            </tr>
        `;

    });

   resultsBody.innerHTML = rows;

});

