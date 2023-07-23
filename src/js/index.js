import axios from "axios";
import { BASE_URL, fetchBreeds, fetchCatByBreed } from "./cat-api"

axios.defaults.headers.common["x-api-key"] = "live_C8fch3W7tmmF8fmpsXU2mdIfjeqC3R8Q3wAY9gs2QZiQFnTO5tNKg722MPHavC8b";

const selectCat = document.querySelector(".breed-select")
const catInfo = document.querySelector(".cat-info")
selectCat.addEventListener("change", onSelectChange)



function createCatList() {
    fetchBreeds()
        .then(data => {

            const optionsList = data.map(({ id, name }) => ` <option value="${id}">${name}</option>`
            ).join(' ');

            selectCat.innerHTML = optionsList;

        })
        .catch(error => {

            console.error("Помилка запиту:", error.message);
        });
}

createCatList();



function onSelectChange(evt) {
    const selectedBreedId = evt.currentTarget.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {
            const { breeds, url } = data[0];
            const beerdCard = `<img class="pfoto-cat" width = "300px" src="${url}" alt="${breeds[0].name}">
            <div class="text-part">
          <h2 class="name-cat">${breeds[0].name}</h2>
          <p class="deskr-cat">${breeds[0].description}</p>
          <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${breeds[0].temperament}</p>  </div>`;

            console.log(beerdCard);
            catInfo.innerHTML = beerdCard;
        })
        .catch(error => {

            console.error("Помилка запиту:", error.message);
        });
}