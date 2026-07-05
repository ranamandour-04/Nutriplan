const BASEURL = "https://nutriplan-api.vercel.app/api";
// =========== Loading Spinner Design ============
const LOADING_SPINNER_HTML = `
<div class="flex items-center justify-center py-12 col-span-full w-full">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
`;
// =========== Error Message Design ============
const SHOW_ERROR_HTML = (message) => `
<div class="flex flex-col items-center justify-center py-12 text-center col-span-full w-full">
    <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-circle-exclamation text-red-500 text-2xl"></i>
    </div>
    <p class="text-gray-800 text-lg font-semibold">Something went wrong</p>
    <p class="text-gray-500 text-sm mt-1 max-w-md px-4">${message}</p>
</div>
`;
// * HTML Elements
const mealsContainer = document.querySelector("#recipes-grid");
const mealCategoriesSection = document.querySelector(
  "#meal-categories-section",
);
const searchFiltersSection = document.querySelector("#search-filters-section");
const allRecipesSection = document.querySelector("#all-recipes-section");
const searchInput = document.querySelector("#search-input");
const categoryButtons = document.querySelectorAll(".category-card");
const categoriesGrid = document.querySelector("#categories-grid");
const headerMenuBtn = document.querySelector("#header-menu-btn");
const sidebar = document.querySelector("#sidebar");
const filterBtnsContainer = document.querySelector("#filter-btns");
const listviewBtn = document.querySelector("#list-view-btn");
const gridViewBtn = document.querySelector("#grid-view-btn");
const mealDetailsContainer = document.querySelector("#meal-details");
const title = document.querySelector("#title");
const navLinks = document.querySelectorAll(".nav-link");
const logSection = document.querySelector("#foodlog-section");
const productsSection = document.querySelector("#products-section");
const sideBar = document.querySelector("#sidebar");
const productSearchInput = document.querySelector("#product-search-input");
const productSearchBtn = document.querySelector("#search-product-btn");
const productsContainer = document.querySelector("#products-grid");
const barcodeInput = document.querySelector("#barcode-input");
const barcodeSearchBtn = document.querySelector("#lookup-barcode-btn");
const productCategoryBtn = document.querySelectorAll(".product-category-btn");
const nutriScoreFilter = document.querySelectorAll(".nutri-score-filter");
const foodlogDate = document.querySelector("#foodlog-date");
const quickActionGoal = document.querySelector("#quick-action-goal");
const quickActionLog = document.querySelector("#quick-action-log");
const quickActionProduct = document.querySelector("#quick-action-product");
const logCardModal = document.querySelector("#log-card-modal");
const productModal = document.querySelector("#productModal");
const productModalbg = document.querySelector("#productModalbg");
const modalbg = document.querySelector("#modalbg");
let allCurrentProducts = [];
let logMeals = JSON.parse(localStorage.getItem("meals")) || [];
let serivingCounter = 1;
const clearFoodlog = document.querySelector("#clear-foodlog");
const loggedItemsContainer = document.querySelector("#logged-items-list");
const loggedItemsCounter = document.querySelector("#loggedItemsCounter");
clearFoodlog.addEventListener("click", function () {
  localStorage.clear();
  loggedItemsCounter.innerHTML = `(0)`;
  displayLoggedItems();
});
modalbg.addEventListener("click", function (e) {
  if (this === e.target) this.classList.add("hidden");
});
productModalbg.addEventListener("click", function (e) {
  if (this === e.target) this.classList.add("hidden");
});
quickActionGoal.addEventListener("click", function () {
  console.log("goal");
});
quickActionLog.addEventListener("click", function () {
  navLinks.forEach(function (btn) {
    if (btn.getAttribute("data-link") === "meals") {
      navLinks.forEach((link) => link.classList.remove("active"));
      btn.classList.add("active");
      logSection.classList.add("hidden");
      productsSection.classList.add("hidden");
      mealsContainer.classList.remove("hidden");
      mealCategoriesSection.classList.remove("hidden");
      searchFiltersSection.classList.remove("hidden");
      allRecipesSection.classList.remove("hidden");
      title.innerHTML = "Meals & Recipes";
      title.nextElementSibling.textContent =
        "Discover delicious and nutritious recipes tailored for you";
    }
  });
});
quickActionProduct.addEventListener("click", function () {
  navLinks.forEach(function (btn) {
    if (btn.getAttribute("data-link") === "products") {
      navLinks.forEach((link) => link.classList.remove("active"));
      // btn.classList.remove("text-gray-600");
      btn.classList.add("active");
      productsSection.classList.remove("hidden");
      logSection.classList.add("hidden");
      mealsContainer.classList.add("hidden");
      mealCategoriesSection.classList.add("hidden");
      searchFiltersSection.classList.add("hidden");
      allRecipesSection.classList.add("hidden");
      title.innerHTML = "Product Scanner";
      title.nextElementSibling.textContent =
        "Search packaged foods by name or barcode";
    }
  });
});
navLinks.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.getAttribute("data-link") === "log") {
      navLinks.forEach((link) => link.classList.remove("active"));
      btn.classList.add("active");
      logSection.classList.remove("hidden");
      mealsContainer.classList.add("hidden");
      productsSection.classList.add("hidden");
      mealCategoriesSection.classList.add("hidden");
      mealDetailsContainer.classList.add("hidden");
      searchFiltersSection.classList.add("hidden");
      allRecipesSection.classList.add("hidden");
      title.innerHTML = "Food Log";
      title.nextElementSibling.textContent =
        "Track your daily nutrition and food intake";
      displayLoggedItems();
    } else if (btn.getAttribute("data-link") === "products") {
      navLinks.forEach((link) => link.classList.remove("active"));
      // btn.classList.remove("text-gray-600");
      btn.classList.add("active");
      productsSection.classList.remove("hidden");
      logSection.classList.add("hidden");
      mealsContainer.classList.add("hidden");
      mealCategoriesSection.classList.add("hidden");
      mealDetailsContainer.classList.add("hidden");
      searchFiltersSection.classList.add("hidden");
      allRecipesSection.classList.add("hidden");
      title.innerHTML = "Product Scanner";
      title.nextElementSibling.textContent =
        "Search packaged foods by name or barcode";
    } else if (btn.getAttribute("data-link") === "meals") {
      navLinks.forEach((link) => link.classList.remove("active"));
      // btn.classList.remove("text-gray-600");
      btn.classList.add("active");
      logSection.classList.add("hidden");
      productsSection.classList.add("hidden");
      mealsContainer.classList.remove("hidden");
      mealDetailsContainer.classList.add("hidden");
      mealCategoriesSection.classList.remove("hidden");
      searchFiltersSection.classList.remove("hidden");
      allRecipesSection.classList.remove("hidden");
      title.innerHTML = "Meals & Recipes";
      title.nextElementSibling.textContent =
        "Discover delicious and nutritious recipes tailored for you";
    }
  });
});

updateTodayDate();
fetchAllMeals();
// * meals fetch and display
async function fetchAllMeals() {
  try {
    mealsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(`${BASEURL}/meals/random?count=24`);
    if (!response.ok)
      throw new Error("Failed to load recipes from the server.");
    const data = await response.json();
    displayAllMeals(data.results);
  } catch (error) {
    mealsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
function displayAllMeals(data) {
  let mealCards = "";
  for (var i = 0; i < data.length; i++) {
    mealCards += `<div 
                  class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  data-meal-id="${data[i].id}"
                >
                  <div class="relative h-48 overflow-hidden">
                    <img
                      class="recipe-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="${data[i].thumbnail}"
                      alt="${data[i].name}"
                      loading="lazy"
                    />
                    <div class="tags flex items-center justify-between text-xs absolute bottom-3 left-3 gap-4">
                      <span
                        class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                      >
                        <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                        ${data[i].category}
                      </span>
                      <span
                        class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full text-gray-700 backdrop-blur-sm"
                      >
                      <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                        ${data[i].area ? data[i].area : "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3
                      class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                    >
                      ${data[i].name}
                    </h3>
                    <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                      ${data[i].instructions}
                    </p>
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-semibold text-gray-900">
                        <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                        ${data[i].category}
                      </span>
                      <span class="font-semibold text-gray-500">
                        <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                        ${data[i].area ? data[i].area : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>`;
  }
  mealsContainer.innerHTML = mealCards;
  const recipeCards = document.querySelectorAll(".recipe-card");
  const relativeContainers = document.querySelectorAll(
    ".recipe-card > div:first-child",
  );
  const tags = document.querySelectorAll(".recipe-card .absolute");

  const recipeImgs = document.querySelectorAll(".recipe-img");
  // LIST VIEW ACTION
  listviewBtn.addEventListener("click", function () {
    listviewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
    recipeImgs.forEach((img) => {
      img.classList.remove("w-full");
      img.classList.add("w-48", "h-full");
    });
    // Adjust container grid columns
    mealsContainer.classList.remove("grid-cols-4");
    mealsContainer.classList.add("grid-cols-2");
    // Format cards to row layouts
    recipeCards.forEach((card) => {
      card.classList.add("flex", "flex-row", "h-40");
    });
    // Alter image wrapper to side thumbnail geometry
    relativeContainers.forEach((wrapper) => {
      wrapper.classList.remove("h-48");
      wrapper.classList.add("w-48", "h-full", "shrink-0");
    });
    tags.forEach((tagContainer) => {
      tagContainer.classList.add("hidden");
    });
  });
  // GRID VIEW ACTION
  gridViewBtn.addEventListener("click", function () {
    // Toggle layout control buttons active state
    gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
    listviewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");

    // Adjust container grid columns
    mealsContainer.classList.remove("grid-cols-2");
    mealsContainer.classList.add("grid-cols-4");

    // Reset card layouts back to blocks
    recipeCards.forEach((card) => {
      card.classList.remove("flex", "flex-row", "h-40");
    });

    // Restore card top-image wrapper configurations
    relativeContainers.forEach((wrapper) => {
      wrapper.classList.remove("w-48", "h-full");
      wrapper.classList.add("h-48");
    });
    recipeImgs.forEach((img) => {
      // Restore grid behavior where it snaps to full card width
      img.classList.remove("w-48", "h-full");
      img.classList.add("w-full");
    });
    // Reveal badge categories/tags again
    tags.forEach((tagContainer) => {
      tagContainer.classList.remove("hidden");
    });
  });
}
// * catge fetch and display
async function fetchMealsByCategory(category) {
  try {
    mealsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(
      `${BASEURL}/meals/filter?category=${category}&page=1&limit=25`,
    );
    if (!response.ok)
      throw new Error(`Could not load meals under the category "${category}".`);
    const data = await response.json();
    const mealsArray = data.results;
    displayAllMeals(mealsArray);
  } catch (error) {
    mealsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
// Listen to the parent because on reload there is no cards
mealsContainer.addEventListener("click", function (event) {
  // Find the closest element with the card class
  const card = event.target.closest(".recipe-card");
  if (!card) return;
  const cardID = card.getAttribute("data-meal-id");
  mealsContainer.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  title.innerHTML = "Recipe Details";
  title.nextElementSibling.textContent =
    "View full recipe information and nutrition facts";
  mealDetailsContainer.classList.remove("hidden");
  fetchMealByID(cardID);
});
async function fetchNutrition(recipeName, ingredientsArray) {
  try {
    const response = await fetch(`${BASEURL}/nutrition/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "GH10gy6RYhW6nzzi9m3nH9HHZNxIVeO7Wx4H7NSi",
      },
      body: JSON.stringify({
        recipeName: recipeName,
        ingredients: ingredientsArray,
      }),
    });

    if (!response.ok) throw new Error("Nutrition calculation server error.");
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Return mock fallback macros so UI rendering doesn't crash complete page
    return {
      servings: 1,
      perServing: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        cholesterol: 0,
        sodium: 0,
      },
      totals: { calories: 0 },
    };
  }
}
async function displayMealDetails(meal) {
  const formattedIngredients = meal.ingredients.map(
    (ing) =>
      `${ing.measure ? ing.measure : ""} ${ing.ingredient ? ing.ingredient : ""}`,
  );
  const nutr = await fetchNutrition(meal.name, formattedIngredients);
  const proteinPercent = Math.min(nutr.perServing.protein, 100);
  const carbsPercent = Math.min(nutr.perServing.carbs, 100);
  const fatPercent = Math.min(nutr.perServing.fat, 100);
  const fiberPercent = Math.min(nutr.perServing.fiber, 100);
  const sugarPercent = Math.min(nutr.perServing.sugar, 100);
  mealDetailsContainer.innerHTML = ` <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src=${meal.thumbnail}
                alt=${meal.name}
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area ? meal.area : "Unknown"}</span
                  >
                  
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">${nutr.servings} servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">${nutr.perServing.calories} cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${meal.id}"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${meal.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${
                  meal.ingredients && meal.ingredients.length > 0
                    ? meal.ingredients
                        .map(
                          (ing) => `
            <label class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300 accent-emerald-600"
              />
              <span class="text-gray-700 text-sm">
                <span class="font-semibold text-gray-900">${ing.measure ? ing.measure : ""}</span> 
                ${ing.ingredient ? ing.ingredient : ""}
              </span>
            </label>
          `,
                        )
                        .join("")
                    : ""
                }
                 
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  <div class="flex flex-col gap-4 w-full">
                    ${
                      meal.instructions && meal.instructions.length > 0
                        ? meal.instructions
                            .map(
                              (step, index) => `
                              <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                                  ${index + 1}
                                </div>
                                <p class="text-gray-700 leading-relaxed pt-1">
                                  ${step.trim()}
                                </p>
                              </div>
                            `,
                            )
                            .join("")
                        : '<p class="text-gray-500 p-4">No instructions available for this recipe.</p>'
                    }
                  </div>
                </div>
              </div>

             ${
               meal.youtube
                 ? `<!-- Video Section -->
                <div class="bg-white rounded-2xl shadow-lg p-6 mt-6">
                  <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-video text-red-500"></i>
                    Video Tutorial
                  </h2>
                  <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <iframe
                      src="${meal.youtube.replace("watch?v=", "embed/")}"
                      class="absolute inset-0 w-full h-full"
                      frameborder="0"
                      allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                      "
                      allowfullscreen
                    >
                    </iframe>
                  </div>
                </div>`
                 : ""
             }
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nutr.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nutr.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutr.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${proteinPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutr.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${carbsPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutr.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${fatPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutr.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width:${fiberPercent}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutr.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${sugarPercent}%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Other
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nutr.perServing.cholesterol} mg</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nutr.perServing.sodium} mg</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  const backToMealsBtn = document.querySelector("#back-to-meals-btn");
  const logMealBtn = document.querySelector("#log-meal-btn");
  logMealBtn.addEventListener("click", function () {
    modalbg.classList.remove("hidden");
    displayMealModal(meal, nutr);
  });
  backToMealsBtn.addEventListener("click", function () {
    mealsContainer.classList.remove("hidden");
    mealCategoriesSection.classList.remove("hidden");
    searchFiltersSection.classList.remove("hidden");
    allRecipesSection.classList.remove("hidden");
    title.innerHTML = "Meals & Recipes";
    title.nextElementSibling.textContent =
      "Discover delicious and nutritious recipes tailored for you";
    mealDetailsContainer.classList.add("hidden");
    fetchAllMeals();
  });
}
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.getAttribute("data-category");
    if (category) {
      fetchMealsByCategory(category);
    }
  });
});
async function fetchMealByID(id) {
  try {
    mealDetailsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(`${BASEURL}/meals/${id}`);
    if (!response.ok)
      throw new Error(
        "Could not find database records for this specific recipe ID.",
      );
    const data = await response.json();
    const mealsArray = data.result;
    displayMealDetails(mealsArray);
  } catch (error) {
    mealDetailsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
// * areas fetch and display
async function fetchMealsByArea(area) {
  try {
    mealsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(
      `${BASEURL}/meals/filter?area=${area}&page=1&limit=25`,
    );
    if (!response.ok)
      throw new Error(`Could not safely load cuisines from region: ${area}`);
    const data = await response.json();
    const mealsArray = data.results;
    if (mealsArray.length === 0) {
      mealsContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>`;
    } else displayAllMeals(mealsArray);
  } catch (error) {
    mealsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
async function fetchAreas() {
  try {
    const response = await fetch(`${BASEURL}/meals/areas`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    let areas = [];
    let numAreas = 15;
    for (let i = 0; i < numAreas; i++) {
      areas.push(data.results[i].name);
    }
    displayFilters(areas, numAreas);
  } catch (error) {
    filterBtnsContainer.innerHTML = `<p class="text-xs text-red-500 font-medium p-2">Failed to load cuisine filters.</p>`;
  }
}
fetchAreas();
function displayFilters(area, numAreas) {
  const allbutton = document.createElement("button");
  allbutton.setAttribute("data-category", "All Cuisines");
  allbutton.classList.add(
    "px-4",
    "py-2",
    "bg-emerald-600",
    "text-white",
    "rounded-full",
    "font-medium",
    "text-sm",
    "whitespace-nowrap",
    "transition-all",
    "hover:bg-emerald-700",
  );
  allbutton.textContent = "All Cuisines";
  filterBtnsContainer.appendChild(allbutton);
  for (let i = 0; i < numAreas; i++) {
    const button = document.createElement("button");
    button.setAttribute("data-category", area[i]);
    button.classList.add(
      "px-4",
      "py-2",
      "bg-gray-100",
      "text-gray-700",
      "rounded-full",
      "font-medium",
      "text-sm",
      "whitespace-nowrap",
      "transition-all",
      "hover:bg-gray-200",
    );
    button.textContent = area[i];
    filterBtnsContainer.appendChild(button);
    button.addEventListener("click", function () {
      const btnarea = button.getAttribute("data-category");
      fetchMealsByArea(btnarea);
    });
  }
}
// * search fetch
async function fetchSearchMeals(searchValue) {
  try {
    mealsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(
      `${BASEURL}/meals/search?q=${searchValue}&limit=25`,
    );
    if (!response.ok)
      throw new Error("Search query request execution dropped.");
    const data = await response.json();
    mealsContainer.innerHTML = "";
    displayAllMeals(data.results);
  } catch (error) {
    mealsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
function handleMealSearch() {
  var searchKeyword = searchInput.value;
  fetchSearchMeals(searchKeyword);
}
// **************** products page
productSearchBtn.addEventListener("click", function () {
  handleProductSearch();
});
barcodeSearchBtn.addEventListener("click", function () {
  handleProductBarcode();
});
function handleProductSearch() {
  const keyword = productSearchInput.value;
  fetchSearchProducts(keyword);
}
function handleProductBarcode() {
  const keyword = barcodeInput.value;
  fetchBarcodeProducts(keyword);
}
async function fetchBarcodeProducts(id) {
  try {
    productsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(`${BASEURL}/products/barcode/${id}`);
    if (!response.ok)
      throw new Error("Invalid barcode or product data request failed.");
    const data = await response.json();
    const dataDetails = data.result;
    allCurrentProducts = dataDetails;
    displayProducts(allCurrentProducts ? [allCurrentProducts] : []);
  } catch (error) {
    productsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
async function fetchSearchProducts(searchValue) {
  try {
    productsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(
      `${BASEURL}/products/search?q=${searchValue}&page=1&limit=24`,
    );
    if (!response.ok)
      throw new Error("Failed to capture matching packaged products.");
    const data = await response.json();
    const dataDetails = data.results;
    allCurrentProducts = dataDetails;
    displayProducts(allCurrentProducts);
  } catch (error) {
    productsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
function displayProducts(data) {
  productsContainer.innerHTML = "";

  if (!data || data.length === 0) {
    productsContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No products to display</p>
    <p class="text-gray-400 text-sm mt-2">Search for a product or browse by category</p>
</div>`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    const card = document.createElement("div");
    card.className =
      "product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";
    card.innerHTML = `
      <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
             src="${product.image}" alt="${product.name}" />
      </div>
      <div class="p-4">
        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand}</p>
        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">${product.name}</h3>
      </div>
    `;
    card.addEventListener("click", function () {
      productModalbg.classList.remove("hidden");
      displayProductDetails(product);
    });

    productsContainer.appendChild(card);
  }
}
async function fetchProductsByCategory(category) {
  try {
    productsContainer.innerHTML = LOADING_SPINNER_HTML; // Show loader
    const response = await fetch(`${BASEURL}/products/category/${category}`);
    if (!response.ok)
      throw new Error(
        `Could not load products matching category "${category}".`,
      );
    const data = await response.json();
    const mealsArray = data.results;
    allCurrentProducts = mealsArray;

    displayProducts(allCurrentProducts);
  } catch (error) {
    productsContainer.innerHTML = SHOW_ERROR_HTML(error.message);
  }
}
productCategoryBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.getAttribute("data-category");
    if (category) {
      fetchProductsByCategory(category);
    }
  });
});
nutriScoreFilter.forEach(function (button) {
  button.addEventListener("click", function () {
    const grade = button.getAttribute("data-grade");
    if (!allCurrentProducts || allCurrentProducts.length === 0) return;
    if (!grade || grade.toLowerCase() === "all") {
      displayProducts(allCurrentProducts);
    } else {
      const filtered = allCurrentProducts.filter(function (product) {
        return (
          product.nutritionGrade &&
          product.nutritionGrade.toLowerCase() === grade.toLowerCase()
        );
      });
      displayProducts(filtered);
    }
  });
});
// ***************** log page
function updateTodayDate() {
  const date = new Date();
  const today = date.toLocaleDateString("en-eg", { weekday: "long" });
  const month = date.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfMonth = date.getDate();
  foodlogDate.innerHTML = `${today}, ${monthNames[month]} ${dayOfMonth}`;
}
function displayMealModal(meal, nutr) {
  logCardModal.innerHTML = ` <!-- Header Section -->
        <div class="flex items-center gap-4">
          <img
            src="${meal.thumbnail}"
            alt="${meal.name}"
            class="w-14 h-14 object-cover rounded-2xl shadow-sm"
          />
          <div>
            <h2 class="text-xl font-bold text-gray-900 tracking-tight">
              Log This Meal
            </h2>
            <p class="text-sm font-medium text-gray-500">${meal.name}</p>
          </div>
        </div>

        <!-- Servings Counter Section -->
        <div class="">
          <label class="block text-sm font-bold text-gray-700 mb-2"
            >Number of Servings</label
          >
          <div class="flex items-center gap-2">
            <button 
            id='minusbtn'
              class="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg transition-colors text-lg"
            >
              &minus;
            </button>
            <input
            id='mealServingInput'
              type="text"
              value="${serivingCounter}"
              readonly
              class="w-14 h-9 text-center font-bold text-gray-900 border border-gray-200 rounded-lg text-base focus:outline-none"
            />
            <button
            id='plusBtn'
              class="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg transition-colors text-lg"
            >
              &#43;
            </button>
          </div>
        </div>

        <!-- Estimated Nutrition Panel -->
        <div
          class="border rounded-2xl p-4"
          style="background-color: #f0faf7; border-color: #e2f5f0"
        >
          <p class="text-xs font-semibold mb-3 text-emerald-800 opacity-90">
            Estimated nutrition per serving:
          </p>

          <div class="grid grid-cols-4 gap-2 text-center">
            <!-- Calories -->
            <div>
              <p class="text-lg font-bold" style="color: #10b981">${nutr.perServing.calories}</p>
              <p class="text-sm text-gray-500 mt-0.5">Calories</p>
            </div>
            <!-- Protein -->
            <div>
              <p class="text-lg font-bold" style="color: #2563eb">${nutr.perServing.protein}g</p>
              <p class="text-sm font-medium text-gray-500 mt-0.5">Protein</p>
            </div>
            <!-- Carbs -->
            <div>
              <p class="text-lg font-bold" style="color: #d97706">${nutr.perServing.carbs}g</p>
              <p class="text-sm font-medium text-gray-500 mt-0.5">Carbs</p>
            </div>
            <!-- Fat -->
            <div>
              <p class="text-lg font-bold" style="color: #7c3aed">${nutr.perServing.fat}g</p>
              <p class="text-sm font-medium text-gray-500 mt-0.5">Fat</p>
            </div>
          </div>
        </div>

        <!-- Action Footer Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            id="cancelModal"
            class="py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors text-sm shadow-sm"
          >
            Cancel
          </button>
          <button
            id="logThisMeal"
            class="py-3 px-4 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm hover:opacity-90 active:scale-98"
            style="background-color: #0062ff"
          >
            <i class="fa-solid fa-book-bookmark text-xs opacity-90"></i>
            Log Meal
          </button>
        </div>
      </div>`;
  const logThisMeal = document.querySelector("#logThisMeal");
  const cancelModal = document.querySelector("#cancelModal");
  cancelModal.addEventListener("click", function () {
    modalbg.classList.add("hidden");
  });
  let fulldata = {
    mealData: meal,
    nutritionData: nutr,
  };
  const mealServingInput = document.querySelector("#mealServingInput");
  const minusbtn = document.querySelector("#minusbtn");
  const plusBtn = document.querySelector("#plusBtn");
  plusBtn.addEventListener("click", function () {
    serivingCounter += 0.5;
    mealServingInput.value = serivingCounter;
  });
  minusbtn.addEventListener("click", function () {
    serivingCounter -= 0.5;
    if (serivingCounter <= 0) {
      mealServingInput.value = 0.5;
      serivingCounter = 0.5;
    } else {
      mealServingInput.value = serivingCounter;
    }
  });
  logThisMeal.addEventListener("click", function () {
    logMeals.push(fulldata);
    localStorage.setItem("meals", JSON.stringify(logMeals));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Meal Logged!",
      text: `${meal.name} (${serivingCounter} serving) has been added to your daily log.`,
      showConfirmButton: false,
      timer: 2000,
    });
    cancelModal.click();
    serivingCounter = 1;
  });
}
function displayProductDetails(data) {
  let score = "unknown";
  switch (data.nutritionGrade.toLowerCase()) {
    case "a": {
      score = "Excellent";
      break;
    }
    case "b": {
      score = "very good";
      break;
    }
    case "c": {
      score = "good";
      break;
    }
    case "d": {
      score = "fair";
      break;
    }
    case "e": {
      score = "bad";
      break;
    }
  }
  let salt = data.nutrients.sodium
    ? (data.nutrients.sodium * 2.5).toFixed(2)
    : "0.00";
  let saturatedFat = (data.nutrients.fat * 0.343).toFixed(1);
  console.log(data);
  productModal.innerHTML = `<div class="flex-1 overflow-y-auto px-5 py-2 space-y-6">
          <!-- FIXED HEADER SECTION -->
          <div
            class="p-5 pb-3 flex items-start justify-between bg-white flex-shrink-0"
          >
            <div class="flex items-center gap-4">
              <!-- Product Image Container -->
              <div
                class="w-40 h-40 bg-white rounded-xl p-1 flex items-center justify-center border border-gray-100 flex-shrink-1"
              >
                <img
                  src=${data.image}
                  alt='${data.name}'
                  class="max-w-[20px] rounded-xl max-h-full object-contain"
                />
              </div>
              <!-- Title and Badges -->
              <div>
                <span class="text-[11px] font-medium block text-emerald-600"
                  >${data.brand}</span
                >
                <h2
                  class="text-2xl font-bold text-gray-900 tracking-tight mb-2"
                >
                  ${data.name}
                </h2>

                <div class="flex items-center gap-2">
                  <!-- Nutri-Score Badge Box -->
                  <div
                    class="flex items-center justify-between p-2 rounded-lg overflow-hidden border text-[11px] font-bold"
                    style="border-color: #fca5a5; background-color: #fff1f2"
                  >
                    <span
                      class="text-white w-6 h-6 flex items-center justify-center uppercase font-bold"
                      style="background-color: #ea580c"
                      >${data.nutritionGrade}</span
                    >
                    <div class="px-2 py-0.5 text-left leading-none">
                      <span class="text-[9px] font-medium text-gray-400 block"
                        >Nutri-Score</span
                      >
                      <span style="color: #ea580c; font-size: 10px">${score}</span>
                    </div>
                  </div>
                  <!-- NOVA Badge Box -->
                  <div
                    class="flex items-center justify-between p-2 rounded-lg overflow-hidden border text-[11px] font-bold"
                    style="border-color: #fdba74; background-color: #fff7ed"
                  >
                    <span
                      class="text-white w-6 h-6 flex items-center justify-center font-bold"
                      style="background-color: #ea580c"
                      >${data.novaGroup}</span
                    >
                    <div class="px-2 py-0.5 text-left leading-none">
                      <span class="text-[9px] font-medium text-gray-400 block"
                        >NOVA</span
                      >
                      <span style="color: #ea580c; font-size: 10px"
                        >Ultra-processed</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Close Icon Cross Button -->
            <button
            
              class="productCloseBtn text-gray-400 hover:text-gray-600 transition-colors p-1 mt-1"
            >
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          <!-- Nutrition Facts Panel Card -->
          <div
            class="border rounded-xl p-4"
            style="background-color: #f7fdfb; border-color: #d1fae5"
          >
            <div
              class="flex items-center gap-2 text-xs font-bold mb-3"
              style="color: #065f46"
            >
              <i class="fa-solid fa-circle-dot text-[10px]"></i>
              <span
                >Nutrition Facts
                <span class="text-gray-400 font-normal">(per 100g)</span></span
              >
            </div>

            <!-- Big Calories Number Display -->
            <div class="text-center mb-5">
              <p class="text-3xl font-bold text-gray-900 tracking-tight">${data.nutrients.calories}</p>
              <p class="text-[11px] font-medium text-gray-400 mt-0.5">
                Calories
              </p>
            </div>

            <!-- Main Color Line Indicators Grid -->
            <div class="grid grid-cols-4 gap-2 mb-5">
              <div>
                <div
                  class="h-1 rounded-full mb-2"
                  style="background-color: #10b981"
                ></div>
                <p class="text-sm font-bold text-center" style="color: #10b981">
                  ${data.nutrients.protein.toFixed(2)}g
                </p>
                <p class="text-[10px] font-medium text-center text-gray-400">
                  Protein
                </p>
              </div>
              <div>
                <div
                  class="h-1 rounded-full mb-2"
                  style="background-color: #3b82f6"
                ></div>
                <p class="text-sm font-bold text-center" style="color: #3b82f6">
                  ${data.nutrients.carbs}g
                </p>
                <p class="text-[10px] font-medium text-center text-gray-400">
                  Carbs
                </p>
              </div>
              <div>
                <div
                  class="h-1 rounded-full mb-2"
                  style="background-color: #a855f7"
                ></div>
                <p class="text-sm font-bold text-center" style="color: #a855f7">
                  ${data.nutrients.fat}g
                </p>
                <p class="text-[10px] font-medium text-center text-gray-400">
                  Fat
                </p>
              </div>
              <div>
                <div
                  class="h-1 rounded-full mb-2"
                  style="background-color: #f97316"
                ></div>
                <p class="text-sm font-bold text-center" style="color: #f97316">
                  ${data.nutrients.sugar}g
                </p>
                <p class="text-[10px] font-medium text-center text-gray-400">
                  Sugar
                </p>
              </div>
            </div>

            <!-- Sub-nutrients section -->
            <div
              class="pt-3 grid grid-cols-3 gap-2 text-center border-t border-gray-100"
            >
              <div>
                <p class="text-xs font-bold text-gray-800">${saturatedFat}g</p>
                <p class="text-[10px] font-medium text-gray-400">
                  Saturated Fat
                </p>
              </div>
              <div>
                <p class="text-xs font-bold text-gray-800">${data.nutrients.fiber}g</p>
                <p class="text-[10px] font-medium text-gray-400">Fiber</p>
              </div>
              <div>
                <p class="text-xs font-bold text-gray-800">${salt}g</p>
                <p class="text-[10px] font-medium text-gray-400">Salt</p>
              </div>
            </div>
          </div>

         
          <!-- FIXED FOOTER ACTIONS SECTION -->
          <div
            class="p-5 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 flex-shrink-0 bg-white"
          >
            <button
            id='logProductBtn'
              class="py-2.5 px-4 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 text-sm hover:opacity-95 active:scale-[0.99]"
              style="background-color: #047857"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              Log This Food
            </button>
            <button
              class="productCloseBtn py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors text-sm text-center border border-gray-200/60"
            >
              Close
            </button>
          </div>
        </div>`;
  const productCloseBtn = document.querySelectorAll(".productCloseBtn");
  const logProductBtn = document.querySelector("#logProductBtn");
  productCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      productModalbg.classList.add("hidden");
    });
  });
  logProductBtn.addEventListener("click", function () {
    logMeals.push(data);
    localStorage.setItem("meals", JSON.stringify(logMeals));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Logged!",
      text: `${data.name} has been added to your daily log.`,
      showConfirmButton: false,
      timer: 2000,
    });

    productCloseBtn[0].click();
  });
}
function displayLoggedItems() {
  const loggedData = localStorage.getItem("meals");
  const loggedArray = loggedData ? JSON.parse(loggedData) : [];

  if (loggedArray.length === 0) {
    loggedItemsContainer.innerHTML = `<!-- Empty State -->
                <div class="text-center py-8 text-gray-500">
                  <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>`;
    loggedItemsCounter.innerHTML = `(0)`;
    clearFoodlog.classList.add("hidden");
  } else {
    loggedItemsCounter.innerHTML = `(${loggedArray.length})`;
    clearFoodlog.classList.remove("hidden");

    const cardsHTML = loggedArray
      .map((item, index) => {
        const isMeal = item.mealData ? true : false;
        const badgeText = isMeal ? "Recipe" : "Product";
        const badgeColorClass = isMeal ? "text-emerald-500" : "text-blue-500";
        let name = "";
        let subtitle = "";
        let imageSrc = "";
        let calories = 0,
          protein = 0,
          carbs = 0,
          fat = 0;

        if (isMeal) {
          name = item.mealData?.name || "Unnamed Recipe";
          subtitle = `${serivingCounter} serving`;
          imageSrc = item.mealData?.thumbnail || "";
          calories = item.nutritionData.perServing?.calories || 0;
          protein = item.nutritionData.perServing?.protein || 0;
          carbs = item.nutritionData.perServing?.carbs || 0;
          fat = item.nutritionData.perServing?.fat || 0;
        } else {
          name = item.name || "Unnamed Product";
          const brandName = item.brand || "Packaged";
          subtitle = `${name}, ${brandName}`;
          imageSrc = item.image || "";
          calories = item.nutrients?.calories || 0;
          protein = item.nutrients.protein.toFixed(2);
          carbs = item.nutrients?.carbs || 0;
          fat = item.nutrients?.fat || 0;
        }

        let mediaHTML = "";
        if (imageSrc && imageSrc.trim() !== "") {
          mediaHTML = `<img class="w-14 h-14 rounded-xl object-cover flex-shrink-0" src="${imageSrc}" alt="${name}">`;
        } else {
          mediaHTML = `
          <div class="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-utensils text-xl text-gray-400"></i>
          </div>`;
        }

        const time =
          item.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

        return `
          <!-- Single Card Item -->
          <div class="w-full flex flex-row items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <!-- Left Section: Image & Details -->
            <div class="flex items-center gap-4">
              ${mediaHTML}

              <!-- Text Details -->
              <div class="flex flex-col">
                <h4 class="font-bold text-gray-900 text-[15px] leading-tight">
                  ${name}
                </h4>
                <p class="text-[13px] text-gray-500 mt-0.5">
                  ${subtitle} • <span class="font-medium ${badgeColorClass}">${badgeText}</span>
                </p>
                <span class="text-[11px] text-gray-400 mt-1">${time}</span>
              </div>
            </div>

            <!-- Right Section: Analytics & Controls -->
            <div class="flex items-center gap-6">
              <!-- Calories -->
              <div class="flex flex-col items-center justify-center">
                <span class="block text-xl font-bold text-emerald-600 leading-none">${Math.round(calories)}</span>
                <span class="text-[11px] text-gray-400 font-medium">kcal</span>
              </div>

              <!-- Macro Badges -->
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 text-[11px] text-gray-600 bg-blue-50 rounded-lg font-medium">
                  ${protein}g P
                </span>
                <span class="px-2 py-1 text-[11px] text-gray-600 bg-amber-50 rounded-lg font-medium">
                  ${carbs}g C
                </span>
                <span class="px-2 py-1 text-[11px] text-gray-600 bg-purple-50 rounded-lg font-medium">
                  ${fat}g F
                </span>
              </div>

              <!-- Delete Action -->
              <button class="deleteBtn text-gray-300 hover:text-red-500 transition-colors pl-2" data-index="${index}">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>`;
      })
      .join("");

    loggedItemsContainer.innerHTML = `
        <div class="space-y-4">
            ${cardsHTML}
        </div>`;

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const targetIndex = this.getAttribute("data-index");
        loggedArray.splice(targetIndex, 1);
        localStorage.setItem("meals", JSON.stringify(loggedArray));
        displayLoggedItems();
      });
    });
  }
}
