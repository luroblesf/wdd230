const url = "https://luroblesf.github.io/wdd230/chamber/data/members.json";
const cards = document.querySelector("#cards");

async function getMembersData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        displayMembers(data.members);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
getMembersData();

const displayMembers = (members) => {
    members.forEach((member) => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const birthdate = document.createElement("p");
        const birthplace = document.createElement("p");
        const web = document.createElement("p");
        const membershipLevel = document.createElement("p");
        const date = document.createElement("p");
        const portrait = document.createElement("img");

   
        name.textContent = `${member.name}`;
        birthdate.textContent = `${member.address}`;
        birthplace.textContent = `${member.phone}`;
        web.textContent = `${member.website}`
        membershipLevel.textContent = `${member.membership}`
        date.textContent = `${member.since}`

        portrait.setAttribute("src", member.imageurl);
        portrait.setAttribute("alt", member.name);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "300");

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(web);
        card.appendChild(membershipLevel);
        card.appendChild(date);

        cards.appendChild(card);
    });
};

/* Buttons */

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const display = document.querySelector("article");

gridBtn.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listBtn.addEventListener("click", showList); 

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}