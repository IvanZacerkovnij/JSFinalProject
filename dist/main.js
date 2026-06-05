import { getCategories, getMealDetails, getMealsByCategory, getRandomMeal, searchMeals } from "./api/mealApi.js";
import { renderCategories } from "./ui/renderCategories.js";
import { renderMeals } from "./ui/renderMeals.js";
import { showMealModal } from "./ui/mealModal.js";
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const categoriesRow = document.querySelector("#categoriesRow");
const mealsRow = document.querySelector("#mealsRow");
const mealsTitle = document.querySelector("#mealsTitle");
const randomBtn = document.querySelector("#randomBtn");
const favoritesBtn = document.querySelector("#favoritesBtn");
const modalElement = document.querySelector("#mealModal");
const modalTitle = document.querySelector("#mealModalTitle");
const modalBody = document.querySelector("#mealModalBody");
let currentMeals = [];
async function loadHomePage() {
    const meals = await getMealsByCategory("Chicken");
    currentMeals = meals;
    mealsTitle.textContent = "Популярні страви";
    renderMeals(mealsRow, meals);
}
async function loadCategories() {
    const categories = await getCategories();
    renderCategories(categoriesRow, categories);
}
async function openDetails(id) {
    const meal = await getMealDetails(id);
    if (!meal) {
        alert("Страву не знайдено");
        return;
    }
    showMealModal(modalElement, modalTitle, modalBody, meal);
}
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query === "") {
        alert("Введи назву страви");
        return;
    }
    const meals = await searchMeals(query);
    currentMeals = meals;
    mealsTitle.textContent = `Результати пошуку: ${query}`;
    renderMeals(mealsRow, meals);
});
categoriesRow.addEventListener("click", async (event) => {
    const target = event.target;
    const button = target.closest("[data-category]");
    if (!button)
        return;
    const category = button.dataset.category;
    if (!category)
        return;
    const meals = await getMealsByCategory(category);
    currentMeals = meals;
    mealsTitle.textContent = `Категорія: ${category}`;
    renderMeals(mealsRow, meals);
});
mealsRow.addEventListener("click", async (event) => {
    const target = event.target;
    const detailsButton = target.closest("[data-details]");
    const favoriteButton = target.closest("[data-favorite]");
    if (detailsButton) {
        const id = detailsButton.dataset.details;
        if (id) {
            await openDetails(id);
        }
    }
});
randomBtn.addEventListener("click", async () => {
    const meal = await getRandomMeal();
    if (!meal)
        return;
    currentMeals = [meal];
    mealsTitle.textContent = "Випадкова страва";
    renderMeals(mealsRow, [meal]);
    showMealModal(modalElement, modalTitle, modalBody, meal);
});
async function init() {
    await loadCategories();
    await loadHomePage();
}
init();
