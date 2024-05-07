function getCopyrightYear() {
    const year = new Date().getFullYear();
    return `&copy; ${year}`;
}
document.getElementById("currentYear").innerHTML = getCopyrightYear();


function getLastModified() {
    const lastModified = new Date(document.lastModified);
    return `Last Modified: ${lastModified}`;
}
document.getElementById("lastModified").innerHTML = getLastModified();

function updatePageVisitsCounter() {
}