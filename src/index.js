const dogBar = document.getElementById("dog-bar");
const filterButton = document.getElementById("good-dog-filter");
const dogInfo = document.getElementById("dog-info");

filterButton.addEventListener("click", filterDogs);
function filterDogs() {
  if (filterButton.innerText === "Filter good dogs: OFF") {
    filterButton.innerText = "Filter good dogs: ON";
    dogBar.innerHTML = "";
    fetch("http://localhost:3000/pups")
      .then((resp) => resp.json())
      .then((dogs) => {
        dogs.forEach((dog) => {
          if (dog.isGoodDog === true) {
            dogBar.innerHTML += `
                   <span data-id=${dog.id}>${dog.name}</span>
                    `;
          }
        });
      });
  } else {
    filterButton.innerText = "Filter good dogs: OFF";
    dogBar.innerHTML = "";
    fetch("http://localhost:3000/pups")
      .then((resp) => resp.json())
      .then((dogs) => {
        dogs.forEach((dog) => {
          dogBar.innerHTML += `
                <span data-id=${dog.id}>${dog.name}</span>
                `;
        });
      });
  }
}
dogBar.addEventListener("click", (e) => {
  fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
    .then((res) => res.json())
    .then((dog) => {
      dogInfo.innerHTML = `
            <img src="${dog.image}">
            <h2>${dog.name}</h2>
            <button data-id=${dog.id}>${
        dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
      }</button>
            `;
    });
    
});
