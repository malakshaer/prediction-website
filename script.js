const apikey = "UelJzt3GJ8LnbYhxf9gspQLLPt8PAjcVMe4J";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (name) => `https://gender-api.com/get?name=${name}&key=${apikey}`;

async function getGenderByName(name) {
  const resp = await fetch(url(name), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData);

  addGenderToPage(respData);
}

function addGenderToPage(data) {
  const gender = document.getElementById("gender");
  gender.classList.add("info");

  gender.innerHTML = `<h2>${data.gender}</h2>`;

  //clean up
  main.innerHTML = "";

  main.appendChild(gender);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = search.value;

  if (name) {
    getGenderByName(name);
  }
});
