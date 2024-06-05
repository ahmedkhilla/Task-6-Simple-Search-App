"use strict";
// Elements Selection
const resultContainer = document.querySelector(".search-result");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "f7084e84-3083-411f-9a42-e6ca2dcb1072";

// Function to Render HTMLDOM
const domRender = function (imageUrl, mealTitle, publisher) {
  const html = `
          <li class="meal-info">
            <div class="meal-img">
              <img
                src="${imageUrl}"
                alt="Pizza meal photo"
              />
            </div>
            <div class="meal-content">
              <h2 class="meal-title">${mealTitle}</h2>
              <p class="publisher">${publisher}</p>
            </div>
          </li>
  `;
  resultContainer.insertAdjacentHTML("afterbegin", html);
};

//  Function to Render Error Messages
const errorMessageRender = function (err) {
  resultContainer.innerHTML = "";
  const html = `<h2 class="error-message">${err.message}</h2>`;
  resultContainer.insertAdjacentHTML("afterbegin", html);
  searchInput.value = "";
};

// Function to Fetch data using axios package
const searchRecipe = async function (query = searchInput.value) {
  try {
    if (searchInput.value === "") return;
    const response = await axios.get(
      `${API_URL}?search=${query}&key=${API_KEY}`
    );
    const { recipes } = response.data.data;
    if (recipes.length === 0)
      throw new Error("This item cant be found in our menu!");
    console.log(recipes);
    resultContainer.innerHTML = "";
    if (recipes.length > 6) resultContainer.classList.add("scroll");
    recipes.forEach((recipe) =>
      domRender(recipe.image_url, recipe.title, recipe.publisher)
    );
    searchInput.value = "";
  } catch (err) {
    console.error(err);
    errorMessageRender(err);
  }
};

// Event handlers for search
searchBtn.addEventListener("click", () => {
  searchRecipe();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchRecipe();
});
