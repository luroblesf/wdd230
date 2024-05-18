/* Copyright year */

function getCopyrightYear() {
    const year = new Date().getFullYear();
    return `&copy; ${year}`;
}
document.getElementById("currentYear").innerHTML = getCopyrightYear();

/* Last modified date of the page */

function getLastModified() {
    const lastModified = new Date(document.lastModified);
    return `Last Modified: ${lastModified}`;
}
document.getElementById("lastModified").innerHTML = getLastModified();

/* Hamburger Menu */

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

/* Title Position */
const form = document.querySelector("#form");
const input = document.querySelector("#position");
const output = document.querySelector("#submit");

const re = /^[A-Za-z\d\-\s]{7,}$/;

function testInfo(positionInput) {
  const ok = re.exec(positionInput.value);

  output.textContent = ok
    ? {onclick}
    : `${positionInput.value} Title of position invalid`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});

/* TimeStamp */

var now = new Date();
var datetime = now.toLocaleString();

document.getElementById("datetime").innerHTML = datetime;
