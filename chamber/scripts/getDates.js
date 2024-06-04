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


WebFont.load({
    google: {
      families: ["Inter", "Montserrat"],
    },
  });
  
  const banner = document.getElementById("banner");
  const closeBannerBtn = document.getElementById("closeBanner");
  
  // Navbar Logic
  const navBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileMenu = document.getElementById("menu");
  
  function toggleMenu() {
    mobileMenu.classList.toggle("show-menu");
  }
  
  navBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  
  // Store alerts
  let alerts;
  
  function handleAlerts() {
    // Check for alerts
    if (alerts) {
      banner.classList.remove("hide");
      const p = document.createElement("p");
      p.textContent = alerts[0].description;
      banner.appendChild(p);
    } else {
      banner.classList.add("hide");
    }
  }
  
  handleAlerts();
  
  closeBannerBtn.addEventListener("click", function () {
    banner.classList.add("hide");
  });






/* Title Position */
const form = document.querySelector("#form");
const input = document.querySelector("#position");
const output = document.querySelector("#submit");

const re = /^[A-Za-z\-\s]{7,}$/;

function testInfo(positionInput) {
  const ok = re.exec(positionInput.value);

  output.innerHTML= ok
    ? `Correct` (location.href = "thankyou.html")

    : `Title of position invalid`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});


/* TimeStamp */

var now = new Date();
var datetime = now.toLocaleString();

document.getElementById("datetime").innerHTML = datetime

/* Banner */
function isBannerDay() {
  const today = new Date().getDay();
  return [1, 2, 3].includes(today);
}

function closeBanner() {
  const banner = document.getElementById("attendBanner");
  banner.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  if (isBannerDay()) {
    const banner = document.getElementById("attendBanner");
    banner.style.display = "flex";
  }
});
