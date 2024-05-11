/* Visits */
function updatePageVisitsCounter() {
    let numVisits = Number(window.localStorage.getItem("numVisitsCounter")) || 0;
    const visitsDisplay = document.querySelector(".visits");

    if (numVisits === 0) {
        visitsDisplay.textContent = `Welcome! Let us know if you have any questions`;
    } else {
        visitsDisplay.textContent = numVisits + 1;
    }

    localStorage.setItem("numVisitsCounter", numVisits);
}
updatePageVisitsCounter();