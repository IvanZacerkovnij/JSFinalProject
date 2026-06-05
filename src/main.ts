import type { MealShort } from "./types.js";

import {
    getCategories,
    getMealDetails,
    getMealsByCategory,
    getRandomMeal,
    searchMeals
} from "./api/mealApi.js";

import { renderCategories } from "./ui/renderCategories.js";
import { renderMeals } from "./ui/renderMeals.js";
import { showMealModal } from "./ui/mealModal.js";


const searchForm = document.querySelector<HTMLFormElement>("#searchForm")!;
const searchInput = document.querySelector<HTMLInputElement>("#searchInput")!;

const categoriesRow = document.querySelector<HTMLDivElement>("#categoriesRow")!;
const mealsRow = document.querySelector<HTMLDivElement>("#mealsRow")!;
const mealsTitle = document.querySelector<HTMLHeadingElement>("#mealsTitle")!;

const randomBtn = document.querySelector<HTMLButtonElement>("#randomBtn")!;
const favoritesBtn = document.querySelector<HTMLButtonElement>("#favoritesBtn")!;

const modalElement = document.querySelector<HTMLDivElement>("#mealModal")!;
const modalTitle = document.querySelector<HTMLHeadingElement>("#mealModalTitle")!;
const modalBody = document.querySelector<HTMLDivElement>("#mealModalBody")!;

let currentMeals: MealShort[] = [];

async function loadHomePage(): Promise<void> {
    const meals = await getMealsByCategory("Chicken");

    currentMeals = meals;
    mealsTitle.textContent = "Популярні страви";
    renderMeals(mealsRow, meals);
}

async function loadCategories(): Promise<void> {
    const categories = await getCategories();
    renderCategories(categoriesRow, categories);
}

async function openDetails(id: string): Promise<void> {
    const meal = await getMealDetails(id);

    if (!meal) {
        alert("Страву не знайдено");
        return;
    }

    showMealModal(modalElement, modalTitle, modalBody, meal);
}

searchForm.addEventListener("submit", async event => {
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

categoriesRow.addEventListener("click", async event => {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLButtonElement>("[data-category]");

    if (!button) return;

    const category = button.dataset.category;

    if (!category) return;

    const meals = await getMealsByCategory(category);

    currentMeals = meals;
    mealsTitle.textContent = `Категорія: ${category}`;
    renderMeals(mealsRow, meals);
});

mealsRow.addEventListener("click", async event => {
    const target = event.target as HTMLElement;

    const detailsButton = target.closest<HTMLButtonElement>("[data-details]");
    const favoriteButton = target.closest<HTMLButtonElement>("[data-favorite]");

    if (detailsButton) {
        const id = detailsButton.dataset.details;

        if (id) {
            await openDetails(id);
        }
    }
});

randomBtn.addEventListener("click", async () => {
    const meal = await getRandomMeal();

    if (!meal) return;

    currentMeals = [meal];
    mealsTitle.textContent = "Випадкова страва";
    renderMeals(mealsRow, [meal]);
    showMealModal(modalElement, modalTitle, modalBody, meal);
});

async function init(): Promise<void> {
    await loadCategories();
    await loadHomePage();
}

init();