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

document.getElementById("datetime").innerHTML = datetime;

/* Grid */

indow.addEventListener('load', function () {

  Array.from(document.querySelectorAll('[role^=switch]')).forEach(
    (element) => {
      new Switch(element)
    }
  );
  displayChamberMembers();
});

function displayChamberMembers() {
  const memberCardBox = document.querySelector('.member-card-section');
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');

  const renderMembers = function (members) {
    members.forEach((member) => {
      const html = `
        <div class="member-card">
            <figure>
              <div>
                <img src="${member.image}" alt="${member.name} logo" width="1000" height="623" loading="lazy">
              </div>
              <figcaption>${member.name}</figcaption>
            </figure>
            <div class="member-info-box">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}">${member.website.slice(8)}</a>
                <img src="${member.membershipLevel}" alt="" width="45" height="64">
            </div>
        </div>
      `;
      memberCardBox.insertAdjacentHTML('afterbegin', html)
    })
  }

  const getMembersData = async function () {
    const membersUrl = '../data/members.json';
    const response = await fetch(membersUrl);
    const data = await response.json();
    renderMembers(data.data);
  }
  getMembersData();

  const saveView = function (view) {
    localStorage.setItem("localView", JSON.stringify(view));
  }

  const changeView = function () {
    const btn = this;

    if (memberCardBox.classList.contains('list')) {
      memberCardBox.classList.remove('list');
    } else {
      memberCardBox.classList.remove('grid');
    }
    memberCardBox.classList.add(btn.id.slice(0, 4))
    saveView(btn.id.slice(0, 4));
  }

  const theView = function () {
    const isView = JSON.parse(localStorage.getItem("localView"));
    console.log(isView);
    if (isView && isView != 0) {
      memberCardBox.classList.add(isView);
    }
  }
  theView();

  gridBtn.addEventListener('click', changeView.bind(gridBtn));
  listBtn.addEventListener('click', changeView.bind(listBtn));
}