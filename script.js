const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const imageElement = document.querySelector("#image");
const imageLink = document.querySelector("#imageLink");

const url1 = (name) => ` https://api.agify.io/?name=${name}`;
const url2 = (name) => ` https://api.genderize.io?name=r${name}`;
const url3 = (name) => ` https://api.nationalize.io/?name=${name}`;
const urlDog = `https://dog.ceo/api/breeds/image/random`;

fetch(urlDog)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    imageElement.src = data.message;
  })
  .catch((error) => {
    console.log("Error: " + error);
  });

async function getData(name) {
  const resp1 = await fetch(url1(name), { origin: "cors" });
  const respData1 = await resp1.json();

  const resp2 = await fetch(url2(name), { origin: "cors" });
  const respData2 = await resp2.json();

  const resp3 = await fetch(url3(name), { origin: "cors" });
  const respData3 = await resp3.json();

  console.log(respData1);
  console.log(respData2);
  console.log(respData3);

  main.innerHTML = "";
  addAgeToPage(respData1);
  addGenderToPage(respData2);
  addNationalityToPage(respData3);
}

function addAgeToPage(data) {
  const theAge = document.createElement("div");
  theAge.classList.add("info");

  theAge.innerHTML = `<h2>Age: ${data.age}</h2>`;

  main.appendChild(theAge);
}

function addGenderToPage(data) {
  const theGender = document.createElement("div");
  theGender.classList.add("info");

  theGender.innerHTML = `<h2> Gender: ${data.gender}</h2>`;

  main.appendChild(theGender);
}

function addNationalityToPage(data) {
  const theNationality = document.createElement("div");
  theNationality.classList.add("info");

  theNationality.innerHTML = `<h2>Nationality1: ${data.country[0].country_id}  Nationality2: ${data.country[1].country_id}</h2>`;

  main.appendChild(theNationality);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = search.value;

  if (name) {
    getData(name);
  }
});
