const form = document.getElementById("cabinet-form");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const depthInput = document.getElementById("depth");
const shelvesInput = document.getElementById("shelves");
const shelfOffsetInput = document.getElementById("shelf-offset");
const thicknessInput = document.getElementById("thickness");
const backInput = document.getElementById("back");
const totalAreaElement = document.getElementById("total-area");
const cabinetNameInput = document.getElementById("cabinet-name");
const projectList = document.getElementById("project-list");


const resultsBody = document.getElementById("results-body");
const errorMessage = document.getElementById("error-message");

const projectCabinets = [];

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
    const hasBack = backInput.checked;
    
    const cabinetName = cabinetNameInput.value.trim();

    if (cabinetName === ""){
        errorMessage.textContent = 
            "Podaj nazwe szafki.";
        return;
    }



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
    
    if (hasBack) {
        parts.push({
            name: "Plecy",
            quantity: 1,
            length: width - 2,
            width: height - 2
        });
    }

    const cabinet = {
        name: cabinetName,

        width: width,
        height: height,
        depth: depth,

        thickness: thickness,
        shelfOffset: shelfOffset,

        parts: parts
    }

    projectCabinets.push(cabinet);

    renderProject();

    cabinetNameInput.value = "";
    cabinetNameInput.focus();


  
    let rows = "";
    let totalArea = 0;
    parts.forEach(function (part){

        const partArea =
            part.length *
            part.width *
            part.quantity;
        
        totalArea += partArea;

        rows += `
            <tr>
                <td>${part.name}</td>
                <td>${part.quantity}</td>
                <td>${part.length} x ${part.width} mm</td>
            </tr>
        `;

    });

    const totalAreaM2 = totalArea / 1_000_000

   resultsBody.innerHTML = rows;

   totalAreaElement.textContent = 
        `Łączna powierzchnia materiału: ${totalAreaM2.toFixed(2)} m²`

   

});

projectList.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-cabinet")) {

        const index = Number(event.target.dataset.index);

        projectCabinets.splice(index, 1);

        renderProject();
    }

});

function renderProject() {

    let projectHtml = "";

    projectCabinets.forEach(function (cabinet, index) {

        let partsHtml = "";

        cabinet.parts.forEach(function (part) {

            partsHtml += `
                <li>
                    ${part.name}:
                    ${part.quantity} szt. -
                    ${part.length} x ${part.width} mm
                </li>
            `;

        });


        projectHtml += `
            <article class="cabinet-card">

                <h3>
                    ${index + 1}. ${cabinet.name}
                </h3>

                <p>
                    ${cabinet.width}
                    x
                    ${cabinet.height}
                    x
                    ${cabinet.depth}
                    mm
                </p>

                <ul>
                    ${partsHtml}
                </ul>

                <button
                    type="button"
                    class="remove-cabinet"
                    data-index="${index}"
                >
                    Usuń
                </button>

            </article>
        `;

    });
    projectList.innerHTML = projectHtml;
}





