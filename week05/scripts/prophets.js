const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.table(data);
        displayProphets(data.prophets);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
getProphetData();

const displayProphets = (prophets) => {
    // console.log(prophets);
    prophets.forEach((prophet) => {
        // Create a section element and store it in a variable named card
        const card = document.createElement("section");
        // Create an h2 element and store it in a variable named "fullName"
        const fullName = document.createElement("h2");
        // Create a p element and store it in a variable named "birthdate"
        const birthdate = document.createElement("p");
        // Create a p element and store it in a variable named "birthplace"
        const birthplace = document.createElement("p");
        // Create an img element and store it in a variable named "portrait"
        const portrait = document.createElement("img");

        // Populate the heading element with the prophet's full name using a template string
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Populate the paragraph element with the prophet's birthdate using a template string  
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

        // Populate the paragraph element with the prophet's birthplace using a template string
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build the image element by setting attributes
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", prophet.fullName);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "300");

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        // add the section card to the "cards" div
        cards.appendChild(card);
    });
};