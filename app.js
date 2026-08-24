const form = document.getElementById("cabinet-form");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");
const shelvesInput = document.getElementById("shelves");
const shelfOffsetInput = document.getElementById("shelf-offset");
const thicknessInput = document.getElementById("thickness");

const resultsBody = document.getElementById("results-body");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = "";
    
    //1. Pobieranie danych
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    const depth = Number(depthInput.value);
    const shelves = Number(shelvesInput.value);
    const shelfOffset = Number(shelfOffsetInput.value);
    const thickness = Number(thicknessInput.value);


    //2. Sprawdzenia danych
    if (width <= thickness * 2){
        errorMessage.textContent = 
            `Szerokość szafki musi być większa niz ${thickness * 2} mm.`;
        return;
   }

   if (height <= 0){
        errorMessage.textContent = 
            "Wysokość szafki musi być większa niz 0 mm.";
        return;
   }

   if (depth <= 0){
        errorMessage.textContent = 
            "Głębokość szafki musi być większa ni 0 mm.";
        return;
   }

   if (shelves > 0 && depth <= shelfOffset){
        errorMessage.textContent = 
            `Głębokość szafki musi być większa niz ${shelfOffset} mm.`;
        return;
   }

   if (shelves < 0 || !Number.isInteger(shelves)) {
        errorMessage.textContent = 
            "Liczba półek musi być liczbą całkowitą większą lub równą 0.";
        return;
   }

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

